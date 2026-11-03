'use client';

import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { FORMAT_TRENDS } from '../../data/mockData';
import { TrendingUp, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { toast } from 'sonner';

interface FormatTrendsModuleProps {
  onNavigateToTemplates: () => void;
}

export const FormatTrendsModule: React.FC<FormatTrendsModuleProps> = ({
  onNavigateToTemplates
}) => {
  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Trends</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          Format & Mechanics Trends
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Reels formats used by dozens of creators in a week, plus long-form YouTube video formats.{' '}
          <button
            onClick={onNavigateToTemplates}
            className="text-orange-400 hover:underline font-semibold ml-1 inline-flex items-center gap-0.5"
          >
            Shooting templates &rarr;
          </button>
        </p>
        <span className="text-[11px] text-neutral-500 mt-1 block">
          Trends: 43 · Data updated as of today 07:00 AM
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {FORMAT_TRENDS.map((item) => (
          <GlassCard key={item.id} hoverEffect className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative w-28 h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white uppercase">
                    IG
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge === 'Hot'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs text-neutral-300 font-medium">
                      🌍 {item.country}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                    <span className="font-semibold text-white">
                      👥 {item.creatorsCount} creators{' '}
                      <strong className="text-emerald-400">↗+{item.creatorsGrowth}</strong>
                    </span>
                    <span>•</span>
                    <span>🎬 {item.videosCount} videos</span>
                    <span>•</span>
                    <span className="text-orange-400 font-bold">
                      👁 {item.viewsCount} views
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  toast.success(`Adapting script for: ${item.title}`, {
                    description: 'Opening AI Scriptwriter with format mechanics preloaded'
                  })
                }
                className="px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-bold text-xs flex items-center gap-1.5 transition-colors self-start"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Adapt Format
              </button>
            </div>

            {/* Why It Works AI Callout Box */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Why it works (AI Mechanical Analysis):
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.whyItWorks}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
