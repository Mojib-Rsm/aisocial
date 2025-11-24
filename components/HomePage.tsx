
import React, { useState } from 'react';
import { Page, ToolMode } from '../types';
import { useLanguage } from '../App';
import { 
  Captions, MessageSquarePlus, ArrowRight, Hash, UserCircle, Lightbulb, Megaphone, 
  Film, Image, Download, Music, Type, BarChart, PenTool, Youtube, Facebook, 
  Instagram, Twitter, Video, Mic, Scissors, Link, Search
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

interface ToolItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description?: string;
    targetPage: Page;
    comingSoon?: boolean;
}

interface ToolCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    tools: ToolItem[];
}

const ToolCard: React.FC<{
  tool: ToolItem;
  onClick: () => void;
}> = ({ tool, onClick }) => {
  return (
    <div
      onClick={!tool.comingSoon ? onClick : undefined}
      className={`bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3 ${
        tool.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
        {tool.icon}
      </div>
      <div className="flex-grow">
          <h3 className="text-sm font-bold text-gray-800 leading-tight">{tool.title}</h3>
          {tool.comingSoon && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">Soon</span>}
      </div>
      {!tool.comingSoon && <ArrowRight size={14} className="text-gray-400" />}
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const categories: ToolCategory[] = [
      {
          id: 'downloader',
          title: t('catDownloader'),
          icon: <Download size={20} />,
          color: 'bg-blue-500',
          tools: [
              { id: 'fb-vid', icon: <Facebook size={18} />, title: 'Facebook Video', targetPage: 'media-downloader' },
              { id: 'fb-reel', icon: <Facebook size={18} />, title: 'Facebook Reel', targetPage: 'media-downloader' },
              { id: 'ig-reel', icon: <Instagram size={18} />, title: 'Instagram Reel', targetPage: 'media-downloader' },
              { id: 'ig-photo', icon: <Instagram size={18} />, title: 'Instagram Photo', targetPage: 'media-downloader' },
              { id: 'ig-story', icon: <Instagram size={18} />, title: 'Instagram Story', targetPage: 'media-downloader' },
              { id: 'yt-vid', icon: <Youtube size={18} />, title: 'YouTube Video', targetPage: 'media-downloader' },
              { id: 'yt-thumb', icon: <Image size={18} />, title: 'YouTube Thumbnail', targetPage: 'media-downloader' },
              { id: 'tiktok', icon: <Video size={18} />, title: 'TikTok No Watermark', targetPage: 'media-downloader' },
              { id: 'twitter', icon: <Twitter size={18} />, title: 'Twitter/X Video', targetPage: 'media-downloader' },
              { id: 'likee', icon: <Video size={18} />, title: 'Likee Video', targetPage: 'media-downloader' },
              { id: 'pinterest', icon: <Image size={18} />, title: 'Pinterest Video/Image', targetPage: 'media-downloader' },
              { id: 'sc', icon: <Music size={18} />, title: 'SoundCloud', targetPage: 'media-downloader' },
          ]
      },
      {
        id: 'ai-text',
        title: t('catAiText'),
        icon: <PenTool size={20} />,
        color: 'bg-purple-500',
        tools: [
            { id: 'caption', icon: <Captions size={18} />, title: 'AI Caption Generator', targetPage: 'caption-generator' },
            { id: 'hashtag', icon: <Hash size={18} />, title: 'AI Hashtag Generator', targetPage: 'hashtag-generator' },
            { id: 'bio', icon: <UserCircle size={18} />, title: 'AI Bio Generator', targetPage: 'bio-generator' },
            { id: 'comment', icon: <MessageSquarePlus size={18} />, title: 'AI Comment Reply', targetPage: 'comment-generator' },
            { id: 'yt-title', icon: <Youtube size={18} />, title: 'YouTube Title Gen', targetPage: 'youtube-title-generator' },
            { id: 'yt-desc', icon: <Youtube size={18} />, title: 'YouTube Description', targetPage: 'youtube-desc-generator' },
            { id: 'script', icon: <Film size={18} />, title: 'Reel/TikTok Script', targetPage: 'reel-script-generator' },
            { id: 'tiktok-idea', icon: <Lightbulb size={18} />, title: 'TikTok Idea Gen', targetPage: 'tiktok-idea-generator' },
            { id: 'ad-copy', icon: <Megaphone size={18} />, title: 'Ad Copy Generator', targetPage: 'ad-copy-generator' },
            { id: 'idea', icon: <Lightbulb size={18} />, title: 'Content Calendar', targetPage: 'idea-generator' },
        ]
      },
      {
        id: 'design',
        title: t('catDesign'),
        icon: <Image size={20} />,
        color: 'bg-pink-500',
        tools: [
            { id: 'thumb-make', icon: <Image size={18} />, title: 'Thumbnail Maker (AI)', targetPage: 'photo-generator' },
            { id: 'pfp', icon: <UserCircle size={18} />, title: 'Profile Pic Maker', targetPage: 'photo-generator' },
            { id: 'logo', icon: <PenTool size={18} />, title: 'AI Logo Maker', targetPage: 'photo-generator' },
            { id: 'banner', icon: <Image size={18} />, title: 'Banner Generator', targetPage: 'photo-generator' },
            { id: 'bg-remove', icon: <Scissors size={18} />, title: 'Background Remover', targetPage: 'photo-generator' }, // Placeholder/Reuse
            { id: 'resize', icon: <Image size={18} />, title: 'Image Resizer', targetPage: 'photo-generator' }, // Placeholder
        ]
      },
      {
        id: 'stylish',
        title: t('catStylish'),
        icon: <Type size={20} />,
        color: 'bg-green-500',
        tools: [
            { id: 'font', icon: <Type size={18} />, title: 'Fancy Font Generator', targetPage: 'font-generator' },
            { id: 'bio-text', icon: <Type size={18} />, title: 'Stylish Bio Text', targetPage: 'font-generator' },
            { id: 'bold', icon: <Type size={18} />, title: 'Bold/Italic Text', targetPage: 'font-generator' },
            { id: 'kaomoji', icon: <Type size={18} />, title: 'Kaomoji Generator', targetPage: 'font-generator' },
        ]
      },
      {
        id: 'audio',
        title: t('catAudio'),
        icon: <Music size={20} />,
        color: 'bg-orange-500',
        tools: [
            { id: 'yt-mp3', icon: <Music size={18} />, title: 'YouTube to MP3', targetPage: 'media-downloader' },
            { id: 'tts', icon: <Mic size={18} />, title: 'Text to Speech (AI)', targetPage: 'video-generator' }, // Using Video Gen for now or placeholder
        ]
      },
      {
        id: 'analytics',
        title: t('catAnalytics'),
        icon: <BarChart size={20} />,
        color: 'bg-indigo-500',
        tools: [
            { id: 'tags', icon: <Hash size={18} />, title: 'YouTube Tag Extractor', targetPage: 'hashtag-generator' },
            { id: 'short', icon: <Link size={18} />, title: 'Link Shortener', targetPage: 'home', comingSoon: true },
            { id: 'qr', icon: <Search size={18} />, title: 'QR Code Generator', targetPage: 'home', comingSoon: true },
        ]
      }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white rounded-3xl mb-12 border border-blue-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          {t('homeTitle')}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {t('homeSubtitle')}
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
              <div key={category.id} className="bg-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className={`px-6 py-4 border-b border-slate-100 flex items-center gap-3 ${category.color} bg-opacity-5`}>
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          {category.icon}
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">{category.title}</h2>
                  </div>
                  <div className="p-4 grid grid-cols-1 gap-3">
                      {category.tools.map(tool => (
                          <ToolCard key={tool.id} tool={tool} onClick={() => onNavigate(tool.targetPage)} />
                      ))}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
