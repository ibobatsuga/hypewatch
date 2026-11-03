'use client';

import React from 'react';
import {
  Search,
  Zap,
  Bell,
  ChevronRight,
  Globe,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface TopHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tokens: number;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

const TAB_TITLES: Record<ActiveTab, { title: string; category: string }> = {
  dashboard: { title: 'Overview & Virality Signals', category: 'Intelligence' },
  search: { title: 'Video Outliers Search', category: 'Intelligence' },
  workspace: { title: 'Workspace Hub', category: 'Intelligence' },
  radar: { title: 'Content Radar', category: 'Intelligence' },
  spy: { title: 'Competitor Spy', category: 'Intelligence' },
  analysis: { title: 'Video Deep Analysis', category: 'Intelligence' },
  profile: { title: 'Creator Profile Deep Dive', category: 'Intelligence' },
  similar: { title: 'Similar Outliers', category: 'Intelligence' },
  gpt: { title: 'AI Scriptwriter Studio', category: 'Creative Studio' },
  carousels: { title: 'Instagram Carousel Studio', category: 'Creative Studio' },
  templates: { title: 'Cinematic Shooting Templates', category: 'Creative Studio' },
  audio: { title: 'Trending Audios & Velocity', category: 'Creative Studio' },
  long: { title: 'Long-Video Outliers', category: 'Creative Studio' },
  formats: { title: 'Viral Video Formats', category: 'Creative Studio' },
  cabinet: { title: 'Creator Monetization Cabinet', category: 'Monetization' },
  tools: { title: '13 Audio & Video Micro-Tools', category: 'Monetization' },
  settings: { title: 'Account, Subscriptions & MCP', category: 'System' },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  setActiveTab,
  tokens,
  isCollapsed,
  setIsCollapsed,
}) => {
  const currentTabInfo = TAB_TITLES[activeTab] || { title: 'HypeLab', category: 'Dashboard' };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#08090d]/85 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6">
      {/* Left: Section Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium text-zinc-500 uppercase tracking-wider text-[11px]">
          {currentTabInfo.category}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <h1 className="font-semibold text-zinc-200 tracking-tight text-sm">
          {currentTabInfo.title}
        </h1>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search viral reels, tiktok outliers, audios, keywords..."
            className="w-full bg-[#12131b]/80 border border-white/[0.07] focus:border-orange-500/50 rounded-lg pl-9 pr-12 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-zinc-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Region, Tokens Quota & Actions */}
      <div className="flex items-center gap-3">
        {/* Country Filter Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300">
          <span className="text-sm">🇮🇩</span>
          <span className="font-medium text-zinc-300 text-[11px]">Indonesia</span>
        </div>

        {/* Live Token Balance Capsule */}
        <button
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/15 border border-orange-500/25 transition-colors group"
        >
          <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="text-xs font-mono font-semibold text-orange-300">
            {tokens.toLocaleString()}
          </span>
          <span className="text-[10px] text-orange-400/80 uppercase font-semibold tracking-wider">
            Tokens
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        {/* User Avatar */}
        <div
          onClick={() => setActiveTab('cabinet')}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer border border-white/10 hover:ring-2 hover:ring-orange-500/40 transition-all"
          title="Creator Cabinet: Bobi Agusta"
        >
          BA
        </div>
      </div>
    </header>
  );
};
