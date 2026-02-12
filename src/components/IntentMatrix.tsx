'use client';

import React from 'react';
import { IntentProbability } from '@/engine/types';

interface IntentMatrixProps {
  intents: IntentProbability;
  topIntents: Array<{ type: string; probability: number }>;
}

export function IntentMatrix({ intents, topIntents }: IntentMatrixProps) {
  const intentIcons: Record<string, string> = {
    selling: '💰',
    political: '🗳️',
    fear: '😨',
    attack: '⚔️',
    radicalization: '🎯',
    attention: '👁️',
  };

  const intentLabels: Record<string, string> = {
    selling: 'Commercial/Selling',
    political: 'Political Persuasion',
    fear: 'Fear Amplification',
    attack: 'Reputation Attack',
    radicalization: 'Ideological Radicalization',
    attention: 'Attention Harvesting',
  };

  const getIntensityColor = (probability: number) => {
    if (probability >= 70) return 'bg-red-500/30 border-red-500';
    if (probability >= 40) return 'bg-orange-500/30 border-orange-500';
    if (probability >= 20) return 'bg-yellow-500/30 border-yellow-500';
    return 'bg-purple-500/20 border-purple-500/50';
  };

  return (
    <div className="glass-strong rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
        <h2 className="text-xl font-semibold text-pink-300 mono">
          INFLUENCE INTENT MATRIX
        </h2>
      </div>

      {/* Top 3 Likely Intents */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 mono">
          PRIMARY INTENTS DETECTED:
        </h3>
        <div className="space-y-2">
          {topIntents.map((intent, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${getIntensityColor(intent.probability)}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{intentIcons[intent.type]}</span>
                <div>
                  <div className="font-semibold text-white">
                    {intentLabels[intent.type]}
                  </div>
                  <div className="text-xs text-gray-400 mono">
                    Rank #{idx + 1}
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mono">
                {intent.probability}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Intents Grid */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 mono">
          FULL PROBABILITY DISTRIBUTION:
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(intents).map(([key, value]) => (
            <div key={key} className="glass-strong rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{intentIcons[key]}</span>
                <span className="text-xs text-gray-400">
                  {intentLabels[key]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-purple-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-purple-300 mono w-12 text-right">
                  {value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
