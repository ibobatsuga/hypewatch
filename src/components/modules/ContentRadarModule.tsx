'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { RADAR_WORKSPACES, INITIAL_VIDEOS } from '../../data/mockData';
import { Radio, Plus, Trash2, Play, Flame, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const ContentRadarModule: React.FC = () => {
  const [workspaces, setWorkspaces] = useState(RADAR_WORKSPACES);
  const [selectedWsId, setSelectedWsId] = useState(workspaces[0].id);
  const [newKeyword, setNewKeyword] = useState('');

  const activeWs = workspaces.find((w) => w.id === selectedWsId) || workspaces[0];

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === selectedWsId
          ? {
              ...w,
              keywords: [
                ...w.keywords,
                {
                  id: `kw-${Date.now()}`,
                  text: newKeyword.trim(),
                  platforms: ['instagram', 'tiktok'],
                  frequency: 'daily'
                }
              ]
            }
          : w
      )
    );
    toast.success(`Added "${newKeyword}" to Radar (Cost: 10 tokens)`);
    setNewKeyword('');
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span>Content AI</span>
            <span>&gt;</span>
            <span className="text-white font-medium">Content Radar</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-orange-400" />
            Content Radar
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Split your radars into workspaces — each workspace keeps a separate set of keywords and shows only its own videos.
          </p>
        </div>

        <button
          onClick={() => {
            const name = window.prompt('Enter new workspace name:');
            if (name) {
              const newWs = {
                id: `ws-${Date.now()}`,
                name,
                tiktokCount: 0,
                instagramCount: 0,
                keywords: []
              };
              setWorkspaces([...workspaces, newWs]);
              setSelectedWsId(newWs.id);
              toast.success(`Created workspace "${name}"`);
            }
          }}
          className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          Create workspace
        </button>
      </div>

      {/* Workspaces Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {workspaces.map((ws) => (
          <button
            key={ws.id}
            onClick={() => setSelectedWsId(ws.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              ws.id === selectedWsId
                ? 'bg-neutral-800 text-white border border-orange-500/50 shadow-md'
                : 'bg-neutral-900/50 text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            {ws.name}
          </button>
        ))}
      </div>

      {/* Active Workspace Card */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-white">{activeWs.name}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Videos that match this workspace&apos;s keywords. · 🎵 {activeWs.tiktokCount} TikToks · 📸 {activeWs.instagramCount} Reels
            </p>
          </div>

          <form onSubmit={handleAddKeyword} className="flex items-center gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Track new keyword (10 tok)..."
              className="px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
            >
              Add
            </button>
          </form>
        </div>

        {/* Keywords Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-neutral-400 mr-1">
            Keywords ({activeWs.keywords.length}):
          </span>
          {activeWs.keywords.map((kw) => (
            <div
              key={kw.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs font-semibold text-neutral-200"
            >
              <span>{kw.text}</span>
              <span className="text-[10px] text-neutral-500 font-mono">IG, TT · daily</span>
              <button
                onClick={() => {
                  setWorkspaces((prev) =>
                    prev.map((w) =>
                      w.id === activeWs.id
                        ? { ...w, keywords: w.keywords.filter((k) => k.id !== kw.id) }
                        : w
                    )
                  );
                  toast.info(`Removed keyword "${kw.text}"`);
                }}
                className="text-neutral-500 hover:text-red-400 ml-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Captured Radar Videos Feed */}
      <div>
        <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-3">
          Incoming Outlier Videos (Matching Keywords)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INITIAL_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl glass-panel p-3 space-y-2 border border-white/10"
            >
              <div className="relative aspect-[9/12] rounded-xl overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white uppercase">
                  {video.platform}
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-black text-orange-400">
                  🔥 ×{video.fireScore}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  {video.creatorName} · {(video.views / 1000000).toFixed(1)}M views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
