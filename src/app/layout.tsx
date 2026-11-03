import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-[#07070a] text-neutral-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
