'use client';

import React, { useState } from 'react';
import { Navbar, ActiveTab } from '../components/layout/Navbar';
import { CopilotDock } from '../components/layout/CopilotDock';
import { DashboardOverview } from '../components/modules/DashboardOverview';
import { VideoSearchModule } from '../components/modules/VideoSearchModule';
import { WorkspaceHubModule } from '../components/modules/WorkspaceHubModule';
import { AudioTrendsModule } from '../components/modules/AudioTrendsModule';
import { LongTrendsModule } from '../components/modules/LongTrendsModule';
import { FormatTrendsModule } from '../components/modules/FormatTrendsModule';
import { ContentRadarModule } from '../components/modules/ContentRadarModule';
import { AiScriptwriterModule } from '../components/modules/AiScriptwriterModule';
import { CarouselsModule } from '../components/modules/CarouselsModule';
import { ShootingTemplatesModule } from '../components/modules/ShootingTemplatesModule';
import { ToolsModule } from '../components/modules/ToolsModule';
import { CreatorCabinetModule } from '../components/modules/CreatorCabinetModule';
import { SettingsMcpModule } from '../components/modules/SettingsMcpModule';
import { Toaster, toast } from 'sonner';
import { VideoItem } from '../types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [tokens, setTokens] = useState<number>(2500);
  const [activeVideoForAnalysis, setActiveVideoForAnalysis] = useState<VideoItem | null>(null);
  const [scriptwriterPrompt, setScriptwriterPrompt] = useState<string>('');

  const handleAnalyzeVideo = (video: VideoItem) => {
    if (tokens < 5) {
      toast.error('Insufficient tokens for Video Analysis (Cost: 5 tokens)');
      return;
    }
    setTokens((prev) => prev - 5);
    setActiveVideoForAnalysis(video);
    toast.success(`Analyzing "${video.title}" (Deducted 5 tokens)`, {
      description: 'Extracted 3s Hook, Scene Retention & Shooting Blueprint'
    });
  };

  const handleAdaptScript = (video: VideoItem) => {
    setScriptwriterPrompt(`Adapt viral video "${video.title}" by ${video.creatorName}. Hook: "${video.hookText}"`);
    setActiveTab('gpt');
    toast.info('Loaded video into AI Scriptwriter');
  };

  const handleExecuteCopilotPrompt = (prompt: string) => {
    setScriptwriterPrompt(prompt);
    setActiveTab('gpt');
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-neutral-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Ambient Diffuse Background Glows (Matching Signal AI Reference) */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-bottom" />

      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />

      {/* Top Floating Glass Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tokens={tokens} />

      {/* Main Module Content Surface */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 z-10">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onNavigate={(tab) => setActiveTab(tab)}
            onAnalyzeVideo={handleAnalyzeVideo}
          />
        )}

        {activeTab === 'search' && (
          <VideoSearchModule
            onAnalyzeVideo={handleAnalyzeVideo}
            onAdaptScript={handleAdaptScript}
          />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceHubModule onNavigate={(tab) => setActiveTab(tab)} tokens={tokens} />
        )}

        {activeTab === 'audio' && <AudioTrendsModule />}

        {activeTab === 'long' && <LongTrendsModule />}

        {activeTab === 'formats' && (
          <FormatTrendsModule onNavigateToTemplates={() => setActiveTab('templates')} />
        )}

        {activeTab === 'radar' && <ContentRadarModule />}

        {activeTab === 'spy' && <ContentRadarModule />}

        {activeTab === 'gpt' && (
          <AiScriptwriterModule
            tokens={tokens}
            setTokens={setTokens}
            initialPrompt={scriptwriterPrompt}
          />
        )}

        {activeTab === 'carousels' && (
          <CarouselsModule tokens={tokens} setTokens={setTokens} />
        )}

        {activeTab === 'templates' && <ShootingTemplatesModule />}

        {activeTab === 'tools' && <ToolsModule />}

        {activeTab === 'cabinet' && <CreatorCabinetModule />}

        {activeTab === 'settings' && (
          <SettingsMcpModule tokens={tokens} setTokens={setTokens} />
        )}
      </main>

      {/* Video Analysis Modal (If a video is being analyzed) */}
      {activeVideoForAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4">
          <div className="relative w-full max-w-2xl p-6 rounded-3xl glass-panel border border-orange-500/40 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                ⚡ Video Outlier Breakdown · Cost: 5 Tokens
              </span>
              <button
                onClick={() => setActiveVideoForAnalysis(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-neutral-900/80 border border-white/5">
              <img
                src={activeVideoForAnalysis.thumbnailUrl}
                alt=""
                className="w-16 h-20 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{activeVideoForAnalysis.title}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {activeVideoForAnalysis.creatorName} · {activeVideoForAnalysis.views.toLocaleString()} views · 🔥 ×{activeVideoForAnalysis.fireScore} vs expected reach
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <strong className="text-orange-400 block mb-1">🎯 3-Second Hook Technique:</strong>
                &quot;{activeVideoForAnalysis.hookText}&quot; (Creates an immediate curiosity void + high cognitive conflict).
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                <strong className="text-white block mb-1">📐 Scene Retention Structure:</strong>
                0:00 - 0:03 Fast hook cut &rarr; 0:03 - 0:12 Context setting with background sound &rarr; 0:12 - 0:24 Pattern interrupt &rarr; 0:24 - CTA loop.
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                <strong className="text-white block mb-1">📝 Shooting Blueprint for Your Brand:</strong>
                Use 1 actor facing direct to camera with hand gesture, overlay contrast text in top third of screen, record audio on trending sound &quot;{activeVideoForAnalysis.audioName || 'Urgent News'}&quot;.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const vid = activeVideoForAnalysis;
                  setActiveVideoForAnalysis(null);
                  handleAdaptScript(vid);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs shadow-md"
              >
                Send to AI Scriptwriter &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Copilot Dock */}
      <CopilotDock
        onExecutePrompt={handleExecuteCopilotPrompt}
        onOpenLessons={() => {
          toast.info('Opening Creator Onboarding Lessons');
          setActiveTab('templates');
        }}
      />
    </div>
  );
}
