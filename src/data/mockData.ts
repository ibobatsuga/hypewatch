import {
  VideoItem,
  AudioTrendItem,
  LongVerticalItem,
  FormatTrendItem,
  ShootingTemplate,
  RadarWorkspace,
  LeaderboardCreator,
  TokenPack
} from '../types';

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'The best love language is food tour',
    platform: 'instagram',
    creatorName: 'Raffi & Nagita',
    creatorHandle: '@raffinagita1717',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    duration: '0:29',
    views: 17600000,
    likes: 686100,
    comments: 2200,
    daysAgo: 45,
    fireScore: 200,
    category: 'Food & Travel',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: 'Cobain kuliner legendaris yang gak pernah sepi! Antri 2 jam tapi beneran worth it banget guys 🔥',
    hookText: 'Makanan ini selalu habis sebelum jam 1 siang...',
    audioName: 'Rohitani Pavari',
    isFavorite: false
  },
  {
    id: 'vid-2',
    title: 'Fashion show runway reveal',
    platform: 'instagram',
    creatorName: 'Ivan Gunawan',
    creatorHandle: '@ivan_gunawan',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    duration: '1:30',
    views: 5800000,
    likes: 202000,
    comments: 931,
    daysAgo: 24,
    fireScore: 142.2,
    category: 'Fashion & Style',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: 'Batik Nusantara dibawa ke panggung internasional! Bangga karya anak bangsa bisa berkibar di Paris ✨',
    hookText: 'Ketika kain tradisional disulap jadi couture modern!',
    audioName: 'Urgent News',
    isFavorite: true
  },
  {
    id: 'vid-3',
    title: 'Coffee shop secret recipe espresso tonic',
    platform: 'tiktok',
    creatorName: 'Barista Daily',
    creatorHandle: '@baristadaily_id',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    duration: '0:18',
    views: 12900000,
    likes: 542300,
    comments: 2300,
    daysAgo: 82,
    fireScore: 200,
    category: 'Promoting a coffee shop',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: '3 kesalahan fatal saat bikin espresso tonic yang bikin rasa kopinya ancur! Jangan diulangi ya ☕️',
    hookText: 'Stop buang espresso kamu! Ini trik anti pahit...',
    audioName: 'BAD TIMES',
    isFavorite: false
  },
  {
    id: 'vid-4',
    title: '15 Minutes Home Workout No Equipment',
    platform: 'youtube',
    creatorName: 'Fitness Bro',
    creatorHandle: '@fitnessbro_official',
    creatorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    duration: '0:54',
    views: 2700000,
    likes: 15000,
    comments: 61,
    daysAgo: 75,
    fireScore: 148.47,
    category: 'Fitness & Health',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: 'Bakar 300 kalori sebelum sarapan cuma modal karpet kamar tidur! Simpan video ini buat besok pagi 💪',
    hookText: 'Kalau perut kamu masih buncit, coba 3 gerakan ini...',
    audioName: 'ROAD TO LA',
    isFavorite: false
  },
  {
    id: 'vid-5',
    title: 'Tips for entrepreneurs launching first SaaS',
    platform: 'instagram',
    creatorName: 'Bobi Agusta',
    creatorHandle: '@ibobatsuga',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '2:15',
    views: 4890000,
    likes: 198000,
    comments: 1420,
    daysAgo: 12,
    fireScore: 189.4,
    category: 'Tips for entrepreneurs',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: 'Cara scale bisnis dari 0 ke $10k/bulan cuma dengan otomasi AI dan sistem cerdas tanpa tim besar! 🚀',
    hookText: 'Kenapa 90% startup gagal di 3 bulan pertama? Ini rahasianya...',
    audioName: 'Alfaaz',
    isFavorite: true
  },
  {
    id: 'vid-6',
    title: 'Skincare routine that cleared cystic acne in 30 days',
    platform: 'tiktok',
    creatorName: 'Dr. Glow Aesthetic',
    creatorHandle: '@drglow_skin',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    duration: '0:42',
    views: 8900000,
    likes: 421000,
    comments: 3100,
    daysAgo: 18,
    fireScore: 165.8,
    category: 'Skincare',
    country: 'Indonesia',
    language: 'Indonesian',
    caption: 'Bukan endorsement! Ini 3 kandungan aktif yang beneran terbukti klinis ngilangin jerawat batu 🤍',
    hookText: 'Jangan beli serum mahal sebelum kamu cek bahan nomor 2 ini...',
    audioName: 'Nanna Kambali',
    isFavorite: false
  }
];

export const AUDIO_TRENDS: AudioTrendItem[] = [
  {
    id: 'aud-1',
    rank: 1,
    title: 'Urgent News',
    artist: 'Original Sound · Viral Sounds',
    platform: 'instagram',
    badges: ['IG Trend', 'Viral'],
    fireVideos: 2934,
    totalVideos: 7461,
    paceDaily: 1066,
    paceTrend: 0.9,
    isPacePositive: false,
    countryShare: 'ID 38%, IN 22%, US 15%'
  },
  {
    id: 'aud-2',
    rank: 2,
    title: 'BAD TIMES',
    artist: 'Lofi Beats Jakarta',
    platform: 'youtube',
    badges: ['Viral', 'New'],
    fireVideos: 85,
    totalVideos: 861,
    paceDaily: 123,
    paceTrend: 1.1,
    isPacePositive: true,
    countryShare: 'ID 45%, MY 20%'
  },
  {
    id: 'aud-3',
    rank: 3,
    title: 'Alfaaz (Slowed & Reverb)',
    artist: 'Acoustic Sessions',
    platform: 'instagram',
    badges: ['IG Trend'],
    fireVideos: 1420,
    totalVideos: 4200,
    paceDaily: 480,
    paceTrend: 1.4,
    isPacePositive: true,
    countryShare: 'IN 60%, ID 18%'
  },
  {
    id: 'aud-4',
    rank: 4,
    title: 'Nanna Kambali',
    artist: 'Ananthavadhani Records',
    platform: 'tiktok',
    badges: ['Viral'],
    fireVideos: 520,
    totalVideos: 1280,
    paceDaily: 340,
    paceTrend: 4.3,
    isPacePositive: true,
    countryShare: 'ID 72%'
  },
  {
    id: 'aud-5',
    rank: 5,
    title: 'Rohitani Pavari',
    artist: 'Global Folk Beat',
    platform: 'instagram',
    badges: ['New'],
    fireVideos: 310,
    totalVideos: 940,
    paceDaily: 210,
    paceTrend: 4.3,
    isPacePositive: true,
    countryShare: 'ID 55%, BR 15%'
  }
];

export const LONG_VERTICALS: LongVerticalItem[] = [
  {
    rank: 1,
    verticalName: 'Office & Remote Work',
    exampleTitle: 'Blinkit Work From Home Job | Online jobs at Home| Freshers Can Apply!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    brokeOutPercent: 6.3,
    brokeOutCount: 10,
    viewsPerDay: 279,
    totalVideos: 175,
    channelsCount: 28,
    withChaptersPercent: 13.1,
    growth7d: 0.0
  },
  {
    rank: 2,
    verticalName: 'Asian Politics & Current Affairs',
    exampleTitle: 'Bharatiya Janta Vs Party In Power | Massive Crackdown Breakdown',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80',
    brokeOutPercent: 6.2,
    brokeOutCount: 12162,
    viewsPerDay: 256,
    totalVideos: 197822,
    channelsCount: 4120,
    withChaptersPercent: 24.5,
    growth7d: 3.2
  },
  {
    rank: 3,
    verticalName: 'SaaS Architecture & Coding Tutorials',
    exampleTitle: 'How to build fullstack AI Agent systems with Next.js and Python',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    brokeOutPercent: 8.9,
    brokeOutCount: 410,
    viewsPerDay: 1420,
    totalVideos: 3200,
    channelsCount: 310,
    withChaptersPercent: 82.0,
    growth7d: 14.8
  }
];

export const FORMAT_TRENDS: FormatTrendItem[] = [
  {
    id: 'fmt-1',
    title: 'One Outfit in Multiple Poses',
    badge: 'New',
    country: 'India',
    creatorsCount: 30,
    creatorsGrowth: 30,
    videosCount: 34,
    viewsCount: '13.8M',
    whyItWorks: 'The repeatable mechanic is a collage or sequence of posed images showing the same person in an outfit against a clean background. The fast pose changes retain attention while letting viewers inspect styling and details.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fmt-2',
    title: 'Versus & Comparisons · Disease Prevention & Hacks',
    badge: 'Hot',
    country: 'India +1',
    creatorsCount: 16,
    creatorsGrowth: 11,
    videosCount: 20,
    viewsCount: '197K',
    whyItWorks: 'Side-by-side split comparison displaying wrong habit vs right habit with bold color labels, creating immediate psychological polarity and comments debate.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fmt-3',
    title: 'Expensive Magazine Aesthetic Flipbook',
    badge: 'New',
    country: 'Indonesia',
    creatorsCount: 45,
    creatorsGrowth: 28,
    videosCount: 68,
    viewsCount: '4.2M',
    whyItWorks: 'Mimics flipping through an editorial Vogue/Harper luxury catalog with smooth paper sound effects and high-contrast typography overlays.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80'
  }
];

export const SHOOTING_TEMPLATES: ShootingTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Demo in Action',
    gist: 'Shows a product or workflow in one continuous take with own footage.',
    usually: 'A person filling the screen, clear headline with the idea, one take without cuts.',
    tags: ['Easy to shoot', 'Fashion', 'Food', 'Beauty', 'Fitness'],
    creatorsUsing: 2995,
    complexity: 'Easy to shoot',
    format: 'Talking head / Product demo',
    framing: 'Vertical 9:16'
  },
  {
    id: 'tmpl-2',
    name: 'Silent to Music & Fast Text',
    gist: 'No spoken words, high-energy trending music only with punchy text overlays.',
    usually: 'POV perspective, fast cut pacing every 1.2 seconds, loop ending.',
    tags: ['Easy to shoot', 'Travel', 'Food', 'Humor & everyday', 'Relationships'],
    creatorsUsing: 4120,
    complexity: 'Easy to shoot',
    format: 'Reaction / Slideshow',
    framing: 'Vertical 9:16'
  },
  {
    id: 'tmpl-3',
    name: 'Skit & Character Dialogue',
    gist: 'Creator plays two opposing roles talking to each other using glasses/hat props.',
    usually: 'Cut between left-facing and right-facing angles to simulate conversation.',
    tags: ['Medium effort', 'Humor & everyday', 'Education', 'Relationships'],
    creatorsUsing: 1824,
    complexity: 'Medium effort',
    format: 'Skit',
    framing: 'Split screen / Eyeline match'
  }
];

export const RADAR_WORKSPACES: RadarWorkspace[] = [
  {
    id: 'ws-1',
    name: 'Beauty · Fitness · Food',
    tiktokCount: 742,
    instagramCount: 2085,
    keywords: [
      { id: 'kw-1', text: 'easy recipes', platforms: ['instagram', 'tiktok'], frequency: 'daily' },
      { id: 'kw-2', text: 'home workout', platforms: ['instagram', 'tiktok'], frequency: 'daily' },
      { id: 'kw-3', text: 'skincare', platforms: ['instagram', 'tiktok'], frequency: 'daily' }
    ]
  },
  {
    id: 'ws-2',
    name: 'AI Tools & Tech Startups',
    tiktokCount: 310,
    instagramCount: 940,
    keywords: [
      { id: 'kw-4', text: 'ai automation', platforms: ['instagram', 'tiktok'], frequency: 'daily' },
      { id: 'kw-5', text: 'saas marketing', platforms: ['instagram', 'tiktok'], frequency: 'daily' }
    ]
  }
];

export const LEADERBOARD_CREATORS: LeaderboardCreator[] = [
  { id: 'c-1', rank: 1, creatorIdText: 'ID 566759', earnedUsd: 20189.00 },
  { id: 'c-2', rank: 2, creatorIdText: 'ID 327872', earnedUsd: 18274.63 },
  { id: 'c-3', rank: 3, creatorIdText: 'ID 223067', earnedUsd: 16432.18 },
  { id: 'c-4', rank: 4, creatorIdText: 'ID 941054', earnedUsd: 14308.75 },
  { id: 'c-5', rank: 5, creatorIdText: 'ID 625691', earnedUsd: 11946.40 },
  { id: 'c-6', rank: 6, creatorIdText: 'ID 565390', earnedUsd: 10127.82 },
  { id: 'c-7', rank: 7, creatorIdText: 'ID 356693', earnedUsd: 8673.54 },
  { id: 'c-8', rank: 8, creatorIdText: 'ID 489527', earnedUsd: 7428.16 },
  { id: 'c-9', rank: 9, creatorIdText: 'ID 274438', earnedUsd: 6519.77 }
];

export const TOKEN_PACKS: TokenPack[] = [
  { tokens: 1000, priceUsd: 19 },
  { tokens: 3100, priceUsd: 49, bonusPercent: 20 },
  { tokens: 7300, priceUsd: 99, bonusPercent: 40, isPopular: true }
];

export const TOOLS_CATALOG = [
  { id: 'yt-trans', name: 'YouTube transcript', desc: 'Paste a video link, get full text with timestamps.', icon: 'Video' },
  { id: 'tt-trans', name: 'TikTok transcript', desc: 'Paste a TikTok link, get every spoken word as text.', icon: 'Music' },
  { id: 'stt', name: 'Speech to text', desc: 'Dictate and watch your words appear as live text.', icon: 'Mic' },
  { id: 'att', name: 'Audio to text', desc: 'Upload a recording, get every word as subtitles or text.', icon: 'UploadCloud' },
  { id: 'vtt', name: 'Video to text', desc: 'Upload a video or paste a YouTube link, get the transcript.', icon: 'FileVideo' },
  { id: 'vmtt', name: 'Voice message to text', desc: 'Read what was said in a voice memo or audio note.', icon: 'FileAudio' },
  { id: 'traud', name: 'Translate audio', desc: 'Translate a spoken recording into another language as text.', icon: 'Languages' },
  { id: 'subgen', name: 'Subtitle generator', desc: 'Upload a video, download ready-to-use SRT subtitles.', icon: 'Captions' },
  { id: 'vdub', name: 'Video dubbing', desc: 'Voice a video in another language, in the speaker’s own cloned voice.', icon: 'Volume2' },
  { id: 'vtrans', name: 'Video translator', desc: 'Pick a language, get translated subtitles burned into video.', icon: 'Globe' },
  { id: 'capgen', name: 'Caption generator', desc: 'Get an MP4 with animated stylish captions burned onto the picture.', icon: 'Film' },
  { id: 'podtrans', name: 'Podcast transcription', desc: 'Paste an episode link, get the full transcript and timestamps.', icon: 'Radio' },
  { id: 'tts', name: 'Text to speech', desc: 'Paste text, hear it spoken as realistic studio audio.', icon: 'Speaker' }
];
