import { useAppStore } from '../../stores/useAppStore';

export function StatsView() {
  const { statistics } = useAppStore();

  if (!statistics) {
    return <div>加载中...</div>;
  }

  const totalConcepts =
    statistics.conceptsByDifficulty.easy +
    statistics.conceptsByDifficulty.medium +
    statistics.conceptsByDifficulty.hard;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">学习统计</h2>

      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">总学习概念</h3>
          <p className="text-4xl font-bold text-primary-600">
            {statistics.totalConceptsLearned}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">学习会话</h3>
          <p className="text-4xl font-bold text-primary-600">
            {statistics.totalReviewSessions}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">连续学习</h3>
          <p className="text-4xl font-bold text-primary-600">
            {statistics.currentStreak}
            <span className="text-lg text-gray-600 ml-1">天</span>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">学习时长</h3>
          <p className="text-4xl font-bold text-primary-600">
            {Math.round(statistics.learningTimeTotal)}
            <span className="text-lg text-gray-600 ml-1">分钟</span>
          </p>
        </div>
      </div>

      {/* 难度分布 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">难度分布</h3>

        <div className="space-y-6">
          {/* 简单 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="font-medium text-gray-900">简单</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {statistics.conceptsByDifficulty.easy}
                </span>
                {' / '}
                {totalConcepts > 0
                  ? `${((statistics.conceptsByDifficulty.easy / totalConcepts) * 100).toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all"
                style={{
                  width: `${
                    totalConcepts > 0
                      ? (statistics.conceptsByDifficulty.easy / totalConcepts) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* 中等 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="font-medium text-gray-900">中等</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {statistics.conceptsByDifficulty.medium}
                </span>
                {' / '}
                {totalConcepts > 0
                  ? `${((statistics.conceptsByDifficulty.medium / totalConcepts) * 100).toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full transition-all"
                style={{
                  width: `${
                    totalConcepts > 0
                      ? (statistics.conceptsByDifficulty.medium / totalConcepts) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* 困难 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="font-medium text-gray-900">困难</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {statistics.conceptsByDifficulty.hard}
                </span>
                {' / '}
                {totalConcepts > 0
                  ? `${((statistics.conceptsByDifficulty.hard / totalConcepts) * 100).toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full transition-all"
                style={{
                  width: `${
                    totalConcepts > 0
                      ? (statistics.conceptsByDifficulty.hard / totalConcepts) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 学习洞察 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">学习洞察</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">平均每次学习时长</p>
              <p className="text-sm text-gray-600">
                {statistics.totalReviewSessions > 0
                  ? (statistics.learningTimeTotal / statistics.totalReviewSessions).toFixed(1)
                  : 0}{' '}
                分钟
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">平均每次学习概念数</p>
              <p className="text-sm text-gray-600">
                {statistics.totalReviewSessions > 0
                  ? (statistics.totalConceptsLearned / statistics.totalReviewSessions).toFixed(1)
                  : 0}{' '}
                个
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">学习效率</p>
              <p className="text-sm text-gray-600">
                {statistics.learningTimeTotal > 0
                  ? (statistics.totalConceptsLearned / (statistics.learningTimeTotal / 60)).toFixed(1)
                  : 0}{' '}
                个概念/小时
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 鼓励语 */}
      {statistics.totalConceptsLearned > 0 && (
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg shadow-sm p-6 border border-primary-100">
          <p className="text-center text-lg text-gray-700">
            {statistics.totalConceptsLearned < 10
              ? '很好的开始！继续保持学习热情。'
              : statistics.totalConceptsLearned < 50
              ? '你正在稳步前进，坚持就是胜利！'
              : statistics.totalConceptsLearned < 100
              ? '出色的进展！你已经掌握了很多概念。'
              : '令人印象深刻！你的学习成果非常出色。'}
          </p>
        </div>
      )}
    </div>
  );
}
