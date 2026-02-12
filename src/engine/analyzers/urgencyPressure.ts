import { DimensionScore } from '../types';

/**
 * Analyzes urgency and pressure signals
 * Detects: artificial deadlines, crisis framing, pressure language
 */
export function analyzeUrgencyPressure(content: string): DimensionScore {
    const patterns = {
        deadlines: [
            /\b(now|today|immediately|right now|asap|urgent|hurry)\b/gi,
            /\b(before it's too late|time is running out|limited time|act fast)\b/gi,
            /\b(only|just)\s+\d+\s+(hours?|days?|minutes?)\s+(left|remaining)/gi,
            /\b(last chance|final\s+(opportunity|warning|call))\b/gi,
            /\bdeadline\b/gi,
        ],
        crisis: [
            /\b(crisis|emergency|critical|dire|desperate)\b/gi,
            /\b(breaking|urgent|alert)\b/gi,
            /\b(can't wait|no time|must act)\b/gi,
        ],
        pressure: [
            /\b(you must|you need to|you should|you have to)\b/gi,
            /\b(don't (wait|delay|hesitate|miss))\b/gi,
            /\b(act now|do it now|decide now)\b/gi,
            /\bif you don't\b/gi,
        ],
        scarcity: [
            /\b(running out|selling fast|almost gone|limited (stock|supply|availability))\b/gi,
            /\b(while\s+(supplies|stocks?)\s+last)\b/gi,
            /\b(exclusive|rare|scarce)\b/gi,
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
    const score = Math.min(Math.round(density * 18), 100);

    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Extreme urgency manipulation. Content creates artificial time pressure to force hasty decisions without reflection.'
        : score > 40
            ? 'Significant pressure tactics detected. Language designed to create false urgency and limit thoughtful consideration.'
            : score > 15
                ? 'Moderate urgency signals present. Some deadline or pressure language used.'
                : 'Low urgency manipulation. Content allows time for thoughtful consideration.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 4 ? 80 : 65,
    };
}
