import { DimensionScore } from '../types';

/**
 * Analyzes selective framing and data omission
 * Detects: one-sided framing, missing counter-arguments
 */
export function analyzeSelectiveFraming(content: string): DimensionScore {
    const patterns = {
        oneSided: [
            /\b(only|just|simply|merely|nothing but)\b/gi,
            /\bthe (truth|fact|reality) is\b/gi,
            /\bclearly|obviously|undeniably\b/gi,
            /\bthere is no (doubt|question|debate|alternative)\b/gi,
        ],
        absoluteStatements: [
            /\b(all|every|always|never|none|no one|everyone)\b/gi,
            /\b(proves|proves that|demonstrates that)\b/gi,
            /\b(impossible|certain|definitely|absolutely)\b/gi,
        ],
        dismissive: [
            /\b(ignore|dismiss|debunked|myth|lie|false narrative)\b/gi,
            /\bso-called\b/gi,
            /\b(claim|allegedly|supposedly)\b/gi,
        ],
        lackOfNuance: [
            /\b(either|or)\b/gi,
            /\byou're (either )?with (us|me)|against (us|me)\b/gi,
            /\bthere are (only )?two (sides|options)\b/gi,
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

    // Check for balanced language (reduces score)
    const balanceIndicators = [
        /\b(however|but|although|on the other hand|conversely)\b/gi,
        /\b(some argue|others believe|critics say|proponents claim)\b/gi,
        /\b(both|balanced|nuanced|complex)\b/gi,
    ];

    let balanceCount = 0;
    for (const pattern of balanceIndicators) {
        const matches = content.match(pattern);
        if (matches) balanceCount += matches.length;
    }

    const wordCount = content.split(/\s+/).length;
    const density = totalMatches / Math.max(wordCount / 100, 1);
    let score = Math.min(Math.round(density * 16), 100);

    // Reduce score if balanced language is present
    score = Math.max(score - (balanceCount * 8), 0);

    const uniquePhrases = [...new Set(detectedPhrases)].slice(0, 10);

    const explanation = score > 70
        ? 'Heavily one-sided framing. Content presents absolutist viewpoints while dismissing alternative perspectives or nuance.'
        : score > 40
            ? 'Significant selective framing detected. Content shows bias toward single perspective with limited acknowledgment of complexity.'
            : score > 15
                ? 'Some one-sided language present. Content could benefit from more balanced presentation.'
                : 'Relatively balanced framing. Content acknowledges multiple perspectives or presents nuanced view.';

    return {
        score,
        percentage: score,
        detectedPhrases: uniquePhrases,
        explanation,
        confidence: uniquePhrases.length > 4 ? 78 : 62,
    };
}
