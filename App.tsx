
import React from 'react';
import Header from './components/Header';
import Generator from './components/Generator';
import HomePage from './components/HomePage';
import VideoGenerator from './components/VideoGenerator';
import PhotoGenerator from './components/PhotoGenerator';
import MediaDownloader from './components/MediaDownloader';
import FontGenerator from './components/FontGenerator'; // New Import
import { TRANSLATIONS } from './constants';
import { Page } from './types';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS) => string;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = React.useState<Language>('bn');
  const [page, setPage] = React.useState<Page>('home');

  const t = React.useCallback((key: keyof typeof TRANSLATIONS): string => {
    return TRANSLATIONS[key]?.[language] || key;
  }, [language]);
  
  const navigateTo = (newPage: Page) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  }

  const value = { language, setLanguage, t };

  const renderContent = () => {
    switch(page) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'caption-generator':
        return <Generator toolMode="caption" />;
      case 'comment-generator':
        return <Generator toolMode="comment" />;
      case 'hashtag-generator':
        return <Generator toolMode="hashtag" />;
      case 'bio-generator':
        return <Generator toolMode="bio" />;
      case 'idea-generator':
        return <Generator toolMode="idea" />;
      case 'ad-copy-generator':
        return <Generator toolMode="ad-copy" />;
      case 'youtube-title-generator':
        return <Generator toolMode="youtube-title" />;
      case 'youtube-desc-generator':
        return <Generator toolMode="youtube-desc" />;
      case 'reel-script-generator':
        return <Generator toolMode="reel-script" />;
      case 'tiktok-idea-generator':
        return <Generator toolMode="tiktok-idea" />;
      case 'video-generator':
        return <VideoGenerator />;
      case 'photo-generator':
        return <PhotoGenerator />;
      case 'media-downloader':
        return <MediaDownloader />;
      case 'font-generator':
        return <FontGenerator />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen bg-background text-textPrimary font-sans">
        <Header currentPage={page} onNavigateHome={() => navigateTo('home')} />
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
