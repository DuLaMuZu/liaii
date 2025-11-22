import { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import type { UserRating } from '../../types';

export function LearningView() {
  const {
    currentConcept,
    currentSession,
    currentIndex,
    learningSequence,
    settings,
    rateConcept,
    endLearningSession,
    nextConcept,
    previousConcept,
  } = useAppStore();

  const [showChinese, setShowChinese] = useState(settings?.showChinese || false);

  if (!currentConcept || !currentSession) {
    return <div className="text-center py-12">没有活动的学习会话</div>;
  }

  const progress = ((currentIndex + 1) / learningSequence.length) * 100;

  const handleRating = (rating: UserRating) => {
    rateConcept(rating);
  };

  const getDifficultyColor = (distance: number) => {
    if (distance < 0.4) return 'bg-green-100 text-green-800';
    if (distance < 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyLabel = (distance: number) => {
    if (distance < 0.4) return '简单';
    if (distance < 0.7) return '中等';
    return '困难';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>进度</span>
          <span>
            {currentIndex + 1} / {learningSequence.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 主学习卡片 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        {/* 概念类型和难度标签 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentConcept.type === 'clear'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {currentConcept.type === 'clear' ? '清晰概念' : '模糊概念'}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                currentConcept.distanceScore
              )}`}
            >
              {getDifficultyLabel(currentConcept.distanceScore)} (
              {currentConcept.distanceScore.toFixed(2)})
            </span>
          </div>
          <button
            onClick={() => setShowChinese(!showChinese)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {showChinese ? '隐藏' : '显示'}中文
          </button>
        </div>

        {/* 清晰概念显示 */}
        {currentConcept.type === 'clear' && (
          <div className="space-y-6">
            {/* 英文单词 */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {currentConcept.english}
              </h2>
              <p className="text-lg text-gray-500">{currentConcept.partOfSpeech}</p>
            </div>

            {/* 英文定义 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                English Definition:
              </h3>
              <p className="text-lg text-gray-800">
                {currentConcept.englishDefinition}
              </p>
            </div>

            {/* 例句 */}
            {currentConcept.exampleSentence && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Example:
                </h3>
                <p className="text-lg text-gray-800 italic">
                  {currentConcept.exampleSentence}
                </p>
              </div>
            )}

            {/* 中文对应（可选显示） */}
            {showChinese && (
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  中文对应:
                </h3>
                <p className="text-xl text-gray-800">
                  {currentConcept.chinese.join('、')}
                </p>
              </div>
            )}

            {/* 距离评分详情 */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">含义距离</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentConcept.meaningDistance.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">视觉距离</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentConcept.visualDistance.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">读音距离</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentConcept.pronunciationDistance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 模糊概念显示 */}
        {currentConcept.type === 'fuzzy' && (
          <div className="space-y-6">
            {/* 概念组标题 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                模糊概念组: {currentConcept.fuzzyGroupId}
              </h2>
            </div>

            {/* 英文词组 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                English Words:
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentConcept.englishWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full font-medium"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* 中文词云 */}
            {showChinese && (
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  中文词云:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentConcept.chineseWords.map((word, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 文化分析 */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Cultural Analysis:
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                {currentConcept.culturalAnalysis}
              </p>
            </div>

            {/* 词对示例 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Word Pair Examples:
              </h3>
              {currentConcept.wordPairs.slice(0, 3).map((pair, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {pair.english} ({pair.partOfSpeech})
                        {showChinese && (
                          <span className="ml-2 text-gray-600">→ {pair.chinese}</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {pair.englishDefinition}
                      </p>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-500">
                      {pair.pairDistance.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 评分按钮 */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={() => handleRating('bad')}
          className="flex-1 max-w-xs bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          壞 (需要复习)
        </button>
        <button
          onClick={() => handleRating('normal')}
          className="flex-1 max-w-xs bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          正常
        </button>
        <button
          onClick={() => handleRating('good')}
          className="flex-1 max-w-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          好 (已掌握)
        </button>
      </div>

      {/* 导航和结束按钮 */}
      <div className="flex items-center justify-between">
        <button
          onClick={previousConcept}
          disabled={currentIndex === 0}
          className="text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ← 上一个
        </button>
        <button
          onClick={endLearningSession}
          className="text-gray-600 hover:text-red-600"
        >
          结束学习
        </button>
        <button
          onClick={nextConcept}
          disabled={currentIndex >= learningSequence.length - 1}
          className="text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          下一个 →
        </button>
      </div>
    </div>
  );
}
