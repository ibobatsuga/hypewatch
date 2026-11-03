'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { LONG_VERTICALS } from '../../data/mockData';
import { Video, ArrowRight, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const LongTrendsModule: React.FC = () => {
  const [channelInput, setChannelInput] = useState('');

  const handleBenchmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelInput.trim()) return;
    toast.success(`Benchmarking YouTube channel: ${channelInput}`, {
      description: 'Found 8 breakout verticals in your niche from international creators'
    });
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Long videos</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Video className="w-6 h-6 text-red-500" />
          Long-video trends
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Verticals of long YouTube videos: where videos most often beat their channel&apos;s average views.
        </p>
        <p className="text-[11px] text-neutral-500 mt-1">
          Vertical known for 4,760,144 of 4,760,144 long videos · in the table: 318 verticals (at least 50 videos in the period)
        </p>
      </div>

      {/* Channel Benchmarking Box */}
      <GlassCard className="p-4 border-red-500/20">
        <form onSubmit={handleBenchmark} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={channelInput}
              onChange={(e) => setChannelInput(e.target.value)}
              placeholder="youtube.com/@channel or @handle"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/70 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/50"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Show Outliers
          </button>
        </form>
        <span className="text-[11px] text-neutral-400 mt-2 block">
          Enter your channel — we&apos;ll show what breaks out in your niche in other countries
        </span>
      </GlassCard>

      {/* Table / List */}
      <div className="space-y-3">
        {LONG_VERTICALS.map((item) => (
          <GlassCard key={item.rank} hoverEffect className="p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold font-mono text-neutral-400 w-5">
                  #{item.rank}
                </span>

                <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.verticalName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{item.verticalName}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {item.exampleTitle}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-right">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    BROKE OUT
                  </span>
                  <div className="text-sm font-bold text-orange-400 font-mono">
                    {item.brokeOutPercent}%{' '}
                    <span className="text-xs text-neutral-400">({item.brokeOutCount})</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    VIEWS/DAY
                  </span>
                  <div className="text-sm font-bold text-white font-mono">
                    {item.viewsPerDay.toLocaleString()}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    VIDEOS
                  </span>
                  <div className="text-sm font-bold text-white font-mono">
                    {item.totalVideos.toLocaleString()}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    CHANNELS
                  </span>
                  <div className="text-sm font-bold text-neutral-300 font-mono">
                    {item.channelsCount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
