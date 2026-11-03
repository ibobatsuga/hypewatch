'use client';

import React from 'react';
import {
  Flame,
  Search,
  Radio,
  Eye,
  Sparkles,
  Layers,
  Wrench,
  UserCheck,
  Zap,
  Film,
  Music2,
  Video,
  Shapes,
  FolderKanban,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tokens: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

interface NavSection {
  title: string;
  items: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  tokens,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Flame },
        { id: 'search', label: 'Video Search', icon: Search, badge: 'Live' },
        { id: 'workspace', label: 'Workspace Hub', icon: FolderKanban },
        { id: 'radar', label: 'Content Radar', icon: Radio },
        { id: 'spy', label: 'Competitor Spy', icon: Eye },
      ],
    },
    {
      title: 'CREATIVE STUDIO',
      items: [
        { id: 'gpt', label: 'AI Scriptwriter', icon: Sparkles, badge: 'GPT-4o' },
        { id: 'carousels', label: 'Carousels', icon: Layers },
        { id: 'templates', label: 'Templates', icon: Film, badge: '31' },
        { id: 'audio', label: 'Audio Trends', icon: Music2 },
        { id: 'long', label: 'Long Videos', icon: Video },
        { id: 'formats', label: 'Format Trends', icon: Shapes },
      ],
    },
    {
      title: 'MONETIZATION & TOOLS',
      items: [
        { id: 'cabinet', label: 'Creator Cabinet', icon: UserCheck, badge: '$0.30' },
        { id: 'tools', label: '13 Micro-Tools', icon: Wrench, badge: '13' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings & MCP', icon: Cpu },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-[#0b0c13]/95 backdrop-blur-2xl border-r border-white/[0.07] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header & Single Toggle Button */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-white/[0.06]">
        {isCollapsed ? (
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors group"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ) : (
          <>
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-[0_0_15px_-2px_rgba(249,115,22,0.45)] group-hover:scale-105 transition-transform">
                <Flame className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  HypeLab
                  <span className="text-[9px] uppercase font-mono font-medium px-1 py-0.2 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    PRO
                  </span>
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">Virality Engine</span>
              </div>
            </div>

            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-mono font-semibold tracking-wider text-zinc-500 uppercase">
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-orange-500/10 text-white font-semibold border border-orange-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  {/* Left accent bar for active item */}
                  {isActive && !isCollapsed && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-orange-500" />
                  )}

                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-orange-400'
                        : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  />

                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-white/[0.06] text-zinc-400 border border-white/[0.06]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 text-zinc-100 text-xs rounded-md shadow-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile & Token Quota */}
      <div className="p-3 border-t border-white/[0.06] bg-black/20">
        {!isCollapsed ? (
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">
                BA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate">Bobi Agusta</p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-orange-400 font-medium">{tokens.toLocaleString()}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-500">2,500</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05]"
              title="Account settings"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => setActiveTab('settings')}
            className="w-9 h-9 mx-auto rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:scale-105 transition-transform"
            title={`Bobi Agusta (${tokens.toLocaleString()} tokens)`}
          >
            BA
          </div>
        )}
      </div>
    </aside>
  );
};
