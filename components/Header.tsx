
import React from 'react';
import { BotMessageSquare, Languages } from 'lucide-react';
import { useLanguage } from '../App';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    onNavigateHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigateHome }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const getTitle = () => {
    switch (currentPage) {
        case 'home':
            return t('siteName');
        case 'caption-generator':
            return t('captionGenerator');
        case 'comment-generator':
            return t('commentGenerator');
        case 'hashtag-generator':
            return t('hashtagGenerator');
        case 'bio-generator':
            return t('bioGenerator');
        case 'idea-generator':
            return t('ideaGenerator');
        case 'ad-copy-generator':
            return t('adCopyGenerator');
        case 'youtube-title-generator':
            return t('youtubeTitle');
        case 'youtube-desc-generator':
            return t('youtubeDesc');
        case 'reel-script-generator':
            return t('reelScript');
        case 'tiktok-idea-generator':
            return t('tiktokIdea');
        case 'video-generator':
            return t('videoGenerator');
        case 'photo-generator':
            return t('photoGenerator');
        case 'media-downloader':
            return t('mediaDownloader');
        case 'font-generator':
            return t('fontGenerator');
        default:
            return t('siteName');
    }
  }

  return (
    <header className="bg-surface shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onNavigateHome} className="flex items-center gap-3 cursor-pointer" aria-label="Go to homepage">
            <BotMessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-textPrimary hidden sm:block">{getTitle()}</h1>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-slate-100 text-textSecondary hover:bg-slate-200 transition-colors"
              aria-label="Switch language"
            >
              <Languages size={18} />
              <span className="font-semibold">{language === 'en' ? 'BN' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
