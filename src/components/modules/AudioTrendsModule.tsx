'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { AUDIO_TRENDS } from '../../data/mockData';
import {
  Volume2,
  HelpCircle,
  TrendingUp,
  Flame,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

export const AudioTrendsModule: React.FC = () => {
  const [activeTabDays, setActiveTabDays] = useState('7 days');

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span>Content AI</span>
            <span>&gt;</span>
            <span className="text-white font-medium">Audio Trends</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-orange-400" />
            Audio Trends
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            A combined sound ranking for Instagram creators and YouTube Shorts. · 50 sounds in the ranking
          </p>
        </div>

        <button
          onClick={() =>
            toast.info('Audio Ranking Methodology', {
              description: 'Ranked by ratio of outlier viral videos to total audio uses'
            })
          }
          className="px-3.5 py-1.5 rounded-xl bg-neutral-900/60 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 self-start"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          How to read the ranking
        </button>
      </div>

      {/* Filter Bar */}
      <GlassCard className="p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-neutral-900/80 p-1 rounded-xl border border-white/5 text-xs font-semibold">
            {['3 days', '7 days', '14 days', '30 days', '90 days'].map((d) => (
              <button
                key={d}
                onClick={() => setActiveTabDays(d)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeTabDays === d ? 'bg-orange-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 font-medium">
            Most videos with fires
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 font-medium">
            🇮🇩 All countries
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3 fill-current" /> Viral
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-neutral-300 border border-white/10 font-semibold">
            Instagram Trend
          </span>
        </div>
      </GlassCard>

      {/* KPI Stats (Exact Spytrend Screenshot 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <span className="text-xs text-neutral-400 font-medium">Videos with audio</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">4,638,731</div>
          <span className="text-[11px] text-neutral-500">in 7 days</span>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-xs text-neutral-400 font-medium">Unique audios</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">338,827</div>
          <span className="text-[11px] text-neutral-500">in the author base</span>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-xs text-neutral-400 font-medium">New audios</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">133,644</div>
          <span className="text-[11px] text-neutral-500">in 7 days</span>
        </GlassCard>
      </div>

      {/* Sound Ranking Rows */}
      <div className="space-y-3">
        {AUDIO_TRENDS.map((audio) => (
          <GlassCard key={audio.id} hoverEffect className="p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="w-6 text-sm font-extrabold font-mono text-neutral-400">
                  {audio.rank}
                </span>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 text-orange-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-400 uppercase">
                      [{audio.platform}]
                    </span>
                    <h3 className="text-base font-bold text-white">{audio.title}</h3>
                    {audio.badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{audio.artist}</p>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                    FIRES
                  </span>
                  <div className="text-sm font-bold text-white font-mono">
                    {audio.fireVideos.toLocaleString()} of {audio.totalVideos.toLocaleString()}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                    PACE
                  </span>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    +{audio.paceDaily}/day ↗{audio.paceTrend}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                    VIDEOS
                  </span>
                  <div className="text-sm font-bold text-white font-mono">
                    {audio.totalVideos.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() =>
                    toast.success(`Opening details for sound: ${audio.title}`, {
                      description: `Pace: +${audio.paceDaily}/day · Total videos: ${audio.totalVideos}`
                    })
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
