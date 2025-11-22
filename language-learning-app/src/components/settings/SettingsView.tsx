import { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import type { LearningMode, VocabularySource } from '../../types';

export function SettingsView() {
  const { settings, updateSettings } = useAppStore();

  const [learningMode, setLearningMode] = useState<LearningMode>('topic');
  const [dailyGoal, setDailyGoal] = useState(20);
  const [showChinese, setShowChinese] = useState(false);
  const [selectedSources, setSelectedSources] = useState<VocabularySource[]>(['oxford_3000']);

  useEffect(() => {
    if (settings) {
      setLearningMode(settings.learningMode);
      setDailyGoal(settings.dailyGoal);
      setShowChinese(settings.showChinese);
      setSelectedSources(settings.selectedSources);
    }
  }, [settings]);

  const handleSave = async () => {
    await updateSettings({
      learningMode,
      dailyGoal,
      showChinese,
      selectedSources,
    });
    alert('设置已保存！');
  };

  const toggleSource = (source: VocabularySource) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  if (!settings) {
    return <div>加载中...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">设置</h2>

      <div className="space-y-6">
        {/* 学习模式 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">学习模式</h3>
          <div className="space-y-3">
            <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="learningMode"
                value="topic"
                checked={learningMode === 'topic'}
                onChange={() => setLearningMode('topic')}
                className="mt-1 mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">主题模式</p>
                <p className="text-sm text-gray-600">
                  按词汇表和难度排序学习，适合系统化学习
                </p>
              </div>
            </label>
            <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="learningMode"
                value="mixed"
                checked={learningMode === 'mixed'}
                onChange={() => setLearningMode('mixed')}
                className="mt-1 mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">混合模式</p>
                <p className="text-sm text-gray-600">
                  按距离值图遍历，制造对比学习，适合加深理解
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* 每日目标 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">每日目标</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-2xl font-bold text-gray-900 w-16 text-right">
              {dailyGoal}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            每天学习 {dailyGoal} 个新概念
          </p>
        </div>

        {/* 词汇来源 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">词汇来源</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedSources.includes('oxford_3000')}
                onChange={() => toggleSource('oxford_3000')}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Oxford 3000</p>
                <p className="text-sm text-gray-600">3000个核心英语词汇 (A1-B2)</p>
              </div>
            </label>
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedSources.includes('awl')}
                onChange={() => toggleSource('awl')}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Academic Word List</p>
                <p className="text-sm text-gray-600">570个学术词汇</p>
              </div>
            </label>
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedSources.includes('gre_357')}
                onChange={() => toggleSource('gre_357')}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">GRE 357</p>
                <p className="text-sm text-gray-600">357个GRE高频词汇</p>
              </div>
            </label>
          </div>
        </div>

        {/* 显示选项 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">显示选项</h3>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showChinese}
              onChange={(e) => setShowChinese(e.target.checked)}
              className="mr-3"
            />
            <div>
              <p className="font-medium text-gray-900">默认显示中文</p>
              <p className="text-sm text-gray-600">
                开启后，学习时默认显示中文对应词（可在学习界面切换）
              </p>
            </div>
          </label>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            保存设置
          </button>
        </div>

        {/* 关于系统 */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg shadow-sm p-6 border border-primary-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">关于系统</h3>
          <p className="text-gray-700 mb-2">
            <strong>语言学习系统 v1.0</strong>
          </p>
          <p className="text-sm text-gray-600">
            这是一个基于文化理解的语言学习平台，使用三维评分系统（含义、视觉、读音）
            量化跨语言学习的认知成本。
          </p>
        </div>
      </div>
    </div>
  );
}
