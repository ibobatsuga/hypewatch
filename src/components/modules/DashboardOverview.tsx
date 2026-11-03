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
  ChevronRight
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
    <div className="space-y-6 pb-24">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Good evening, Bobi
            <span className="text-2xl animate-pulse">🔥</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Here is how your content radars and viral outliers are performing today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-[0_0_20px_-3px_rgba(249,115,22,0.5)] transition-all flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 fill-white" />
            View Live Outliers Feed
          </button>
        </div>
      </div>

      {/* 4 Top KPI Glass Cards (Matching Reference Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Viral Spikes Today</span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">2,934</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +14.2% vs avg
              </span>
              <span className="text-xs text-neutral-400">outlier videos</span>
            </div>
          </div>
        </GlassCard>

        {/* Card 2 */}
        <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Active Radars</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Radio className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">16</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                3 Workspaces
              </span>
              <span className="text-xs text-neutral-400">monitoring 24/7</span>
            </div>
          </div>
        </GlassCard>

        {/* Card 3 */}
        <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Avg Fire Score</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">148.2x</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Top 1% viral
              </span>
              <span className="text-xs text-neutral-400">expected reach</span>
            </div>
          </div>
        </GlassCard>

        {/* Card 4 */}
        <GlassCard hoverEffect className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Token Balance</span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">2,500</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Start Plan
              </span>
              <span className="text-xs text-neutral-400">Refill Nov 10</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Two-Column Grid: Outliers Feed vs Virality Dial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Viral Outliers */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                  Top Outliers (Beating Expected Reach)
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Videos that reached significantly more people than the account&apos;s baseline
                </p>
              </div>
              <button
                onClick={() => onNavigate('search')}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of top items */}
            <div className="space-y-3">
              {INITIAL_VIDEOS.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-orange-500/30 transition-all gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 group">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white opacity-80" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 px-1 rounded text-white font-mono">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase">
                          {video.platform}
                        </span>
                        <span className="text-xs font-semibold text-neutral-300">
                          {video.creatorName}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                        <span>{(video.views / 1000000).toFixed(1)}M views</span>
                        <span>•</span>
                        <span className="text-orange-400 font-bold flex items-center gap-1">
                          🔥 ×{video.fireScore} vs avg
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onAnalyzeVideo(video)}
                      className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Analyze
                    </button>
                    <button
                      onClick={() =>
                        toast.success('Link copied to clipboard', {
                          description: `Video: ${video.title}`
                        })
                      }
                      className="w-8 h-8 rounded-lg bg-neutral-800/60 border border-white/10 hover:border-white/20 flex items-center justify-center text-neutral-300 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Workspaces Section */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                Active Radar Workspaces
              </h3>
              <button
                onClick={() => onNavigate('radar')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Manage
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RADAR_WORKSPACES.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => onNavigate('radar')}
                  className="p-3.5 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-purple-500/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{ws.name}</h4>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {ws.keywords.map((kw) => (
                      <span
                        key={kw.id}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10"
                      >
                        {kw.text}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    📸 {ws.instagramCount} Reels · 🎵 {ws.tiktokCount} TikToks
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right 1 Col: Sentiment Gauge & Audio Ticker */}
        <div className="space-y-4">
          {/* Virality Sentiment Dial (Inspired by Signal AI Greed Meter) */}
          <GlassCard className="p-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Virality Sentiment
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
                LIVE
              </span>
            </div>

            <ViralityGauge
              score={88}
              label="Extreme Virality"
              sublabel="High organic reach window across Meta & TikTok"
            />

            <div className="w-full mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
              <span>Baseline: 45 Normal</span>
              <span className="text-orange-400 font-bold">88 Extreme Hype</span>
            </div>
          </GlassCard>

          {/* Audio Velocity Ticker */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Sounds Speeding Up
              </h3>
              <button
                onClick={() => onNavigate('audio')}
                className="text-xs text-orange-400 hover:text-orange-300"
              >
                All 50
              </button>
            </div>

            <div className="space-y-2.5">
              {AUDIO_TRENDS.slice(0, 3).map((audio) => (
                <div
                  key={audio.id}
                  onClick={() => onNavigate('audio')}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/40 hover:bg-neutral-800/50 cursor-pointer border border-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      #{audio.rank}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {audio.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400">{audio.artist}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      ×{audio.paceTrend}
                    </span>
                    <p className="text-[10px] text-neutral-400">+{audio.paceDaily}/day</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
