'use client';

import React, { useState } from 'react';
import { Zap, ArrowUp, Maximize2, GraduationCap, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CopilotDockProps {
  onExecutePrompt: (prompt: string) => void;
  onOpenLessons?: () => void;
}

export const CopilotDock: React.FC<CopilotDockProps> = ({ onExecutePrompt, onOpenLessons }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const quickPrompts = [
    'What video formats broke out in Indonesia this week?',
    'Why is coffee shop espresso tonic going viral?',
    'Extract 10 hook formulas from 17M view Reels',
    'Generate 14-day content plan for entrepreneurs'
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    toast.success(`HypeLab Copilot: Processing "${query}"...`, {
      description: 'Analyzing viral outliers across Instagram Reels & TikTok'
    });
    onExecutePrompt(query);
    setQuery('');
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-3xl px-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-2">
        {/* Quick Suggestion Pills */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {quickPrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(prompt);
                handleSubmit();
              }}
              className="text-[11px] font-medium px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all whitespace-nowrap shadow-md"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Floating Copilot Glowing Capsule */}
        <div className="relative flex items-center p-1.5 rounded-full copilot-glow">
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2.5 px-3">
            {/* AI Icon Badge */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.6)] shrink-0">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask HypeLab AI: 'What is new over Oct 4 – Nov 3?' or paste a link..."
              className="flex-1 bg-transparent text-sm text-white placeholder-neutral-400 focus:outline-none"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Expand"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20 hover:bg-orange-500 hover:border-orange-400 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Floating Speed Dials on Right */}
          <div className="absolute -right-14 bottom-0 flex flex-col gap-2 pointer-events-auto">
            <button
              onClick={onOpenLessons}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 border border-white/20 text-white flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-105 transition-transform"
              title="Creator Lessons"
            >
              <GraduationCap className="w-5 h-5" />
            </button>

            <button
              onClick={() =>
                toast.info('HypeLab Copilot Active', {
                  description: 'Ready to assist with hook formulas and virality audits'
                })
              }
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border border-white/20 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform"
              title="Live AI Copilot"
            >
              <Sparkles className="w-5 h-5 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
