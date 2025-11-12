# AI词汇转换指南

## 评分系统规则（必读）

### 三维评分体系

#### 1. 含义距离 (Meaning Distance) - 权重40%

评分标准 (0-1范围):
- **0.0-0.2**: 完全一对一对应
  - 例：table → 桌子, chair → 椅子
  - 物理对象，日常用品

- **0.2-0.4**: 基本对应但有细微差异
  - 例：happy → 快乐/幸福, culture → 文化
  - 抽象概念但对应清晰

- **0.4-0.6**: 部分对应，有文化差异
  - 例：concept → 概念, approach → 方法
  - 学术词汇，需要理解语境

- **0.6-0.8**: 显著文化差异
  - 例：respect → 尊重/尊敬/敬畏
  - 情感词汇，价值判断词

- **0.8-1.0**: 几乎无法直接对应（模糊概念）
  - 例：fate/destiny/serendipity → 命运/宿命/缘分
  - 需要整个词组来表达

#### 2. 视觉距离 (Visual Distance) - 权重30%

公式: `visualDistance = 1 - exp(-|中文笔画数 - 英文字母数| / 10)`

简化计算：
- 估算中文笔画数 ≈ 汉字数 × 12
- 计算与英文字母数的差异
- 差异越大，视觉距离越高

示例：
- table (5字母) vs 桌子 (18笔画) = 0.73
- happy (5字母) vs 快乐 (20笔画) = 0.78
- data (4字母) vs 数据 (16笔画) = 0.70

#### 3. 读音距离 (Pronunciation Distance) - 权重30%

评分标准：
- **0.7-0.8**: 短词（≤5字母）
  - 相对容易记忆发音

- **0.8-0.9**: 中等长度（6-10字母）
  - 多音节，需要练习

- **0.9-1.0**: 长词（>10字母）
  - 复杂发音，难以掌握

#### 综合距离计算

```
总距离 = 0.40 × 含义距离 + 0.30 × 视觉距离 + 0.30 × 读音距离
```

难度级别：
- **简单** (< 0.4): 易学易记
- **中等** (0.4 - 0.7): 需要练习
- **困难** (> 0.7): 需要深入理解

## AI转换任务说明

### 输入格式

提供给你的词汇列表格式：
```
单词1
单词2
单词3
...
```

或带定义：
```
单词1 | 词性 | 英文定义
单词2 | 词性 | 英文定义
```

### 输出格式（JSON）

对于每个单词，输出以下JSON结构：

```json
{
  "english": "单词",
  "partOfSpeech": "词性",
  "chinese": ["中文1", "中文2", "中文3"],
  "englishDefinition": "英文定义（用简单英文解释）",
  "exampleSentence": "例句",
  "meaningDistance": 0.15,
  "isFuzzy": false,
  "notes": "任何特殊说明"
}
```

### 重要规则

1. **中文对应词**：
   - 提供1-3个最常用的中文对应词
   - 按使用频率排序
   - 如果是多义词，选择最主要的含义

2. **含义距离评分**：
   - 必须根据上述标准仔细评估
   - 考虑文化差异
   - 标注是否为模糊概念

3. **英文定义**：
   - 使用简单英文（A1-A2级别词汇）
   - 一句话说明核心意思
   - 避免使用复杂的词汇

4. **模糊概念识别**：
   - 如果单词在中英文化中意义差异很大，标记 `isFuzzy: true`
   - 提供文化分析说明

### 示例转换

#### 输入：
```
table
culture
fate
```

#### 输出：
```json
[
  {
    "english": "table",
    "partOfSpeech": "n.",
    "chinese": ["桌子", "表格"],
    "englishDefinition": "A piece of furniture with a flat top used for eating or working",
    "exampleSentence": "We sat at the table for dinner",
    "meaningDistance": 0.10,
    "isFuzzy": false,
    "notes": "清晰的物理对象，一对一对应"
  },
  {
    "english": "culture",
    "partOfSpeech": "n.",
    "chinese": ["文化"],
    "englishDefinition": "The customs, arts, and achievements of a particular society",
    "englishDefinition": "We should learn about different cultures",
    "meaningDistance": 0.20,
    "isFuzzy": false,
    "notes": "抽象概念但对应清晰"
  },
  {
    "english": "fate",
    "partOfSpeech": "n.",
    "chinese": ["命运", "宿命", "天命"],
    "englishDefinition": "Events beyond a person's control, seen as predetermined",
    "exampleSentence": "They believed it was fate that brought them together",
    "meaningDistance": 0.70,
    "isFuzzy": true,
    "notes": "模糊概念，与destiny, fortune等形成语义空间，中英文化差异大"
  }
]
```

## 批量处理流程

### Step 1: 接收词汇列表
从PDF或文本中提取的单词列表

### Step 2: 对每个单词执行
1. 确定最常用的1-3个中文对应词
2. 评估含义距离（参考标准）
3. 编写简单的英文定义
4. 创建例句
5. 标记是否为模糊概念

### Step 3: 输出JSON数组
所有处理好的单词组成一个JSON数组

### Step 4: 系统自动计算
- 视觉距离（基于笔画数）
- 读音距离（基于单词长度）
- 综合距离分数

## 特殊词汇类型

### 1. 情感词汇
- 通常含义距离较高（0.4-0.7）
- 中英文情感表达方式不同
- 例：sad, happy, angry, proud

### 2. 价值判断词
- 文化差异显著（0.5-0.8）
- 正负面含义可能不同
- 例：frugal/stingy, proud/arrogant

### 3. 抽象概念
- 需要仔细评估（0.3-0.7）
- 依赖语境理解
- 例：freedom, justice, honor

### 4. 学术词汇
- 相对标准（0.2-0.5）
- 多为国际通用概念
- 例：theory, data, analysis

## 质量检查清单

转换完成后检查：
- ✅ 所有单词都有1-3个中文对应词
- ✅ 含义距离评分合理（参考标准）
- ✅ 英文定义使用简单词汇
- ✅ 模糊概念已标记
- ✅ JSON格式正确

## 实际使用案例

### 案例1: Oxford 3000 基础词汇
大部分含义距离：0.1-0.3
特点：日常词汇，对应清晰

### 案例2: AWL学术词汇
大部分含义距离：0.2-0.4
特点：学术概念，相对标准

### 案例3: GRE高级词汇
大部分含义距离：0.3-0.6
特点：抽象概念，需要理解

### 案例4: 文化特定词汇
含义距离：0.6-0.9
特点：文化差异大，可能是模糊概念

## 开始转换

当收到词汇列表时：
1. 仔细阅读每个单词
2. 参考评分标准
3. 输出标准JSON格式
4. 标注特殊情况

准备好了吗？发送词汇列表即可开始！
