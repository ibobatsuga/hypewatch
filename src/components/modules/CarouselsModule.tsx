'use client';

import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Layers, Sparkles, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface CarouselsModuleProps {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselsModule: React.FC<CarouselsModuleProps> = ({
  tokens,
  setTokens
}) => {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [carouselType, setCarouselType] = useState<'static' | 'live'>('static');
  const [isBuilding, setIsBuilding] = useState(false);

  // Exact math from Spytrend code: static = 120, live = slideCount * 450
  const cost = carouselType === 'static' ? 120 : slideCount * 450;

  const handleBuild = () => {
    if (tokens < cost) {
      toast.error('Insufficient tokens', {
        description: `This carousel requires ${cost} tokens. You have ${tokens}.`
      });
      return;
    }

    setIsBuilding(true);
    setTokens((prev) => prev - cost);
    toast.success(`Deducted ${cost} tokens for ${carouselType} carousel`);

    setTimeout(() => {
      setIsBuilding(false);
      setStep(3);
      toast.success('5 Slides generated successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
          <span>Content AI</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Carousels</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-cyan-400" />
          Instagram Carousel Studio
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Describe the task in one message — style, topic, hero. Then pick with your eyes.
        </p>
      </div>

      {/* 3-Step Wizard Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            1
          </div>
          <div>
            <div className="text-xs font-bold text-white">Topic and format</div>
            <div className="text-[10px] text-neutral-400">{step === 1 ? 'Now' : 'Done'}</div>
          </div>
        </div>

        <div className="h-0.5 w-12 bg-white/10" />

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            2
          </div>
          <div>
            <div className="text-xs font-bold text-white">Style</div>
            <div className="text-[10px] text-neutral-400">{step === 2 ? 'Now' : 'Next'}</div>
          </div>
        </div>

        <div className="h-0.5 w-12 bg-white/10" />

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 3 ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            3
          </div>
          <div>
            <div className="text-xs font-bold text-white">Ready carousel</div>
            <div className="text-[10px] text-neutral-400">{step === 3 ? 'Now' : 'Next'}</div>
          </div>
        </div>
      </div>

      {/* Step 1: Form & Configuration */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <GlassCard className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">
                Start with a topic and pick how to present it
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  What is the carousel about?
                </label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Topic, style and hero of the carousel — in one message. E.g.: why Reels get no views — 3 hidden reasons for SMM, expensive magazine vibe"
                  className="w-full p-3 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Who is it for? · optional
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="E.g. coffee shop owners or startup founders"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Number of slides
                  </label>
                  <select
                    value={slideCount}
                    onChange={(e) => setSlideCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value={5}>5 slides</option>
                    <option value={7}>7 slides</option>
                    <option value={10}>10 slides</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Slide language
                  </label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white focus:outline-none">
                    <option>English</option>
                    <option>Indonesian</option>
                  </select>
                </div>
              </div>

              {/* Result Format Radio */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Result Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCarouselType('static')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      carouselType === 'static'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/10 bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Static Image</span>
                      <span className="text-xs font-mono font-bold text-orange-400">120 tokens</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {slideCount} static slides · structured layout
                    </p>
                  </div>

                  <div
                    onClick={() => setCarouselType('live')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      carouselType === 'live'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/10 bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Live Video Carousel</span>
                      <span className="text-xs font-mono font-bold text-orange-400">
                        {slideCount * 450} tokens
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Animated micro-videos on each slide
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBuild}
                disabled={isBuilding}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isBuilding ? 'Generating 5 Slides...' : `Build Carousel (${cost} tokens)`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </GlassCard>
          </div>

          {/* Right Col: Style Preview Mockup */}
          <div>
            <GlassCard className="p-5 space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Example Result
              </span>
              <div className="aspect-[4/5] rounded-2xl bg-neutral-950 p-4 border border-white/10 flex flex-col justify-between shadow-2xl">
                <div>
                  <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">
                    Auto-Pick
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1 leading-tight">
                    3 steps to your first 1,000 followers
                  </h3>
                </div>

                <div className="flex items-center justify-between text-neutral-500 text-[10px] pt-4 border-t border-white/5">
                  <span>SWIPE &rarr;</span>
                  <span>1/5</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Step 3: Finished Output */}
      {step === 3 && (
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready for Instagram (1080x1350)
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {topic || 'Why Reels Get No Views — 3 Hidden Reasons'}
              </h3>
            </div>

            <button
              onClick={() => toast.success('Downloaded all 5 PNG slides (ZIP package)')}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download All Slides
            </button>
          </div>

          {/* 5 Slide Cards Carousel */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-xl bg-neutral-950 border border-white/10 p-3 flex flex-col justify-between shadow-lg"
              >
                <span className="text-[10px] font-bold text-orange-400">Slide 0{i}</span>
                <p className="text-xs font-semibold text-white leading-snug">
                  {i === 1 && 'Why your Reels get 200 views and die...'}
                  {i === 2 && 'Reason 1: You are burying the hook in the caption'}
                  {i === 3 && 'Reason 2: Audio pacing is dragging after 3 seconds'}
                  {i === 4 && 'Reason 3: Zero polarity in your opening stance'}
                  {i === 5 && 'Save this post & audit your next draft before upload.'}
                </p>
                <span className="text-[9px] text-neutral-500">{i}/5</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              &larr; Create another carousel
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
