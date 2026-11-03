'use client';

import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { TOOLS_CATALOG } from '../../data/mockData';
import {
  Wrench,
  Video,
  Music,
  Mic,
  UploadCloud,
  FileVideo,
  FileAudio,
  Languages,
  Captions,
  Volume2,
  Globe,
  Film,
  Radio,
  Speaker,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export const ToolsModule: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'yt-trans':
        return Video;
      case 'tt-trans':
        return Music;
      case 'stt':
        return Mic;
      case 'att':
        return UploadCloud;
      case 'vtt':
        return FileVideo;
      case 'vmtt':
        return FileAudio;
      case 'traud':
        return Languages;
      case 'subgen':
        return Captions;
      case 'vdub':
        return Volume2;
      case 'vtrans':
        return Globe;
      case 'capgen':
        return Film;
      case 'podtrans':
        return Radio;
      default:
        return Speaker;
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Tools</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Wrench className="w-6 h-6 text-orange-400" />
          AI Audio & Video Tools
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Every Spytrend tool in one place, grouped by what it does.
        </p>
      </div>

      <div className="flex items-center justify-between pb-1">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Transcribe & Voice ({TOOLS_CATALOG.length})
        </h3>
        <span className="text-xs text-neutral-500 font-medium">
          Pay per use tokens
        </span>
      </div>

      {/* Grid of 13 Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TOOLS_CATALOG.map((tool) => {
          const Icon = getIcon(tool.id);
          return (
            <GlassCard
              key={tool.id}
              hoverEffect
              onClick={() =>
                toast.success(`Launching tool: ${tool.name}`, {
                  description: 'Ready for upload or link extraction'
                })
              }
              className="p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 group-hover:border-orange-500/50 flex items-center justify-center text-orange-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                <span className="text-neutral-500 font-medium">Pay per use</span>
                <span className="text-orange-400 font-bold flex items-center gap-0.5">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
