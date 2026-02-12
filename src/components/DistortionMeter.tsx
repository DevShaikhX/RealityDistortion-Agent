'use client';

import React from 'react';
import { CognitiveRiskLevel } from '@/engine/types';

interface DistortionMeterProps {
  score: number;
  riskLevel: CognitiveRiskLevel;
  confidence: number;
}

export function DistortionMeter({ score, riskLevel, confidence }: DistortionMeterProps) {
  const rotation = (score / 100) * 180 - 90;
  
  const riskColors = {
    Low: 'from-green-500 to-cyan-500',
    Moderate: 'from-yellow-500 to-orange-500',
    High: 'from-orange-500 to-red-500',
    Critical: 'from-red-600 to-pink-600',
  };

  const riskBg = {
    Low: 'bg-green-900/30 border-green-500/50',
    Moderate: 'bg-yellow-900/30 border-yellow-500/50',
    High: 'bg-orange-900/30 border-orange-500/50',
    Critical: 'bg-red-900/30 border-red-500/50',
  };

  return (
    <div className="glass-strong rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
        <h2 className="text-xl font-semibold text-purple-300 mono">
          DISTORTION ANALYSIS
        </h2>
      </div>

      {/* Circular gauge */}
      <div className="relative w-64 h-64 mx-auto mb-6">
        {/* Background arc */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="20"
            strokeDasharray="251.2 251.2"
            strokeDashoffset="125.6"
          />
          {/* Gradient arc */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="20"
            strokeDasharray="251.2 251.2"
            strokeDashoffset={251.2 - (251.2 * score) / 100}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Center display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-white mono">{score}</div>
          <div className="text-sm text-gray-400 mono">/ 100</div>
        </div>

        {/* Needle */}
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-20 bg-cyan-400 origin-bottom transition-transform duration-1000 shadow-lg shadow-cyan-400/50"
          style={{ 
            transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50" />
      </div>

      {/* Risk level badge */}
      <div className="flex items-center justify-center gap-4">
        <div className={`px-6 py-3 rounded-lg border-2 ${riskBg[riskLevel]}`}>
          <div className="text-xs text-gray-400 mb-1 mono">COGNITIVE RISK</div>
          <div className="text-2xl font-bold text-white mono">{riskLevel.toUpperCase()}</div>
        </div>

        <div className="px-6 py-3 glass rounded-lg">
          <div className="text-xs text-gray-400 mb-1 mono">CONFIDENCE</div>
          <div className="text-2xl font-bold text-white mono">{confidence}%</div>
        </div>
      </div>
    </div>
  );
}
