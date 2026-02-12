import { DimensionScore } from '../types';

/**
 * Analyzes authority illusion
 * Detects: vague expert references, unverified authority claims, institutional mimicry
 */
export function analyzeAuthorityIllusion(content: string): DimensionScore {
    const patterns = {
        vagueExperts: [
            /\b(experts?|scientists?|doctors?|researchers?|studies?|research)\s+(say|show|prove|confirm|agree)/gi,
            /\baccording to (experts?|sources?|insiders?|officials?)\b/gi,
            /\b(many|most|some)\s+(experts?|scientists?|doctors?|professionals?)\b/gi,
            /\bit('s| is) (scientifically )?(proven|confirmed|established)\b/gi,
        ],
        unverified: [
            /\b(studies show|research shows|science says)\b/gi,
            /\b(a study|a report|an analysis)\s+(found|showed|revealed)\b/gi,
            /\btop\s+(scientists?|doctors?|experts?)\b/gi,
            /\bleading\s+(expert|authority|researcher)\b/gi,
        ],
        institutional: [
            /\b(official|formally|certified|approved|endorsed)\b/gi,
            /\b(the\s+)?(government|fda|cdc|who|authorities)\s+(says?|warns?|recommends?)\b/gi,
            /\b(Harvard|Stanford|MIT|Oxford|Cambridge)\s+(study|research|scientist)/gi,
        ],
        credentials: [
            /\bDr\.\s+\w+\s+(says?|claims?|believes?)\b/g,
            /\b(phd|md|professor)\b/gi,
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
    const score = Math.min(Math.round(density * 20), 100);

    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Heavy reliance on vague authority claims. References to experts/institutions lack specific citations or verifiable sources.'
        : score > 40
            ? 'Significant use of authority appeals without verification. Claims reference experts or institutions without proper attribution.'
            : score > 15
                ? 'Some authority claims present. Content uses expert references that may require verification.'
                : 'Minimal authority manipulation. Claims are either specific or authority appeals are limited.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 3 ? 75 : 60,
    };
}
