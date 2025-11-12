// 增强词汇数据 - 包含清晰概念和模糊概念
const enhancedVocabularyData = [
    // ========== A1级别 - 清晰概念 (物理对象，含义距离低) ==========
    {
        english: 'table',
        partOfSpeech: 'n.',
        chinese: ['桌子', '表格'],
        definition: 'A piece of furniture with a flat top used for eating or working',
        example: 'We sat at the table for dinner',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.73,
        pronunciationDistance: 0.80,
        culturalNote: '物理对象，一对一对应，无文化差异'
    },
    {
        english: 'chair',
        partOfSpeech: 'n.',
        chinese: ['椅子'],
        definition: 'A piece of furniture for one person to sit on',
        example: 'Please sit on this chair',
        level: 'A1',
        meaningDistance: 0.08,
        visualDistance: 0.66,
        pronunciationDistance: 0.80,
        culturalNote: '日常用品，概念完全对应'
    },
    {
        english: 'water',
        partOfSpeech: 'n.',
        chinese: ['水'],
        definition: 'A clear liquid that you drink when you are thirsty',
        example: 'I drink water every day',
        level: 'A1',
        meaningDistance: 0.05,
        visualDistance: 0.39,
        pronunciationDistance: 0.80,
        culturalNote: '自然元素，无文化差异'
    },
    {
        english: 'book',
        partOfSpeech: 'n.',
        chinese: ['书', '书籍'],
        definition: 'A set of printed pages that you can read',
        example: 'I am reading a book',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.51,
        pronunciationDistance: 0.75,
        culturalNote: '物理对象，概念清晰'
    },
    {
        english: 'home',
        partOfSpeech: 'n.',
        chinese: ['家', '家庭', '住所'],
        definition: 'The place where you live',
        example: 'I go home after work',
        level: 'A1',
        meaningDistance: 0.25,
        visualDistance: 0.51,
        pronunciationDistance: 0.75,
        culturalNote: '开始出现文化差异：中文"家"包含家庭关系和情感归属',
        multiPerspectives: [
            {
                angle: '物理空间视角',
                explanation: '"Home"作为居住的地方，与中文"住所"对应，强调物理空间'
            },
            {
                angle: '情感归属视角',
                explanation: '在东方文化中，"家"不仅是地方，更是情感归属、家族传承的象征'
            },
            {
                angle: '西方个人主义视角',
                explanation: '西方"home"更多是个人私密空间，强调个人独立性'
            }
        ]
    },

    // ========== A1-A2级别 - 基础情感词汇 (含义距离开始增加) ==========
    {
        english: 'happy',
        partOfSpeech: 'adj.',
        chinese: ['快乐的', '幸福的', '高兴的'],
        definition: 'Feeling or showing pleasure or joy',
        example: 'I am happy today',
        level: 'A1',
        meaningDistance: 0.35,
        visualDistance: 0.78,
        pronunciationDistance: 0.80,
        culturalNote: '情感词汇：中文区分"快乐"（短暂）和"幸福"（持久），英文happy涵盖两者',
        multiPerspectives: [
            {
                angle: '时间维度视角',
                explanation: '英文happy可以是短暂的（I\'m happy now）也可以是长期的（I\'m a happy person）。中文"快乐"偏向短暂，"幸福"偏向持久'
            },
            {
                angle: '表达方式视角',
                explanation: '西方文化鼓励外显表达快乐，东方文化相对内敛，这影响了happy的使用频率和场景'
            },
            {
                angle: '哲学层面视角',
                explanation: '西方追求个人幸福(happiness)，东方更注重家庭和集体的和谐与幸福'
            }
        ]
    },
    {
        english: 'sad',
        partOfSpeech: 'adj.',
        chinese: ['悲伤的', '难过的'],
        definition: 'Feeling unhappy or showing sorrow',
        example: 'She felt sad when her friend left',
        level: 'A1',
        meaningDistance: 0.30,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '情感表达的文化差异：中文情感表达更内敛'
    },
    {
        english: 'love',
        partOfSpeech: 'v./n.',
        chinese: ['爱', '喜爱', '热爱'],
        definition: 'To have a very strong feeling of affection for someone or something',
        example: 'I love my family',
        level: 'A1',
        meaningDistance: 0.45,
        visualDistance: 0.51,
        pronunciationDistance: 0.75,
        culturalNote: '文化差异显著：英文love使用范围广（I love pizza），中文"爱"更慎重',
        multiPerspectives: [
            {
                angle: '使用范围视角',
                explanation: '英文love可用于人（I love you）、物（I love coffee）、活动（I love running）。中文"爱"更多用于人和重要事物，日常喜欢用"喜欢"'
            },
            {
                angle: '表达文化视角',
                explanation: '西方文化更直接频繁地表达love，东方文化表达爱意更含蓄，更多通过行动而非语言'
            },
            {
                angle: '情感强度视角',
                explanation: '中文"爱"、"喜爱"、"热爱"有明确强度区分，英文love的强度更依赖语境和语调'
            }
        ]
    },

    // ========== A2级别 - 抽象概念开始出现 ==========
    {
        english: 'culture',
        partOfSpeech: 'n.',
        chinese: ['文化'],
        definition: 'The customs, arts, and achievements of a particular society',
        example: 'We should learn about different cultures',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.81,
        pronunciationDistance: 0.85,
        culturalNote: '抽象概念但国际通用，文化差异较小'
    },
    {
        english: 'understand',
        partOfSpeech: 'v.',
        chinese: ['理解', '明白', '懂得'],
        definition: 'To know the meaning of something',
        example: 'I understand what you mean',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.86,
        pronunciationDistance: 0.90,
        culturalNote: '认知动词，中文区分"理解"（深层）和"明白"（表层）'
    },
    {
        english: 'believe',
        partOfSpeech: 'v.',
        chinese: ['相信', '认为'],
        definition: 'To think that something is true or that someone is honest',
        example: 'I believe you are right',
        level: 'A2',
        meaningDistance: 0.40,
        visualDistance: 0.84,
        pronunciationDistance: 0.85,
        culturalNote: '信念词汇：涉及信任和判断，文化背景影响理解'
    },
    {
        english: 'respect',
        partOfSpeech: 'v./n.',
        chinese: ['尊重', '尊敬', '敬意'],
        definition: 'To have a good opinion of someone and treat them well',
        example: 'We should respect our teachers',
        level: 'A2',
        meaningDistance: 0.50,
        visualDistance: 0.82,
        pronunciationDistance: 0.85,
        culturalNote: '重要文化差异：东方文化中"尊重"包含等级和礼仪，西方更强调平等尊重'
    },

    // ========== B1级别 - 模糊概念开始出现 ==========
    {
        english: 'proud',
        partOfSpeech: 'adj.',
        chinese: ['自豪的', '骄傲的'],
        definition: 'Feeling pleased about something you have done or achieved',
        example: 'I am proud of my work',
        level: 'B1',
        meaningDistance: 0.60,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '价值判断差异：中文"骄傲"可褒可贬，"自豪"为褒义，英文proud偏中性'
    },
    {
        english: 'privacy',
        partOfSpeech: 'n.',
        chinese: ['隐私', '私密'],
        definition: 'The right to keep your personal information and life private',
        example: 'Everyone needs privacy',
        level: 'B1',
        meaningDistance: 0.55,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '文化概念差异：西方强调个人隐私权，东方传统文化隐私边界不同'
    },
    {
        english: 'freedom',
        partOfSpeech: 'n.',
        chinese: ['自由', '自由权'],
        definition: 'The right to do or say what you want without control',
        example: 'Freedom is important for everyone',
        level: 'B1',
        meaningDistance: 0.58,
        visualDistance: 0.84,
        pronunciationDistance: 0.85,
        culturalNote: '哲学概念：个人主义vs集体主义背景下，自由的理解有文化差异'
    },
    {
        english: 'responsibility',
        partOfSpeech: 'n.',
        chinese: ['责任', '职责', '义务'],
        definition: 'A duty to deal with or take care of something',
        example: 'Parents have responsibility for their children',
        level: 'B1',
        meaningDistance: 0.52,
        visualDistance: 0.92,
        pronunciationDistance: 0.95,
        culturalNote: '文化价值观：东方文化更强调集体责任，西方更强调个人责任'
    },

    // ========== B1-B2级别 - 高度模糊概念组 ==========
    {
        english: 'fate',
        partOfSpeech: 'n.',
        chinese: ['命运', '宿命', '天命'],
        definition: 'Events that will happen and cannot be changed or controlled',
        example: 'They believed it was fate that brought them together',
        level: 'B2',
        meaningDistance: 0.70,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '模糊概念组：fate/destiny/fortune → 命运/宿命/天命/缘分，文化差异极大',
        isFuzzy: true,
        fuzzyGroup: 'fate-destiny-fortune'
    },
    {
        english: 'destiny',
        partOfSpeech: 'n.',
        chinese: ['命运', '天命', '定数'],
        definition: 'The things that will happen to a person in the future',
        example: 'She felt it was her destiny to become a teacher',
        level: 'B2',
        meaningDistance: 0.72,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '与fate语义重叠，中文需要整个词云理解',
        isFuzzy: true,
        fuzzyGroup: 'fate-destiny-fortune'
    },
    {
        english: 'fortune',
        partOfSpeech: 'n.',
        chinese: ['运气', '财富', '命运'],
        definition: 'Luck or the good and bad things that happen to you',
        example: 'He had the good fortune to win the prize',
        level: 'B2',
        meaningDistance: 0.68,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '多重含义：运气、财富、命运，文化理解复杂',
        isFuzzy: true,
        fuzzyGroup: 'fate-destiny-fortune'
    },

    // ========== 价值判断词组 - 模糊概念 ==========
    {
        english: 'frugal',
        partOfSpeech: 'adj.',
        chinese: ['节俭的', '节约的'],
        definition: 'Careful about spending money and not wasting things',
        example: 'She is frugal and saves money every month',
        level: 'B2',
        meaningDistance: 0.48,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '价值判断：褒义词，与stingy（贬义）对比理解',
        isFuzzy: true,
        fuzzyGroup: 'frugal-stingy-thrifty'
    },
    {
        english: 'confident',
        partOfSpeech: 'adj.',
        chinese: ['自信的', '有信心的'],
        definition: 'Feeling sure about your abilities or that you can do something',
        example: 'She is confident in her skills',
        level: 'B1',
        meaningDistance: 0.45,
        visualDistance: 0.87,
        pronunciationDistance: 0.90,
        culturalNote: '价值判断：与arrogant（傲慢）边界在不同文化中不同'
    },
    {
        english: 'ambitious',
        partOfSpeech: 'adj.',
        chinese: ['有雄心的', '有抱负的', '野心勃勃的'],
        definition: 'Having a strong desire to be successful or powerful',
        example: 'He is ambitious and wants to start his own company',
        level: 'B2',
        meaningDistance: 0.55,
        visualDistance: 0.88,
        pronunciationDistance: 0.90,
        culturalNote: '文化价值观：西方多为褒义，中文"野心"可能带贬义'
    },

    // ========== 其他常用词汇 ==========
    {
        english: 'friend',
        partOfSpeech: 'n.',
        chinese: ['朋友', '好友'],
        definition: 'A person you know well and like',
        example: 'She is my best friend',
        level: 'A1',
        meaningDistance: 0.30,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '关系定义：中文朋友关系层次更细分（熟人、朋友、好友、挚友）'
    },
    {
        english: 'family',
        partOfSpeech: 'n.',
        chinese: ['家庭', '家人', '家族'],
        definition: 'A group of people who are related to each other',
        example: 'My family lives in Beijing',
        level: 'A1',
        meaningDistance: 0.35,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '文化核心概念：中文"家庭"范围更广，包括扩展家庭'
    },
    {
        english: 'time',
        partOfSpeech: 'n.',
        chinese: ['时间', '时刻', '次数'],
        definition: 'The thing measured in minutes, hours, days, etc.',
        example: 'What time is it?',
        level: 'A1',
        meaningDistance: 0.20,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '抽象概念但理解接近，时间观念有文化差异'
    },
    {
        english: 'work',
        partOfSpeech: 'v./n.',
        chinese: ['工作', '劳动', '作品'],
        definition: 'To do a job or activity to earn money',
        example: 'I work in an office',
        level: 'A1',
        meaningDistance: 0.25,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '多义词，工作文化有东西方差异'
    },
    {
        english: 'study',
        partOfSpeech: 'v./n.',
        chinese: ['学习', '研究'],
        definition: 'To learn about a subject by reading and going to school',
        example: 'I study English every day',
        level: 'A1',
        meaningDistance: 0.20,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '教育文化：学习态度和方法有文化差异'
    },

    // ========== A2-B1 更多词汇 ==========
    {
        english: 'hope',
        partOfSpeech: 'v./n.',
        chinese: ['希望', '期望'],
        definition: 'To want something to happen and think it is possible',
        example: 'I hope to see you soon',
        level: 'A2',
        meaningDistance: 0.28,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '情感词汇，概念较为接近'
    },
    {
        english: 'dream',
        partOfSpeech: 'n./v.',
        chinese: ['梦', '梦想', '理想'],
        definition: 'Images and events in your mind while you sleep, or a hope for the future',
        example: 'My dream is to travel the world',
        level: 'A2',
        meaningDistance: 0.35,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '双重含义：睡眠之梦和人生理想，文化表达略有差异'
    },
    {
        english: 'success',
        partOfSpeech: 'n.',
        chinese: ['成功'],
        definition: 'The achievement of something you wanted to do',
        example: 'Hard work leads to success',
        level: 'A2',
        meaningDistance: 0.40,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '价值观词汇：成功的定义在不同文化中有差异'
    },
    {
        english: 'fail',
        partOfSpeech: 'v.',
        chinese: ['失败', '不及格'],
        definition: 'To not succeed in doing something',
        example: 'Do not be afraid to fail',
        level: 'A2',
        meaningDistance: 0.35,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '失败态度：东西方文化对失败的接受度不同'
    },
    {
        english: 'try',
        partOfSpeech: 'v.',
        chinese: ['尝试', '试图', '努力'],
        definition: 'To make an effort to do something',
        example: 'Please try your best',
        level: 'A1',
        meaningDistance: 0.22,
        visualDistance: 0.75,
        pronunciationDistance: 0.75,
        culturalNote: '行动词汇，文化差异较小'
    },

    // ========== B1-B2 深层概念 ==========
    {
        english: 'justice',
        partOfSpeech: 'n.',
        chinese: ['正义', '公正', '司法'],
        definition: 'Fair treatment according to what is morally right',
        example: 'Everyone deserves justice',
        level: 'B2',
        meaningDistance: 0.58,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '哲学概念：正义的定义在不同文化法律体系中有差异'
    },
    {
        english: 'honor',
        partOfSpeech: 'n.',
        chinese: ['荣誉', '尊严', '名誉'],
        definition: 'Great respect or a good reputation',
        example: 'It is an honor to meet you',
        level: 'B1',
        meaningDistance: 0.62,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '文化核心概念：东方荣誉文化（面子）vs西方个人荣誉'
    },
    {
        english: 'wisdom',
        partOfSpeech: 'n.',
        chinese: ['智慧', '睿智'],
        definition: 'The ability to use knowledge and experience to make good decisions',
        example: 'She is known for her wisdom',
        level: 'B2',
        meaningDistance: 0.48,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '哲学概念：智慧的理解在东西方哲学中有不同侧重'
    },
    {
        english: 'loyalty',
        partOfSpeech: 'n.',
        chinese: ['忠诚', '忠心'],
        definition: 'The quality of being faithful and supporting someone or something',
        example: 'Loyalty is important in friendship',
        level: 'B2',
        meaningDistance: 0.54,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '价值观概念：忠诚对象和程度在文化中有差异'
    },
    {
        english: 'gratitude',
        partOfSpeech: 'n.',
        chinese: ['感激', '感恩', '谢意'],
        definition: 'The feeling of being thankful',
        example: 'She expressed her gratitude for the help',
        level: 'B2',
        meaningDistance: 0.44,
        visualDistance: 0.88,
        pronunciationDistance: 0.90,
        culturalNote: '情感表达：感恩表达方式在文化中有差异'
    },

    // ========== 日常高频词汇补充 ==========
    {
        english: 'problem',
        partOfSpeech: 'n.',
        chinese: ['问题', '难题'],
        definition: 'A difficult situation or thing that needs attention',
        example: 'We need to solve this problem',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '问题解决方式有文化差异'
    },
    {
        english: 'question',
        partOfSpeech: 'n.',
        chinese: ['问题', '疑问'],
        definition: 'A sentence that asks for information',
        example: 'May I ask a question?',
        level: 'A1',
        meaningDistance: 0.20,
        visualDistance: 0.86,
        pronunciationDistance: 0.86,
        culturalNote: '中文"问题"同时表示problem和question'
    },
    {
        english: 'answer',
        partOfSpeech: 'n./v.',
        chinese: ['答案', '回答'],
        definition: 'A response to a question',
        example: 'Do you know the answer?',
        level: 'A1',
        meaningDistance: 0.18,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '概念清晰，文化差异小'
    },
    {
        english: 'experience',
        partOfSpeech: 'n.',
        chinese: ['经验', '经历', '体验'],
        definition: 'Knowledge or skill from doing or seeing things',
        example: 'She has a lot of experience in teaching',
        level: 'A2',
        meaningDistance: 0.38,
        visualDistance: 0.89,
        pronunciationDistance: 0.92,
        culturalNote: '中文区分"经验"（知识）和"经历"（事件）'
    },
    {
        english: 'knowledge',
        partOfSpeech: 'n.',
        chinese: ['知识', '学问'],
        definition: 'Information and understanding about a subject',
        example: 'Knowledge is power',
        level: 'A2',
        meaningDistance: 0.30,
        visualDistance: 0.87,
        pronunciationDistance: 0.88,
        culturalNote: '知识观：东方重经验智慧，西方重科学知识'
    },
    {
        english: 'learn',
        partOfSpeech: 'v.',
        chinese: ['学习', '学会'],
        definition: 'To get knowledge or skill by studying or practicing',
        example: 'I learn something new every day',
        level: 'A1',
        meaningDistance: 0.20,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '学习方法论有文化差异'
    },
    {
        english: 'teach',
        partOfSpeech: 'v.',
        chinese: ['教', '教导', '教授'],
        definition: 'To give someone knowledge or to help them learn',
        example: 'My mother teaches English',
        level: 'A1',
        meaningDistance: 0.22,
        visualDistance: 0.80,
        pronunciationDistance: 0.80,
        culturalNote: '师生关系文化差异大'
    },
    {
        english: 'important',
        partOfSpeech: 'adj.',
        chinese: ['重要的'],
        definition: 'Having great value or meaning',
        example: 'This is very important',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.88,
        pronunciationDistance: 0.90,
        culturalNote: '价值判断，相对接近'
    },
    {
        english: 'different',
        partOfSpeech: 'adj.',
        chinese: ['不同的', '差异的'],
        definition: 'Not the same as another',
        example: 'We have different opinions',
        level: 'A1',
        meaningDistance: 0.20,
        visualDistance: 0.88,
        pronunciationDistance: 0.90,
        culturalNote: '对"不同"的态度有文化差异'
    },
    {
        english: 'similar',
        partOfSpeech: 'adj.',
        chinese: ['相似的', '类似的'],
        definition: 'Almost the same but not exactly',
        example: 'Your idea is similar to mine',
        level: 'A2',
        meaningDistance: 0.22,
        visualDistance: 0.85,
        pronunciationDistance: 0.85,
        culturalNote: '概念清晰'
    },
    {
        english: 'change',
        partOfSpeech: 'v./n.',
        chinese: ['改变', '变化', '零钱'],
        definition: 'To become different or to make something different',
        example: 'People change over time',
        level: 'A1',
        meaningDistance: 0.28,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '对变化的态度：东方文化相对保守，西方更接受变化'
    },
    {
        english: 'tradition',
        partOfSpeech: 'n.',
        chinese: ['传统', '惯例'],
        definition: 'A belief or custom passed down through generations',
        example: 'It is our family tradition',
        level: 'B1',
        meaningDistance: 0.42,
        visualDistance: 0.88,
        pronunciationDistance: 0.90,
        culturalNote: '文化核心概念：传统的重要性在不同文化中差异大'
    },
    {
        english: 'modern',
        partOfSpeech: 'adj.',
        chinese: ['现代的', '新式的'],
        definition: 'Relating to the present time',
        example: 'We live in a modern world',
        level: 'A2',
        meaningDistance: 0.30,
        visualDistance: 0.82,
        pronunciationDistance: 0.82,
        culturalNote: '现代化进程的文化理解差异'
    }
];

// 模糊概念组定义
const fuzzyConceptGroups = {
    'fate-destiny-fortune': {
        name: '命运词云',
        englishWords: ['fate', 'destiny', 'fortune', 'luck'],
        chineseWords: ['命运', '宿命', '天命', '缘分', '运气', '福气'],
        culturalAnalysis: '这组词在中英文化中有显著差异。英文fate强调不可改变性，destiny强调目标性，fortune可指运气也可指财富。中文"命运"包含天命观，"宿命"更宿命论，"缘分"是东方特有的关系哲学。这种词云需要整体理解文化背景。',
        learningStrategy: '不要孤立学习，要理解整个语义空间和文化哲学背景'
    },
    'frugal-stingy-thrifty': {
        name: '节俭-吝啬词组',
        englishWords: ['frugal', 'stingy', 'thrifty', 'economical'],
        chineseWords: ['节俭', '节约', '吝啬', '小气', '抠门'],
        culturalAnalysis: '价值判断词组。Frugal和thrifty为褒义（聪明地省钱），stingy为贬义（不愿分享）。中文"节俭"为美德，"吝啬"为贬义。文化价值观不同导致这些词的使用场景和情感色彩有差异。',
        learningStrategy: '注意褒贬色彩，理解文化价值观背后的原因'
    }
};

// 计算综合距离分数
function calculateTotalDistance(word) {
    return 0.4 * word.meaningDistance +
           0.3 * word.visualDistance +
           0.3 * word.pronunciationDistance;
}

// 为每个词添加综合距离和难度
enhancedVocabularyData.forEach(word => {
    word.totalDistance = calculateTotalDistance(word);

    if (word.totalDistance < 0.40) {
        word.difficulty = 'easy';
        word.difficultyLabel = '简单';
    } else if (word.totalDistance < 0.60) {
        word.difficulty = 'medium';
        word.difficultyLabel = '中等';
    } else {
        word.difficulty = 'hard';
        word.difficultyLabel = '困难';
    }
});

console.log(`已加载 ${enhancedVocabularyData.length} 个词汇概念`);
console.log(`包含 ${enhancedVocabularyData.filter(w => w.isFuzzy).length} 个模糊概念`);
