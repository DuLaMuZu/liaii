import { useAppStore } from '../stores/useAppStore';

export function Home() {
  const { settings, statistics, startLearningSession } = useAppStore();

  if (!settings || !statistics) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          欢迎来到语言学习系统
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          这不是一个翻译工具，而是文化理解工具。通过三维评分系统，量化从中文概念转换到英文概念的认知成本。
        </p>
        <button
          onClick={startLearningSession}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          开始学习
        </button>
      </div>

      {/* 今日目标 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">今日目标</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (statistics.totalConceptsLearned % settings.dailyGoal) / settings.dailyGoal * 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {statistics.totalConceptsLearned % settings.dailyGoal}
            </span>
            {' / '}
            {settings.dailyGoal}
          </div>
        </div>
      </div>

      {/* 学习统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">总学习概念</h4>
          <p className="text-3xl font-bold text-gray-900">{statistics.totalConceptsLearned}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">学习会话</h4>
          <p className="text-3xl font-bold text-gray-900">{statistics.totalReviewSessions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">学习时长</h4>
          <p className="text-3xl font-bold text-gray-900">{Math.round(statistics.learningTimeTotal)}<span className="text-lg text-gray-600 ml-1">分钟</span></p>
        </div>
      </div>

      {/* 难度分布 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">学习难度分布</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">简单</span>
              <span className="font-semibold text-gray-900">{statistics.conceptsByDifficulty.easy}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${statistics.totalConceptsLearned > 0 ? (statistics.conceptsByDifficulty.easy / statistics.totalConceptsLearned * 100) : 0}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">中等</span>
              <span className="font-semibold text-gray-900">{statistics.conceptsByDifficulty.medium}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${statistics.totalConceptsLearned > 0 ? (statistics.conceptsByDifficulty.medium / statistics.totalConceptsLearned * 100) : 0}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">困难</span>
              <span className="font-semibold text-gray-900">{statistics.conceptsByDifficulty.hard}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${statistics.totalConceptsLearned > 0 ? (statistics.conceptsByDifficulty.hard / statistics.totalConceptsLearned * 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 核心理念 */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg shadow-sm p-6 border border-primary-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">核心理念</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>去母语化学习</strong> - 用英文解释英文，中文仅作辅助</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>文化距离评分</strong> - 三维度（含义、视觉、读音）量化学习难度</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>模糊概念处理</strong> - 承认某些概念在两种语言中没有清晰对应</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>对比式学习</strong> - 距离值相近的概念连续呈现，制造对比</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
