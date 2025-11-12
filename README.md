# 语言学习系统 - 完整项目文档包

## 📦 文档包内容

这个包包含构建"语言学习系统"所需的所有信息、规格和数据。

### 主要文档

1. **COMPLETE_TECHNICAL_DOCUMENTATION.md** (主文档)
   - 完整的技术规格
   - 系统架构设计
   - 数据结构定义
   - 算法详细说明
   - UI/UX规范
   - 实现建议

2. **vocabulary_sample.md** (词汇样本)
   - 词汇表格式示例
   - 清晰概念示例
   - 模糊词组示例
   - 评分数据示例

3. **原始词汇表数据** (PDFs)
   - Academic-Word-List-AWL.pdf (570个学术词汇)
   - American_Oxford_3000.pdf (3000个基础-中级词汇)
   - PrepScholar-357-GRE-words-list.pdf (357个高级词汇)

---

## 🎯 项目概述

### 核心理念

**这不是一个翻译工具，而是文化理解工具。**

系统通过三维评分（含义、视觉、读音）量化"从中文概念转换到英文概念"的认知成本，并以此为基础构建学习序列。

### 关键特点

1. **去母语化学习**
   - 用英文解释英文
   - 中文仅作辅助

2. **文化距离评分**
   - 含义距离：概念在两种文化中的对应程度
   - 视觉距离：字形记忆负担差异
   - 读音距离：音素和韵律差异

3. **模糊概念处理**
   - 承认某些概念在两种语言中没有清晰对应
   - 呈现完整的语义空间
   - 例：{fate/destiny/serendipity} ↔ {命运/宿命/缘分}

4. **对比式学习**
   - 距离值相近的概念连续呈现
   - 制造对比以加深理解

5. **自适应系统**
   - 根据用户反馈调整难度
   - 动态英文解释生成

---

## 🏗️ 系统架构概览

```
用户界面 (React)
    ↓
应用逻辑 (TypeScript)
    ├─ 评分系统
    ├─ 序列生成器
    ├─ 反馈处理
    └─ 水平估测
    ↓
数据存储 (IndexedDB)
    ├─ 词汇库
    ├─ 评分数据
    └─ 用户进度
```

---

## 📊 数据结构核心

### 概念 (Concept)

系统的基本学习单位，分两类：

**清晰概念**：
- table ↔ 桌子（一对一）
- 距离值：0.62

**模糊概念**：
- {fate/destiny/serendipity} ↔ {命运/宿命/缘分}（多对多）
- 距离值：0.62（平均）

### 评分公式

```
总距离 = 0.40 × 含义距离 + 0.30 × 视觉距离 + 0.30 × 读音距离
```

### 学习模式

**主题模式**：
- 选择特定领域（日常/学术/商务）
- 按难度排序学习

**混合模式**：
- 打散所有词汇表
- 按距离值图遍历
- 制造对比学习

---

## 🛠️ 技术栈建议

### 必须
- **React 18+** (前端框架)
- **TypeScript** (类型安全)
- **IndexedDB** (数据存储，使用Dexie.js封装)
- **Tailwind CSS** (样式)

### 可选
- **Zustand** (状态管理，轻量)
- **Claude API** (动态英文解释生成，Phase 2)
- **Natural/Compromise** (NLP工具，Phase 3)

---

## 📈 开发路线图

### Phase 1: MVP (2-3周)
- ✅ 基础UI框架
- ✅ 清晰概念学习流程
- ✅ 主题模式
- ✅ 简化评分系统（预标注数据）
- ✅ 本地数据存储

### Phase 2: 核心功能 (3-4周)
- ⬜ 模糊词组交互
- ⬜ 混合模式图遍历
- ⬜ 错误词复习
- ⬜ 自适应水平系统
- ⬜ 改进评分算法

### Phase 3: 优化扩展 (持续)
- ⬜ API英文解释生成
- ⬜ 高级统计
- ⬜ 番茄钟
- ⬜ 数据导入导出
- ⬜ 移动端适配

---

## 📁 建议项目结构

```
/language-learning-system
  /public
    /data
      oxford_3000_a1a2.json
      oxford_3000_b1b2.json
      awl.json
      gre357.json
      fuzzy_groups.json
      meaning_distance_map.json
      chinese_stroke_data.json
      
  /src
    /components
      /layout
      /settings
      /learning
      /stats
      /vocab
      
    /lib
      /scoring        # 评分引擎
      /sequencing     # 序列生成
      /data           # 数据管理
      
    /stores           # 状态管理
    /types            # TypeScript类型
    /hooks            # React hooks
    
    App.tsx
    main.tsx
```

---

## 🎓 核心算法说明

### 1. 视觉距离计算

```javascript
visualDistance = 1 - exp(-|中文笔画数 - 英文字母数| / 10)
```

示例：
- 桌子 (18笔画) ↔ table (5字母) → 距离 0.73

### 2. 混合模式图遍历

```
1. 按难度分组（低30%、中50%、高20%）
2. 从各组采样
3. 构建相似度图（距离值相近的概念连边）
4. 最近邻优先遍历
```

### 3. 错误词复习

```
用户评分"壞" → 加入错误pool
连续评分"好"3次 → 移出错误pool
每5个正常词插入1个错误词
```

---

## 🧪 测试建议

### 单元测试
- 评分系统各维度计算
- 序列生成算法
- 数据存储操作

### 集成测试
- 完整学习流程
- 用户反馈处理
- 数据持久化

### 用户测试
- 招募5-10个中文母语英语学习者
- 使用系统1-2周
- 收集反馈迭代

---

## 📝 重要的模糊词组

系统预定义15个核心模糊词组：

1. **命运/机缘** (fate, destiny, serendipity...)
2. **尊重/敬畏** (respect, reverence, venerate...)
3. **诚实/坦率** (honest, candid, frank...)
4. **骄傲/自信** (pride, arrogance, confidence...)
5. **节俭/吝啬** (frugal, thrifty, stingy...)
6. **勇敢/鲁莽** (brave, bold, reckless...)
7. **谦虚/谦卑** (humble, modest, meek...)
8. **快乐/幸福** (happy, joyful, blissful...)
9. **悲伤/哀愁** (sad, sorrowful, melancholy...)
10. **愤怒/生气** (angry, furious, enraged...)
11. **恐惧/害怕** (fear, dread, terror...)
12. **美丽/优雅** (beautiful, elegant, graceful...)
13. **聪明/智慧** (intelligent, smart, wise...)
14. **愚蠢/傻** (stupid, foolish, dumb...)
15. **强壮/健康** (strong, robust, vigorous...)

详细定义见主文档。

---

## 🚀 快速开始指南（给开发者）

### 步骤1：阅读主文档
完整阅读 `COMPLETE_TECHNICAL_DOCUMENTATION.md`

重点章节：
- 第3章：系统架构
- 第4章：数据结构定义
- 第5章：评分系统详细规则
- 第6章：学习模式与算法

### 步骤2：处理词汇数据
1. 从PDF提取词汇
2. 转换为JSON格式
3. 添加中文对应词
4. 生成评分数据

### 步骤3：搭建项目
```bash
npm create vite@latest language-learning-system -- --template react-ts
cd language-learning-system
npm install
npm install dexie tailwindcss
# ... 其他依赖
```

### 步骤4：实现核心模块
按优先级顺序：
1. 数据结构和存储
2. 评分系统（简化版）
3. 主题模式序列生成
4. 基础UI
5. 学习流程

### 步骤5：测试与迭代
- 单元测试核心算法
- 自己使用系统学习
- 调整参数和体验

---

## 📞 联系与支持

这是一个个人项目的完整规格文档。

如有问题或需要澄清，请参考主文档的详细说明。

---

## 📜 许可

项目文档和设计由原作者创建。
实现代码由开发团队创建。

---

**祝构建顺利！**

记住核心理念：**这不是背单词工具，是文化理解工具。**
