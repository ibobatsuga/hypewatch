'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { LEADERBOARD_CREATORS } from '../../data/mockData';
import {
  User,
  Wallet,
  DollarSign,
  TrendingUp,
  Share2,
  Copy,
  Check,
  Trophy,
  Lock,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export const CreatorCabinetModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'cabinet' | 'media_kit' | 'offers' | 'partner' | 'paid_views' | 'top_creators' | 'payouts'
  >('cabinet');
  const [reelsPrice, setReelsPrice] = useState('150');
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = 'https://hypelab.ai/creator?ref=BOBI99';

  const copyRef = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-28 max-w-5xl mx-auto">
      {/* Top Profile Banner (Exact Spytrend Spec) */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="Bobi Agusta"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/60"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">Bobi Agusta</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
                  Creator · invited access
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">2 of 3 steps completed in media kit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/80 border border-white/10">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono">$0.00</div>
              <span className="text-[10px] text-neutral-400">Available to withdraw</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation Subtabs (Replicating Screenshot Header) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-neutral-900/60 border border-white/10 text-xs font-semibold">
        {[
          { id: 'cabinet', label: 'My cabinet' },
          { id: 'media_kit', label: 'Media kit & prices' },
          { id: 'offers', label: 'Your offers' },
          { id: 'partner', label: 'Partner programme' },
          { id: 'paid_views', label: 'Paid views' },
          { id: 'top_creators', label: 'Top creators' },
          { id: 'payouts', label: 'Payouts' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-neutral-800 text-white font-bold border border-orange-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: My Cabinet & Media Kit Form */}
      {activeSubTab === 'cabinet' && (
        <GlassCard className="p-6 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Your creator cabinet</h3>
            <p className="text-xs text-neutral-400">
              Fill in your media kit, set your prices and see how advertisers will see you.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300">Topics & Niche</label>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold">
                  Education &times;
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-300 border border-white/10 text-xs font-semibold">
                  AI & SaaS &times;
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300">
                  Verified Audience
                </label>
                <div className="px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-sm font-bold text-white mt-1">
                  🇮🇩 Indonesia · 6.7K followers
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">
                  Instagram Reels price, USD
                </label>
                <input
                  type="number"
                  value={reelsPrice}
                  onChange={(e) => setReelsPrice(e.target.value)}
                  placeholder="USD"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-sm font-bold text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              onClick={() => toast.success('Media kit rates saved successfully!')}
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              Save and continue
            </button>
          </div>
        </GlassCard>
      )}

      {/* TAB 2: Paid Views Program ($0.30 per 1k views) */}
      {activeSubTab === 'paid_views' && (
        <GlassCard className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                Paid Views
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                Publish videos — get paid for views
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-lg">
                Shoot a video about HypeLab/Spytrend, post it on your verified account — and we pay for every thousand real views.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-orange-500/30 text-right">
              <span className="text-xs text-neutral-400 font-medium">How much it pays</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                $0.30 <span className="text-sm font-normal text-neutral-400">/ 1,000 views</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                +$30 for 100,000 views
              </span>
            </div>
          </div>

          {/* 3 Step Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-orange-400 font-mono">1 / 3</span>
              <h4 className="text-sm font-bold text-white">Connect social account</h4>
              <p className="text-xs text-neutral-400">Add your account and verify ownership.</p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-orange-400 font-mono">2 / 3</span>
              <h4 className="text-sm font-bold text-white">Post a video</h4>
              <p className="text-xs text-neutral-400">Create a video highlighting viral features.</p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-orange-400 font-mono">3 / 3</span>
              <h4 className="text-sm font-bold text-white">Get paid for views</h4>
              <p className="text-xs text-neutral-400">Submit link here. Payout is credited to wallet.</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const link = window.prompt('Submit video link for review:');
                if (link) toast.success('Video link submitted for view verification!');
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
            >
              Submit video link &rarr;
            </button>
          </div>
        </GlassCard>
      )}

      {/* TAB 3: Partner Programme (100% First Month + 20% Recurring) */}
      {activeSubTab === 'partner' && (
        <GlassCard className="p-6 space-y-5">
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white">
              Turn your audience into income
            </h3>
            <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
              Share your personal link — in any way you like. For every client who subscribes through it, you earn <strong className="text-orange-400">100% of their first month&apos;s price</strong>, then <strong className="text-orange-400">20% for every paid month</strong> while their subscription is active.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-2">
            <span className="text-xs font-semibold text-neutral-400">Your personal link</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none"
              />
              <button
                onClick={copyRef}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* TAB 4: Top Creators Leaderboard */}
      {activeSubTab === 'top_creators' && (
        <GlassCard className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Top creator earnings · September 2026
              </h3>
              <p className="text-xs text-neutral-400">
                Creators ranked by everything they earned in a calendar month — paid views plus referral.
              </p>
            </div>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEADERBOARD_CREATORS.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                  <span>{c.rank === 1 ? '🥇 Gold' : c.rank === 2 ? '🥈 Silver' : '🥉 Bronze'}</span>
                  <span>{c.creatorIdText}</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  ${c.earnedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            {LEADERBOARD_CREATORS.slice(3).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/30 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 font-bold w-4">#{c.rank}</span>
                  <span className="text-neutral-300 font-semibold">{c.creatorIdText}</span>
                </div>
                <span className="font-mono font-bold text-white">
                  ${c.earnedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* TAB 5: Payouts (USDT, DANA, OVO) */}
      {activeSubTab === 'payouts' && (
        <GlassCard className="p-6 space-y-5">
          <h3 className="text-xl font-bold text-white">Payouts & Withdrawal</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
              <span className="text-xs text-neutral-400">Available to withdraw</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">$0.00</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
              <span className="text-xs text-neutral-400">Maturing (30-day hold period)</span>
              <div className="text-3xl font-extrabold text-neutral-400 font-mono mt-1">$0.00</div>
            </div>
          </div>

          {/* Methods */}
          <div className="space-y-3 pt-3 border-t border-white/5">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Payment Gateways (🇮🇩 Indonesia)
            </span>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                    ₮
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">USDT (TRC-20 Wallet)</h4>
                    <p className="text-[10px] text-neutral-400">Global instant crypto payout</p>
                  </div>
                </div>
                <button
                  onClick={() => toast.info('Request payout via USDT TRC20')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
                >
                  Request payout
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                    DANA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">DANA e-Wallet</h4>
                    <p className="text-[10px] text-neutral-400">Direct IDR local transfer</p>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Ask manager
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                    OVO
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">OVO e-Wallet</h4>
                    <p className="text-[10px] text-neutral-400">Direct IDR local transfer</p>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Ask manager
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* TAB: Your Offers */}
      {activeSubTab === 'offers' && (
        <GlassCard className="p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No active offers yet</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Offers will appear here when our brand matching team pairs your audience with relevant advertisers. Complete your media kit to get discovered.
          </p>
        </GlassCard>
      )}
    </div>
  );
};
