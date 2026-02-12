'use client';

import React from 'react';

interface SpecimenChamberProps {
  content: string;
  onContentChange: (content: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function SpecimenChamber({
  content,
  onContentChange,
  onAnalyze,
  isAnalyzing
}: SpecimenChamberProps) {
  return (
    <div className="glass-strong rounded-2xl p-8 relative overflow-hidden">
      {/* Animated scan line */}
      {isAnalyzing && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse-slow" />
        <h2 className="text-xl font-semibold text-cyan-300 mono">
          SPECIMEN CHAMBER
        </h2>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Submit content for cognitive manipulation analysis. Supports text, transcripts, articles, posts, and speeches.
      </p>

      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Paste content here for analysis..."
        className="w-full h-96 bg-purple-950/50 border border-purple-700/50 rounded-xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none mono text-sm"
        disabled={isAnalyzing}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="text-xs text-gray-500 mono">
          {content.length} characters · {content.split(/\s+/).filter(w => w).length} words
        </div>
        
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !content.trim()}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all
            ${isAnalyzing || !content.trim()
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 animate-glow'
            }
          `}
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              ANALYZING...
            </span>
          ) : (
            'INITIATE ANALYSIS'
          )}
        </button>
      </div>
    </div>
  );
}
