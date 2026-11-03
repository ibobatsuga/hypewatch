'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { ActiveTab } from '../components/layout/Navbar';
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeVideoForAnalysis, setActiveVideoForAnalysis] = useState<VideoItem | null>(null);
  const [scriptwriterPrompt, setScriptwriterPrompt] = useState<string>('');

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAnalyzeVideo = (video: VideoItem) => {
    if (tokens < 5) {
      toast.error('Insufficient tokens for Video Analysis (Cost: 5 tokens)');
      return;
    }
    setTokens((prev) => prev - 5);
    setActiveVideoForAnalysis(video);
    toast.success(`Analyzing "${video.title}" (Deducted 5 tokens)`, {
      description: 'Extracted 3s Hook, Scene Retention & Shooting Blueprint',
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
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 flex selection:bg-orange-500 selection:text-white">
      {/* Ambient Diffuse Background Glows */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-bottom" />

      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tokens={tokens}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main App Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'pl-18' : 'pl-64'
        }`}
      >
        {/* Top Header with Breadcrumb & Global Actions */}
        <TopHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tokens={tokens}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 z-10">
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
      </div>

      {/* Floating Bottom AI Copilot Dock */}
      <CopilotDock onExecutePrompt={handleExecuteCopilotPrompt} />

      {/* Video Analysis Modal */}
      {activeVideoForAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4">
          <div className="glass-panel rounded-2xl max-w-2xl w-full p-6 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-bold">✨ AI Deconstruction</span>
                <span className="text-xs text-neutral-400">
                  {activeVideoForAnalysis.creatorHandle}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoForAnalysis(null)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  3-Second Retention Hook Formula
                </span>
                <p className="text-white font-medium mt-1">
                  &ldquo;{activeVideoForAnalysis.hookText}&rdquo;
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Psychological Trigger: Pattern Interrupt + Loss Aversion Curiosity Gap.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <span className="text-neutral-400">Virality Multiplier</span>
                  <div className="text-lg font-bold text-orange-400">
                    🔥 ×{activeVideoForAnalysis.fireScore}
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <span className="text-neutral-400">Engagement Rate</span>
                  <div className="text-lg font-bold text-emerald-400">
                    {((activeVideoForAnalysis.likes / activeVideoForAnalysis.views) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <span className="text-neutral-400">Est. Watch Time</span>
                  <div className="text-lg font-bold text-blue-400">92.4%</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-neutral-300 uppercase">
                  Shooting Blueprint Recommendation
                </span>
                <ul className="text-xs text-neutral-300 space-y-1.5 mt-2 list-disc list-inside">
                  <li>
                    <strong>00:00 - 00:03</strong>: Face forward, tight framing, high visual contrast
                    jump cut.
                  </li>
                  <li>
                    <strong>00:03 - 00:12</strong>: Rapid B-roll demonstration matching beat of
                    trending audio.
                  </li>
                  <li>
                    <strong>00:12 - 00:25</strong>: 2 actionable takeaways, subtitles highlighted in
                    yellow bold.
                  </li>
                  <li>
                    <strong>00:25 - 00:30</strong>: Single question CTA to spark comment debate.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  handleAdaptScript(activeVideoForAnalysis);
                  setActiveVideoForAnalysis(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                Adapt this Script in Studio (15⚡)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
