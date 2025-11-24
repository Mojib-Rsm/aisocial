
import { Template, Tone, Length, Language, Goal, Stance, PoliticalParty, VideoResolution, VideoAspectRatio, ImageStyle, ImageAspectRatio } from './types';

export const CAPTION_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Emotional, Tone.Political, Tone.Islamic];
export const COMMENT_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Supportive, Tone.Disagreeing, Tone.Formal, Tone.Emotional, Tone.Political, Tone.Islamic];
export const BIO_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Witty, Tone.Inspirational];
export const AD_COPY_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Persuasive, Tone.Urgent];
export const CONTENT_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Inspirational, Tone.Educational, Tone.Dramatic];

export const LENGTHS: Length[] = [Length.Short, Length.Medium, Length.Long];
export const LANGUAGES: Language[] = [Language.English, Language.Bengali];
export const GOALS: Goal[] = [Goal.Engagement, Goal.Humor, Goal.EmotionalImpact, Goal.Education, Goal.Sales];
export const STANCES: Stance[] = [Stance.InFavor, Stance.Opposed, Stance.Neutral];
export const POLITICAL_PARTIES: PoliticalParty[] = [PoliticalParty.None, PoliticalParty.AwamiLeague, PoliticalParty.BNP, PoliticalParty.JatiyaParty, PoliticalParty.JamaatShibir, PoliticalParty.NCP];
export const VIDEO_RESOLUTIONS: VideoResolution[] = [VideoResolution.SD, VideoResolution.HD];
export const VIDEO_ASPECT_RATIOS: VideoAspectRatio[] = [VideoAspectRatio.Landscape, VideoAspectRatio.Portrait];
export const IMAGE_STYLES: ImageStyle[] = [ImageStyle.Photorealistic, ImageStyle.Cinematic, ImageStyle.Anime, ImageStyle.FantasyArt, ImageStyle.ThreeDModel, ImageStyle.YouTubeThumbnail];
export const IMAGE_ASPECT_RATIOS: ImageAspectRatio[] = [
    ImageAspectRatio.Auto,
    ImageAspectRatio.Square, 
    ImageAspectRatio.Portrait, 
    ImageAspectRatio.PortraitLarge,
    ImageAspectRatio.Landscape,
    ImageAspectRatio.LandscapeStandard,
    ImageAspectRatio.Original
];


export const CAPTION_TEMPLATES: Template[] = [
  { id: 't1', name: 'Appreciation Post Caption', prompt: 'Write a caption expressing appreciation for something.', category: 'Appreciation' },
  { id: 't2', name: 'Question-based Caption', prompt: 'Write a caption that asks an engaging question.', category: 'Engagement' },
  { id: 't3', name: 'Positive Vibe Caption', prompt: 'Write a caption that expresses a positive reaction or vibe.', category: 'Feedback' },
  { id: 't4', name: 'Highlight Caption', prompt: 'Write a caption that highlights something positive.', category: 'Compliments' },
  { id: 't5', name: 'CTA Caption', prompt: 'Write a caption with a call to action, like "Check out the link in bio!"', category: 'CTA' },
];

export const COMMENT_TEMPLATES: Template[] = [
  { id: 'c1', name: 'Express Agreement', prompt: 'The post is about something I agree with.', category: 'Agreement' },
  { id: 'c2', name: 'Ask a Question', prompt: 'The post is interesting and I want to ask a question about it.', category: 'Curiosity' },
  { id: 'c3', name: 'Offer Congratulations', prompt: 'The post is announcing good news, like a graduation or new job.', category: 'Support' },
  { id: 'c4', name: 'Share a Personal Experience', prompt: 'The post is about a topic I have a personal experience with.', category: 'Relatability' },
  { id: 'c5', name: 'Simple Positive Reaction', prompt: 'The post is something I like and want to leave a simple positive comment on.', category: 'Feedback' },
];


export const PROFANITY_LIST: string[] = ['badword1', 'badword2', 'offensiveword']; // Replace with a real list

export const TRANSLATIONS = {
  // Site & Header
  siteName: { en: 'AI Social Toolkit', bn: 'এআই সোশ্যাল টুলকিট' },
  
  // Categories
  catDownloader: { en: '🔥 Downloader Tools', bn: '🔥 ডাউনলোডার টুলস' },
  catAiText: { en: '🧠 AI Text Tools', bn: '🧠 এআই টেক্সট টুলস' },
  catDesign: { en: '🎨 Design & Display', bn: '🎨 ডিজাইন এবং ডিসপ্লে' },
  catStylish: { en: '🔤 Stylish Text', bn: '🔤 স্টাইলিশ টেক্সট' },
  catAudio: { en: '🎵 Audio Tools', bn: '🎵 অডিও টুলস' },
  catAnalytics: { en: '📈 Analytics & Utility', bn: '📈 অ্যানালিটিক্স এবং ইউটিলিটি' },

  // Tools
  captionGenerator: { en: 'Caption Generator', bn: 'ক্যাপশন জেনারেটর' },
  commentGenerator: { en: 'Comment Generator', bn: 'কমেন্ট জেনারেটর' },
  hashtagGenerator: { en: 'Hashtag Generator', bn: 'হ্যাশট্যাগ জেনারেটর' },
  bioGenerator: { en: 'Bio Generator', bn: 'বায়ো জেনারেটর' },
  ideaGenerator: { en: 'Content Idea Generator', bn: 'কনটেন্ট আইডিয়া জেনারেটর' },
  adCopyGenerator: { en: 'Ad Copy Generator', bn: 'বিজ্ঞাপনের কপি জেনারেটর' },
  videoGenerator: { en: 'Video Generator', bn: 'ভিডিও জেনারেটর' },
  photoGenerator: { en: 'Photo Generator', bn: 'ফটো জেনারেটর' },
  mediaDownloader: { en: 'Media Downloader', bn: 'মিডিয়া ডাউনলোডার' },
  youtubeTitle: { en: 'YouTube Title Generator', bn: 'ইউটিউব টাইটেল জেনারেটর' },
  youtubeDesc: { en: 'YouTube Description', bn: 'ইউটিউব ডেসক্রিপশন' },
  reelScript: { en: 'Reel/TikTok Script', bn: 'রিল/টিকটক স্ক্রিপ্ট' },
  tiktokIdea: { en: 'TikTok Idea Generator', bn: 'টিকটক আইডিয়া জেনারেটর' },
  fontGenerator: { en: 'Fancy Font Generator', bn: 'ফ্যান্সি ফন্ট জেনারেটর' },
  
  admin: { en: 'Admin', bn: 'অ্যাডমিন' },
  
  // Homepage
  homeTitle: { en: 'All-in-One Social Media Toolkit', bn: 'অল-ইন-ওয়ান সোশ্যাল মিডিয়া টুলকিট' },
  homeSubtitle: { en: '50+ Free Tools to Supercharge Your Social Media Presence', bn: 'আপনার সোশ্যাল মিডিয়া উপস্থিতি সুপারচার্জ করার জন্য ৫০+ ফ্রি টুলস' },
  toolsTitle: { en: 'All Tools', bn: 'সকল টুলস' },
  
  // Tool Descriptions (Generic)
  descText: { en: 'Generate high-quality text content.', bn: 'উচ্চ মানের টেক্সট কনটেন্ট তৈরি করুন।' },
  descVideo: { en: 'Create or download videos.', bn: 'ভিডিও তৈরি বা ডাউনলোড করুন।' },
  descPhoto: { en: 'Create or edit photos.', bn: 'ছবি তৈরি বা এডিট করুন।' },
  
  // Generator Controls
  create: { en: 'Create', bn: 'তৈরি করুন' },
  history: { en: 'History', bn: 'ইতিহাস' },
  postContentPlaceholder: { en: 'Enter post topic, content, or link...', bn: 'পোস্টের বিষয়বস্তু, টপিক বা লিঙ্ক লিখুন...' },
  postToCommentOnPlaceholder: { en: 'Enter content of the post to comment on...', bn: 'যে পোস্টে মন্তব্য করতে চান তার বিষয়বস্তু লিখুন...' },
  hashtagTopicPlaceholder: { en: 'Enter a topic to generate hashtags for...', bn: 'হ্যাশট্যাগ জেনারেট করার জন্য একটি টপিক লিখুন...' },
  bioInfoPlaceholder: { en: 'Describe yourself or your brand...', bn: 'আপনার বা আপনার ব্র্যান্ড সম্পর্কে বর্ণনা করুন...' },
  ideaTopicPlaceholder: { en: 'Enter a niche (e.g., "healthy breakfast")...', bn: 'একটি টপিক লিখুন (যেমন, "স্বাস্থ্যকর সকালের নাস্তা")...' },
  adCopyProductPlaceholder: { en: 'Describe your product or service...', bn: 'আপনার পণ্য বা পরিষেবা বর্ণনা করুন...' },
  videoPromptPlaceholder: { en: 'e.g., A cinematic shot of a futuristic city...', bn: 'যেমন, উড়ন্ত গাড়ি সহ সূর্যাস্তের সময় একটি ভবিষ্যৎ শহরের সিনেম্যাটিক শট' },
  ytTitlePlaceholder: { en: 'Enter video topic...', bn: 'ভিডিওর বিষয় লিখুন...' },
  scriptPlaceholder: { en: 'Enter video concept...', bn: 'ভিডিওর কনসেপ্ট লিখুন...' },
  
  quickMode: { en: 'Quick Mode', bn: 'কুইক মোড' },
  advanced: { en: 'Advanced', bn: 'অ্যাডভান্সড' },
  tone: { en: 'Tone', bn: 'টোন' },
  length: { en: 'Length', bn: 'দৈর্ঘ্য' },
  language: { en: 'Language', bn: 'ভাষা' },
  useEmojis: { en: 'Use Emojis', bn: 'ইমোজি ব্যবহার করুন' },
  politicalCaption: { en: 'Political Caption', bn: 'রাজনৈতিক ক্যাপশন' },
  politicalComment: { en: 'Political Comment', bn: 'রাজনৈতিক কমেন্ট' },
  stance: { en: 'Stance (Pokkhe/Bipokkhe)', bn: 'অবস্থান (পক্ষে/বিপক্ষে)' },
  politicalParty: { en: 'Political Party', bn: 'রাজনৈতিক দল' },
  additionalContext: { en: 'Additional Context', bn: 'অতিরিক্ত তথ্য' },
  contextPlaceholder: { en: 'e.g., The poster is a close friend.', bn: 'যেমন, পোস্টদাতা একজন কাছের বন্ধু।' },
  brandVoice: { en: 'Brand Voice', bn: 'ব্র্যান্ড ভয়েস' },
  brandVoicePlaceholder: { en: 'e.g., Professional, witty, Gen Z', bn: 'যেমন, প্রফেশনাল, মজাদার, Gen Z' },
  goal: { en: 'Goal', bn: 'লক্ষ্য' },

  // Video Generator
  resolution: { en: 'Resolution', bn: 'রেজোলিউশন' },
  aspectRatio: { en: 'Aspect Ratio', bn: 'অ্যাসপেক্ট রেশিও' },
  generateVideo: { en: 'Generate Video', bn: 'ভিডিও তৈরি করুন' },
  generatingVideo: { en: 'Generating Video...', bn: 'ভিডিও তৈরি হচ্ছে...' },
  generatedVideo: { en: 'Generated Video', bn: 'তৈরি হওয়া ভিডিও' },
  startCreatingVideo: { en: 'Describe the video you want to create!', bn: 'আপনি যে ভিডিওটি তৈরি করতে চান তার বর্ণনা দিন!' },
  startCreatingVideoSub: { en: 'Enter a detailed prompt, choose your options, and let the AI bring your vision to life.', bn: 'একটি বিস্তারিত প্রম্পট লিখুন, আপনার বিকল্পগুলি চয়ন করুন এবং এআইকে আপনার কল্পনাকে জীবন্ত করে তুলতে দিন।' },
  downloadVideo: { en: 'Download Video', bn: 'ভিডিও ডাউনলোড করুন' },
  downloadAudio: { en: 'Download Audio (MP3)', bn: 'অডিও ডাউনলোড (MP3)' },
  selectApiKey: { en: 'Select API Key to Generate Video', bn: 'ভিডিও তৈরি করতে API কী নির্বাচন করুন' },
  apiKeyRequired: { en: 'An API key is required for video generation.', bn: 'ভিডিও জেনারেশনের জন্য একটি API কী প্রয়োজন।' },
  billingInfo: { en: 'For more information on billing, visit the official documentation.', bn: 'বিলিং সম্পর্কে আরও তথ্যের জন্য, অফিসিয়াল ডকুমেন্টেশন দেখুন।' },
  videoGenWait: { en: 'Video generation can take a few minutes. Please be patient.', bn: 'ভিডিও তৈরি হতে কয়েক মিনিট সময় লাগতে পারে। অনুগ্রহ করে ধৈর্য ধরুন।' },
  videoGenProgress1: { en: 'Warming up the creative engines...', bn: 'সৃজনশীল ইঞ্জিন গরম হচ্ছে...' },
  videoGenProgress2: { en: 'Directing the digital actors...', bn: 'ডিজিটাল অভিনেতাদের নির্দেশনা দেওয়া হচ্ছে...' },
  videoGenProgress3: { en: 'Rendering the final cut...', bn: 'ফাইনাল কাট রেন্ডার করা হচ্ছে...' },
  
  // Photo Generator
  photoPromptPlaceholder: { en: 'e.g., A photorealistic image of an astronaut...', bn: 'যেমন, মঙ্গলে ঘোড়ায় চড়া একজন নভোচারীর একটি ফটোরিয়ালিস্টিক ছবি' },
  style: { en: 'Style', bn: 'স্টাইল' },
  generatePhoto: { en: 'Generate Photo', bn: 'ফটো তৈরি করুন' },
  generatingPhoto: { en: 'Generating Photo...', bn: 'ফটো তৈরি হচ্ছে...' },
  generatedPhoto: { en: 'Generated Photo', bn: 'তৈরি হওয়া ফটো' },
  startCreatingPhoto: { en: 'Describe the photo you want to create!', bn: 'আপনি যে ফটোটি তৈরি করতে চান তার বর্ণনা দিন!' },
  startCreatingPhotoSub: { en: 'Enter a detailed prompt, choose your style, and let the AI bring your vision to life.', bn: 'একটি বিস্তারিত প্রম্পট লিখুন, আপনার স্টাইল চয়ন করুন এবং এআইকে আপনার কল্পনাকে জীবন্ত করে তুলতে দিন।' },
  downloadPhoto: { en: 'Download Photo', bn: 'ফটো ডাউনলোড করুন' },
  
  // Media Downloader
  thumbnailDownloader: { en: 'Thumbnail', bn: 'থাম্বনেইল' },
  facebookDownloader: { en: 'Facebook', bn: 'ফেসবুক' },
  instagramDownloader: { en: 'Instagram', bn: 'ইনস্টাগ্রাম' },
  youtubeDownloader: { en: 'YouTube', bn: 'ইউটিউব' },
  tiktokDownloader: { en: 'TikTok', bn: 'টিকটক' },
  twitterDownloader: { en: 'X / Twitter', bn: 'X / টুইটার' },
  pinterestDownloader: { en: 'Pinterest', bn: 'পিন্টারেস্ট' },
  audioDownloader: { en: 'YouTube to MP3', bn: 'ইউটিউব থেকে MP3' },
  
  pasteUrl: { en: 'Paste URL here...', bn: 'এখানে URL পেস্ট করুন...' },
  facebookPlaceholder: { en: 'Paste Facebook video/reel URL...', bn: 'ফেসবুক ভিডিওর URL পেস্ট করুন...' },
  instagramPlaceholder: { en: 'Paste Instagram reel/video URL...', bn: 'ইনস্টাগ্রাম রিল/ভিডিওর URL পেস্ট করুন...' },
  youtubePlaceholder: { en: 'Paste YouTube video URL...', bn: 'ইউটিউব ভিডিওর URL পেস্ট করুন...' },
  tiktokPlaceholder: { en: 'Paste TikTok video URL...', bn: 'টিকটক ভিডিওর URL পেস্ট করুন...' },
  twitterPlaceholder: { en: 'Paste X/Twitter post URL...', bn: 'X/টুইটার পোস্টের URL পেস্ট করুন...' },
  pinterestPlaceholder: { en: 'Paste Pinterest pin URL...', bn: 'পিন্টারেস্ট পিনের URL পেস্ট করুন...' },
  
  getThumbnail: { en: 'Get Thumbnail', bn: 'থাম্বনেইল দেখুন' },
  downloadImage: { en: 'Download Image', bn: 'ছবি ডাউনলোড করুন' },
  resolutions: { en: 'Available Resolutions', bn: 'উপলব্ধ রেজোলিউশন' },
  maxRes: { en: 'Maximum Resolution', bn: 'সর্বোচ্চ রেজোলিউশন' },
  highRes: { en: 'High Quality', bn: 'উচ্চ গুণমান' },
  stdRes: { en: 'Standard Quality', bn: 'সাধারণ গুণমান' },
  detecting: { en: 'Detecting...', bn: 'শনাক্ত করা হচ্ছে...' },
  platformDetected: { en: 'Platform Detected', bn: 'প্ল্যাটফর্ম শনাক্ত হয়েছে' },
  downloadError: { en: 'Problem downloading video. Please check URL.', bn: 'ভিডিও ডাউনলোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে URL চেক করুন।' },
  invalidUrl: { en: 'Invalid URL.', bn: 'ভুল URL।' },
  invalidFacebookUrl: { en: 'Invalid Facebook URL. Please check the link.', bn: 'ভুল ফেসবুক URL। অনুগ্রহ করে লিঙ্কটি চেক করুন।' },
  invalidInstagramUrl: { en: 'Invalid Instagram URL. Please check the link.', bn: 'ভুল ইনস্টাগ্রাম URL। অনুগ্রহ করে লিঙ্কটি চেক করুন।' },
  invalidYoutubeUrl: { en: 'Invalid YouTube URL. Please check the link.', bn: 'ভুল ইউটিউব URL। অনুগ্রহ করে লিঙ্কটি চেক করুন।' },
  invalidTiktokUrl: { en: 'Invalid TikTok URL.', bn: 'ভুল টিকটক URL।' },
  invalidTwitterUrl: { en: 'Invalid X/Twitter URL.', bn: 'ভুল X/টুইটার URL।' },
  invalidPinterestUrl: { en: 'Invalid Pinterest URL.', bn: 'ভুল পিন্টারেস্ট URL।' },
  processing: { en: 'Processing...', bn: 'প্রক্রিয়া করা হচ্ছে...' },
  downloadReady: { en: 'Download Ready', bn: 'ডাউনলোড তৈরি' },

  // Font Generator
  fontPreview: { en: 'Preview', bn: 'প্রিভিউ' },
  enterText: { en: 'Enter text here...', bn: 'এখানে টেক্সট লিখুন...' },

  // Generator Actions & Results
  generateCaptions: { en: 'Generate Captions', bn: 'ক্যাপশন তৈরি করুন' },
  generateComments: { en: 'Generate Comments', bn: 'কমেন্ট তৈরি করুন' },
  generateHashtags: { en: 'Generate Hashtags', bn: 'হ্যাশট্যাগ তৈরি করুন' },
  generateBios: { en: 'Generate Bios', bn: 'বায়ো তৈরি করুন' },
  generateIdeas: { en: 'Generate Ideas', bn: 'আইডিয়া তৈরি করুন' },
  generateAdCopy: { en: 'Generate Ad Copy', bn: 'বিজ্ঞাপনের কপি তৈরি করুন' },
  generateYtTitle: { en: 'Generate Title', bn: 'টাইটেল তৈরি করুন' },
  generateYtDesc: { en: 'Generate Description', bn: 'ডেসক্রিপশন তৈরি করুন' },
  generateScript: { en: 'Generate Script', bn: 'স্ক্রিপ্ট তৈরি করুন' },
  
  generating: { en: 'Generating...', bn: 'তৈরি হচ্ছে...' },
  generatedCaptions: { en: 'Generated Captions', bn: 'তৈরি হওয়া ক্যাপশন' },
  generatedComments: { en: 'Generated Comments', bn: 'তৈরি হওয়া কমেন্ট' },
  generatedHashtags: { en: 'Generated Hashtags', bn: 'তৈরি হওয়া হ্যাশট্যাগ' },
  generatedBios: { en: 'Generated Bios', bn: 'তৈরি হওয়া বায়ো' },
  generatedIdeas: { en: 'Generated Ideas', bn: 'তৈরি হওয়া আইডিয়া' },
  generatedAdCopies: { en: 'Generated Ad Copies', bn: 'তৈরি হওয়া বিজ্ঞাপন কপি' },
  generatedYtTitles: { en: 'Generated Titles', bn: 'তৈরি হওয়া টাইটেল' },
  generatedYtDescs: { en: 'Generated Descriptions', bn: 'তৈরি হওয়া ডেসক্রিপশন' },
  generatedScripts: { en: 'Generated Scripts', bn: 'তৈরি হওয়া স্ক্রিপ্ট' },
  
  regenerate: { en: 'Regenerate', bn: 'পুনরায় তৈরি করুন' },
  undo: { en: 'Undo', bn: 'পূর্বাবস্থায় ফেরান' },
  errorPostContent: { en: 'Please enter some content or a topic.', bn: 'অনুগ্রহ করে কিছু বিষয়বস্তু বা একটি টপিক লিখুন।' },
  
  // Generator Empty State
  startCreatingCaptions: { en: 'Start by creating some captions!', bn: 'কিছু ক্যাপশন তৈরি করে শুরু করুন!' },
  startCreatingComments: { en: 'Start by creating some comments!', bn: 'কিছু কমেন্ট তৈরি করে শুরু করুন!' },
  startCreatingHashtags: { en: 'Start by creating some hashtags!', bn: 'কিছু হ্যাশট্যাগ তৈরি করে শুরু করুন!' },
  startCreatingBios: { en: 'Start by creating a new bio!', bn: 'একটি নতুন বায়ো তৈরি করে শুরু করুন!' },
  startCreatingIdeas: { en: 'Start by generating some content ideas!', bn: 'কিছু কনটেন্ট আইডিয়া তৈরি করে শুরু করুন!' },
  startCreatingAdCopy: { en: 'Start by generating some ad copy!', bn: 'কিছু বিজ্ঞাপনের কপি তৈরি করে শুরু করুন!' },
  startCreatingYtTitle: { en: 'Start by generating video titles!', bn: 'ভিডিও টাইটেল তৈরি করে শুরু করুন!' },
  startCreatingYtDesc: { en: 'Start by generating descriptions!', bn: 'ডেসক্রিপশন তৈরি করে শুরু করুন!' },
  startCreatingScript: { en: 'Start by generating a script!', bn: 'স্ক্রিপ্ট তৈরি করে শুরু করুন!' },
  
  startCreatingSub: { en: 'Fill in the details on the left and click "Generate" to see the magic happen.', bn: 'বাম দিকের বিবরণ পূরণ করুন এবং জাদু দেখতে "জেনারেট" ক্লিক করুন।' },
  tryTemplates: { en: 'Or, try one of our templates:', bn: 'অথবা, আমাদের টেমপ্লেটগুলো চেষ্টা করুন:' },

  // Image Upload
  uploadScreenshot: { en: 'Upload Screenshot', bn: 'স্ক্রিনশট আপলোড করুন' },
  removeImage: { en: 'Remove Image', bn: 'ছবি সরান' },
  imageUploadErrorSize: { en: 'Image is too large (max 4MB).', bn: 'ছবিটি খুব বড় (সর্বোচ্চ ৪MB)।' },
  imageUploadErrorType: { en: 'Invalid file type. Please upload a PNG, JPEG, or WEBP.', bn: 'ভুল ফাইল টাইপ। অনুগ্রহ করে PNG, JPEG, বা WEBP আপলোড করুন।' },

  // Voice Input
  voiceInput: { en: 'Voice Input', bn: 'ভয়েস ইনপুট' },
  voiceInputListening: { en: 'Listening...', bn: 'শুনছি...' },
  voiceInputUnsupported: { en: 'Voice input is not supported by your browser.', bn: 'আপনার ব্রাউজার ভয়েস ইনপুট সমর্থন করে না।' },

  // Customize Toggle
  customizeOptions: { en: 'Customize Options', bn: 'অপশন কাস্টমাইজ করুন' },

  // History View
  backToGenerator: { en: 'Back to Generator', bn: 'জেনারেটরে ফিরে যান' },
  savedItems: { en: 'Saved Items', bn: 'সেভ করা আইটেম' },
  generationHistory: { en: 'Generation History', bn: 'জেনারেশন ইতিহাস' },
  noSavedItems: { en: "You haven't saved any items yet.", bn: 'আপনি এখনও কোনো আইটেম সেভ করেননি।' },
  noHistory: { en: 'No generation history found. Generate some items to see them here.', bn: 'কোনো জেনারেশন ইতিহাস পাওয়া যায়নি। এখানে দেখতে কিছু আইটেম তৈরি করুন।' },
  
  // Comment Card
  copy: { en: 'Copy', bn: 'কপি' },
  copied: { en: 'Copied!', bn: 'কপি হয়েছে!' },
  share: { en: 'Share', bn: 'শেয়ার' },
  save: { en: 'Save', bn: 'সেভ' },
  saved: { en: 'Saved', bn: 'সেভড' },
  report: { en: 'Report', bn: 'রিপোর্ট' },
  reported: { en: 'Reported', bn: 'রিপোর্টেড' },
  captionReported: { en: 'Caption reported. Thank you for your feedback.', bn: 'ক্যাপশনটি রিপোর্ট করা হয়েছে। আপনার মতামতের জন্য ধন্যবাদ।' },
  commentReported: { en: 'Comment reported. Thank you for your feedback.', bn: 'কমেন্টটি রিপোর্ট করা হয়েছে। আপনার মতামতের জন্য ধন্যবাদ।' },

  // Admin Panel
  adminPanel: { en: 'Admin Panel', bn: 'অ্যাডমিন প্যানেল' },
  totalCaptionsGenerated: { en: 'Total Captions Generated', bn: 'মোট ক্যাপশন তৈরি হয়েছে' },
  totalCommentsGenerated: { en: 'Total Comments Generated', bn: 'মোট কমেন্ট তৈরি হয়েছে' },
  activeUsersToday: { en: 'Active Users Today', bn: 'আজকের সক্রিয় ব্যবহারকারী' },
  reportsReceived: { en: 'Reports Received', bn: 'রিপোর্ট পাওয়া গেছে' },
  templateManagement: { en: 'Template Management', bn: 'টেমপ্লেট ম্যানেজমেন্ট' },
  addNewTemplate: { en: 'Add New Template', bn: 'নতুন টেমপ্লেট যোগ করুন' },
  userMonitoring: { en: 'User Monitoring', bn: 'ব্যবহারকারী পর্যবেক্ষণ' },
  captions: { en: 'captions', bn: 'ক্যাপশন' },
  comments: { en: 'comments', bn: 'কমেন্ট' },
  blacklistControl: { en: 'Blacklist Control', bn: 'ব্ল্যাকলিস্ট নিয়ন্ত্রণ' },
  blacklistHelper: { en: 'Add a username to prevent them from using the service.', bn: 'পরিষেবাটি ব্যবহার করা থেকে বিরত রাখতে একটি ব্যবহারকারীর নাম যোগ করুন।' },
  blacklistPlaceholder: { en: 'Enter username to block', bn: 'ব্লক করতে ব্যবহারকারীর নাম লিখুন' },
  blockUser: { en: 'Block User', bn: 'ব্যবহারকারীকে ব্লক করুন' },
  blockedUsers: { en: 'Blocked Users:', bn: 'ব্লক করা ব্যবহারকারী:' },
};