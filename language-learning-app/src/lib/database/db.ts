import Dexie, { type Table } from 'dexie';
import type {
  Concept,
  UserProgress,
  LearningSession,
  UserSettings,
  Statistics,
} from '../../types';

// 定义数据库类
export class LanguageLearningDB extends Dexie {
  concepts!: Table<Concept, string>;
  progress!: Table<UserProgress, string>;
  sessions!: Table<LearningSession, string>;
  settings!: Table<UserSettings, number>;
  statistics!: Table<Statistics, number>;

  constructor() {
    super('LanguageLearningDB');

    // 定义数据库模式
    this.version(1).stores({
      concepts: 'id, type, source, level, distanceScore, fuzzyGroupId',
      progress: 'conceptId, lastReviewed, isInErrorPool, averageRating',
      sessions: 'id, startTime, mode',
      settings: '++id',
      statistics: '++id',
    });
  }
}

// 创建数据库实例
export const db = new LanguageLearningDB();

// 数据库初始化函数
export async function initializeDatabase() {
  try {
    // 检查是否已有设置
    const settingsCount = await db.settings.count();

    if (settingsCount === 0) {
      // 初始化默认设置
      await db.settings.add({
        learningMode: 'topic',
        difficultyDistribution: {
          easy: 0.3,
          medium: 0.5,
          hard: 0.2,
        },
        showChinese: false,
        dailyGoal: 20,
        selectedSources: ['oxford_3000'],
      });

      // 初始化统计数据
      await db.statistics.add({
        totalConceptsLearned: 0,
        totalReviewSessions: 0,
        averageAccuracy: 0,
        currentStreak: 0,
        conceptsByDifficulty: {
          easy: 0,
          medium: 0,
          hard: 0,
        },
        learningTimeTotal: 0,
      });
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// 获取用户设置
export async function getUserSettings(): Promise<UserSettings> {
  const settings = await db.settings.toArray();
  return settings[0];
}

// 更新用户设置
export async function updateUserSettings(newSettings: Partial<UserSettings>) {
  const settings = await db.settings.toArray();
  if (settings.length > 0) {
    await db.settings.update(1, newSettings);
  }
}

// 获取统计数据
export async function getStatistics(): Promise<Statistics> {
  const stats = await db.statistics.toArray();
  return stats[0];
}

// 更新统计数据
export async function updateStatistics(newStats: Partial<Statistics>) {
  const stats = await db.statistics.toArray();
  if (stats.length > 0) {
    await db.statistics.update(1, newStats);
  }
}

// 添加概念
export async function addConcepts(concepts: Concept[]) {
  await db.concepts.bulkAdd(concepts);
}

// 获取所有概念
export async function getAllConcepts(): Promise<Concept[]> {
  return await db.concepts.toArray();
}

// 获取用户进度
export async function getUserProgress(conceptId: string): Promise<UserProgress | undefined> {
  return await db.progress.get(conceptId);
}

// 更新用户进度
export async function updateUserProgress(progress: UserProgress) {
  await db.progress.put(progress);
}

// 创建学习会话
export async function createLearningSession(session: LearningSession) {
  await db.sessions.add(session);
}

// 更新学习会话
export async function updateLearningSession(sessionId: string, updates: Partial<LearningSession>) {
  await db.sessions.update(sessionId, updates);
}

// 获取错误池中的概念
export async function getErrorPoolConcepts(): Promise<string[]> {
  const errorProgress = await db.progress
    .where('isInErrorPool')
    .equals(1)
    .toArray();
  return errorProgress.map(p => p.conceptId);
}
