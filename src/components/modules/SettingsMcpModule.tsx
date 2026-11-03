'use client';

import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsMcpModuleProps {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsMcpModule: React.FC<SettingsMcpModuleProps> = ({
  tokens,
  setTokens
}) => {
  const [subTab, setSubTab] = useState<'subscriptions' | 'balance' | 'mcp' | 'profile'>('subscriptions');
  const [copiedMcp, setCopiedMcp] = useState(false);
  const mcpUrl = 'https://mcp.spytrend.com/mcp';

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
        <h1 className="text-2xl font-extrabold text-white">Account & Subscriptions</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Manage your plan, token refills, and autonomous AI / MCP agent connections.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/60 border border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('subscriptions')}
          className={`px-4 py-2 rounded-xl transition-all ${
            subTab === 'subscriptions' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setSubTab('balance')}
          className={`px-4 py-2 rounded-xl transition-all ${
            subTab === 'balance' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Token Balance
        </button>
        <button
          onClick={() => setSubTab('mcp')}
          className={`px-4 py-2 rounded-xl transition-all ${
            subTab === 'mcp' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          AI / MCP Server
        </button>
        <button
          onClick={() => setSubTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all ${
            subTab === 'profile' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Profile
        </button>
      </div>

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
                    <h3 className="text-base font-bold text-white">Content AI</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Start tier · 2,500 tokens / mo · All creator tools unlocked
                  </p>
                </div>
              </div>

              <div className="text-xs text-neutral-400">
                Access active until <strong className="text-white">11/10/2026</strong>
              </div>
            </div>
          </GlassCard>

          {/* Ads Spy */}
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Ads Intelligence</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  1.4B+ Facebook, Instagram & TikTok ad library with webmaster grouping
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">from $79 / mo</span>
                <button
                  onClick={() => toast.info('Opening Ads subscription checkout')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  Connect
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Search Arbitrage */}
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Search Arbitrage</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Arbitrage ads, networks, phrases, hosts and dynamics
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">from $249 / mo</span>
                <button
                  onClick={() => toast.info('Opening Arbitrage subscription checkout')}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
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
              Current Available Token Balance
            </span>
            <div className="text-4xl font-extrabold text-white font-mono mt-1 flex items-center gap-2">
              <Zap className="w-7 h-7 text-orange-400 fill-orange-400" />
              {tokens.toLocaleString()} <span className="text-base font-normal text-neutral-400">tokens</span>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              Pays for pay-per-use items: AI video processing, deep searches, scriptwriting, and carousel rendering.
            </p>
          </GlassCard>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Token Packs (Bigger pack, more bonus tokens)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOKEN_PACKS.map((pack) => (
                <GlassCard
                  key={pack.tokens}
                  hoverEffect
                  className={`p-5 flex flex-col justify-between space-y-4 ${
                    pack.isPopular ? 'border-orange-500/50 shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]' : ''
                  }`}
                >
                  <div>
                    {pack.isPopular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase mb-2 inline-block">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <span className="text-xl font-extrabold text-white font-mono">
                        {pack.tokens.toLocaleString()}
                      </span>
                    </div>
                    {pack.bonusPercent && (
                      <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                        +{pack.bonusPercent}% bonus tokens
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white font-mono mb-3">
                      ${pack.priceUsd}
                    </div>
                    <button
                      onClick={() => handleBuyTokens(pack.tokens, pack.priceUsd)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs shadow-md transition-all"
                    >
                      Buy Pack
                    </button>
                  </div>
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
