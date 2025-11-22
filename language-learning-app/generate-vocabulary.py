#!/usr/bin/env python3
"""
Generate complete vocabulary data for all 3927 words
Oxford 3000 + AWL + GRE 357
"""

import json
import re

# Oxford 3000 Core Words - A1 Level (continuing from existing 250)
# Starting from word 251
oxford_3000_words = [
    # A1 Level - Basic everyday words (continuing)
    ("ability", "n.", ["能力", "本领"], "The power or skill to do something", "She has the ability to learn quickly", "A1", 0.20, 15),
    ("able", "adj.", ["能够的", "有能力的"], "Having the power, skill, or means to do something", "Are you able to swim?", "A1", 0.18, 12),
    ("about", "prep./adv.", ["关于", "大约"], "On the subject of; approximately", "Tell me about your day", "A1", 0.15, 10),
    ("above", "prep./adv.", ["在...上面", "超过"], "In or to a higher position", "The picture is above the door", "A1", 0.20, 12),
    ("abroad", "adv.", ["在国外", "到国外"], "In or to a foreign country", "She studied abroad for a year", "A1", 0.25, 14),
    ("accept", "v.", ["接受", "认可"], "To receive or agree to something offered", "I accept your invitation", "A1", 0.22, 14),
    ("accident", "n.", ["事故", "意外"], "An unexpected event causing damage or injury", "There was a car accident", "A1", 0.18, 16),
    ("across", "prep./adv.", ["穿过", "横过"], "From one side to the other", "Walk across the street", "A1", 0.20, 14),
    ("act", "v./n.", ["行动", "表演"], "To do something; a performance", "We must act quickly", "A1", 0.25, 10),
    ("action", "n.", ["行动", "动作"], "The process of doing something", "Take action now", "A1", 0.22, 14),

    # More A1 words
    ("actor", "n.", ["演员", "男演员"], "A person who performs in plays or movies", "He is a famous actor", "A1", 0.12, 12),
    ("actually", "adv.", ["实际上", "事实上"], "In fact; really", "I actually enjoyed the movie", "A1", 0.28, 16),
    ("add", "v.", ["添加", "增加"], "To put something with something else", "Add sugar to the tea", "A1", 0.15, 10),
    ("address", "n./v.", ["地址", "演说"], "Details of where someone lives; to speak to", "What's your address?", "A1", 0.20, 15),
    ("adult", "n./adj.", ["成年人", "成人的"], "A fully grown person", "This show is for adults", "A1", 0.18, 12),
    ("afraid", "adj.", ["害怕的", "担心的"], "Feeling fear or anxiety", "Don't be afraid", "A1", 0.30, 14),
    ("after", "prep./adv.", ["在...之后"], "Following in time or place", "Come after lunch", "A1", 0.15, 12),
    ("afternoon", "n.", ["下午"], "The time from noon to evening", "Good afternoon", "A1", 0.20, 18),
    ("again", "adv.", ["再次", "又"], "One more time", "Try again", "A1", 0.15, 12),
    ("against", "prep.", ["反对", "靠着"], "In opposition to; touching", "Vote against the plan", "A1", 0.25, 15),

    ("age", "n.", ["年龄", "时代"], "The number of years someone has lived", "What is your age?", "A1", 0.18, 10),
    ("ago", "adv.", ["以前", "之前"], "In the past", "Two years ago", "A1", 0.20, 10),
    ("agree", "v.", ["同意", "赞成"], "To have the same opinion", "I agree with you", "A1", 0.22, 12),
    ("air", "n.", ["空气", "天空"], "The mixture of gases we breathe", "Fresh air", "A1", 0.12, 10),
    ("airport", "n.", ["机场"], "A place where aircraft take off and land", "Go to the airport", "A1", 0.15, 14),
    ("all", "det./pron.", ["全部", "所有"], "The whole amount", "All the students", "A1", 0.15, 10),
    ("allow", "v.", ["允许", "准许"], "To let someone do something", "Allow me to help", "A1", 0.25, 13),
    ("almost", "adv.", ["几乎", "差不多"], "Nearly; very close to", "Almost ready", "A1", 0.22, 14),
    ("alone", "adj./adv.", ["独自的", "单独"], "Without others", "Live alone", "A1", 0.25, 12),
    ("along", "prep./adv.", ["沿着", "向前"], "Moving in a line; forward", "Walk along the river", "A1", 0.22, 12),
]

# This is just the beginning - I need to continue with all words
# For demonstration, I'll create the structure for batch processing

def calculate_visual_distance(english_word, chinese_word):
    """Calculate visual distance based on stroke/letter count"""
    letter_count = len(english_word)
    # Estimate Chinese strokes (rough: ~12 strokes per character)
    chinese_chars = len([c for c in chinese_word if ord(c) > 127])
    stroke_count = chinese_chars * 12

    diff = abs(stroke_count - letter_count)
    visual_distance = 1 - (2.718 ** (-diff / 10))
    return round(visual_distance, 2)

def calculate_pronunciation_distance(english_word):
    """Calculate pronunciation distance based on word length"""
    length = len(english_word)
    if length <= 5:
        return 0.75
    elif length <= 8:
        return 0.85
    else:
        return 0.92

def generate_word_entry(english, pos, chinese_list, definition, example, level, meaning_dist, chinese_strokes):
    """Generate a complete word entry"""
    visual_dist = calculate_visual_distance(english, chinese_list[0])
    pronunciation_dist = calculate_pronunciation_distance(english)
    total_dist = 0.4 * meaning_dist + 0.3 * visual_dist + 0.3 * pronunciation_dist

    if total_dist < 0.4:
        difficulty = 'easy'
        difficulty_label = 'Easy'
    elif total_dist < 0.7:
        difficulty = 'medium'
        difficulty_label = 'Medium'
    else:
        difficulty = 'hard'
        difficulty_label = 'Hard'

    return {
        'english': english,
        'partOfSpeech': pos,
        'chinese': chinese_list,
        'definition': definition,
        'example': example,
        'level': level,
        'meaningDistance': meaning_dist,
        'visualDistance': visual_dist,
        'pronunciationDistance': pronunciation_dist,
        'totalDistance': round(total_dist, 2),
        'difficulty': difficulty,
        'difficultyLabel': difficulty_label,
        'source': 'oxford_3000'
    }

# Generate JavaScript file
def generate_js_file():
    output = []

    for word_data in oxford_3000_words:
        entry = generate_word_entry(*word_data)
        output.append(entry)

    # Convert to JavaScript format
    js_content = "// Oxford 3000 Vocabulary Data\n"
    js_content += "// Auto-generated - Do not edit manually\n\n"
    js_content += "const vocabulary = " + json.dumps(output, indent=2, ensure_ascii=False) + ";\n\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "    module.exports = vocabulary;\n"
    js_content += "}\n"

    return js_content

if __name__ == '__main__':
    content = generate_js_file()
    print(content)
    print(f"\n// Generated {len(oxford_3000_words)} words")
