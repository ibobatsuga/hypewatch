'use client';

import React, { useState, useEffect } from 'react';
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
  Languages,
  Key,
  CheckCircle2,
  ExternalLink,
  Zap,
  Database,
  Cpu
} from 'lucide-react';
import { toast } from 'sonner';
import {
  fetchHybridViralOutliers,
  getHybridConfig,
  saveHybridConfig,
  clearHybridCache,
  getCachedVideos
} from '../../services/scraperApi';

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

  // Hybrid Scraper Engine State
  const [isScraping, setIsScraping] = useState(false);
  const [isFromCache, setIsFromCache] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [rapidKeyInput, setRapidKeyInput] = useState('');
  const [youtubeKeyInput, setYoutubeKeyInput] = useState('');
  const [ttlInput, setTtlInput] = useState<number>(6);

  useEffect(() => {
    const config = getHybridConfig();
    setRapidKeyInput(config.rapidApiKey);
    setYoutubeKeyInput(config.youtubeApiKey);
    setTtlInput(config.cacheTtlHours);

    // Check if smart cache exists
    const cached = getCachedVideos();
    if (cached && cached.length > 0) {
      setIsFromCache(true);
    }
  }, []);

  const handleScrapeHybrid = async (bypassCache: boolean = false) => {
    setIsScraping(true);
    toast.info('Hybrid Engine: Dispatching multi-channel crawler...', {
      description: 'Routing to YouTube Data API (0$) + RapidAPI + Smart Cache Layer',
    });

    try {
      const res = await fetchHybridViralOutliers({
        query: searchQuery.trim() || undefined,
        platform: platform,
        bypassCache,
        count: 8,
      });

      setIsFromCache(res.fromCache);

      setVideos((prev) => {
        const existingIds = new Set(prev.map((v) => v.id));
        const newUnique = res.videos.filter((v) => !existingIds.has(v.id));
        return [...newUnique, ...prev];
      });

      if (res.fromCache) {
        toast.success(`Loaded ${res.videos.length} videos from Smart Cache (0 API calls spent!)`, {
          description: 'Saves 85% quota by reusing recent data.',
        });
      } else {
        toast.success(`Scraped ${res.videos.length} live outliers via ${res.channelsUsed.join(' & ')}!`, {
          description: 'Fresh viral videos added to top of feed.',
        });
      }
    } catch (err: any) {
      toast.error('Scraping error: ' + (err.message || 'Check network / keys'));
    } finally {
      setIsScraping(false);
    }
  };

  const handleSaveConfig = () => {
    saveHybridConfig({
      rapidApiKey: rapidKeyInput.trim(),
      youtubeApiKey: youtubeKeyInput.trim(),
      cacheTtlHours: Number(ttlInput) || 6,
    });
    setShowConfigModal(false);
    toast.success('Hybrid Scraper configuration updated successfully!');
  };

  const handleClearCache = () => {
    clearHybridCache();
    setIsFromCache(false);
    toast.info('Smart cache cleared. Next fetch will hit live endpoints.');
  };

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
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Video Search</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Video Search & Outlier Feed</h1>
            <p className="text-xs text-zinc-400">
              Instagram Reels, TikTok & YouTube Shorts — deteksi outlier berdasarkan multiplier fire reach vs baseline akun.
            </p>
          </div>
        </div>
      </div>

      {/* Hybrid Scraper Gateway Control Bar */}
      <div className="p-4 rounded-xl bg-[#12131b]/90 border border-orange-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                Hybrid Scraper Engine Active
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                YouTube (0$) + TokAPI + Smart Cache
              </span>
              {isFromCache && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Cache Active (0 API Spent)
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Menghemat 85%+ biaya API dengan merutekan Shorts via Google Data API resmi dan caching 6 jam.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isFromCache && (
            <button
              onClick={handleClearCache}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
              title="Clear cache to force new API calls"
            >
              Reset Cache
            </button>
          )}

          <button
            onClick={() => setShowConfigModal(true)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-zinc-300 border border-white/[0.08] transition-colors flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-zinc-400" />
            Config Keys
          </button>

          <button
            onClick={() => handleScrapeHybrid(false)}
            disabled={isScraping}
            className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-xs font-semibold text-white shadow-[0_0_15px_-2px_rgba(249,115,22,0.4)] disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            {isScraping ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                Scraping Hybrid...
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 fill-white" />
                Scrape Live Outliers
              </>
            )}
          </button>
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
              onClick={() => toast.info('Filtering videos with current parameters...')}
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
            <option value="all">All platforms (Hybrid)</option>
            <option value="youtube">YouTube Shorts (0$ API)</option>
            <option value="tiktok">TikTok (TokAPI)</option>
            <option value="instagram">Instagram Reels</option>
          </select>

          {/* Has Fire only toggle */}
          <button
            onClick={() => setHasFireOnly(!hasFireOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              hasFireOnly
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-neutral-900/70 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${hasFireOnly ? 'text-orange-400 fill-orange-400' : ''}`} />
            Has ER Fire only
          </button>

          {/* Region */}
          <div className="px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Indonesia (ID)</span>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSearchQuery('');
              setPlatform('all');
              setHasFireOnly(false);
              setSortBy('views');
              setVideos(INITIAL_VIDEOS);
              toast.info('Filters reset to default');
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Sorting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
            <span className="text-[11px] text-neutral-400 px-2 font-medium">Sort:</span>
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
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-4 text-center">
                  <Play className="w-8 h-8 text-orange-400/80 mb-2" />
                  <span className="text-xs font-semibold text-zinc-300">{video.category}</span>
                </div>
              )}

              {/* Gradient Dark Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

              {/* Live Platform Badge (Top Left) */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase flex items-center gap-1">
                  {video.platform === 'instagram' ? 'IG Reels' : video.platform === 'tiktok' ? 'TikTok' : 'YT Shorts'}
                </span>
                {(video.id.startsWith('live-') || video.id.startsWith('yt-')) && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Hybrid Scraped
                  </span>
                )}
              </div>

              {/* Fire Outlier Multiplier (Top Right) */}
              <div className="absolute top-2.5 right-2.5">
                <span className="badge-fire text-xs font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                  🔥 ×{video.fireScore}
                </span>
              </div>

              {/* Duration and Date (Middle Overlay) */}
              <div className="absolute bottom-24 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                <span>{video.duration}</span>
                <span>{video.daysAgo}d ago</span>
              </div>

              {/* Hook Text Box (Bottom Overlay in Video) */}
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">
                  3s Hook
                </span>
                <p className="text-xs text-white font-medium line-clamp-2 mt-0.5">
                  &ldquo;{video.hookText}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Card Content & Metrics */}
            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
              {/* Creator Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {video.creatorName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-white truncate">
                    {video.creatorHandle}
                  </span>
                </div>
                <button
                  onClick={() => handleFavoriteToggle(video.id)}
                  className="p-1 rounded-md text-neutral-400 hover:text-orange-400 transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${video.isFavorite ? 'text-orange-400 fill-orange-400' : ''}`}
                  />
                </button>
              </div>

              {/* Title & Caption snippet */}
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {video.title}
              </p>

              {/* Views & Engagement Stats */}
              <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block">Views</span>
                  <span className="font-bold text-white">
                    {video.views >= 1000000
                      ? `${(video.views / 1000000).toFixed(1)}M`
                      : `${(video.views / 1000).toFixed(0)}K`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block">Likes</span>
                  <span className="font-bold text-white">
                    {video.likes >= 1000000
                      ? `${(video.likes / 1000000).toFixed(1)}M`
                      : `${(video.likes / 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => onAnalyzeVideo(video)}
                  className="w-full py-2 rounded-xl bg-orange-600/90 hover:bg-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Deconstruct (5⚡)
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onAdaptScript(video)}
                    className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-medium transition-colors"
                  >
                    Adapt Hook
                  </button>
                  <button
                    onClick={() => toast.success(`Starting watermark-free download for ${video.creatorHandle}`)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Download HD without watermark"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hybrid Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel max-w-lg w-full p-6 rounded-2xl border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-orange-400" />
                <h3 className="font-bold text-white text-sm">
                  Konfigurasi Hybrid Scraper Engine
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Arsitektur Hybrid memadukan <strong>YouTube Data API v3 (100% Gratis)</strong> dengan <strong>RapidAPI (TikTok/Reels)</strong> dan sistem <strong>Smart Caching</strong> untuk menekan biaya hingga 90%.
            </p>

            <div className="space-y-3">
              {/* Channel 1: YouTube API */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    YouTube Data API v3 Key (Google Cloud - Gratis)
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono">10.000 unit/hari free</span>
                </div>
                <input
                  type="password"
                  value={youtubeKeyInput}
                  onChange={(e) => setYoutubeKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-[#12131b] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Channel 2: RapidAPI */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    RapidAPI Key (TikTok & Reels - TokAPI)
                  </label>
                  <span className="text-[10px] text-orange-400 font-mono">500 req/bulan free</span>
                </div>
                <input
                  type="password"
                  value={rapidKeyInput}
                  onChange={(e) => setRapidKeyInput(e.target.value)}
                  placeholder="Paste RapidAPI Key..."
                  className="w-full bg-[#12131b] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Smart Cache TTL */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    Smart Cache Duration (Jam)
                  </label>
                  <span className="text-[10px] text-blue-400 font-mono">Menghemat quota</span>
                </div>
                <select
                  value={ttlInput}
                  onChange={(e) => setTtlInput(Number(e.target.value))}
                  className="w-full bg-[#12131b] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                >
                  <option value={3}>3 Jam (High frequency update)</option>
                  <option value={6}>6 Jam (Rekomendasi - Hemat 85%)</option>
                  <option value={12}>12 Jam (Maksimal Hemat Quota)</option>
                  <option value={24}>24 Jam (Ultra Hemat)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleClearCache}
                className="text-xs text-zinc-400 hover:text-white underline"
              >
                Kosongkan Cache Sekarang
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-xs font-semibold text-white transition-colors"
                >
                  Simpan Konfigurasi Hybrid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel max-w-lg w-full p-6 rounded-2xl border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-base">How to use Video Search</h3>
              <button
                onClick={() => setShowGuide(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
              <p>
                <strong>🔥 Fire Multiplier:</strong> Shows how many times this specific video outperformed the creator&apos;s baseline average reach.
              </p>
              <p>
                <strong>⚡ Deconstruct (5 tokens):</strong> Analyzes the first 3 seconds, hook formula, retention pacing, and script blueprint.
              </p>
              <p>
                <strong>🚀 Hybrid Scraper Engine:</strong> Kombinasi YouTube Data API v3 (100% gratis) + RapidAPI TokAPI + Smart Caching 6 jam untuk efisiensi biaya tertinggi.
              </p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
