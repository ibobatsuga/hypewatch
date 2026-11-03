'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { TOKEN_PACKS } from '../../data/mockData';
import {
  Settings,
  Zap,
  Server,
  Copy,
  Check,
  Shield,
  CreditCard,
  Layers,
  ArrowRight,
  Globe,
  Radio,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Key,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getScraperApiKey,
  setScraperApiKey,
  testScraperConnection,
} from '../../services/scraperApi';

interface SettingsMcpModuleProps {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsMcpModule: React.FC<SettingsMcpModuleProps> = ({
  tokens,
  setTokens
}) => {
  const [subTab, setSubTab] = useState<'subscriptions' | 'balance' | 'scraper' | 'mcp' | 'profile'>('subscriptions');
  const [copiedMcp, setCopiedMcp] = useState(false);
  const mcpUrl = 'https://mcp.spytrend.com/mcp';

  // Real-time Scraper state (Option 1)
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    success: boolean;
    message: string;
    latencyMs: number;
  }>({
    tested: false,
    success: false,
    message: '',
    latencyMs: 0,
  });

  useEffect(() => {
    setApiKeyInput(getScraperApiKey());
  }, []);

  const handleSaveApiKey = () => {
    setScraperApiKey(apiKeyInput);
    toast.success('RapidAPI Key successfully saved in HypeLab!');
  };

  const handleTestConnection = async () => {
    if (!apiKeyInput.trim()) {
      toast.error('Please enter a RapidAPI key before testing.');
      return;
    }
    setIsTestingKey(true);
    const res = await testScraperConnection(apiKeyInput.trim());
    setIsTestingKey(false);
    setTestResult({
      tested: true,
      success: res.success,
      message: res.message,
      latencyMs: res.latencyMs,
    });
    if (res.success) {
      setScraperApiKey(apiKeyInput);
      toast.success('Connection verified! Live Real-Time Scraper is active.');
    } else {
      toast.error(`Connection check failed: ${res.message}`);
    }
  };

  const copyMcpUrl = () => {
    navigator.clipboard.writeText(mcpUrl);
    setCopiedMcp(true);
    toast.success('MCP Connector URL copied to clipboard');
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleBuyTokens = (packTokens: number, price: number) => {
    setTokens((prev) => prev + packTokens);
    toast.success(`Purchased +${packTokens.toLocaleString()} tokens for $${price}!`, {
      description: 'Your balance is updated instantly.'
    });
  };

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Account & System Settings</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Manage your subscriptions, real-time scraping gateway (Option 1), token packages, and MCP AI connector.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/60 border border-white/[0.07] text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('subscriptions')}
          className={`px-4 py-2 rounded-lg transition-all ${
            subTab === 'subscriptions' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setSubTab('scraper')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === 'scraper' ? 'bg-orange-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Real-Time Scraper (Opsi 1)
        </button>
        <button
          onClick={() => setSubTab('balance')}
          className={`px-4 py-2 rounded-lg transition-all ${
            subTab === 'balance' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Token Balance
        </button>
        <button
          onClick={() => setSubTab('mcp')}
          className={`px-4 py-2 rounded-lg transition-all ${
            subTab === 'mcp' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          AI / MCP Server
        </button>
        <button
          onClick={() => setSubTab('profile')}
          className={`px-4 py-2 rounded-lg transition-all ${
            subTab === 'profile' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Profile
        </button>
      </div>

      {/* TAB: Real-Time Scraper (Opsi 1) */}
      {subTab === 'scraper' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.07]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Live Scraper Gateway (Option 1: RapidAPI / TokAPI)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Cost-Efficient
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Connect live third-party gateway to stream real-time TikTok & Instagram Reels outliers without paying for residential proxies.
                </p>
              </div>

              <a
                href="https://rapidapi.com/hub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium shrink-0"
              >
                Get Free RapidAPI Key <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* API Key Form */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-zinc-200">
                RapidAPI Key (<code className="text-orange-400">x-rapidapi-key</code>)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="e.g. 9a78f12c34msh567890abcdef123456p1..."
                    className="w-full bg-[#12131b] border border-white/[0.09] focus:border-orange-500/60 rounded-xl pl-9 pr-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition-colors"
                >
                  Save Key
                </button>
                <button
                  onClick={handleTestConnection}
                  disabled={isTestingKey}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-semibold text-white shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                >
                  {isTestingKey ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </div>
            </div>

            {/* Test Connection Output */}
            {testResult.tested && (
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  testResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                )}
                <div className="text-xs">
                  <p className="font-semibold">
                    {testResult.success ? 'Gateway Active (200 OK)' : 'Connection Failed'}
                  </p>
                  <p className="text-zinc-400 text-[11px] mt-0.5">{testResult.message}</p>
                  {testResult.latencyMs > 0 && (
                    <span className="inline-block mt-1 font-mono text-[10px] text-zinc-400">
                      Roundtrip Latency: {testResult.latencyMs}ms
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step-by-step Setup Guide */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-semibold text-zinc-300">
                Cara Mendapatkan Free API Key (2 Menit):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                  <span className="font-mono text-orange-400 font-bold">1. Daftar Akun</span>
                  <p className="text-zinc-400 text-[11px] mt-1">
                    Buka <a href="https://rapidapi.com" target="_blank" rel="noreferrer" className="underline text-zinc-300">RapidAPI.com</a> dan sign up gratis.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                  <span className="font-mono text-orange-400 font-bold">2. Pilih API</span>
                  <p className="text-zinc-400 text-[11px] mt-1">
                    Cari &ldquo;TikTok All In One&rdquo; atau &ldquo;TokAPI&rdquo;, klik Subscribe Free Tier (500 req/bulan).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                  <span className="font-mono text-orange-400 font-bold">3. Copy & Paste</span>
                  <p className="text-zinc-400 text-[11px] mt-1">
                    Salin string <code className="text-orange-300">X-RapidAPI-Key</code> dari dashboard dan tempel di atas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Subscriptions list */}
      {subTab === 'subscriptions' && (
        <div className="space-y-3">
          {/* Active Content AI */}
          <GlassCard className="p-5 border-orange-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">Content AI</h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Start · 2,500 tokens / month · Next refill 11/10/2026
                  </p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Access until 11/10/2026</span>
            </div>
          </GlassCard>

          {/* Other Modules */}
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Ads Spy & Arbitrage</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Search-arbitrage ads: networks, phrases, hosts and dynamics
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">from $249 / mo</span>
                <button
                  onClick={() => toast.info('Contact sales for Ads module trial')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 2: Token Balance & Packs */}
      {subTab === 'balance' && (
        <div className="space-y-6">
          <GlassCard className="p-6">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              Current Available Balance
            </span>
            <div className="text-4xl font-extrabold text-white mt-1 flex items-baseline gap-2">
              <span className="font-mono text-orange-400">{tokens.toLocaleString()}</span>
              <span className="text-xs text-neutral-400 font-normal">tokens</span>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              Pays for pay-per-use items: AI video processing (5⚡), Script adaptation (15⚡), and live deep search (30⚡).
            </p>
          </GlassCard>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Top-Up Token Packs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TOKEN_PACKS.map((pack, idx) => (
                <GlassCard
                  key={idx}
                  hoverEffect
                  className={`p-5 flex flex-col justify-between ${
                    pack.isPopular ? 'border-orange-500/50 shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]' : ''
                  }`}
                >
                  <div>
                    {pack.isPopular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-2 inline-block">
                        Most Popular
                      </span>
                    )}
                    <div className="text-2xl font-extrabold text-white flex items-center gap-1.5 mt-1 font-mono">
                      ⚡ {pack.tokens.toLocaleString()}
                    </div>
                    {pack.bonusPercent && (
                      <span className="text-xs font-semibold text-orange-400 block mt-1">
                        +{pack.bonusPercent}% tokens
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleBuyTokens(pack.tokens, pack.priceUsd)}
                    className="w-full mt-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    Buy for ${pack.priceUsd}
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI / MCP Connector */}
      {subTab === 'mcp' && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Starter Allowance
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">MCP Limits</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                500 tokens free lifetime
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Connect Spytrend to your AI assistant (Claude Desktop, Cursor, ChatGPT, Codex) over the Model Context Protocol. Unlinked agents share a free trial allowance.
            </p>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-2">
              <span className="text-xs font-semibold text-neutral-300">
                Your MCP Connector URL (Streamable HTTP)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={mcpUrl}
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  onClick={copyMcpUrl}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedMcp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMcp ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-neutral-400">
              <span className="font-semibold text-neutral-300">Try asking your assistant:</span>
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>&quot;Find new viral coffee shop Reels in Indonesia from the last week&quot;</li>
                <li>&quot;Audit @raffinagita1717 reach and extract top hook formulas&quot;</li>
                <li>&quot;Show trending sounds on Instagram with fire pace &gt; 1.0&quot;</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 4: Profile */}
      {subTab === 'profile' && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Profile Information</h3>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-neutral-400">Username</span>
              <div className="text-sm font-semibold text-white mt-0.5">ibobatsuga</div>
            </div>

            <div>
              <span className="text-xs text-neutral-400">Email</span>
              <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-2">
                ibobatsuga@gmail.com
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Verified
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-400">Active Sessions</span>
              <div className="text-xs font-semibold text-neutral-300 mt-0.5">
                1 of 2 sessions used · 1 slot free
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
