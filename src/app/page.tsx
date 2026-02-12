'use client';

import React, { useState } from 'react';
import { SpecimenChamber } from '@/components/SpecimenChamber';
import { DistortionMeter } from '@/components/DistortionMeter';
import { RadarAnalysis } from '@/components/RadarAnalysis';
import { DimensionBreakdown } from '@/components/DimensionBreakdown';
import { IntentMatrix } from '@/components/IntentMatrix';
import { ReframingPanel } from '@/components/ReframingPanel';
import { analyzeContent } from '@/engine/orchestrator';
import { AnalysisReport } from '@/engine/types';

export default function Home() {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAnalyze = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeContent({ content });
    setReport(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-700/30 bg-purple-950/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center animate-glow">
                <span className="text-2xl">🧪</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mono">
                  RealityDistortion Agent
                </h1>
                <p className="text-sm text-gray-400 mono">
                  Cognitive Forensics Laboratory
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mono">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div>
            <SpecimenChamber
              content={content}
              onContentChange={setContent}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-8">
            {report ? (
              <>
                <DistortionMeter
                  score={report.realityDistortionScore}
                  riskLevel={report.cognitiveRiskLevel}
                  confidence={report.overallConfidence}
                />

                <RadarAnalysis report={report} />

                <IntentMatrix
                  intents={report.influenceIntent}
                  topIntents={report.topIntents}
                />

                <DimensionBreakdown dimensions={report.dimensions} />

                <ReframingPanel suggestion={report.reframingSuggestion} />
              </>
            ) : (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2 mono">
                  AWAITING SPECIMEN
                </h3>
                <p className="text-gray-400 text-sm">
                  Submit content in the specimen chamber to begin cognitive analysis
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 glass rounded-xl p-6">
          <h3 className="text-sm font-semibold text-purple-300 mb-3 mono">
            ABOUT THIS LABORATORY
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            RealityDistortion Agent is a cognitive forensics tool designed to analyze how reality 
            is being distorted through manipulative language patterns. It examines content across 
            7 dimensions: emotional amplification, urgency pressure, authority illusion, selective 
            framing, social proof manipulation, echo chamber reinforcement, and influence intent.
          </p>
          <p className="text-xs text-gray-500 italic">
            ⚠️ This tool analyzes patterns, not truth claims. Results should be used as one input 
            among many when evaluating content credibility. Always verify information independently.
          </p>
        </div>
      </main>
    </div>
  );
}
