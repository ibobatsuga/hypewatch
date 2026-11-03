import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HypeLab — AI Virality & Trend Intelligence for Creators',
  description: 'Track competitor outliers, viral hooks, trending audios, and generate high-retention video scripts across Meta and TikTok.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08090d] text-zinc-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
