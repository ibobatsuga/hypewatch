'use client';

import React from 'react';

interface ViralityGaugeProps {
  score?: number; // 0 to 100
  label?: string;
  sublabel?: string;
}

export const ViralityGauge: React.FC<ViralityGaugeProps> = ({
  score = 88,
  label = 'Extreme Virality',
  sublabel = 'Outlier reach index today'
}) => {
  // 0 to 100 mapped to 240 degrees arc
  const radius = 68;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Use 70% of circle for gauge arc
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  return (
    <div className="flex flex-col items-center justify-center p-2 relative">
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Ambient Backlight for Dial */}
        <div className="absolute inset-0 rounded-full bg-orange-600/15 blur-xl pointer-events-none" />

        <svg height="176" width="176" className="transform -rotate-90">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            r={normalizedRadius}
            cx="88"
            cy="88"
            strokeLinecap="round"
          />

          {/* Glowing active arc */}
          <circle
            stroke="url(#gaugeGradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
            r={normalizedRadius}
            cx="88"
            cy="88"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            {score}
          </span>
          <span className="text-xs font-semibold text-orange-400 mt-0.5 uppercase tracking-wider">
            {label}
          </span>
        </div>
      </div>

      <div className="text-center mt-1">
        <p className="text-xs text-neutral-400">{sublabel}</p>
      </div>
    </div>
  );
};
