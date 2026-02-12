// Analysis result types
export interface DimensionScore {
    score: number; // 0-100
    percentage: number; // 0-100
    detectedPhrases: string[];
    explanation: string;
    confidence: number; // 0-100
}

export interface IntentProbability {
    selling: number;
    political: number;
    fear: number;
    attack: number;
    radicalization: number;
    attention: number;
}

export type CognitiveRiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface AnalysisReport {
    realityDistortionScore: number; // 0-100
    cognitiveRiskLevel: CognitiveRiskLevel;
    dimensions: {
        emotionalAmplification: DimensionScore;
        urgencyPressure: DimensionScore;
        authorityIllusion: DimensionScore;
        selectiveFraming: DimensionScore;
        socialProof: DimensionScore;
        echoChamber: DimensionScore;
    };
    influenceIntent: IntentProbability;
    topIntents: Array<{ type: string; probability: number }>;
    reframingSuggestion: string;
    overallConfidence: number; // 0-100
    analyzedAt: Date;
}

export interface AnalysisInput {
    content: string;
    contentType?: 'text' | 'transcript' | 'article' | 'post' | 'speech';
}
