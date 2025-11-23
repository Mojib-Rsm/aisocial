import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { VideoResolution, VideoAspectRatio } from '../types';
import { VIDEO_RESOLUTIONS, VIDEO_ASPECT_RATIOS } from '../constants';
import { generateVideo } from '../services/geminiVideoService';
import { Sparkles, Download, AlertTriangle, Key } from 'lucide-react';
import { useLanguage } from '../App';

const VideoGenerator: React.FC = () => {
  const { t } = useLanguage();

  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<VideoResolution>(VideoResolution.SD);
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>(VideoAspectRatio.Landscape);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      const aiStudio = (window as any).aistudio;
      if (aiStudio && typeof aiStudio.hasSelectedApiKey === 'function') {
        const keyStatus = await aiStudio.hasSelectedApiKey();
        setHasApiKey(keyStatus);
      }
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      const messages = [t('videoGenProgress1'), t('videoGenProgress2'), t('videoGenProgress3')];
      let messageIndex = 0;
      setLoadingMessage(messages[messageIndex]);
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingMessage(messages[messageIndex]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLoading, t]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(t('errorPostContent'));
      return;
    }
    
    // Ensure API key is selected before proceeding
    if (!hasApiKey) {
        await handleSelectKey();
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      const videoUri = await generateVideo(prompt, resolution, aspectRatio);
      const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
      if (!response.ok) {
          throw new Error('Failed to fetch video blob from the generated URI.');
      }
      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setGeneratedVideoUrl(videoUrl);

    } catch (e: any) {
      if (e.message?.includes('Requested entity was not found')) {
        setError("API Key validation failed. Please select a valid key.");
        setHasApiKey(false); // Reset key state to prompt user again
      } else {
        setError(e.message || "An unknown error occurred during video generation.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio && typeof aiStudio.openSelectKey === 'function') {
        try {
            await aiStudio.openSelectKey();
            // Assume success and optimistically update UI
            setHasApiKey(true);
            setError(null);
        } catch (e) {
            console.error("Error opening API key selection:", e);
            setError("Could not open the API key selection dialog.");
        }
    } else {
        setError("API key selection is not available in this environment.");
    }
  };

  const renderSelect = <T extends string,>(label: string, options: T[], value: T, onChange: (val: T) => void) => (
    <div>
      <label className="block text-sm font-medium text-textSecondary mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        disabled={isLoading}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="md:col-span-1 bg-surface p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">{t('create')}</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="video-prompt" className="block text-sm font-medium text-textSecondary mb-2">
                Prompt
              </label>
              <textarea
                id="video-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('videoPromptPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out h-36"
                disabled={isLoading}
              />
            </div>
            {renderSelect(t('resolution'), VIDEO_RESOLUTIONS, resolution, setResolution)}
            {renderSelect(t('aspectRatio'), VIDEO_ASPECT_RATIOS, aspectRatio, setAspectRatio)}
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-textPrimary mb-4">{t('generatedVideo')}</h2>
          
          {!hasApiKey && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Key className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-bold text-amber-800">{t('selectApiKey')}</p>
                        <p className="text-sm text-amber-700 mt-1">{t('apiKeyRequired')}</p>
                         <p className="text-xs text-amber-600 mt-2">
                            {t('billingInfo')} <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-amber-800">Learn more</a>.
                        </p>
                        <button onClick={handleSelectKey} className="mt-3 bg-amber-500 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-amber-600 transition-colors">
                            Select Key
                        </button>
                    </div>
                </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading || !hasApiKey}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('generatingVideo')}</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>{t('generateVideo')}</span>
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <p>{error}</p>
            </div>
          )}

          <div className="w-full aspect-video bg-slate-100 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
            {isLoading ? (
              <div className="text-center p-4">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-textPrimary font-semibold mb-2">{loadingMessage}</p>
                 <p className="text-sm text-textSecondary">{t('videoGenWait')}</p>
              </div>
            ) : generatedVideoUrl ? (
                <div className="relative w-full h-full group">
                    <video src={generatedVideoUrl} controls className="w-full h-full object-contain" />
                    <a
                        href={generatedVideoUrl}
                        download={`ai-video-${Date.now()}.mp4`}
                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        <Download size={16} />
                        {t('downloadVideo')}
                    </a>
                </div>
            ) : (
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-2">{t('startCreatingVideo')}</h3>
                <p className="text-textSecondary">{t('startCreatingVideoSub')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;