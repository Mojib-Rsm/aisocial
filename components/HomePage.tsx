

import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../App';
import { Captions, MessageSquarePlus, ArrowRight, Hash, UserCircle, Lightbulb, Megaphone, Film, Image } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const ToolCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ icon, title, description, onClick, disabled }) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`bg-surface p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 ${
        disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-2xl'
      }`}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-textPrimary mb-2">{title}</h3>
      <p className="text-sm text-textSecondary mb-4">{description}</p>
      {!disabled && (
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span>Use Tool</span>
          <ArrowRight size={16} />
        </div>
      )}
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary mb-4">
          {t('homeTitle')}
        </h1>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">
          {t('homeSubtitle')}
        </p>
      </div>

      {/* Tools Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textPrimary text-center mb-8">{t('toolsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToolCard
            icon={<Captions className="w-6 h-6 text-primary" />}
            title={t('captionToolTitle')}
            description={t('captionToolDesc')}
            onClick={() => onNavigate('caption-generator')}
          />
          <ToolCard
            icon={<MessageSquarePlus className="w-6 h-6 text-primary" />}
            title={t('commentToolTitle')}
            description={t('commentToolDesc')}
            onClick={() => onNavigate('comment-generator')}
          />
          <ToolCard
            icon={<Hash className="w-6 h-6 text-primary" />}
            title={t('hashtagToolTitle')}
            description={t('hashtagToolDesc')}
            onClick={() => onNavigate('hashtag-generator')}
          />
          <ToolCard
            icon={<UserCircle className="w-6 h-6 text-primary" />}
            title={t('bioToolTitle')}
            description={t('bioToolDesc')}
            onClick={() => onNavigate('bio-generator')}
          />
           <ToolCard
            icon={<Lightbulb className="w-6 h-6 text-primary" />}
            title={t('ideaToolTitle')}
            description={t('ideaToolDesc')}
            onClick={() => onNavigate('idea-generator')}
          />
           <ToolCard
            icon={<Megaphone className="w-6 h-6 text-primary" />}
            title={t('adCopyToolTitle')}
            description={t('adCopyToolDesc')}
            onClick={() => onNavigate('ad-copy-generator')}
          />
           <ToolCard
            icon={<Film className="w-6 h-6 text-primary" />}
            title={t('videoToolTitle')}
            description={t('videoToolDesc')}
            onClick={() => onNavigate('video-generator')}
          />
           <ToolCard
            icon={<Image className="w-6 h-6 text-primary" />}
            title={t('photoToolTitle')}
            description={t('photoToolDesc')}
            onClick={() => onNavigate('photo-generator')}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;