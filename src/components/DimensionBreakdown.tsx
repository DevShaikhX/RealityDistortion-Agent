'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DimensionScore } from '@/engine/types';

interface DimensionBreakdownProps {
  title: string;
  icon: string;
  dimension: DimensionScore;
  color: string;
}

function DimensionCard({ title, icon, dimension, color }: DimensionBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass rounded-xl overflow-hidden border border-purple-700/30 hover:border-purple-500/50 transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-purple-900/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-purple-200">{title}</h3>
            <p className="text-xs text-gray-400 mono">
              {dimension.detectedPhrases.length} patterns detected
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-3xl font-bold mono ${color}`}>
              {dimension.score}
            </div>
            <div className="text-xs text-gray-500">/ 100</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="text-gray-400" size={20} />
          ) : (
            <ChevronDown className="text-gray-400" size={20} />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-purple-700/30 bg-purple-950/30">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color === 'text-cyan-400' ? 'from-cyan-500 to-purple-500' : 'from-purple-500 to-pink-500'} transition-all duration-1000`}
                style={{ width: `${dimension.percentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 mono">
              {dimension.percentage}% intensity · {dimension.confidence}% confidence
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-4 p-3 bg-purple-900/30 rounded-lg">
            <p className="text-sm text-gray-300 leading-relaxed">
              {dimension.explanation}
            </p>
          </div>

          {/* Detected phrases */}
          {dimension.detectedPhrases.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-purple-300 mb-2 mono">
                DETECTED PATTERNS:
              </h4>
              <div className="flex flex-wrap gap-2">
                {dimension.detectedPhrases.map((phrase, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 rounded-md text-xs mono"
                  >
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface DimensionBreakdownPanelProps {
  dimensions: {
    emotionalAmplification: DimensionScore;
    urgencyPressure: DimensionScore;
    authorityIllusion: DimensionScore;
    selectiveFraming: DimensionScore;
    socialProof: DimensionScore;
    echoChamber: DimensionScore;
  };
}

export function DimensionBreakdown({ dimensions }: DimensionBreakdownPanelProps) {
  const dimensionConfigs = [
    {
      title: 'Emotional Amplification',
      icon: '🔥',
      dimension: dimensions.emotionalAmplification,
      color: 'text-orange-400',
    },
    {
      title: 'Urgency & Pressure',
      icon: '⏱️',
      dimension: dimensions.urgencyPressure,
      color: 'text-yellow-400',
    },
    {
      title: 'Authority Illusion',
      icon: '👔',
      dimension: dimensions.authorityIllusion,
      color: 'text-blue-400',
    },
    {
      title: 'Selective Framing',
      icon: '🎯',
      dimension: dimensions.selectiveFraming,
      color: 'text-purple-400',
    },
    {
      title: 'Social Proof',
      icon: '👥',
      dimension: dimensions.socialProof,
      color: 'text-green-400',
    },
    {
      title: 'Echo Chamber',
      icon: '📢',
      dimension: dimensions.echoChamber,
      color: 'text-pink-400',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse-slow" />
        <h2 className="text-xl font-semibold text-purple-300 mono">
          DIMENSION BREAKDOWN
        </h2>
      </div>

      {dimensionConfigs.map((config, idx) => (
        <DimensionCard key={idx} {...config} />
      ))}
    </div>
  );
}
