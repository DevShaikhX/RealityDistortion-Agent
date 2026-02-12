import { DimensionScore } from '../types';

/**
 * Analyzes social proof manipulation
 * Detects: "everyone believes this", "millions agree", herd pressure
 */
export function analyzeSocialProof(content: string): DimensionScore {
    const patterns = {
        crowd: [
            /\b(everyone|everybody|millions|thousands|most people|the majority)\s+(knows?|believes?|agrees?|says?|thinks?)\b/gi,
            /\b(we all know|as we all know|it's common knowledge)\b/gi,
            /\b(widely (accepted|known|believed|recognized))\b/gi,
        ],
        bandwagon: [
            /\bjoin (us|millions|thousands|the movement)\b/gi,
            /\bdon't (be|get) left (behind|out)\b/gi,
            /\beveryone (else )?is (doing|saying|buying)\b/gi,
            /\bpeople are (talking|sharing|loving)\b/gi,
        ],
        popularity: [
            /\b(trending|viral|going viral|blowing up)\b/gi,
            /\b\d+(k|m)?\s+(followers?|subscribers?|views?|likes?|shares?)\b/gi,
            /\b(most\s+)?(popular|loved|trusted|recommended)\b/gi,
            /\b#1|number one|best-selling\b/gi,
        ],
        testimonials: [
            /\b(thousands|millions)\s+(of\s+)?(satisfied\s+)?(customers?|users?|people)\b/gi,
            /\b(real\s+)?(people|users|customers)\s+are\s+saying\b/gi,
            /\b(five\s+)?5\s+stars?\b/gi,
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
    const score = Math.min(Math.round(density * 17), 100);

    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Heavy social proof manipulation. Content relies heavily on popularity claims and herd mentality to persuade rather than merit-based arguments.'
        : score > 40
            ? 'Significant bandwagon tactics detected. Content uses crowd appeals and popularity to influence belief.'
            : score > 15
                ? 'Some social proof elements present. Content references popularity or consensus as supporting evidence.'
                : 'Minimal social proof manipulation. Content does not heavily rely on popularity or crowd pressure.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 3 ? 82 : 68,
    };
}
