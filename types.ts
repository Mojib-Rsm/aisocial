

export enum Tone {
  Friendly = 'Friendly',
  Funny = 'Funny',
  Formal = 'Formal',
  Emotional = 'Emotional',
  Political = 'Political',
  Islamic = 'Islamic',
  Supportive = 'Supportive',
  Disagreeing = 'Disagreeing',
  Witty = 'Witty',
  Inspirational = 'Inspirational',
  Persuasive = 'Persuasive',
  Urgent = 'Urgent',
  Dramatic = 'Dramatic',
  Educational = 'Educational',
}

export enum Length {
  Short = 'Short (1-10 words)',
  Medium = 'Medium (11-30 words)',
  Long = 'Long (30+ words)',
}

export enum Language {
  English = 'English',
  Bengali = 'Bengali',
}

export enum Goal {
    Engagement = 'Engagement',
    Humor = 'Humor',
    EmotionalImpact = 'Emotional Impact',
    Education = 'Education',
    Sales = 'Sales',
}

export enum Stance {
    InFavor = 'In Favor',
    Opposed = 'Opposed',
    Neutral = 'Neutral',
}

export enum PoliticalParty {
    None = 'None / General',
    AwamiLeague = 'Awami League',
    BNP = 'BNP (Bangladesh Nationalist Party)',
    JatiyaParty = 'Jatiya Party',
    JamaatShibir = 'Jamaat/Shibir',
    NCP = 'NCP',
}

export enum VideoResolution {
    SD = '720p',
    HD = '1080p',
}

export enum VideoAspectRatio {
    Landscape = '16:9',
    Portrait = '9:16',
}

export enum ImageStyle {
    Photorealistic = 'Photorealistic',
    Cinematic = 'Cinematic',
    Anime = 'Anime',
    FantasyArt = 'Fantasy Art',
    ThreeDModel = '3D Model',
    YouTubeThumbnail = 'YouTube Thumbnail',
}

export enum ImageAspectRatio {
    Auto = 'Auto',
    Square = '1:1',
    Portrait = '3:4',
    PortraitLarge = '9:16',
    Landscape = '16:9',
    LandscapeStandard = '4:3',
    Original = 'Original',
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
  category: string;
}

export interface GeneratedText {
  id:string;
  text: string;
}

export enum View {
    GENERATOR = 'GENERATOR',
    ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  captionsGenerated: number;
  commentsGenerated: number;
  status: 'Active' | 'Warned' | 'Banned';
}

export type ToolMode = 
  | 'caption' | 'comment' | 'hashtag' | 'bio' | 'idea' | 'ad-copy' 
  | 'youtube-title' | 'youtube-desc' | 'reel-script' | 'tiktok-idea' 
  | 'video' | 'photo';

export type Page = 
  | 'home' 
  | 'caption-generator' | 'comment-generator' | 'hashtag-generator' | 'bio-generator' | 'idea-generator' | 'ad-copy-generator' 
  | 'youtube-title-generator' | 'youtube-desc-generator' | 'reel-script-generator' | 'tiktok-idea-generator'
  | 'video-generator' | 'photo-generator' | 'media-downloader' | 'font-generator';

export interface GenerationParams {
    postContent: string;
    toolMode: ToolMode;
    uploadedImage?: { mimeType: string; data: string; };
    tone: Tone;
    length: Length;
    language: Language;
    useEmojis: boolean;
    // Tone Slider for Quick Mode
    toneSliderValue?: number;
    // Political
    stance?: Stance;
    politicalParty?: PoliticalParty;
    isQuickPolitical?: boolean;
    // Advanced
    isAdvanced: boolean;
    context: string;
    brandVoice: string;
    goal: Goal;
}

export interface CurrentUser {
  name: string;
  role: 'user' | 'admin';
}

export interface UploadedImage {
  name: string;
  url: string;
  data: string;
  mimeType: string;
}