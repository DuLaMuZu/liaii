import { create } from 'zustand';
import type {
  Concept,
  UserSettings,
  Statistics,
  LearningSession,
  SequenceItem,
  UserRating,
} from '../types';
import {
  getUserSettings,
  updateUserSettings as updateSettingsInDB,
  getStatistics,
  updateStatistics as updateStatsInDB,
  getUserProgress,
  updateUserProgress,
  createLearningSession,
  updateLearningSession,
} from '../lib/database/db';
import { generateLearningSequence } from '../lib/sequencing/generator';

interface AppState {
  // 应用状态
  isInitialized: boolean;
  isLoading: boolean;
  currentView: 'home' | 'learning' | 'settings' | 'stats';

  // 用户数据
  settings: UserSettings | null;
  statistics: Statistics | null;

  // 学习会话
  currentSession: LearningSession | null;
  learningSequence: SequenceItem[];
  currentIndex: number;
  currentConcept: Concept | null;

  // 动作
  initialize: () => Promise<void>;
  setView: (view: 'home' | 'learning' | 'settings' | 'stats') => void;

  // 设置相关
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;

  // 学习会话相关
  startLearningSession: () => Promise<void>;
  endLearningSession: () => Promise<void>;
  nextConcept: () => void;
  previousConcept: () => void;
  rateConcept: (rating: UserRating) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  isInitialized: false,
  isLoading: false,
  currentView: 'home',
  settings: null,
  statistics: null,
  currentSession: null,
  learningSequence: [],
  currentIndex: 0,
  currentConcept: null,

  // 初始化应用
  initialize: async () => {
    set({ isLoading: true });

    try {
      // 加载用户设置和统计数据
      const settings = await getUserSettings();
      const statistics = await getStatistics();

      set({
        settings,
        statistics,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      set({ isLoading: false });
    }
  },

  // 设置当前视图
  setView: (view) => {
    set({ currentView: view });
  },

  // 更新设置
  updateSettings: async (newSettings) => {
    const { settings } = get();
    if (!settings) return;

    const updated = { ...settings, ...newSettings };
    await updateSettingsInDB(newSettings);
    set({ settings: updated });
  },

  // 开始学习会话
  startLearningSession: async () => {
    set({ isLoading: true });

    const { settings } = get();
    if (!settings) return;

    try {
      // 生成学习序列
      const sequence = await generateLearningSequence(settings, settings.dailyGoal);

      // 创建会话
      const session: LearningSession = {
        id: `session-${Date.now()}`,
        startTime: new Date(),
        mode: settings.learningMode,
        conceptsReviewed: [],
        totalConcepts: sequence.length,
        completedConcepts: 0,
      };

      await createLearningSession(session);

      set({
        currentSession: session,
        learningSequence: sequence,
        currentIndex: 0,
        currentConcept: sequence[0]?.concept || null,
        currentView: 'learning',
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to start learning session:', error);
      set({ isLoading: false });
    }
  },

  // 结束学习会话
  endLearningSession: async () => {
    const { currentSession, statistics } = get();
    if (!currentSession || !statistics) return;

    try {
      // 更新会话
      await updateLearningSession(currentSession.id, {
        endTime: new Date(),
      });

      // 更新统计数据
      const now = new Date();
      const sessionDuration = currentSession.startTime
        ? (now.getTime() - currentSession.startTime.getTime()) / (1000 * 60)
        : 0;

      await updateStatsInDB({
        totalReviewSessions: statistics.totalReviewSessions + 1,
        learningTimeTotal: statistics.learningTimeTotal + sessionDuration,
      });

      // 重新加载统计数据
      const updatedStats = await getStatistics();

      set({
        currentSession: null,
        learningSequence: [],
        currentIndex: 0,
        currentConcept: null,
        currentView: 'home',
        statistics: updatedStats,
      });
    } catch (error) {
      console.error('Failed to end learning session:', error);
    }
  },

  // 下一个概念
  nextConcept: () => {
    const { learningSequence, currentIndex } = get();

    if (currentIndex < learningSequence.length - 1) {
      const newIndex = currentIndex + 1;
      set({
        currentIndex: newIndex,
        currentConcept: learningSequence[newIndex].concept,
      });
    }
  },

  // 上一个概念
  previousConcept: () => {
    const { learningSequence, currentIndex } = get();

    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      set({
        currentIndex: newIndex,
        currentConcept: learningSequence[newIndex].concept,
      });
    }
  },

  // 评分概念
  rateConcept: async (rating: UserRating) => {
    const { currentConcept, currentSession, statistics } = get();
    if (!currentConcept || !currentSession || !statistics) return;

    try {
      // 获取或创建用户进度
      let progress = await getUserProgress(currentConcept.id);

      if (!progress) {
        progress = {
          conceptId: currentConcept.id,
          lastReviewed: new Date(),
          reviewCount: 0,
          ratings: [],
          averageRating: 0,
          isInErrorPool: false,
          consecutiveGoodCount: 0,
        };
      }

      // 更新进度
      progress.ratings.push(rating);
      progress.reviewCount += 1;
      progress.lastReviewed = new Date();
      progress.averageRating =
        progress.ratings.reduce((sum, r) => sum + (r === 'good' ? 3 : r === 'normal' ? 2 : 1), 0) /
        progress.ratings.length;

      // 更新错误池状态
      if (rating === 'bad') {
        progress.isInErrorPool = true;
        progress.consecutiveGoodCount = 0;
      } else if (rating === 'good') {
        progress.consecutiveGoodCount += 1;
        if (progress.consecutiveGoodCount >= 3) {
          progress.isInErrorPool = false;
        }
      } else {
        progress.consecutiveGoodCount = 0;
      }

      await updateUserProgress(progress);

      // 更新会话
      const updatedSession = {
        ...currentSession,
        conceptsReviewed: [...currentSession.conceptsReviewed, currentConcept.id],
        completedConcepts: currentSession.completedConcepts + 1,
      };

      await updateLearningSession(currentSession.id, {
        conceptsReviewed: updatedSession.conceptsReviewed,
        completedConcepts: updatedSession.completedConcepts,
      });

      // 更新统计数据
      const difficulty = currentConcept.distanceScore < 0.4 ? 'easy'
        : currentConcept.distanceScore < 0.7 ? 'medium'
        : 'hard';

      const newStats = {
        totalConceptsLearned: statistics.totalConceptsLearned + 1,
        conceptsByDifficulty: {
          ...statistics.conceptsByDifficulty,
          [difficulty]: statistics.conceptsByDifficulty[difficulty] + 1,
        },
      };

      await updateStatsInDB(newStats);

      set({
        currentSession: updatedSession,
        statistics: {
          ...statistics,
          ...newStats,
        },
      });

      // 自动前进到下一个概念
      get().nextConcept();
    } catch (error) {
      console.error('Failed to rate concept:', error);
    }
  },
}));
