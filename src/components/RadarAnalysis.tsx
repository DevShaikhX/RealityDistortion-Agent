'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { AnalysisReport } from '@/engine/types';

interface RadarAnalysisProps {
  report: AnalysisReport;
}

export function RadarAnalysis({ report }: RadarAnalysisProps) {
  const data = [
    {
      dimension: 'Emotional',
      value: report.dimensions.emotionalAmplification.score,
      fullName: 'Emotional Amplification',
    },
    {
      dimension: 'Urgency',
      value: report.dimensions.urgencyPressure.score,
      fullName: 'Urgency & Pressure',
    },
    {
      dimension: 'Authority',
      value: report.dimensions.authorityIllusion.score,
      fullName: 'Authority Illusion',
    },
    {
      dimension: 'Framing',
      value: report.dimensions.selectiveFraming.score,
      fullName: 'Selective Framing',
    },
    {
      dimension: 'Social',
      value: report.dimensions.socialProof.score,
      fullName: 'Social Proof',
    },
    {
      dimension: 'Echo',
      value: report.dimensions.echoChamber.score,
      fullName: 'Echo Chamber',
    },
  ];

  return (
    <div className="glass-strong rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        <h2 className="text-xl font-semibold text-cyan-300 mono">
          7-DIMENSION SCAN
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(139, 92, 246, 0.3)" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: '#a5b4fc', fontSize: 12, fontFamily: 'JetBrains Mono' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#6366f1', fontSize: 10 }}
          />
          <Radar
            name="Distortion Level"
            dataKey="value"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.4}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between glass rounded-lg p-3">
            <span className="text-sm text-gray-300">{item.fullName}</span>
            <span className="text-lg font-bold text-cyan-400 mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
