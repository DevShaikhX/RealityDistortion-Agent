import { DimensionScore } from '../types';

/**
 * Analyzes echo chamber reinforcement
 * Detects: in-group/out-group language, polarization, tribal reinforcement
 */
export function analyzeEchoChamber(content: string): DimensionScore {
    const patterns = {
        inGroup: [
            /\b(we|us|our\s+(side|team|people|community|movement))\b/gi,
            /\b(real|true|genuine)\s+(americans?|patriots?|believers?|people)\b/gi,
            /\b(fellow|like-minded)\b/gi,
        ],
        outGroup: [
            /\b(they|them|those\s+people|the\s+other\s+side)\b/gi,
            /\b(sheeple|sheep|zombies|npcs|bots)\b/gi,
            /\b(fake|pseudo|so-called)\s+\w+/gi,
            /\b(enemy|enemies|opponents?|adversaries)\b/gi,
        ],
        polarization: [
            /\b(us\s+vs\.?\s+them|good\s+vs\.?\s+evil)\b/gi,
            /\b(wake up|red pill|blue pill|woke|based)\b/gi,
            /\b(mainstream\s+media|msm|lamestream)\b/gi,
            /\b(echo\s+chamber|bubble|narrative)\b/gi,
        ],
        tribal: [
            /\bif you (believe|think|support)\b/gi,
            /\b(only|real)\s+\w+\s+(understand|know|get\s+it)\b/gi,
            /\byou're\s+(either|not)\s+(one\s+of\s+us|with\s+us)\b/gi,
        ],
    };

    const detectedPhrases: string[] = [];
    let totalMatches = 0;

    for (const [category, patternList] of Object.entries(patterns)) {
        for (const pattern of patternList) {
            const matches = content.match(pattern);
            if (matches) {
                totalMatches += matches.length;
                detectedPhrases.push(...matches.slice(0, 3));
            }
        }
    }

    const wordCount = content.split(/\s+/).length;
    const density = totalMatches / Math.max(wordCount / 100, 1);
    const score = Math.min(Math.round(density * 15), 100);

    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Strong echo chamber reinforcement. Content heavily emphasizes in-group/out-group divisions and tribal identity over substantive argument.'
        : score > 40
            ? 'Significant polarization language detected. Content reinforces group identity and creates us-vs-them framing.'
            : score > 15
                ? 'Some tribal language present. Content shows elements of group identity reinforcement.'
                : 'Low echo chamber effect. Content does not heavily emphasize tribal or polarizing divisions.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 4 ? 80 : 67,
    };
}
