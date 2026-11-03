export type Platform = 'all' | 'instagram' | 'tiktok' | 'youtube';

export interface VideoItem {
  id: string;
  title: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  daysAgo: number;
  fireScore: number; // multiplier, e.g. 142.2
  category: string;
  country: string;
  language: string;
  caption: string;
  hookText: string;
  audioName?: string;
  isFavorite?: boolean;
}

export interface AudioTrendItem {
  id: string;
  rank: number;
  title: string;
  artist: string;
  thumbnailUrl?: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  badges: ('IG Trend' | 'Viral' | 'New')[];
  fireVideos: number;
  totalVideos: number;
  paceDaily: number;
  paceTrend: number; // e.g. 0.9 or 1.1
  isPacePositive: boolean;
  countryShare?: string;
}

export interface LongVerticalItem {
  rank: number;
  verticalName: string;
  exampleTitle: string;
  thumbnailUrl: string;
  brokeOutPercent: number;
  brokeOutCount: number;
  viewsPerDay: number;
  totalVideos: number;
  channelsCount: number;
  withChaptersPercent: number;
  growth7d: number;
}

export interface FormatTrendItem {
  id: string;
  title: string;
  badge: 'New' | 'Hot';
  country: string;
  creatorsCount: number;
  creatorsGrowth: number;
  videosCount: number;
  viewsCount: string;
  whyItWorks: string;
  thumbnailUrl: string;
}

export interface ShootingTemplate {
  id: string;
  name: string;
  gist: string;
  usually: string;
  tags: string[];
  creatorsUsing: number;
  complexity: 'Easy to shoot' | 'Medium effort' | 'Hard to shoot';
  format: string;
  framing: string;
}

export interface RadarWorkspace {
  id: string;
  name: string;
  tiktokCount: number;
  instagramCount: number;
  keywords: {
    id: string;
    text: string;
    platforms: ('instagram' | 'tiktok')[];
    frequency: 'daily';
  }[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  category: string;
  country: string;
  totalAudience: string;
  followersCount: number;
  bio: string;
  reelsPriceUsd?: number;
  verified: boolean;
}

export interface LeaderboardCreator {
  id: string;
  rank: number;
  creatorIdText: string;
  earnedUsd: number;
}

export interface TokenPack {
  tokens: number;
  priceUsd: number;
  bonusPercent?: number;
  isPopular?: boolean;
}
