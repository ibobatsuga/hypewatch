'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Sparkles,
  Mic,
  ArrowUp,
  User,
  Sliders,
  Copy,
  Check,
  Zap,
  BookOpen,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

interface AiScriptwriterModuleProps {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
  initialPrompt?: string;
}

export const AiScriptwriterModule: React.FC<AiScriptwriterModuleProps> = ({
  tokens,
  setTokens,
  initialPrompt = ''
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [myStyle, setMyStyle] = useState('High-energy, authoritative, no fluff, conversational Indonesian/English mix');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatorOptions = [
    {
      id: 'style_script',
      title: 'Script in my style',
      cost: 15,
      desc: "A viral video's mechanics → your words, voice and CTA",
      icon: Sparkles
    },
    {
      id: 'hooks_10',
      title: 'Hook formula + 10 variants',
      cost: 4,
      desc: 'Why the hook works, plus 10 of yours on the same formula',
      icon: BookOpen
    },
    {
      id: 'five_scripts',
      title: '5 scripts in this format',
      cost: 75,
      desc: 'One proven structure, five different topics of your niche',
      icon: Layers
    },
    {
      id: 'plan_14d',
      title: '14-day content plan',
      cost: 4,
      desc: '14 videos: topic, format, hook and goal of each',
      icon: Calendar
    },
    {
      id: 'ad_creative',
      title: 'Ad creative script from an ad',
      cost: 15,
      desc: 'A competitor ad → a video creative script for your offer',
      icon: FileText
    }
  ];

  const handleGenerate = (type: string, cost: number) => {
    if (tokens < cost) {
      toast.error('Insufficient tokens', {
        description: `This generation requires ${cost} tokens. You have ${tokens}.`
      });
      return;
    }

    setIsGenerating(true);
    setTokens((prev) => prev - cost);
    toast.success(`Deducted ${cost} tokens`, {
      description: `Remaining balance: ${tokens - cost} tokens`
    });

    setTimeout(() => {
      setIsGenerating(false);
      let output = '';
      if (type === 'hooks_10') {
        output = `### 🔥 10 Viral Hook Variants (Formula: Curiosity Gap + Agitation)

1. "90% orang yang coba scale bisnis selalu mentok di angka ini..."
2. "Jangan rekrut tim dulu sebelum kamu pasang 1 sistem ini!"
3. "Kenapa agency kamu kerja 14 jam tapi profit cuma segini?"
4. "Trik rahasia yang dipakai top creator buat dapet 100k views tanpa iklan."
5. "Kalau kamu masih bikin konten manual di 2026, tonton ini sampai habis..."
6. "3 kesalahan fatal waktu promosi produk di Reels..."
7. "Saya buang waktu 2 tahun cuma buat nyadar hal sesimpel ini."
8. "Ini alasan kenapa konten edukasi kamu sepi views padahal infonya berbobot."
9. "Stop buang budget ads! Lakukan riset outlier ini dulu."
10. "Blueprint 60 detik buat bikin script yang auto-share."`;
      } else {
        output = `### 🎬 Full Viral Script: "${prompt || 'Scale Bisnis dengan Sistem AI'}"
**Target Duration:** 45 - 60 Detik  
**Pacing:** Fast (120 kata/menit)  
**Tone:** ${myStyle}

---

**[00:00 - 00:03] THE HOOK (Visual: Menunjuk kamera dengan ekspresi serius):**  
"Stop rekrut orang banyak kalau sistem internal bisnis kamu masih berantakan kayak gini!"

**[00:03 - 00:15] AGITATION & PROBLEM:**  
"Banyak founder ngeluh burnout bukan karena orderan membludak, tapi karena 80% waktunya habis buat ngurusin hal-hal repetitif yang sebenernya bisa di-automate."

**[00:15 - 00:35] THE MECHANIC / SOLUTION:**  
"Minggu lalu saya bantu klien pasang 1 workflow AI sederhana. Hasilnya?  
Proses riset konten yang biasanya 3 hari selesai dalam 15 menit. Customer lead langsung masuk CRM tanpa admin manual. Dan margin bisnisnya langsung lompat 40%."

**[00:35 - 00:50] CALL TO ACTION (CTA):**  
"Komen 'BLUEPRINT' di bawah, nanti saya kirim breakdown sistem lengkapnya langsung ke DM kamu. Save video ini biar gak ilang!"`;
      }
      setGeneratedScript(output);
      toast.success('AI Script Generation Completed!');
    }, 1500);
  };

  const handleCopy = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    toast.success('Script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto">
      {/* Top Banner / Persona indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">AI Scriptwriter</span>
        </div>

        <button
          onClick={() => {
            const newTone = window.prompt('Enter your custom creator style / persona:', myStyle);
            if (newTone) {
              setMyStyle(newTone);
              toast.success('Updated Creator Style Profile');
            }
          }}
          className="px-3 py-1 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>My style: {myStyle.slice(0, 20)}...</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="text-center space-y-1.5 pt-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(249,115,22,0.5)]">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          What are we shooting today?
        </h1>
        <p className="text-sm text-neutral-400">
          Paste a Reels, TikTok, Shorts or competitor ad link — or describe your idea
        </p>
      </div>

      {/* Main Prompt Composer Box */}
      <GlassCard className="p-4 space-y-3 border-orange-500/30">
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="https://www.instagram.com/reel/… or &quot;a video about 3 rookie mistakes at the gym&quot;"
          className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none resize-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPrompt('How an introverted creator scaled to $20k/month without showing face')
              }
              className="px-2.5 py-1 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white"
            >
              Templates
            </button>
            <span className="text-xs text-neutral-400">Format: Auto</span>
            <span className="text-xs font-mono text-orange-400 font-bold">≈ 15 tokens</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.info('Microphone active. Speak your idea...')}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center"
              title="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleGenerate('style_script', 15)}
              disabled={isGenerating}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Writing...' : 'Generate Script'}
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* 5 Quick Action Generator Cards (Exact Spytrend Spec) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {generatorOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => handleGenerate(opt.id, opt.cost)}
              className="p-4 rounded-xl glass-panel hover:border-orange-500/40 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <Icon className="w-4 h-4 text-orange-400" />
                  {opt.title}
                </span>
                <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                  {opt.cost} tokens
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{opt.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Generation Output Area */}
      {generatedScript && (
        <GlassCard className="p-6 space-y-4 border-emerald-500/30 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Generated Production Script
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Script'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-white/5 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed font-sans">
            {generatedScript}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
