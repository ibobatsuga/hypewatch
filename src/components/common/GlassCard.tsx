import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl glass-panel ${
        hoverEffect ? 'glass-panel-hover' : ''
      } ${glow ? 'shadow-[0_0_30px_-5px_rgba(249,115,22,0.25)] border-orange-500/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
