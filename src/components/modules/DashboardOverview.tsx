'use client';

import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { ViralityGauge } from '../common/ViralityGauge';
import { INITIAL_VIDEOS, AUDIO_TRENDS, RADAR_WORKSPACES } from '../../data/mockData';
import {
  TrendingUp,
  Radio,
  Zap,
  ArrowUpRight,
  Flame,
  Play,
  Share2,
  Bookmark,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
  onAnalyzeVideo: (video: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onAnalyzeVideo
}) => {
  return (
    <div className="space-y-6 pb-28">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Good evening, Bobi
            </h1>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Radar intelligence is active across Indonesia reels & TikTok. 2,934 outliers captured today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow-[0_0_20px_-3px_rgba(249,115,22,0.4)] transition-all flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            Live Outliers Feed
          </button>
          <button
            onClick={() => onNavigate('radar')}
            className="px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] text-zinc-300 font-medium text-xs border border-white/[0.08] transition-all flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-zinc-400" />
            Manage Radars
          </button>
        </div>
      </div>

      {/* 4 Precision KPI Glass Cards (Signal AI Aesthetic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="glass-panel p-4.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
            <span>Viral Spikes (24H)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight font-mono tabular-nums">
              2,934
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                +14.2%
              </span>
              <span className="text-[11px] text-zinc-500">vs 30d baseline</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-4.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
            <span>Active Radars</span>
            <Radio className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight font-mono tabular-nums">
              16
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/25">
                3 Workspaces
              </span>
              <span className="text-[11px] text-zinc-500">daily automated scans</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-4.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
            <span>Peak Outlier Fire</span>
            <Flame className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight font-mono tabular-nums">
              248.5×
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30">
                🔥 Extreme Reach
              </span>
              <span className="text-[11px] text-zinc-500">top 0.1% tier</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-4.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] font-semibold tracking-wider uppercase">
            <span>Token Quota</span>
            <Zap className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight font-mono tabular-nums">
              2,500
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/25">
                Start Plan
              </span>
              <span className="text-[11px] text-zinc-500">renews 10 Nov 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Outlier Signals & Virality Sentiment Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Viral Signals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5 rounded-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    Active Viral Outliers
                  </h2>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">
                    Real-Time Signals
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Content performing significantly higher than account baseline expectation
                </p>
              </div>

              <button
                onClick={() => onNavigate('search')}
                className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
              >
                View all feed <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Outlier Signals */}
            <div className="divide-y divide-white/[0.05] mt-2">
              {INITIAL_VIDEOS.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Thumbnail / Platform Indicator */}
                    <div className="w-10 h-14 rounded-md bg-[#181a24] border border-white/[0.08] relative overflow-hidden shrink-0 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white/70" />
                      <span className="absolute bottom-1 right-1 text-[8px] font-bold uppercase px-1 rounded bg-black/70 text-zinc-300">
                        {video.platform === 'instagram' ? 'IG' : 'TT'}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-200 truncate">
                          {video.creatorHandle}
                        </span>
                        <span className="badge-fire text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded flex items-center gap-1">
                          🔥 ×{video.fireScore}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          ER {((video.likes / video.views) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-normal line-clamp-1 mt-0.5">
                        {video.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 italic line-clamp-1 mt-0.5">
                        &ldquo;{video.hookText}&rdquo;
                      </p>
                    </div>
                  </div>

                    {/* Right side stats & action */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-semibold text-zinc-200 font-mono tabular-nums">
                          {video.views >= 1000000
                            ? `${(video.views / 1000000).toFixed(1)}M`
                            : `${(video.views / 1000).toFixed(0)}K`}{' '}
                          views
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">
                          +{video.likes >= 1000000
                            ? `${(video.likes / 1000000).toFixed(1)}M`
                            : `${(video.likes / 1000).toFixed(1)}K`}{' '}
                          likes
                        </div>
                      </div>

                      <button
                        onClick={() => onAnalyzeVideo(video)}
                        className="px-2.5 py-1.5 rounded-md bg-white/[0.05] hover:bg-orange-500/20 text-zinc-300 hover:text-orange-300 border border-white/[0.08] hover:border-orange-500/30 text-xs font-medium transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        Deconstruct (5⚡)
                      </button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Market Virality Gauge (Signal AI Style) */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Virality Sentiment
              </span>
              <span className="text-[10px] font-mono font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                LIVE INDEX
              </span>
            </div>

            <div className="my-3">
              <ViralityGauge score={88} label="Extreme Virality" />
            </div>

            <div className="w-full space-y-2 mt-2 pt-3 border-t border-white/[0.06] text-left text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Algorithm Favorability</span>
                <span className="text-zinc-200 font-mono font-medium">94%</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Avg 3s Retention Rate</span>
                <span className="text-emerald-400 font-mono font-medium">68.4%</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Peak Posting Window</span>
                <span className="text-zinc-200 font-mono font-medium">18:30 – 21:00 WIB</span>
              </div>
            </div>
          </div>

          {/* Quick Script Access */}
          <div className="glass-panel p-4.5 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-semibold text-zinc-200">
                AI Scriptwriter Short-cut
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Adapt top trending hooks directly into your personalized tone of voice.
            </p>
            <button
              onClick={() => onNavigate('gpt')}
              className="w-full py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-white transition-colors flex items-center justify-center gap-2"
            >
              Generate Viral Script (15⚡)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Feature Cards: Audio Velocity, Formats & Radars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Audio Radar */}
        <div className="glass-panel p-4.5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎵</span>
              <h3 className="text-xs font-semibold text-zinc-200">Audio Velocity</h3>
            </div>
            <button
              onClick={() => onNavigate('audio')}
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              View 50
            </button>
          </div>
          <div className="space-y-2">
            {AUDIO_TRENDS.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between text-xs py-1 border-b border-white/[0.03]"
              >
                <div className="truncate mr-2">
                  <p className="text-zinc-300 font-medium truncate">{a.title}</p>
                  <p className="text-[10px] text-zinc-500">{a.artist}</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                  +{a.paceDaily}/day
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Formats */}
        <div className="glass-panel p-4.5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎬</span>
              <h3 className="text-xs font-semibold text-zinc-200">Breakout Formats</h3>
            </div>
            <button
              onClick={() => onNavigate('formats')}
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              All Formats
            </button>
          </div>
          <div className="space-y-2">
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs font-medium text-zinc-200">One Outfit Multiple Poses</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">+480% adoption in ID fashion</p>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs font-medium text-zinc-200">The 3-Second Hard Cut Hook</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">82% average completion rate</p>
            </div>
          </div>
        </div>

        {/* Competitor Spy */}
        <div className="glass-panel p-4.5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎯</span>
              <h3 className="text-xs font-semibold text-zinc-200">Tracked Radars</h3>
            </div>
            <button
              onClick={() => onNavigate('radar')}
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              Configure
            </button>
          </div>
          <div className="space-y-2">
            {RADAR_WORKSPACES.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.03]"
              >
                <span className="text-zinc-300 font-medium truncate">{w.name}</span>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">
                  {w.tiktokCount + w.instagramCount} vids
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
