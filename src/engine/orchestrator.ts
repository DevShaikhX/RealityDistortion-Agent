import { AnalysisInput, AnalysisReport, CognitiveRiskLevel } from './types';
import { analyzeEmotionalAmplification } from './analyzers/emotionalAmplification';
import { analyzeUrgencyPressure } from './analyzers/urgencyPressure';
import { analyzeAuthorityIllusion } from './analyzers/authorityIllusion';
import { analyzeSelectiveFraming } from './analyzers/selectiveFraming';
import { analyzeSocialProof } from './analyzers/socialProof';
import { analyzeEchoChamber } from './analyzers/echoChamber';
import { analyzeInfluenceIntent } from './analyzers/influenceIntent';

/**
 * Main orchestrator - coordinates all analyzers and generates comprehensive report
 */
export function analyzeContent(input: AnalysisInput): AnalysisReport {
    const { content } = input;

    // Run all dimension analyzers
    const emotionalAmplification = analyzeEmotionalAmplification(content);
    const urgencyPressure = analyzeUrgencyPressure(content);
    const authorityIllusion = analyzeAuthorityIllusion(content);
    const selectiveFraming = analyzeSelectiveFraming(content);
    const socialProof = analyzeSocialProof(content);
    const echoChamber = analyzeEchoChamber(content);

    // Calculate overall Reality Distortion Score (weighted average)
    const weights = {
        emotional: 0.20,
        urgency: 0.15,
        authority: 0.15,
        framing: 0.20,
        social: 0.15,
        echo: 0.15,
    };

    const realityDistortionScore = Math.round(
        emotionalAmplification.score * weights.emotional +
        urgencyPressure.score * weights.urgency +
        authorityIllusion.score * weights.authority +
        selectiveFraming.score * weights.framing +
        socialProof.score * weights.social +
        echoChamber.score * weights.echo
    );

    // Determine Cognitive Risk Level
    let cognitiveRiskLevel: CognitiveRiskLevel;
    if (realityDistortionScore >= 70) cognitiveRiskLevel = 'Critical';
    else if (realityDistortionScore >= 45) cognitiveRiskLevel = 'High';
    else if (realityDistortionScore >= 25) cognitiveRiskLevel = 'Moderate';
    else cognitiveRiskLevel = 'Low';

    // Analyze influence intent
    const influenceIntent = analyzeInfluenceIntent(content);

    // Get top 3 intents
    const topIntents = Object.entries(influenceIntent)
        .map(([type, probability]) => ({ type, probability }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);

    // Generate reframing suggestion
    const reframingSuggestion = generateReframing(content, {
        emotionalAmplification,
        urgencyPressure,
        authorityIllusion,
        selectiveFraming,
        socialProof,
        echoChamber,
    });

    // Calculate overall confidence
    const confidences = [
        emotionalAmplification.confidence,
        urgencyPressure.confidence,
        authorityIllusion.confidence,
        selectiveFraming.confidence,
        socialProof.confidence,
        echoChamber.confidence,
    ];
    const overallConfidence = Math.round(
        confidences.reduce((a, b) => a + b, 0) / confidences.length
    );

    return {
        realityDistortionScore,
        cognitiveRiskLevel,
        dimensions: {
            emotionalAmplification,
            urgencyPressure,
            authorityIllusion,
            selectiveFraming,
            socialProof,
            echoChamber,
        },
        influenceIntent,
        topIntents,
        reframingSuggestion,
        overallConfidence,
        analyzedAt: new Date(),
    };
}

/**
 * Generate neutral reframing suggestion
 */
function generateReframing(content: string, dimensions: any): string {
    const issues: string[] = [];

    if (dimensions.emotionalAmplification.score > 40) {
        issues.push('Remove emotionally charged language and use neutral descriptive terms');
    }
    if (dimensions.urgencyPressure.score > 40) {
        issues.push('Eliminate artificial time pressure and allow for thoughtful consideration');
    }
    if (dimensions.authorityIllusion.score > 40) {
        issues.push('Provide specific, verifiable citations instead of vague authority appeals');
    }
    if (dimensions.selectiveFraming.score > 40) {
        issues.push('Acknowledge alternative perspectives and present more balanced viewpoints');
    }
    if (dimensions.socialProof.score > 40) {
        issues.push('Focus on merit-based arguments rather than popularity claims');
    }
    if (dimensions.echoChamber.score > 40) {
        issues.push('Reduce polarizing us-vs-them language and emphasize common ground');
    }

    if (issues.length === 0) {
        return 'Content shows relatively neutral framing. Minor refinements: ensure all claims are verifiable and maintain balanced perspective.';
    }

    return `To present this more neutrally:\n${issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}`;
}
