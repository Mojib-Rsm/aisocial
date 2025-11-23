import React, { useState } from 'react';
import { GeneratedText, ToolMode } from '../types';
import { Copy, Share2, Bookmark, Check, Flag } from 'lucide-react';
import { useLanguage } from '../App';

interface GeneratedTextCardProps {
  item: GeneratedText;
  onSave: (item: GeneratedText) => void;
  isSaved: boolean;
  itemType: ToolMode;
}

const ActionButton: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void; active?: boolean, disabled?: boolean }> = ({ icon, text, onClick, active, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      active
        ? 'bg-primary text-white'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const GeneratedTextCard: React.FC<GeneratedTextCardProps> = ({ item, onSave, isSaved, itemType }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    if (['comment', 'hashtag', 'bio', 'idea', 'ad-copy'].includes(itemType)) return; 
    const text = encodeURIComponent(item.text);
    const url = `https://www.facebook.com/sharer/sharer.php?u=example.com&quote=${text}`;
    window.open(url, '_blank');
  };

  const handleReport = () => {
    // In a real app, this would trigger an API call.
    setReported(true);
    const alertText = itemType === 'caption' ? t('captionReported') : t('commentReported');
    alert(alertText);
  }

  return (
    <div className="bg-surface p-4 rounded-lg shadow transition-shadow hover:shadow-md">
      <p className="text-textPrimary mb-4">{item.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton 
          icon={copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />} 
          text={copied ? t('copied') : t('copy')} 
          onClick={handleCopy}
          active={copied}
        />
        <ActionButton 
            icon={<Share2 size={14} />} 
            text={t('share')} 
            onClick={handleShare} 
            disabled={['comment', 'hashtag', 'bio', 'idea', 'ad-copy'].includes(itemType)}
        />
        <ActionButton 
          icon={<Bookmark size={14} />} 
          text={isSaved ? t('saved') : t('save')} 
          onClick={() => onSave(item)} 
          active={isSaved}
        />
        <div className="flex-grow"></div>
         <ActionButton 
          icon={<Flag size={14} />} 
          text={reported ? t('reported') : t('report')} 
          onClick={handleReport}
          active={reported}
        />
      </div>
    </div>
  );
};

export default GeneratedTextCard;