


import { Template, Tone, Length, Language, Goal, Stance, PoliticalParty, VideoResolution, VideoAspectRatio, ImageStyle, ImageAspectRatio } from './types';

export const CAPTION_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Emotional, Tone.Political, Tone.Islamic];
export const COMMENT_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Supportive, Tone.Disagreeing, Tone.Formal, Tone.Emotional, Tone.Political, Tone.Islamic];
export const BIO_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Witty, Tone.Inspirational];
export const AD_COPY_TONES: Tone[] = [Tone.Friendly, Tone.Funny, Tone.Formal, Tone.Persuasive, Tone.Urgent];
export const LENGTHS: Length[] = [Length.Short, Length.Medium, Length.Long];
export const LANGUAGES: Language[] = [Language.English, Language.Bengali];
export const GOALS: Goal[] = [Goal.Engagement, Goal.Humor, Goal.EmotionalImpact];
export const STANCES: Stance[] = [Stance.InFavor, Stance.Opposed, Stance.Neutral];
export const POLITICAL_PARTIES: PoliticalParty[] = [PoliticalParty.None, PoliticalParty.AwamiLeague, PoliticalParty.BNP, PoliticalParty.JatiyaParty, PoliticalParty.JamaatShibir, PoliticalParty.NCP];
export const VIDEO_RESOLUTIONS: VideoResolution[] = [VideoResolution.SD, VideoResolution.HD];
export const VIDEO_ASPECT_RATIOS: VideoAspectRatio[] = [VideoAspectRatio.Landscape, VideoAspectRatio.Portrait];
export const IMAGE_STYLES: ImageStyle[] = [ImageStyle.Photorealistic, ImageStyle.Cinematic, ImageStyle.Anime, ImageStyle.FantasyArt, ImageStyle.ThreeDModel];
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
  captionGenerator: { en: 'Caption Generator', bn: 'ক্যাপশন জেনারেটর' },
  commentGenerator: { en: 'Comment Generator', bn: 'কমেন্ট জেনারেটর' },
  hashtagGenerator: { en: 'Hashtag Generator', bn: 'হ্যাশট্যাগ জেনারেটর' },
  bioGenerator: { en: 'Bio Generator', bn: 'বায়ো জেনারেটর' },
  ideaGenerator: { en: 'Content Idea Generator', bn: 'কনটেন্ট আইডিয়া জেনারেটর' },
  adCopyGenerator: { en: 'Ad Copy Generator', bn: 'বিজ্ঞাপনের কপি জেনারেটর' },
  videoGenerator: { en: 'Video Generator', bn: 'ভিডিও জেনারেটর' },
  photoGenerator: { en: 'Photo Generator', bn: 'ফটো জেনারেটর' },
  admin: { en: 'Admin', bn: 'অ্যাডমিন' },
  
  // Homepage
  homeTitle: { en: 'Supercharge Your Social Media Presence', bn: 'আপনার সোশ্যাল মিডিয়া উপস্থিতি সুপারচার্জ করুন' },
  homeSubtitle: { en: 'AI-powered tools designed to help you create engaging content, faster.', bn: 'এআই-চালিত টুলস যা আপনাকে দ্রুত আকর্ষণীয় কন্টেন্ট তৈরি করতে সাহায্য করার জন্য ডিজাইন করা হয়েছে।' },
  toolsTitle: { en: 'Our Tools', bn: 'আমাদের টুলস' },
  captionToolTitle: { en: 'Facebook Post Caption Generator', bn: 'ফেসবুক পোস্ট ক্যাপশন জেনারেটর' },
  captionToolDesc: { en: 'Generate creative and tone-specific captions for your posts in seconds.', bn: 'সেকেন্ডের মধ্যে আপনার পোস্টের জন্য সৃজনশীল এবং টোন-নির্দিষ্ট ক্যাপশন তৈরি করুন।' },
  commentToolTitle: { en: 'Facebook Post Comment Generator', bn: 'ফেসবুক পোস্ট কমেন্ট জেনারেটর' },
  commentToolDesc: { en: 'Craft thoughtful and relevant comments to engage with your audience.', bn: 'আপনার দর্শকদের সাথে যুক্ত হতে চিন্তাশীল এবং প্রাসঙ্গিক মন্তব্য তৈরি করুন।' },
  hashtagToolTitle: { en: 'Hashtag Generator', bn: 'হ্যাশট্যাগ জেনারেটর' },
  hashtagToolDesc: { en: 'Find the most effective and relevant hashtags to boost your post\'s reach.', bn: 'আপনার পোস্টের রিচ বাড়াতে সবচেয়ে কার্যকর এবং প্রাসঙ্গিক হ্যাশট্যাগ খুঁজুন।' },
  bioToolTitle: { en: 'Profile Bio Generator', bn: 'প্রোফাইল বায়ো জেনারেটর' },
  bioToolDesc: { en: 'Create a unique and compelling bio for your social media profile.', bn: 'আপনার সোশ্যাল মিডিয়া প্রোফাইলের জন্য একটি অনন্য এবং আকর্ষণীয় বায়ো তৈরি করুন।' },
  ideaToolTitle: { en: 'AI Content Idea Generator', bn: 'এআই কনটেন্ট আইডিয়া জেনারেটর' },
  ideaToolDesc: { en: 'Never run out of ideas. Generate creative content topics for any niche.', bn: 'আপনার আইডিয়ার ভান্ডার কখনো খালি হবে না। যেকোনো বিষয়ের জন্য সৃজনশীল কনটেন্ট টপিক তৈরি করুন।' },
  adCopyToolTitle: { en: 'AI Ad Copy Generator', bn: 'এআই বিজ্ঞাপন কপি জেনারেটর' },
  adCopyToolDesc: { en: 'Write high-converting ad copy for your products or services.', bn: 'আপনার পণ্য বা পরিষেবার জন্য উচ্চ-রূপান্তরকারী বিজ্ঞাপন কপি লিখুন।' },
  videoToolTitle: { en: 'AI Video Generator', bn: 'এআই ভিডিও জেনারেটর' },
  videoToolDesc: { en: 'Create stunning, high-quality videos from a simple text description.', bn: 'একটি সাধারণ টেক্সট বর্ণনা থেকে অত্যাশ্চর্য, উচ্চ-মানের ভিডিও তৈরি করুন।' },
  photoToolTitle: { en: 'AI Photo Generator', bn: 'এআই ফটো জেনারেটর' },
  photoToolDesc: { en: 'Create stunning, high-quality photos from a simple text description.', bn: 'একটি সাধারণ টেক্সট বর্ণনা থেকে অত্যাশ্চর্য, উচ্চ-মানের ফটো তৈরি করুন।' },
  
  // Generator Controls
  create: { en: 'Create', bn: 'তৈরি করুন' },
  history: { en: 'History', bn: 'ইতিহাস' },
  postContentPlaceholder: { en: 'Enter post topic, content, or link...', bn: 'পোস্টের বিষয়বস্তু, টপিক বা লিঙ্ক লিখুন...' },
  postToCommentOnPlaceholder: { en: 'Enter content of the post to comment on...', bn: 'যে পোস্টে মন্তব্য করতে চান তার বিষয়বস্তু লিখুন...' },
  hashtagTopicPlaceholder: { en: 'Enter a topic to generate hashtags for...', bn: 'হ্যাশট্যাগ জেনারেট করার জন্য একটি টপিক লিখুন...' },
  bioInfoPlaceholder: { en: 'Describe yourself or your brand (e.g., "Digital marketer, coffee lover, travels the world")...', bn: 'আপনার বা আপনার ব্র্যান্ড সম্পর্কে বর্ণনা করুন (যেমন, "ডিজিটাল মার্কেটার, কফি প্রেমী, বিশ্ব ভ্রমণকারী")...' },
  ideaTopicPlaceholder: { en: 'Enter a topic to get content ideas for (e.g., "healthy breakfast")...', bn: 'কনটেন্ট আইডিয়ার জন্য একটি বিষয় লিখুন (যেমন, "স্বাস্থ্যকর সকালের নাস্তা")...' },
  adCopyProductPlaceholder: { en: 'Describe your product or service (e.g., "Handmade leather wallets for men")...', bn: 'আপনার পণ্য বা পরিষেবা বর্ণনা করুন (যেমন, "পুরুষদের জন্য হাতে তৈরি চামড়ার মানিব্যাগ")...' },
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
  videoPromptPlaceholder: { en: 'e.g., A cinematic shot of a futuristic city at sunset with flying cars', bn: 'যেমন, উড়ন্ত গাড়ি সহ সূর্যাস্তের সময় একটি ভবিষ্যৎ শহরের সিনেম্যাটিক শট' },
  resolution: { en: 'Resolution', bn: 'রেজোলিউশন' },
  aspectRatio: { en: 'Aspect Ratio', bn: 'অ্যাসপেক্ট রেশিও' },
  generateVideo: { en: 'Generate Video', bn: 'ভিডিও তৈরি করুন' },
  generatingVideo: { en: 'Generating Video...', bn: 'ভিডিও তৈরি হচ্ছে...' },
  generatedVideo: { en: 'Generated Video', bn: 'তৈরি হওয়া ভিডিও' },
  startCreatingVideo: { en: 'Describe the video you want to create!', bn: 'আপনি যে ভিডিওটি তৈরি করতে চান তার বর্ণনা দিন!' },
  startCreatingVideoSub: { en: 'Enter a detailed prompt, choose your options, and let the AI bring your vision to life.', bn: 'একটি বিস্তারিত প্রম্পট লিখুন, আপনার বিকল্পগুলি চয়ন করুন এবং এআইকে আপনার কল্পনাকে জীবন্ত করে তুলতে দিন।' },
  downloadVideo: { en: 'Download Video', bn: 'ভিডিও ডাউনলোড করুন' },
  selectApiKey: { en: 'Select API Key to Generate Video', bn: 'ভিডিও তৈরি করতে API কী নির্বাচন করুন' },
  apiKeyRequired: { en: 'An API key is required for video generation. This ensures fair usage and access to the powerful Veo model.', bn: 'ভিডিও জেনারেশনের জন্য একটি API কী প্রয়োজন। এটি Veo মডেলের ন্যায্য ব্যবহার এবং অ্যাক্সেস নিশ্চিত করে।' },
  billingInfo: { en: 'For more information on billing, visit the official documentation.', bn: 'বিলিং সম্পর্কে আরও তথ্যের জন্য, অফিসিয়াল ডকুমেন্টেশন দেখুন।' },
  videoGenWait: { en: 'Video generation can take a few minutes. Please be patient.', bn: 'ভিডিও তৈরি হতে কয়েক মিনিট সময় লাগতে পারে। অনুগ্রহ করে ধৈর্য ধরুন।' },
  videoGenProgress1: { en: 'Warming up the creative engines...', bn: 'সৃজনশীল ইঞ্জিন গরম হচ্ছে...' },
  videoGenProgress2: { en: 'Directing the digital actors...', bn: 'ডিজিটাল অভিনেতাদের নির্দেশনা দেওয়া হচ্ছে...' },
  videoGenProgress3: { en: 'Rendering the final cut...', bn: 'ফাইনাল কাট রেন্ডার করা হচ্ছে...' },
  
  // Photo Generator
  photoPromptPlaceholder: { en: 'e.g., A photorealistic image of an astronaut riding a horse on Mars', bn: 'যেমন, মঙ্গলে ঘোড়ায় চড়া একজন নভোচারীর একটি ফটোরিয়ালিস্টিক ছবি' },
  style: { en: 'Style', bn: 'স্টাইল' },
  generatePhoto: { en: 'Generate Photo', bn: 'ফটো তৈরি করুন' },
  generatingPhoto: { en: 'Generating Photo...', bn: 'ফটো তৈরি হচ্ছে...' },
  generatedPhoto: { en: 'Generated Photo', bn: 'তৈরি হওয়া ফটো' },
  startCreatingPhoto: { en: 'Describe the photo you want to create!', bn: 'আপনি যে ফটোটি তৈরি করতে চান তার বর্ণনা দিন!' },
  startCreatingPhotoSub: { en: 'Enter a detailed prompt, choose your style, and let the AI bring your vision to life.', bn: 'একটি বিস্তারিত প্রম্পট লিখুন, আপনার স্টাইল চয়ন করুন এবং এআইকে আপনার কল্পনাকে জীবন্ত করে তুলতে দিন।' },
  downloadPhoto: { en: 'Download Photo', bn: 'ফটো ডাউনলোড করুন' },
  
  // Generator Actions & Results
  generateCaptions: { en: 'Generate Captions', bn: 'ক্যাপশন তৈরি করুন' },
  generateComments: { en: 'Generate Comments', bn: 'কমেন্ট তৈরি করুন' },
  generateHashtags: { en: 'Generate Hashtags', bn: 'হ্যাশট্যাগ তৈরি করুন' },
  generateBios: { en: 'Generate Bios', bn: 'বায়ো তৈরি করুন' },
  generateIdeas: { en: 'Generate Ideas', bn: 'আইডিয়া তৈরি করুন' },
  generateAdCopy: { en: 'Generate Ad Copy', bn: 'বিজ্ঞাপনের কপি তৈরি করুন' },
  generating: { en: 'Generating...', bn: 'তৈরি হচ্ছে...' },
  generatedCaptions: { en: 'Generated Captions', bn: 'তৈরি হওয়া ক্যাপশন' },
  generatedComments: { en: 'Generated Comments', bn: 'তৈরি হওয়া কমেন্ট' },
  generatedHashtags: { en: 'Generated Hashtags', bn: 'তৈরি হওয়া হ্যাশট্যাগ' },
  generatedBios: { en: 'Generated Bios', bn: 'তৈরি হওয়া বায়ো' },
  generatedIdeas: { en: 'Generated Ideas', bn: 'তৈরি হওয়া আইডিয়া' },
  generatedAdCopies: { en: 'Generated Ad Copies', bn: 'তৈরি হওয়া বিজ্ঞাপন কপি' },
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
