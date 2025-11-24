
import React, { useState } from 'react';
import { Download, Image as ImageIcon, Video, AlertCircle, CheckCircle, ExternalLink, Loader2, Facebook, Instagram, Youtube, Music, Twitter } from 'lucide-react';
import { useLanguage } from '../App';
import { TRANSLATIONS } from '../constants';

type Tab = 'thumbnail' | 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'pinterest' | 'audio';

interface ThumbnailResult {
  quality: string;
  url: string;
  label: string;
  resolution: string;
}

interface VideoResult {
    url: string;
    filename?: string;
}

const MediaDownloader: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('thumbnail');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailResult[]>([]);
  const [videoResult, setVideoResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getYouTubeID = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getTabConfig = (tab: Tab) => {
      switch(tab) {
          case 'thumbnail': return { placeholder: t('youtubePlaceholder'), button: t('getThumbnail') };
          case 'facebook': return { placeholder: t('facebookPlaceholder'), button: t('downloadVideo') };
          case 'instagram': return { placeholder: t('instagramPlaceholder'), button: t('downloadVideo') };
          case 'youtube': return { placeholder: t('youtubePlaceholder'), button: t('downloadVideo') };
          case 'tiktok': return { placeholder: t('tiktokPlaceholder'), button: t('downloadVideo') };
          case 'twitter': return { placeholder: t('twitterPlaceholder'), button: t('downloadVideo') };
          case 'pinterest': return { placeholder: t('pinterestPlaceholder'), button: t('downloadVideo') };
          case 'audio': return { placeholder: t('youtubePlaceholder'), button: t('downloadAudio') };
          default: return { placeholder: t('pasteUrl'), button: t('downloadVideo') };
      }
  };

  const validateUrl = (tab: Tab, url: string): boolean => {
      if (!url.trim()) return false;
      const lowerUrl = url.toLowerCase();
      
      switch(tab) {
          case 'thumbnail':
              return lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be');
          case 'facebook':
              return lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch') || lowerUrl.includes('fb.com');
          case 'instagram':
              return lowerUrl.includes('instagram.com') || lowerUrl.includes('instagr.am');
          case 'youtube':
          case 'audio':
              return lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be');
          case 'tiktok':
              return lowerUrl.includes('tiktok.com');
          case 'twitter':
              return lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com');
          case 'pinterest':
              return lowerUrl.includes('pinterest.com') || lowerUrl.includes('pin.it');
      }
      return true;
  };

  const handleGetThumbnail = () => {
    setError(null);
    setThumbnails([]);
    
    if (!validateUrl('thumbnail', inputUrl)) {
        setError(t('invalidYoutubeUrl'));
        return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const videoId = getYouTubeID(inputUrl);
      if (videoId) {
        setThumbnails([
          { quality: 'maxres', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, label: t('maxRes'), resolution: '1280x720 (HD)' },
          { quality: 'hq', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, label: t('highRes'), resolution: '480x360' },
          { quality: 'sd', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, label: t('stdRes'), resolution: '320x180' },
        ]);
      } else {
        setError(t('invalidUrl'));
      }
      setIsLoading(false);
    }, 600);
  };

  const handleVideoDownload = async () => {
    setError(null);
    setVideoResult(null);

    // Validate Platform Specific URL
    const isValid = validateUrl(activeTab, inputUrl);
    if (!isValid) {
        if (activeTab === 'facebook') setError(t('invalidFacebookUrl'));
        else if (activeTab === 'instagram') setError(t('invalidInstagramUrl'));
        else if (activeTab === 'youtube' || activeTab === 'audio') setError(t('invalidYoutubeUrl'));
        else if (activeTab === 'tiktok') setError(t('invalidTiktokUrl'));
        else if (activeTab === 'twitter') setError(t('invalidTwitterUrl'));
        else if (activeTab === 'pinterest') setError(t('invalidPinterestUrl'));
        else setError(t('invalidUrl'));
        return;
    }

    setIsLoading(true);

    try {
        const body: any = { url: inputUrl.trim() };
        if (activeTab === 'audio') {
            body.isAudioOnly = true;
        }

        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.text || 'Could not fetch media.');
        }

        if (data.url) {
             setVideoResult({
                url: data.url,
                filename: data.filename || (activeTab === 'audio' ? 'audio.mp3' : 'video.mp4')
             });
        } else if (data.picker) {
             setVideoResult({
                url: data.picker[0].url,
                filename: activeTab === 'audio' ? 'audio.mp3' : 'video.mp4'
             });
        } else if (data.audio) {
            setVideoResult({
                url: data.audio,
                filename: 'audio.mp3'
             });
        } else {
             throw new Error('No download URL found.');
        }
    } catch (err) {
        setError(t('downloadError'));
    } finally {
        setIsLoading(false);
    }
  };

  const handleDownloadImage = async (url: string, filename: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
        window.open(url, '_blank');
    }
  };
  
  const tabConfig = getTabConfig(activeTab);

  const renderTabButton = (id: Tab, icon: React.ReactNode, label: string, color: string) => (
      <button
        onClick={() => { setActiveTab(id); setInputUrl(''); setVideoResult(null); setError(null); setThumbnails([]); }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all mb-2 mr-2 sm:mb-0 ${
            activeTab === id ? `${color} text-white shadow` : 'text-textSecondary hover:bg-slate-100 bg-white border border-gray-100'
        }`}
        >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-textPrimary mb-8 text-center">{t('mediaToolTitle')}</h2>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8 px-2 flex-wrap">
          {renderTabButton('thumbnail', <ImageIcon size={18} />, t('thumbnailDownloader'), 'bg-primary')}
          {renderTabButton('facebook', <Facebook size={18} />, t('facebookDownloader'), 'bg-[#1877F2]')}
          {renderTabButton('instagram', <Instagram size={18} />, t('instagramDownloader'), 'bg-gradient-to-r from-purple-500 to-pink-500')}
          {renderTabButton('youtube', <Youtube size={18} />, t('youtubeDownloader'), 'bg-[#FF0000]')}
          {renderTabButton('tiktok', <Video size={18} />, t('tiktokDownloader'), 'bg-black')}
          {renderTabButton('twitter', <Twitter size={18} />, t('twitterDownloader'), 'bg-black')}
          {renderTabButton('pinterest', <ImageIcon size={18} />, t('pinterestDownloader'), 'bg-red-600')}
          {renderTabButton('audio', <Music size={18} />, t('audioDownloader'), 'bg-orange-500')}
      </div>

      <div className="bg-surface p-8 rounded-xl shadow-lg">
        <div className="mb-6 relative">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={tabConfig.placeholder}
            className="w-full p-4 pr-32 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition outline-none text-lg"
          />
          <button
            onClick={activeTab === 'thumbnail' ? handleGetThumbnail : handleVideoDownload}
            disabled={isLoading || !inputUrl.trim()}
            className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
               <Loader2 className="animate-spin" size={20} />
            ) : tabConfig.button}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 mb-6 border border-red-100">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Thumbnail Results */}
        {activeTab === 'thumbnail' && thumbnails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="md:col-span-2">
                 <h3 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={24} />
                    {t('resolutions')}
                 </h3>
            </div>
            {thumbnails.map((thumb, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col">
                <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4 shadow-sm group">
                    <img src={thumb.url} alt={thumb.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button 
                            onClick={() => window.open(thumb.url, '_blank')}
                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm"
                         >
                             <ExternalLink size={20} />
                         </button>
                    </div>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-textPrimary">{thumb.label}</span>
                    <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">{thumb.resolution}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadImage(thumb.url, `thumbnail-${thumb.quality}.jpg`)}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-textPrimary py-2.5 rounded-md hover:bg-gray-50 transition-colors font-medium shadow-sm"
                  >
                    <Download size={16} />
                    {t('downloadImage')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Results (Live) */}
        {activeTab !== 'thumbnail' && videoResult && (
          <div className="bg-green-50 border border-green-100 p-6 rounded-lg text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">
                {t('downloadReady')}
            </h3>
            <p className="text-textSecondary mb-6 max-w-lg mx-auto break-all">
                {videoResult.filename}
            </p>

            {activeTab !== 'audio' && (
                <div className="mb-6 max-w-lg mx-auto bg-black rounded-lg overflow-hidden shadow-lg border border-slate-200">
                    <video 
                        src={videoResult.url} 
                        controls 
                        className="w-full h-auto max-h-[400px]"
                        onError={(e) => console.log("Video preview failed to load", e)}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            
            {activeTab === 'audio' && (
                <div className="mb-6 max-w-lg mx-auto">
                    <audio src={videoResult.url} controls className="w-full" />
                </div>
            )}
            
            <div className="flex justify-center">
                 <a 
                    href={videoResult.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-md"
                 >
                    <Download size={20} />
                    {activeTab === 'audio' ? t('downloadAudio') : t('downloadVideo')}
                 </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDownloader;
