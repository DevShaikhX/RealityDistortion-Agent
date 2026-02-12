import { IntentProbability } from '../types';

/**
 * Analyzes influence intent
 * Estimates probability of different manipulation goals
 */
export function analyzeInfluenceIntent(content: string): IntentProbability {
    const intentPatterns = {
        selling: [
            /\b(buy|purchase|order|sale|discount|offer|deal|price)\b/gi,
            /\b(limited\s+time|act\s+now|call\s+now)\b/gi,
            /\b(guarantee|money\s+back|free\s+(trial|shipping))\b/gi,
            /\$\d+/g,
        ],
        political: [
            /\b(vote|election|candidate|politician|party|congress|senate|president)\b/gi,
            /\b(democrat|republican|liberal|conservative|left|right)\b/gi,
            /\b(policy|legislation|government|administration)\b/gi,
        ],
        fear: [
            /\b(danger|threat|risk|warning|alert|beware)\b/gi,
            /\b(protect|safety|security|vulnerable)\b/gi,
            /\b(crisis|disaster|catastrophe|emergency)\b/gi,
        ],
        attack: [
            /\b(liar|fraud|criminal|corrupt|evil|scam)\b/gi,
            /\b(exposed|revealed|truth\s+about)\b/gi,
            /\b(shame|disgrace|pathetic|incompetent)\b/gi,
        ],
        radicalization: [
            /\b(wake\s+up|truth|conspiracy|cover-up|hidden)\b/gi,
            /\b(they\s+don't\s+want\s+you\s+to\s+know)\b/gi,
            /\b(join\s+(us|the\s+(fight|movement|cause)))\b/gi,
        ],
        attention: [
            /\b(shocking|unbelievable|you\s+won't\s+believe)\b/gi,
            /\b(click|watch|see|check\s+out|viral)\b/gi,
            /\b(breaking|exclusive|revealed)\b/gi,
            /\b(like|share|subscribe|follow)\b/gi,
        ],
    };

    const scores: Record<string, number> = {
        selling: 0,
        political: 0,
        fear: 0,
        attack: 0,
        radicalization: 0,
        attention: 0,
    };

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
        let matches = 0;
        for (const pattern of patterns) {
            const found = content.match(pattern);
            if (found) matches += found.length;
        }
        scores[intent] = matches;
    }

    // Normalize to probabilities (0-100)
    const total = Math.max(Object.values(scores).reduce((a, b) => a + b, 0), 1);
    const probabilities: IntentProbability = {
        selling: Math.min(Math.round((scores.selling / total) * 100), 100),
        political: Math.min(Math.round((scores.political / total) * 100), 100),
        fear: Math.min(Math.round((scores.fear / total) * 100), 100),
        attack: Math.min(Math.round((scores.attack / total) * 100), 100),
        radicalization: Math.min(Math.round((scores.radicalization / total) * 100), 100),
        attention: Math.min(Math.round((scores.attention / total) * 100), 100),
    };

    return probabilities;
}
