// 语言学习系统 - 词汇数据库
// 包含 Oxford 3000 精选词汇，附带三维文化距离评分

const vocabularyData = [
    // ===== A1 级别词汇 (基础) =====
    // 1-10: 日常物品
    {
        english: 'table',
        partOfSpeech: 'n.',
        chinese: ['桌子', '表格'],
        definition: 'A piece of furniture with a flat top used for eating or working',
        example: 'We sat at the table for dinner',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.28,
        pronunciationDistance: 0.80
    },
    {
        english: 'chair',
        partOfSpeech: 'n.',
        chinese: ['椅子'],
        definition: 'A seat for one person with a back and legs',
        example: 'Please sit on this chair',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.32,
        pronunciationDistance: 0.80
    },
    {
        english: 'book',
        partOfSpeech: 'n.',
        chinese: ['书', '书籍'],
        definition: 'A written work with pages that you read',
        example: 'I am reading an interesting book',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.18,
        pronunciationDistance: 0.75
    },
    {
        english: 'water',
        partOfSpeech: 'n.',
        chinese: ['水'],
        definition: 'A clear liquid with no taste or smell that falls as rain',
        example: 'Can I have a glass of water?',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.27,
        pronunciationDistance: 0.80
    },
    {
        english: 'door',
        partOfSpeech: 'n.',
        chinese: ['门'],
        definition: 'A flat surface that you open to go into a room or building',
        example: 'Please close the door',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'window',
        partOfSpeech: 'n.',
        chinese: ['窗户'],
        definition: 'An opening in a wall with glass that lets light in',
        example: 'Open the window to get fresh air',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'house',
        partOfSpeech: 'n.',
        chinese: ['房子', '住宅'],
        definition: 'A building where people live',
        example: 'They live in a big house',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.27,
        pronunciationDistance: 0.80
    },
    {
        english: 'car',
        partOfSpeech: 'n.',
        chinese: ['汽车', '车'],
        definition: 'A vehicle with four wheels that people drive',
        example: 'I drive my car to work',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'phone',
        partOfSpeech: 'n.',
        chinese: ['电话'],
        definition: 'A device used to talk to someone far away',
        example: 'My phone is ringing',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.27,
        pronunciationDistance: 0.80
    },
    {
        english: 'computer',
        partOfSpeech: 'n.',
        chinese: ['电脑', '计算机'],
        definition: 'An electronic machine that stores and processes data',
        example: 'I use a computer for work',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.42,
        pronunciationDistance: 0.90
    },

    // 11-20: 形容词和动词
    {
        english: 'happy',
        partOfSpeech: 'adj.',
        chinese: ['快乐的', '高兴的'],
        definition: 'Feeling or showing pleasure',
        example: 'I am very happy today',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.27,
        pronunciationDistance: 0.80
    },
    {
        english: 'sad',
        partOfSpeech: 'adj.',
        chinese: ['悲伤的', '难过的'],
        definition: 'Feeling unhappy',
        example: 'She feels sad today',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'good',
        partOfSpeech: 'adj.',
        chinese: ['好的', '良好的'],
        definition: 'Of high quality or satisfactory',
        example: 'This is a good book',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.18,
        pronunciationDistance: 0.75
    },
    {
        english: 'bad',
        partOfSpeech: 'adj.',
        chinese: ['坏的', '不好的'],
        definition: 'Of poor quality or not satisfactory',
        example: 'That is bad weather',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'big',
        partOfSpeech: 'adj.',
        chinese: ['大的'],
        definition: 'Large in size',
        example: 'This is a big house',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'small',
        partOfSpeech: 'adj.',
        chinese: ['小的'],
        definition: 'Little in size',
        example: 'It is a small cat',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.27,
        pronunciationDistance: 0.80
    },
    {
        english: 'eat',
        partOfSpeech: 'v.',
        chinese: ['吃'],
        definition: 'To put food in your mouth and swallow it',
        example: 'I eat breakfast at 7am',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },
    {
        english: 'drink',
        partOfSpeech: 'v.',
        chinese: ['喝'],
        definition: 'To take liquid into your mouth and swallow it',
        example: 'I drink coffee every morning',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.30,
        pronunciationDistance: 0.85
    },
    {
        english: 'walk',
        partOfSpeech: 'v.',
        chinese: ['走', '步行'],
        definition: 'To move by putting one foot in front of the other',
        example: 'I walk to school every day',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.18,
        pronunciationDistance: 0.80
    },
    {
        english: 'run',
        partOfSpeech: 'v.',
        chinese: ['跑', '运行'],
        definition: 'To move fast on foot',
        example: 'I run every morning',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.14,
        pronunciationDistance: 0.75
    },

    // 21-30: 家庭和朋友
    {
        english: 'mother',
        partOfSpeech: 'n.',
        chinese: ['母亲', '妈妈'],
        definition: 'A female parent',
        example: 'My mother is a teacher',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'father',
        partOfSpeech: 'n.',
        chinese: ['父亲', '爸爸'],
        definition: 'A male parent',
        example: 'My father works in an office',
        level: 'A1',
        meaningDistance: 0.10,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'friend',
        partOfSpeech: 'n.',
        chinese: ['朋友'],
        definition: 'A person you like and know well',
        example: 'She is my best friend',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'school',
        partOfSpeech: 'n.',
        chinese: ['学校'],
        definition: 'A place where children go to learn',
        example: 'I go to school every day',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'teacher',
        partOfSpeech: 'n.',
        chinese: ['老师', '教师'],
        definition: 'A person who teaches in a school',
        example: 'My teacher is very kind',
        level: 'A1',
        meaningDistance: 0.15,
        visualDistance: 0.38,
        pronunciationDistance: 0.85
    },

    // ===== A2 级别词汇 (进阶) =====
    {
        english: 'understand',
        partOfSpeech: 'v.',
        chinese: ['理解', '明白'],
        definition: 'To know the meaning of something',
        example: 'I understand what you mean',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.45,
        pronunciationDistance: 0.95
    },
    {
        english: 'remember',
        partOfSpeech: 'v.',
        chinese: ['记得', '记住'],
        definition: 'To keep something in your mind',
        example: 'I remember her name',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.42,
        pronunciationDistance: 0.90
    },
    {
        english: 'forget',
        partOfSpeech: 'v.',
        chinese: ['忘记'],
        definition: 'To not remember something',
        example: 'I forgot my keys',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.35,
        pronunciationDistance: 0.85
    },
    {
        english: 'believe',
        partOfSpeech: 'v.',
        chinese: ['相信', '认为'],
        definition: 'To think something is true',
        example: 'I believe you',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.40,
        pronunciationDistance: 0.85
    },
    {
        english: 'interesting',
        partOfSpeech: 'adj.',
        chinese: ['有趣的', '有意思的'],
        definition: 'Causing attention or curiosity',
        example: 'This book is interesting',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.48,
        pronunciationDistance: 0.95
    },
    {
        english: 'boring',
        partOfSpeech: 'adj.',
        chinese: ['无聊的', '乏味的'],
        definition: 'Not interesting',
        example: 'The movie was boring',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.38,
        pronunciationDistance: 0.85
    },
    {
        english: 'important',
        partOfSpeech: 'adj.',
        chinese: ['重要的'],
        definition: 'Having great value or meaning',
        example: 'This is very important',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.45,
        pronunciationDistance: 0.95
    },
    {
        english: 'different',
        partOfSpeech: 'adj.',
        chinese: ['不同的'],
        definition: 'Not the same',
        example: 'We are different',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.45,
        pronunciationDistance: 0.90
    },
    {
        english: 'experience',
        partOfSpeech: 'n.',
        chinese: ['经验', '经历'],
        definition: 'Knowledge or skill from doing something',
        example: 'I have no experience',
        level: 'A2',
        meaningDistance: 0.25,
        visualDistance: 0.48,
        pronunciationDistance: 0.95
    },
    {
        english: 'problem',
        partOfSpeech: 'n.',
        chinese: ['问题', '困难'],
        definition: 'A difficulty that needs to be solved',
        example: 'We have a problem',
        level: 'A2',
        meaningDistance: 0.20,
        visualDistance: 0.40,
        pronunciationDistance: 0.85
    }
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { vocabularyData };
}
