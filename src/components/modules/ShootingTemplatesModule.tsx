'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SHOOTING_TEMPLATES } from '../../data/mockData';
import { Film, Sparkles, Filter, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ShootingTemplatesModule: React.FC = () => {
  const [selectedComplexity, setSelectedComplexity] = useState('All');

  const filterChips = {
    languages: ['All', 'English 31', 'Indonesian 24', 'Spanish 20', 'Hindi 15'],
    niches: ['All', 'Fashion 31', 'Food 26', 'Beauty 22', 'Fitness 18', 'Business 14'],
    formats: ['All', 'Reaction', 'Talking head', 'Skit', 'Screen recording', 'Photo slideshow'],
    complexities: ['All', 'Easy to shoot', 'Medium effort', 'Hard to shoot']
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Shooting templates</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-yellow-400" />
          Shooting Templates Catalog
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          How videos that work are shot: capture, framing, captions and editing — independent of the topic and the moment.
        </p>
        <span className="text-[11px] text-neutral-500 mt-1 block">
          Templates: 31 · Data updated as of today
        </span>
      </div>

      {/* Filter Taxonomy Matrix */}
      <GlassCard className="p-4 space-y-3">
        {/* Complexity row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-neutral-400 w-24 shrink-0 uppercase tracking-wider">
            Complexity:
          </span>
          {filterChips.complexities.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedComplexity(comp)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedComplexity === comp
                  ? 'bg-orange-500 text-white font-bold'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>

        {/* Niche row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/5">
          <span className="text-xs font-bold text-neutral-400 w-24 shrink-0 uppercase tracking-wider">
            Niche:
          </span>
          {filterChips.niches.map((niche, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-neutral-900/60 text-xs text-neutral-300 border border-white/5 whitespace-nowrap"
            >
              {niche}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SHOOTING_TEMPLATES.map((tmpl) => (
          <GlassCard key={tmpl.id} hoverEffect className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {tmpl.complexity}
                </span>
                <span className="text-xs text-neutral-400">
                  👥 {tmpl.creatorsUsing.toLocaleString()} creators
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{tmpl.name}</h3>
                <p className="text-xs text-neutral-300 mt-1">
                  <strong>Gist:</strong> {tmpl.gist}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  <strong>Usually:</strong> {tmpl.usually}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tmpl.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                toast.success(`Shooting template loaded: ${tmpl.name}`, {
                  description: 'Ready to write script using this framing recipe'
                })
              }
              className="w-full py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use This Recipe
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
