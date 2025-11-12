#!/usr/bin/env python3
"""
Comprehensive Vocabulary Data Generator
Processes Oxford 3000, AWL, and GRE 357 word lists
Generates complete vocabulary entries with Chinese translations and distance scores
"""

import json
import math
import re
from typing import Dict, List, Tuple

# Comprehensive English-Chinese dictionary for vocabulary translation
# This is a curated subset focusing on learning vocabulary
WORD_DICT = {
    # Basic verbs
    "be": ("v.", ["是", "存在"], "To exist or have a certain quality", "I am happy"),
    "have": ("v.", ["有", "拥有"], "To possess or own something", "I have a book"),
    "do": ("v.", ["做", "干"], "To perform an action", "Do your homework"),
    "go": ("v.", ["去", "走"], "To move from one place to another", "Let's go home"),
    "get": ("v.", ["得到", "获得"], "To obtain or receive", "Get the mail"),
    "make": ("v.", ["制作", "做"], "To create or produce", "Make dinner"),
    "see": ("v.", ["看见", "看到"], "To perceive with eyes", "I see the bird"),
    "know": ("v.", ["知道", "了解"], "To have information", "I know the answer"),
    "take": ("v.", ["拿", "取"], "To grasp or carry", "Take this pen"),
    "come": ("v.", ["来", "到来"], "To move toward", "Come here"),
    "think": ("v.", ["想", "认为"], "To have an opinion or idea", "I think it's good"),
    "look": ("v.", ["看", "看起来"], "To direct eyes toward", "Look at me"),
    "want": ("v.", ["想要", "要"], "To desire", "I want water"),
    "give": ("v.", ["给", "给予"], "To transfer to someone", "Give me the book"),
    "use": ("v.", ["使用", "用"], "To employ for a purpose", "Use this tool"),
    "find": ("v.", ["找到", "发现"], "To discover", "Find your keys"),
    "tell": ("v.", ["告诉", "说"], "To communicate information", "Tell me the truth"),
    "ask": ("v.", ["问", "询问"], "To request information", "Ask a question"),
    "work": ("v.", ["工作", "劳动"], "To do a job", "Work hard"),
    "call": ("v.", ["叫", "打电话"], "To name or phone", "Call me later"),
    "try": ("v.", ["尝试", "试"], "To attempt", "Try your best"),
    "feel": ("v.", ["感觉", "觉得"], "To experience emotion", "I feel happy"),
    "leave": ("v.", ["离开", "留下"], "To go away from", "Leave the room"),
    "put": ("v.", ["放", "放置"], "To place", "Put it on the table"),

    # Add more as needed - this would be expanded to cover all common words
}

# Part of speech detection based on word patterns
POS_PATTERNS = {
    "adj": ["-ful", "-less", "-ous", "-ive", "-able", "-ible", "-al", "-ic", "-ical"],
    "adv": ["-ly"],
    "n": ["-tion", "-sion", "-ment", "-ness", "-ity", "-er", "-or", "-ist", "-ism"],
    "v": ["-ate", "-ify", "-ize", "-ise", "-en"]
}

def detect_part_of_speech(word: str) -> str:
    """Detect part of speech based on word patterns"""
    word_lower = word.lower()

    # Check patterns
    for pos, patterns in POS_PATTERNS.items():
        for pattern in patterns:
            if word_lower.endswith(pattern):
                return pos + "."

    # Default to noun for unknown
    return "n."

def calculate_visual_distance(english: str, chinese: str) -> float:
    """Calculate visual distance based on character/letter count difference"""
    letter_count = len(english)
    # Estimate stroke count for Chinese (rough approximation)
    stroke_count = len(chinese) * 8  # Average ~8 strokes per character

    # Formula: 1 - exp(-|strokes - letters| / 10)
    distance = 1 - math.exp(-abs(stroke_count - letter_count) / 10)
    return round(distance, 2)

def calculate_pronunciation_distance(english: str) -> float:
    """Calculate pronunciation difficulty based on word length and complexity"""
    length = len(english)
    syllable_estimate = max(1, length // 3)  # Rough syllable count

    # Longer words = higher pronunciation distance
    # Formula: min(1.0, syllable_estimate * 0.15)
    distance = min(1.0, syllable_estimate * 0.15 + 0.5)
    return round(distance, 2)

def generate_chinese_translation(word: str) -> List[str]:
    """Generate Chinese translation(s) for a word"""
    # Check dictionary first
    if word.lower() in WORD_DICT:
        return WORD_DICT[word.lower()][1]

    # For unknown words, generate placeholder
    # In production, this would call a translation API
    return [f"{word}"]  # Placeholder - needs manual translation

def generate_definition(word: str, pos: str) -> str:
    """Generate simple English definition"""
    if word.lower() in WORD_DICT:
        return WORD_DICT[word.lower()][2]

    # Generate template-based definition
    if pos == "n.":
        return f"A thing or concept related to {word}"
    elif pos == "v.":
        return f"To perform an action related to {word}"
    elif pos == "adj.":
        return f"Having the quality of being {word}"
    elif pos == "adv.":
        return f"In a manner that is {word}"
    else:
        return f"Related to {word}"

def generate_example(word: str, pos: str) -> str:
    """Generate example sentence"""
    if word.lower() in WORD_DICT:
        return WORD_DICT[word.lower()][3]

    # Generate template-based example
    if pos == "n.":
        return f"The {word} is important"
    elif pos == "v.":
        return f"We need to {word} this"
    elif pos == "adj.":
        return f"It is very {word}"
    elif pos == "adv.":
        return f"He did it {word}"
    else:
        return f"This involves {word}"

def determine_cefr_level(word: str, source: str) -> str:
    """Determine CEFR level based on word and source"""
    # Simple heuristic based on word length and source
    if source == "oxford_3000":
        # Oxford 3000 spans A1-B2
        length = len(word)
        if length <= 4:
            return "A1"
        elif length <= 6:
            return "A2"
        elif length <= 8:
            return "B1"
        else:
            return "B2"
    elif source == "awl":
        return "B2"  # AWL is academic, higher level
    elif source == "gre_357":
        return "C1"  # GRE is advanced
    return "B1"

def estimate_meaning_distance(word: str, chinese: List[str], level: str) -> float:
    """Estimate meaning distance based on level and complexity"""
    # A1 words are usually very clear concepts (low distance)
    # C1 words often have cultural nuances (higher distance)
    base_distances = {
        "A1": 0.15,
        "A2": 0.20,
        "B1": 0.30,
        "B2": 0.40,
        "C1": 0.55,
        "C2": 0.65
    }

    base = base_distances.get(level, 0.30)

    # Adjust based on number of translations (more = fuzzier concept)
    if len(chinese) > 2:
        base += 0.10

    return round(min(1.0, base), 2)

def generate_vocabulary_entry(word: str, source: str) -> Dict:
    """Generate complete vocabulary entry for a word"""
    word = word.strip().lower()

    # Skip empty or invalid
    if not word or len(word) < 2:
        return None

    # Get or detect part of speech
    pos = "n."  # Default
    if word in WORD_DICT:
        pos = WORD_DICT[word][0]
    else:
        pos = detect_part_of_speech(word)

    # Generate components
    chinese = generate_chinese_translation(word)
    definition = generate_definition(word, pos)
    example = generate_example(word, pos)
    level = determine_cefr_level(word, source)

    # Calculate distances
    meaning_distance = estimate_meaning_distance(word, chinese, level)
    visual_distance = calculate_visual_distance(word, chinese[0])
    pronunciation_distance = calculate_pronunciation_distance(word)

    return {
        "english": word,
        "partOfSpeech": pos,
        "chinese": chinese,
        "definition": definition,
        "example": example,
        "level": level,
        "meaningDistance": meaning_distance,
        "visualDistance": visual_distance,
        "pronunciationDistance": pronunciation_distance,
        "source": source
    }

def process_word_list(filename: str, source: str) -> List[Dict]:
    """Process a word list file and generate entries"""
    entries = []

    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            word = line.strip()
            if word:
                entry = generate_vocabulary_entry(word, source)
                if entry:
                    entries.append(entry)

    return entries

def generate_javascript_output(entries: List[Dict], output_file: str):
    """Generate JavaScript vocabulary data file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("// Complete Vocabulary Database\n")
        f.write("// Auto-generated from Oxford 3000, AWL, and GRE 357\n")
        f.write(f"// Total: {len(entries)} words\n\n")
        f.write("const completeVocabularyData = [\n")

        for i, entry in enumerate(entries):
            f.write("    {\n")
            f.write(f'        english: "{entry["english"]}",\n')
            f.write(f'        partOfSpeech: "{entry["partOfSpeech"]}",\n')

            # Chinese array
            chinese_str = ", ".join([f'"{c}"' for c in entry["chinese"]])
            f.write(f'        chinese: [{chinese_str}],\n')

            f.write(f'        definition: "{entry["definition"]}",\n')
            f.write(f'        example: "{entry["example"]}",\n')
            f.write(f'        level: "{entry["level"]}",\n')
            f.write(f'        meaningDistance: {entry["meaningDistance"]},\n')
            f.write(f'        visualDistance: {entry["visualDistance"]},\n')
            f.write(f'        pronunciationDistance: {entry["pronunciationDistance"]},\n')
            f.write(f'        source: "{entry["source"]}"\n')

            if i < len(entries) - 1:
                f.write("    },\n")
            else:
                f.write("    }\n")

        f.write("];\n\n")

        # Add total distance calculation
        f.write("// Calculate total distance for each word\n")
        f.write("completeVocabularyData.forEach(word => {\n")
        f.write("    word.totalDistance = 0.4 * word.meaningDistance +\n")
        f.write("                        0.3 * word.visualDistance +\n")
        f.write("                        0.3 * word.pronunciationDistance;\n")
        f.write("    word.totalDistance = Math.round(word.totalDistance * 100) / 100;\n\n")
        f.write("    if (word.totalDistance < 0.4) {\n")
        f.write("        word.difficulty = 'easy';\n")
        f.write("        word.difficultyLabel = 'Easy';\n")
        f.write("    } else if (word.totalDistance < 0.7) {\n")
        f.write("        word.difficulty = 'medium';\n")
        f.write("        word.difficultyLabel = 'Medium';\n")
        f.write("    } else {\n")
        f.write("        word.difficulty = 'hard';\n")
        f.write("        word.difficultyLabel = 'Hard';\n")
        f.write("    }\n")
        f.write("});\n\n")

        # Export
        f.write("// Export\n")
        f.write("if (typeof module !== 'undefined' && module.exports) {\n")
        f.write("    module.exports = completeVocabularyData;\n")
        f.write("}\n\n")
        f.write("console.log(`Vocabulary database initialized: ${completeVocabularyData.length} words loaded`);\n")

def main():
    print("Starting vocabulary generation...")
    print("="*60)

    all_entries = []

    # Process Oxford 3000
    print("\n📚 Processing Oxford 3000...")
    oxford_entries = process_word_list('oxford_3000_raw.txt', 'oxford_3000')
    print(f"✓ Processed {len(oxford_entries)} Oxford 3000 words")
    all_entries.extend(oxford_entries)

    # Process AWL
    print("\n📚 Processing Academic Word List (AWL)...")
    awl_entries = process_word_list('awl_unique.txt', 'awl')
    print(f"✓ Processed {len(awl_entries)} AWL words")
    all_entries.extend(awl_entries)

    # Process GRE 357
    print("\n📚 Processing GRE 357...")
    gre_entries = process_word_list('gre_357_raw.txt', 'gre_357')
    print(f"✓ Processed {len(gre_entries)} GRE words")
    all_entries.extend(gre_entries)

    print(f"\n✓ Total vocabulary entries generated: {len(all_entries)}")

    # Generate JavaScript output
    print("\n📝 Generating vocabulary-data.js...")
    generate_javascript_output(all_entries, 'vocabulary-data.js')
    print("✓ vocabulary-data.js created successfully!")

    # Statistics
    print("\n" + "="*60)
    print("GENERATION SUMMARY")
    print("="*60)
    print(f"Oxford 3000: {len(oxford_entries)} words")
    print(f"AWL: {len(awl_entries)} words")
    print(f"GRE 357: {len(gre_entries)} words")
    print(f"TOTAL: {len(all_entries)} words")
    print("="*60)

    print("\n✅ Vocabulary generation complete!")
    print("\nNote: This is a baseline generation. For production quality:")
    print("  1. Review and refine Chinese translations")
    print("  2. Improve definitions and examples")
    print("  3. Adjust distance scores based on linguistic analysis")
    print("  4. Add multiPerspectives for complex cultural concepts")

if __name__ == "__main__":
    main()
