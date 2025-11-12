// 评分系统：计算跨语言距离

// 权重配置
export const WEIGHTS = {
  meaning: 0.4,
  visual: 0.3,
  pronunciation: 0.3,
};

// 计算含义距离
// 对于清晰概念，使用预标注的值
// 对于模糊概念，需要更复杂的计算
export function calculateMeaningDistance(
  _englishWord: string,
  _chineseWord: string,
  isDirectMapping: boolean = true
): number {
  // Phase 1: 使用简化版本，返回预设值
  // 清晰映射（如 table -> 桌子）: 0.1-0.2
  // 部分映射（如 happy -> 快乐/幸福）: 0.3-0.5
  // 模糊映射: 0.6-0.9

  if (isDirectMapping) {
    return 0.15;  // 默认清晰概念的含义距离
  }

  return 0.5;  // 默认部分映射的含义距离
}

// 计算视觉距离
// 公式: visualDistance = 1 - exp(-|中文笔画数 - 英文字母数| / 10)
export function calculateVisualDistance(
  englishWord: string,
  chineseWord: string,
  chineseStrokes?: number
): number {
  const englishLength = englishWord.length;

  // 如果没有提供笔画数，使用估算
  // 简化估算：每个汉字约10-15笔画
  const estimatedStrokes = chineseStrokes || chineseWord.length * 12;

  const difference = Math.abs(estimatedStrokes - englishLength);
  const distance = 1 - Math.exp(-difference / 10);

  return Math.min(1, Math.max(0, distance));
}

// 计算读音距离
// Phase 1: 使用简化版本
// 中英文读音通常完全不同，所以默认较高值
export function calculatePronunciationDistance(
  englishWord: string,
  chineseWord: string
): number {
  // Phase 1: 简化版本
  // 大部分英文和中文读音差异很大
  // 返回 0.8-0.95 之间的值

  // 简单启发式：如果词较短，可能更容易记住
  const avgLength = (englishWord.length + chineseWord.length) / 2;

  if (avgLength <= 5) {
    return 0.75;  // 短词稍微容易
  } else if (avgLength <= 10) {
    return 0.85;  // 中等长度
  } else {
    return 0.95;  // 长词更难
  }
}

// 计算综合距离
export function calculateTotalDistance(
  meaningDistance: number,
  visualDistance: number,
  pronunciationDistance: number
): number {
  const total =
    WEIGHTS.meaning * meaningDistance +
    WEIGHTS.visual * visualDistance +
    WEIGHTS.pronunciation * pronunciationDistance;

  return Math.min(1, Math.max(0, total));
}

// 根据距离值确定难度级别
export function getDifficultyLevel(distance: number): 'easy' | 'medium' | 'hard' {
  if (distance < 0.4) return 'easy';
  if (distance < 0.7) return 'medium';
  return 'hard';
}

// 为清晰概念计算完整评分
export function scoreCleanConcept(
  english: string,
  chinese: string,
  meaningDistance?: number,
  chineseStrokes?: number
): {
  meaningDistance: number;
  visualDistance: number;
  pronunciationDistance: number;
  distanceScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
} {
  const meaning = meaningDistance || calculateMeaningDistance(english, chinese, true);
  const visual = calculateVisualDistance(english, chinese, chineseStrokes);
  const pronunciation = calculatePronunciationDistance(english, chinese);
  const total = calculateTotalDistance(meaning, visual, pronunciation);

  return {
    meaningDistance: meaning,
    visualDistance: visual,
    pronunciationDistance: pronunciation,
    distanceScore: total,
    difficulty: getDifficultyLevel(total),
  };
}

// 为模糊概念组计算评分
export function scoreFuzzyGroup(
  wordPairs: Array<{ english: string; chinese: string; meaningDistance?: number }>
): {
  averageDistance: number;
  variance: number;
  adjustedDistance: number;
  difficulty: 'easy' | 'medium' | 'hard';
} {
  const pairScores = wordPairs.map(pair => {
    const score = scoreCleanConcept(
      pair.english,
      pair.chinese,
      pair.meaningDistance
    );
    return score.distanceScore;
  });

  // 计算平均距离
  const average = pairScores.reduce((sum, score) => sum + score, 0) / pairScores.length;

  // 计算方差
  const variance =
    pairScores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) /
    pairScores.length;
  const stdDev = Math.sqrt(variance);

  // 调整距离：方差大的组更难
  const adjusted = average + stdDev * 0.3;

  return {
    averageDistance: average,
    variance: stdDev,
    adjustedDistance: Math.min(1, adjusted),
    difficulty: getDifficultyLevel(adjusted),
  };
}
