'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Compass,
  Search,
  Zap,
  Radio,
  Eye,
  Video,
  UserCheck,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Volume2,
  Film
} from 'lucide-react';
import { toast } from 'sonner';

interface WorkspaceHubModuleProps {
  onNavigate: (tab: any) => void;
  tokens: number;
}

export const WorkspaceHubModule: React.FC<WorkspaceHubModuleProps> = ({
  onNavigate,
  tokens
}) => {
  const [heroPrompt, setHeroPrompt] = useState('');

  const quickChips = [
    'Student blog',
    'Promoting a coffee shop',
    'Skincare',
    'Quick recipes',
    'Tips for entrepreneurs'
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim()) return;
    toast.success(`Scanning outliers for: "${heroPrompt}"`);
    onNavigate('search');
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Workspace</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Workspace</h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Find viral videos, break them down and turn them into your own content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Hero Search + 4 Category Quadrants */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Search Box */}
          <GlassCard className="p-6 space-y-4 border-orange-500/20">
            <form onSubmit={handleHeroSearch} className="relative flex items-center">
              <div className="absolute left-4 text-orange-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder="Describe the video you want to find..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500/60 text-sm shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs shadow-md flex items-center gap-1 transition-all"
              >
                Find <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroPrompt(chip)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-orange-500/30 text-neutral-300 hover:text-white whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Sounds Speeding Up Ticker */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs text-neutral-400 overflow-x-auto no-scrollbar">
              <span className="font-semibold text-neutral-300 shrink-0 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                Sounds speeding up
              </span>
              <span
                onClick={() => onNavigate('audio')}
                className="cursor-pointer hover:text-white shrink-0 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full"
              >
                🎵 Nanna Kambali From &quot;Anant...&quot;{' '}
                <strong className="text-emerald-400 font-mono">×4.3</strong>
              </span>
              <span
                onClick={() => onNavigate('audio')}
                className="cursor-pointer hover:text-white shrink-0 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full"
              >
                🎵 Rohitani Pavari{' '}
                <strong className="text-emerald-400 font-mono">×4.3</strong>
              </span>
              <span
                onClick={() => onNavigate('audio')}
                className="cursor-pointer hover:text-white shrink-0 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full"
              >
                🎵 ROAD TO LA{' '}
                <strong className="text-emerald-400 font-mono">×4.3</strong>
              </span>
            </div>
          </GlassCard>

          {/* 4 Navigation Quadrants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. SEARCH */}
            <GlassCard className="p-5 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Search
              </span>
              <div className="space-y-2">
                <div
                  onClick={() => onNavigate('search')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Video Search</h4>
                      <p className="text-[11px] text-neutral-400">Browse viral videos by keyword or platform</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('audio')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Audio Trends</h4>
                      <p className="text-[11px] text-neutral-400">Popular and growing sounds from Reels</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('long')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Long videos</h4>
                      <p className="text-[11px] text-neutral-400">Verticals of long YouTube videos that break out</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('formats')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Trends</h4>
                      <p className="text-[11px] text-neutral-400">Reels formats dozens of creators repeat</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 2. TRACKING */}
            <GlassCard className="p-5 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Tracking
              </span>
              <div className="space-y-2">
                <div
                  onClick={() => onNavigate('radar')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Content Radar</h4>
                      <p className="text-[11px] text-neutral-400">Track keywords and discover trending content</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('spy')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Spy</h4>
                      <p className="text-[11px] text-neutral-400">Monitor competitor accounts and their new videos</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 3. ANALYSIS */}
            <GlassCard className="p-5 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Analysis
              </span>
              <div className="space-y-2">
                <div
                  onClick={() => onNavigate('analysis')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Video Analysis</h4>
                      <p className="text-[11px] text-neutral-400">Break down a video by hook, scenario & retention</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('profile')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Profile Analysis</h4>
                      <p className="text-[11px] text-neutral-400">Analyze a profile across content & positioning</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 4. CREATE & LIBRARY */}
            <GlassCard className="p-5 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Create & Library
              </span>
              <div className="space-y-2">
                <div
                  onClick={() => onNavigate('carousels')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Carousels</h4>
                      <p className="text-[11px] text-neutral-400">Build a carousel from an idea or reference</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('templates')}
                  className="p-2.5 rounded-xl bg-neutral-900/40 hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Templates</h4>
                      <p className="text-[11px] text-neutral-400">Repeatable video formats creators stick to</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Col: Token Quota & Cost Box (Exact Spytrend Screenshot 3) */}
        <div>
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-300 fill-purple-300" />
                </div>
                <h3 className="text-sm font-bold text-white">Tokens</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Start
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {tokens.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400">of 2,500</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                  style={{ width: `${(tokens / 2500) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">
                new 2,500 on Nov 10, 2026
              </p>
            </div>

            {/* Exact Price List from Code */}
            <div className="space-y-2 pt-3 border-t border-white/5 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-300">AI script</span>
                <span className="font-mono font-bold text-white">15 tok.</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-300">Video analysis</span>
                <span className="font-mono font-bold text-white">5 tok.</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-300">Script from a video</span>
                <span className="font-mono font-bold text-white">5 tok.</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-300">Profile analysis</span>
                <span className="font-mono font-bold text-white">100 tok.</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-300">Carousel</span>
                <span className="font-mono font-bold text-white">120 tok.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onNavigate('settings')}
                className="py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                Top up
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors"
              >
                Subscriptions
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
