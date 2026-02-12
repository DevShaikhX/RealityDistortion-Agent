'use client';

import React from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface ReframingPanelProps {
  suggestion: string;
}

export function ReframingPanel({ suggestion }: ReframingPanelProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-strong rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse-slow" />
          <h2 className="text-xl font-semibold text-green-300 mono">
            NEUTRAL REFRAMING
          </h2>
        </div>
        
        <button
          onClick={handleCopy}
          className="px-4 py-2 glass-strong rounded-lg hover:bg-purple-700/30 transition-colors flex items-center gap-2"
        >
          {copied ? (
            <>
              <CheckCircle2 size={16} className="text-green-400" />
              <span className="text-sm text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-purple-950/50 border border-green-500/30 rounded-xl p-6">
        <div className="text-xs text-gray-400 mb-3 mono">RECOMMENDATION:</div>
        <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
          {suggestion}
        </div>
      </div>

      <div className="mt-4 p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
        <p className="text-xs text-gray-400 leading-relaxed">
          💡 <strong>Note:</strong> These suggestions aim to present information more neutrally, 
          removing manipulative framing while preserving factual content. Always verify claims 
          independently and consider multiple perspectives.
        </p>
      </div>
    </div>
  );
}
