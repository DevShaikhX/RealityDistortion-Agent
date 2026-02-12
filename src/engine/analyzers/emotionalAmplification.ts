import { DimensionScore } from '../types';

/**
 * Analyzes emotional amplification in content
 * Detects: exaggeration, outrage triggers, fear stimulation, moral panic tone
 */
export function analyzeEmotionalAmplification(content: string): DimensionScore {
    const patterns = {
        exaggeration: [
            /\b(extremely?|incredibly?|absolutely|totally|completely|utterly|entirely)\s+\w+/gi,
            /\b(worst|best|greatest|terrible|horrible|amazing|perfect)\s+(ever|in history|of all time)/gi,
            /\b(always|never|everyone|no one|all|none)\b/gi,
            /!!+/g,
            /\b(crisis|disaster|catastrophe|emergency|urgent|critical)\b/gi,
        ],
        outrage: [
            /\b(outrageous|shocking|appalling|disgusting|unbelievable|unacceptable)\b/gi,
            /\b(must|should|need to)\s+(be\s+)?(stopped|banned|arrested|fired|cancelled)/gi,
            /\bcan't\s+believe\b/gi,
        ],
        fear: [
            /\b(dangerous|threat|risk|harmful|deadly|fatal|terrifying|scary)\b/gi,
            /\b(destroy|ruin|collapse|end|kill|death|die)\b/gi,
            /\b(lose|losing|lost)\s+(everything|all|your)/gi,
        ],
        moral: [
            /\b(evil|wicked|immoral|corrupt|wrong|right|good)\b/gi,
            /\b(should be ashamed|disgrace|shameful)\b/gi,
        ],
    };

    const detectedPhrases: string[] = [];
    let totalMatches = 0;

    for (const [category, patternList] of Object.entries(patterns)) {
        for (const pattern of patternList) {
            const matches = content.match(pattern);
            if (matches) {
                totalMatches += matches.length;
                detectedPhrases.push(...matches.slice(0, 3)); // Limit per pattern
            }
        }
    }

    // Normalize score based on content length and density
    const wordCount = content.split(/\s+/).length;
    const density = totalMatches / Math.max(wordCount / 100, 1);
    const score = Math.min(Math.round(density * 15), 100);

    // Unique phrases only
    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Extremely high emotional manipulation detected. Content uses intense fear, outrage, and exaggeration to bypass rational thinking.'
        : score > 40
            ? 'Moderate emotional amplification present. Language designed to trigger emotional responses rather than promote reasoned analysis.'
            : score > 15
                ? 'Some emotional language detected. Content includes emotive terms that may influence perception.'
                : 'Minimal emotional manipulation. Content maintains relatively neutral tone.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 5 ? 85 : 70,
    };
}
