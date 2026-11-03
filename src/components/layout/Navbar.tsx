'use client';

import React from 'react';
import {
  Flame,
  Search,
  Compass,
  Radio,
  Eye,
  Sparkles,
  Layers,
  Wrench,
  UserCheck,
  Bell,
  Zap,
  Globe,
  Film
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'search'
  | 'workspace'
  | 'audio'
  | 'long'
  | 'formats'
  | 'radar'
  | 'spy'
  | 'analysis'
  | 'profile'
  | 'similar'
  | 'gpt'
  | 'carousels'
  | 'templates'
  | 'tools'
  | 'cabinet'
  | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tokens: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, tokens }) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Flame },
    { id: 'workspace', label: 'Workspace', icon: Compass },
    { id: 'search', label: 'Video Search', icon: Search },
    { id: 'radar', label: 'Radar', icon: Radio },
    { id: 'spy', label: 'Spy', icon: Eye },
    { id: 'gpt', label: 'AI Script', icon: Sparkles },
    { id: 'carousels', label: 'Carousels', icon: Layers },
    { id: 'templates', label: 'Templates', icon: Film },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'cabinet', label: 'Cabinet', icon: UserCheck }
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_-3px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform duration-300">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              HypeLab
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                AI 2.0
              </span>
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">Virality & Trend Engine</span>
          </div>
        </div>

        {/* Central Floating Glass Pill Nav */}
        <nav className="hidden xl:flex items-center p-1.5 rounded-full bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_10px_25px_-5px_rgba(0,0,0,0.7)] gap-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_0_15px_-2px_rgba(249,115,22,0.6)]'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Toolbar */}
        <div className="flex items-center gap-3">
          {/* Token Pill (Exact Spytrend Spec) */}
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/70 border border-orange-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_15px_-3px_rgba(249,115,22,0.2)] hover:border-orange-500/60 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
              <Zap className="w-3 h-3 text-purple-300 fill-purple-300" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              {tokens.toLocaleString()}
            </span>
            <div className="w-12 h-1.5 rounded-full bg-neutral-800 overflow-hidden ml-0.5">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                style={{ width: `${(tokens / 2500) * 100}%` }}
              />
            </div>
          </button>

          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-full bg-neutral-900/60 border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-colors">
            <Bell className="w-4 h-4 text-neutral-300" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
          </button>

          {/* Language badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900/60 border border-white/10 text-xs font-semibold text-neutral-300">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>EN</span>
          </div>

          {/* User Profile */}
          <button
            onClick={() => setActiveTab('cabinet')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-neutral-900/60 border border-white/10 hover:border-orange-500/40 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-orange-500/50"
            />
            <span className="hidden md:inline text-xs font-semibold text-white">Bobi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
