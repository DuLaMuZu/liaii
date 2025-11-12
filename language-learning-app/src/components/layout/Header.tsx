import { useAppStore } from '../../stores/useAppStore';

export function Header() {
  const { currentView, setView, statistics } = useAppStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">
              语言学习系统
            </h1>
            <nav className="flex space-x-4">
              <button
                onClick={() => setView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'home'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                首页
              </button>
              <button
                onClick={() => setView('stats')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'stats'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                统计
              </button>
              <button
                onClick={() => setView('settings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'settings'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                设置
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {statistics && (
              <div className="text-sm text-gray-600">
                已学习: <span className="font-semibold text-gray-900">{statistics.totalConceptsLearned}</span> 个概念
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
