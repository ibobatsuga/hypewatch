'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { VideoItem, Platform } from '../../types';
import { INITIAL_VIDEOS } from '../../data/mockData';
import {
  Search,
  Filter,
  Flame,
  Calendar,
  Globe,
  Film,
  RotateCcw,
  Play,
  Share2,
  Download,
  Radio,
  Bookmark,
  Sparkles,
  HelpCircle,
  X,
  FileText,
  Languages
} from 'lucide-react';
import { toast } from 'sonner';

interface VideoSearchModuleProps {
  onAnalyzeVideo: (video: VideoItem) => void;
  onAdaptScript: (video: VideoItem) => void;
}

export const VideoSearchModule: React.FC<VideoSearchModuleProps> = ({
  onAnalyzeVideo,
  onAdaptScript
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platform, setPlatform] = useState<Platform>('all');
  const [hasFireOnly, setHasFireOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'views' | 'fire' | 'recent' | 'likes'>('views');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showGuide, setShowGuide] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);

  const quickChips = [
    'Student blog',
    'Promoting a coffee shop',
    'Skincare',
    'Quick recipes',
    'Tips for entrepreneurs'
  ];

  const handleFavoriteToggle = (id: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
    toast.success('Updated bookmarks library');
  };

  const filteredVideos = videos
    .filter((v) => {
      if (platform !== 'all' && v.platform !== platform) return false;
      if (hasFireOnly && v.fireScore < 100) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.caption.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.creatorName.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let diff = 0;
      if (sortBy === 'views') diff = b.views - a.views;
      else if (sortBy === 'fire') diff = b.fireScore - a.fireScore;
      else if (sortBy === 'likes') diff = b.likes - a.likes;
      else diff = a.daysAgo - b.daysAgo;
      return sortOrder === 'desc' ? diff : -diff;
    });

  return (
    <div className="space-y-6 pb-28">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Video Search</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Video Search</h1>
            <p className="text-xs text-neutral-400">
              Instagram Reels, YouTube Shorts and videos — filter by fire (ER — engagement rate), views, likes, followers and date.
            </p>
          </div>
        </div>
      </div>

      {/* Main Search Bar & Quick Filters */}
      <GlassCard className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by keyword, hook, or niche..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/60"
            />
            <button
              onClick={() => setShowGuide(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              title="Section Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toast.info('Searching with current parameters...')}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-[0_0_20px_-3px_rgba(249,115,22,0.5)] transition-all"
            >
              Search
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs flex items-center gap-1.5 transition-colors">
              <Filter className="w-4 h-4" />
              More filters
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip)}
              className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/5 hover:border-orange-500/40 text-neutral-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
          {/* Platforms */}
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs font-semibold text-neutral-300 focus:outline-none focus:border-orange-500"
          >
            <option value="all">All platforms</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>

          {/* Fire Toggle */}
          <button
            onClick={() => setHasFireOnly(!hasFireOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              hasFireOnly
                ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'bg-neutral-900/70 border border-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            Has ER fire
          </button>

          {/* Date preset */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs text-neutral-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Oct 27 – Nov 3</span>
          </div>

          {/* Country */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs text-neutral-300 font-medium">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>🇮🇩 Indonesia</span>
          </div>

          {/* Template */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs text-neutral-300 font-medium">
            <Film className="w-3.5 h-3.5 text-neutral-400" />
            <span>All templates</span>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setSearchQuery('');
              setPlatform('all');
              setHasFireOnly(false);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        </div>

        {/* Sorting controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
            {(['views', 'fire', 'recent', 'likes'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSortBy(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  sortBy === mode
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                By {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                sortOrder === 'desc' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
              }`}
            >
              Highest first
            </button>
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                sortOrder === 'asc' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
              }`}
            >
              Lowest first
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Video Outliers Grid (9:16 Aspect Ratio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col justify-between border border-white/10 hover:border-orange-500/40 transition-all duration-300"
          >
            {/* Top Media Thumbnail with Overlays */}
            <div className="relative aspect-[9/14] w-full overflow-hidden bg-neutral-950">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Dark Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

              {/* Platform Badge (Top Left) */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white">
                {video.platform}
              </div>

              {/* Action Toolbar (Top Right) */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                <button
                  onClick={() =>
                    toast.success('Share link copied to clipboard')
                  }
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    toast.success('Downloading video asset (clean no-watermark)...')
                  }
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Download clean video"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    toast.success('Added creator to Content Radar tracking')
                  }
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Track on Radar"
                >
                  <Radio className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleFavoriteToggle(video.id)}
                  className={`w-8 h-8 rounded-full backdrop-blur-md border border-white/15 flex items-center justify-center transition-colors ${
                    video.isFavorite
                      ? 'bg-orange-500 text-white'
                      : 'bg-black/60 text-white hover:bg-white/20'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Duration pill */}
              <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold bg-black/75 px-1.5 py-0.5 rounded text-white border border-white/10">
                {video.duration}
              </span>
            </div>

            {/* Metrics & Action Card Body */}
            <div className="p-3.5 space-y-3 bg-neutral-900/80 backdrop-blur-md">
              {/* Reach & Fire Score */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-white flex items-center gap-1">
                    👁 {(video.views / 1000000).toFixed(1)}M
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    {video.daysAgo} days ago
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full badge-fire text-xs font-black tracking-wide inline-flex items-center gap-1">
                    🔥 ×{video.fireScore}
                  </span>
                  <div className="text-[9px] text-neutral-400">vs expected reach</div>
                </div>
              </div>

              {/* Engagement stats */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-white/5">
                <span>❤️ {(video.likes / 1000).toFixed(0)}K</span>
                <span>💬 {video.comments}</span>
                <span className="text-neutral-500 truncate max-w-[100px]">
                  {video.category}
                </span>
              </div>

              {/* Actions Toolbar */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => onAnalyzeVideo(video)}
                  className="col-span-2 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Analyze
                </button>

                <button
                  onClick={() => onAdaptScript(video)}
                  className="py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center transition-colors"
                  title="Adapt script"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Guide Modal (Replicating Screenshot 2) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl p-6 rounded-3xl glass-panel border border-white/15 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Section Guide
              </span>
              <button
                onClick={() => setShowGuide(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Illustration preview */}
            <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden p-2 bg-neutral-950/70 border border-white/10">
              {INITIAL_VIDEOS.slice(0, 4).map((v) => (
                <div key={v.id} className="relative aspect-[9/14] rounded-lg overflow-hidden">
                  <img src={v.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[8px] bg-black/80 px-1 text-orange-400 font-bold rounded">
                    🔥 ×{v.fireScore}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Find videos that stand out</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Enter a topic or phrase to see videos that reached significantly more people than usual. We compare every video against its channel baseline to reveal proven outlier hooks.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-neutral-400">1 of 3</span>
              <button
                onClick={() => setShowGuide(false)}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
