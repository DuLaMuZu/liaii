// 核心数据类型定义

// 概念类型：清晰或模糊
export type ConceptType = 'clear' | 'fuzzy';

// 词汇级别
export type VocabularyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// 词性
export type PartOfSpeech = 'n.' | 'v.' | 'adj.' | 'adv.' | 'prep.' | 'conj.' | 'pron.';

// 词汇来源
export type VocabularySource = 'oxford_3000' | 'awl' | 'gre_357';

// 学习模式
export type LearningMode = 'topic' | 'mixed';

// 用户评分
export type UserRating = 'good' | 'normal' | 'bad';

// 清晰概念：一对一或一对多的英中对应
export interface ClearConcept {
  id: string;
  type: 'clear';
  english: string;
  partOfSpeech: PartOfSpeech;
  chinese: string[];  // 中文对应词（可能有多个）
  englishDefinition: string;  // 英文解释
  exampleSentence?: string;  // 例句
  source: VocabularySource;
  level?: VocabularyLevel;
  distanceScore: number;  // 综合距离值 (0-1)
  meaningDistance: number;  // 含义距离
  visualDistance: number;  // 视觉距离
  pronunciationDistance: number;  // 读音距离
}

// 模糊概念组：多对多的英中对应
export interface FuzzyConcept {
  id: string;
  type: 'fuzzy';
  fuzzyGroupId: string;  // 模糊组ID，如 'MG-001'
  englishWords: string[];  // 英文词组
  chineseWords: string[];  // 中文词云
  culturalAnalysis: string;  // 文化距离分析
  distanceScore: number;  // 组平均距离
  variance: number;  // 组内方差
  wordPairs: Array<{
    english: string;
    partOfSpeech: PartOfSpeech;
    chinese: string;
    englishDefinition: string;
    pairDistance: number;
  }>;
  source: VocabularySource;
}

// 联合类型：概念
export type Concept = ClearConcept | FuzzyConcept;

// 用户学习记录
export interface UserProgress {
  conceptId: string;
  lastReviewed: Date;
  reviewCount: number;
  ratings: UserRating[];  // 历史评分
  averageRating: number;  // 平均评分 (1-3)
  isInErrorPool: boolean;  // 是否在错误池中
  consecutiveGoodCount: number;  // 连续"好"的次数
}

// 学习会话
export interface LearningSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  mode: LearningMode;
  conceptsReviewed: string[];  // 概念ID列表
  totalConcepts: number;
  completedConcepts: number;
}

// 用户配置
export interface UserSettings {
  learningMode: LearningMode;
  difficultyDistribution: {
    easy: number;   // 30%
    medium: number; // 50%
    hard: number;   // 20%
  };
  showChinese: boolean;  // 是否显示中文
  dailyGoal: number;  // 每日目标词数
  selectedSources: VocabularySource[];  // 选择的词汇来源
}

// 统计数据
export interface Statistics {
  totalConceptsLearned: number;
  totalReviewSessions: number;
  averageAccuracy: number;
  currentStreak: number;  // 连续学习天数
  conceptsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  learningTimeTotal: number;  // 总学习时间（分钟）
}

// 学习序列项
export interface SequenceItem {
  concept: Concept;
  isFromErrorPool: boolean;
  similarConcepts?: string[];  // 相似概念的ID列表
}

// 数据库模型
export interface DB {
  concepts: Concept[];
  progress: UserProgress[];
  sessions: LearningSession[];
  settings: UserSettings;
  statistics: Statistics;
}
