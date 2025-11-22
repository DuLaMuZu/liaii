# 词汇数据处理指南

## 概述

项目根目录的 `待處理樣本` 文件夹包含三个PDF文件，需要被处理成JSON格式并集成到系统中。

## 待处理文件

1. **Academic-Word-List-AWL.pdf** - 570个学术词汇
2. **American_Oxford_3000.pdf** - 3000个核心英语词汇
3. **PrepScholar-357-GRE-words-list.pdf** - 357个GRE高频词汇

## 数据格式要求

### 清晰概念

```typescript
{
  id: string;              // 唯一ID，如 'clear-001'
  type: 'clear';
  english: string;         // 英文单词
  partOfSpeech: 'n.' | 'v.' | 'adj.' | 'adv.' | 'prep.' | 'conj.' | 'pron.';
  chinese: string[];       // 中文对应词数组
  englishDefinition: string;  // 英文定义
  exampleSentence?: string;   // 例句（可选）
  source: 'oxford_3000' | 'awl' | 'gre_357';
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  meaningDistance: number;     // 含义距离 (0-1)
  visualDistance: number;      // 视觉距离 (0-1)
  pronunciationDistance: number;  // 读音距离 (0-1)
  distanceScore: number;       // 综合距离 (0-1)
}
```

### 模糊概念组

```typescript
{
  id: string;              // 如 'fuzzy-001'
  type: 'fuzzy';
  fuzzyGroupId: string;    // 如 'MG-001'
  englishWords: string[];  // 英文词组
  chineseWords: string[];  // 中文词云
  culturalAnalysis: string;  // 文化距离分析
  wordPairs: Array<{
    english: string;
    partOfSpeech: string;
    chinese: string;
    englishDefinition: string;
    pairDistance: number;
  }>;
  source: 'oxford_3000' | 'awl' | 'gre_357';
  distanceScore: number;
  variance: number;
}
```

## 处理步骤

### 步骤1: PDF文本提取

使用PDF处理工具提取文本：

```bash
# 方法1: 使用pdftotext (Linux/Mac)
pdftotext Academic-Word-List-AWL.pdf awl.txt

# 方法2: 使用Python的pdfplumber
pip install pdfplumber
python extract_pdf.py
```

Python提取脚本示例：

```python
import pdfplumber
import json

def extract_vocabulary(pdf_path):
    words = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            # 根据具体PDF格式解析文本
            # ...
    return words

# 提取词汇
awl_words = extract_vocabulary('../待處理樣本/Academic-Word-List-AWL.pdf')
```

### 步骤2: 数据清洗和结构化

将提取的原始文本转换为结构化数据：

```python
import json

def structure_vocabulary(raw_words, source):
    structured = []
    for i, word_data in enumerate(raw_words):
        concept = {
            'id': f'clear-{source}-{i+1:04d}',
            'type': 'clear',
            'english': word_data['word'],
            'partOfSpeech': word_data.get('pos', 'n.'),
            'chinese': word_data.get('chinese', ['待翻译']),
            'englishDefinition': word_data.get('definition', ''),
            'source': source,
            # 使用评分系统计算距离
        }
        structured.append(concept)
    return structured
```

### 步骤3: 评分计算

使用现有的评分系统：

```typescript
import { scoreCleanConcept } from './lib/scoring/distance';

const processedConcepts = rawConcepts.map(concept => ({
  ...concept,
  ...scoreCleanConcept(
    concept.english,
    concept.chinese[0],  // 使用第一个中文对应词
    undefined,  // 让系统自动计算含义距离
    undefined   // 让系统估算笔画数
  )
}));
```

### 步骤4: 添加中文翻译

对于每个英文单词，需要添加准确的中文对应词：

1. 使用在线词典API（如有道、金山词霸）
2. 手动审核和调整
3. 识别哪些词汇属于模糊概念

### 步骤5: 识别模糊概念组

分析词汇表，找出文化差异大的词汇组：

- 情感相关：快乐/幸福、悲伤/忧郁
- 价值判断：骄傲/自豪、节俭/吝啬
- 抽象概念：命运/宿命、尊重/敬畏

### 步骤6: 集成到系统

将处理好的数据添加到 `src/data/` 目录：

```typescript
// src/data/oxfordVocabulary.ts
import type { Concept } from '../types';

export const oxford3000Concepts: Concept[] = [
  // ... 处理好的数据
];

// src/data/allVocabulary.ts
import { oxford3000Concepts } from './oxfordVocabulary';
import { awlConcepts } from './awlVocabulary';
import { greConcepts } from './greVocabulary';
import { allSampleConcepts } from './sampleVocabulary';

export const allConcepts: Concept[] = [
  ...allSampleConcepts,
  ...oxford3000Concepts,
  ...awlConcepts,
  ...greConcepts,
];
```

### 步骤7: 更新数据库初始化

修改 `App.tsx` 以加载所有词汇：

```typescript
import { allConcepts } from './data/allVocabulary';

// 在初始化时
const conceptCount = await db.concepts.count();
if (conceptCount === 0) {
  await db.concepts.bulkAdd(allConcepts);
}
```

## 数据质量检查

处理完成后，检查以下几点：

1. ✅ 所有必填字段都已填写
2. ✅ ID唯一且符合命名规范
3. ✅ 中文翻译准确
4. ✅ 评分值在合理范围内 (0-1)
5. ✅ 每个source标记正确
6. ✅ 词性标注准确
7. ✅ 英文定义清晰

## 自动化脚本

可以创建一个半自动化的处理脚本：

```bash
# scripts/process_vocabulary.sh
#!/bin/bash

echo "处理 Oxford 3000..."
python scripts/extract_oxford.py

echo "处理 AWL..."
python scripts/extract_awl.py

echo "处理 GRE 357..."
python scripts/extract_gre.py

echo "合并数据..."
python scripts/merge_vocabulary.py

echo "验证数据..."
npm run test:vocabulary

echo "完成!"
```

## 注意事项

1. **版权问题**：确保词汇表的使用符合版权要求
2. **数据准确性**：中文翻译需要人工审核
3. **文化敏感性**：注意文化差异的准确描述
4. **性能考虑**：大量词汇可能影响初始加载速度，考虑分批加载

## 当前状态

- ✅ 示例词汇数据已创建（27个清晰概念，5个模糊概念组）
- ⬜ PDF文件待处理
- ⬜ 自动化处理脚本待开发
- ⬜ 中文翻译待补充

## 参考资源

- [Dexie.js文档](https://dexie.org/)
- [pdfplumber文档](https://github.com/jsvine/pdfplumber)
- [TypeScript类型定义](./src/types/index.ts)
- [评分系统](./src/lib/scoring/distance.ts)
