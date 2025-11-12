import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './components/Home';
import { LearningView } from './components/learning/LearningView';
import { SettingsView } from './components/settings/SettingsView';
import { StatsView } from './components/stats/StatsView';
import { useAppStore } from './stores/useAppStore';
import { initializeDatabase, db } from './lib/database/db';
import { allSampleConcepts } from './data/sampleVocabulary';

function App() {
  const { isInitialized, isLoading, currentView, initialize } = useAppStore();

  useEffect(() => {
    async function init() {
      // 初始化数据库
      await initializeDatabase();

      // 检查是否需要加载初始词汇数据
      const conceptCount = await db.concepts.count();
      if (conceptCount === 0) {
        // 加载样本词汇数据
        await db.concepts.bulkAdd(allSampleConcepts);
        console.log('Sample vocabulary loaded:', allSampleConcepts.length, 'concepts');
      }

      // 初始化应用状态
      await initialize();
    }

    init();
  }, [initialize]);

  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {currentView === 'home' && <Home />}
      {currentView === 'learning' && <LearningView />}
      {currentView === 'settings' && <SettingsView />}
      {currentView === 'stats' && <StatsView />}
    </Layout>
  );
}

export default App;
