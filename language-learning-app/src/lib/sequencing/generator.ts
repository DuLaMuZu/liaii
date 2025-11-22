import type { Concept, UserSettings, SequenceItem } from '../../types';
import { db, getErrorPoolConcepts } from '../database/db';

// 生成学习序列
export async function generateLearningSequence(
  settings: UserSettings,
  count: number = 20
): Promise<SequenceItem[]> {
  if (settings.learningMode === 'topic') {
    return generateTopicModeSequence(settings, count);
  } else {
    return generateMixedModeSequence(settings, count);
  }
}

// 主题模式：按词汇表和难度排序
async function generateTopicModeSequence(
  settings: UserSettings,
  count: number
): Promise<SequenceItem[]> {
  // 获取符合条件的概念
  const allConcepts = await db.concepts
    .where('source')
    .anyOf(settings.selectedSources)
    .toArray();

  // 获取错误池
  const errorPoolIds = await getErrorPoolConcepts();

  // 过滤出未学习或需要复习的概念
  const availableConcepts = await filterAvailableConcepts(allConcepts);

  // 按难度分组
  const grouped = groupByDifficulty(availableConcepts);

  // 根据配置的难度分布采样
  const selectedConcepts = sampleByDifficulty(
    grouped,
    count,
    settings.difficultyDistribution
  );

  // 排序：按距离值从低到高
  selectedConcepts.sort((a, b) => a.distanceScore - b.distanceScore);

  // 插入错误池中的词
  const sequence = insertErrorPoolWords(selectedConcepts, errorPoolIds);

  return sequence.map(concept => ({
    concept,
    isFromErrorPool: errorPoolIds.includes(concept.id),
    similarConcepts: undefined,
  }));
}

// 混合模式：构建相似度图并遍历
async function generateMixedModeSequence(
  settings: UserSettings,
  count: number
): Promise<SequenceItem[]> {
  // 获取所有可用概念
  const allConcepts = await db.concepts
    .where('source')
    .anyOf(settings.selectedSources)
    .toArray();

  const availableConcepts = await filterAvailableConcepts(allConcepts);
  const errorPoolIds = await getErrorPoolConcepts();

  // 按难度分组
  const grouped = groupByDifficulty(availableConcepts);

  // 采样
  const selectedConcepts = sampleByDifficulty(
    grouped,
    count,
    settings.difficultyDistribution
  );

  // 构建相似度图
  const similarityGraph = buildSimilarityGraph(selectedConcepts);

  // 图遍历：最近邻优先
  const traversalOrder = traverseGraph(selectedConcepts, similarityGraph);

  // 插入错误池词汇
  const sequence = insertErrorPoolWords(traversalOrder, errorPoolIds);

  return sequence.map(concept => ({
    concept,
    isFromErrorPool: errorPoolIds.includes(concept.id),
    similarConcepts: similarityGraph.get(concept.id) || [],
  }));
}

// 过滤可用概念（排除最近学习的）
async function filterAvailableConcepts(concepts: Concept[]): Promise<Concept[]> {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const availableConcepts: Concept[] = [];

  for (const concept of concepts) {
    const progress = await db.progress.get(concept.id);

    // 如果从未学习，或者上次学习超过1天前，则可用
    if (!progress || progress.lastReviewed < oneDayAgo) {
      availableConcepts.push(concept);
    }
  }

  return availableConcepts;
}

// 按难度分组
function groupByDifficulty(concepts: Concept[]): {
  easy: Concept[];
  medium: Concept[];
  hard: Concept[];
} {
  const grouped = {
    easy: [] as Concept[],
    medium: [] as Concept[],
    hard: [] as Concept[],
  };

  for (const concept of concepts) {
    if (concept.distanceScore < 0.4) {
      grouped.easy.push(concept);
    } else if (concept.distanceScore < 0.7) {
      grouped.medium.push(concept);
    } else {
      grouped.hard.push(concept);
    }
  }

  return grouped;
}

// 按难度分布采样
function sampleByDifficulty(
  grouped: { easy: Concept[]; medium: Concept[]; hard: Concept[] },
  count: number,
  distribution: { easy: number; medium: number; hard: number }
): Concept[] {
  const easyCount = Math.floor(count * distribution.easy);
  const mediumCount = Math.floor(count * distribution.medium);
  const hardCount = count - easyCount - mediumCount;

  const selected: Concept[] = [];

  // 从每个难度级别随机采样
  selected.push(...randomSample(grouped.easy, easyCount));
  selected.push(...randomSample(grouped.medium, mediumCount));
  selected.push(...randomSample(grouped.hard, hardCount));

  return selected;
}

// 随机采样
function randomSample<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

// 构建相似度图（距离值相近的概念连边）
function buildSimilarityGraph(concepts: Concept[]): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  const threshold = 0.15; // 距离值差异阈值

  for (let i = 0; i < concepts.length; i++) {
    const neighbors: string[] = [];

    for (let j = 0; j < concepts.length; j++) {
      if (i !== j) {
        const distanceDiff = Math.abs(
          concepts[i].distanceScore - concepts[j].distanceScore
        );
        if (distanceDiff <= threshold) {
          neighbors.push(concepts[j].id);
        }
      }
    }

    graph.set(concepts[i].id, neighbors);
  }

  return graph;
}

// 图遍历：最近邻优先
function traverseGraph(
  concepts: Concept[],
  graph: Map<string, string[]>
): Concept[] {
  if (concepts.length === 0) return [];

  const visited = new Set<string>();
  const result: Concept[] = [];
  const conceptMap = new Map(concepts.map(c => [c.id, c]));

  // 从距离值最小的概念开始
  const sorted = [...concepts].sort((a, b) => a.distanceScore - b.distanceScore);
  let current = sorted[0];

  while (result.length < concepts.length) {
    if (!visited.has(current.id)) {
      visited.add(current.id);
      result.push(current);

      // 找到未访问的邻居
      const neighbors = graph.get(current.id) || [];
      const unvisitedNeighbors = neighbors.filter(id => !visited.has(id));

      if (unvisitedNeighbors.length > 0) {
        // 选择距离值最接近的邻居
        const nextId = unvisitedNeighbors[0];
        current = conceptMap.get(nextId)!;
      } else {
        // 没有未访问的邻居，选择下一个未访问的概念
        const remaining = concepts.filter(c => !visited.has(c.id));
        if (remaining.length > 0) {
          current = remaining[0];
        } else {
          break;
        }
      }
    }
  }

  return result;
}

// 插入错误池中的词（每5个正常词插入1个错误词）
function insertErrorPoolWords(
  mainSequence: Concept[],
  errorPoolIds: string[]
): Concept[] {
  if (errorPoolIds.length === 0) {
    return mainSequence;
  }

  // 获取错误池中的概念
  const errorConcepts = mainSequence.filter(c => errorPoolIds.includes(c.id));

  if (errorConcepts.length === 0) {
    return mainSequence;
  }

  // 移除错误词，先安排正常词
  const normalConcepts = mainSequence.filter(c => !errorPoolIds.includes(c.id));

  const result: Concept[] = [];
  let errorIndex = 0;

  for (let i = 0; i < normalConcepts.length; i++) {
    result.push(normalConcepts[i]);

    // 每5个正常词后插入1个错误词
    if ((i + 1) % 5 === 0 && errorIndex < errorConcepts.length) {
      result.push(errorConcepts[errorIndex]);
      errorIndex++;
    }
  }

  // 添加剩余的错误词
  while (errorIndex < errorConcepts.length) {
    result.push(errorConcepts[errorIndex]);
    errorIndex++;
  }

  return result;
}
