

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Tone, Length, Language, Goal, GeneratedText, GenerationParams, Template, Stance, PoliticalParty, ToolMode, UploadedImage } from '../types';
import { CAPTION_TONES, COMMENT_TONES, BIO_TONES, AD_COPY_TONES, CONTENT_TONES, LENGTHS, LANGUAGES, GOALS, CAPTION_TEMPLATES, COMMENT_TEMPLATES, STANCES, POLITICAL_PARTIES } from '../constants';
import { generateText } from '../services/geminiService';
import GeneratedTextCard from './CommentCard';
import { History, Sparkles, Settings2, Zap, ArrowLeft, RotateCw, XCircle, ImagePlus, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../App';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

interface GeneratorProps {
    toolMode: ToolMode;
}

const Generator: React.FC<GeneratorProps> = ({ toolMode }) => {
  const { t } = useLanguage();
  
  const [postContent, setPostContent] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [tone, setTone] = useState<Tone>(Tone.Friendly);
  const [length, setLength] = useState<Length>(Length.Medium);
  const [language, setLanguage] = useState<Language>(Language.Bengali);
  const [useEmojis, setUseEmojis] = useState<boolean>(true);
  const [isAdvanced, setIsAdvanced] = useState<boolean>(true);
  const [context, setContext] = useState<string>('');
  const [brandVoice, setBrandVoice] = useState<string>('');
  const [goal, setGoal] = useState<Goal>(Goal.Engagement);
  const [stance, setStance] = useState<Stance>(Stance.Neutral);
  const [politicalParty, setPoliticalParty] = useState<PoliticalParty>(PoliticalParty.None);
  const [toneSliderValue, setToneSliderValue] = useState<number>(2);
  const [isQuickPolitical, setIsQuickPolitical] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  const [generatedItems, setGeneratedItems] = useState<GeneratedText[]>([]);
  const [history, setHistory] = useState<GeneratedText[][]>([]);
  const [savedItems, setSavedItems] = useState<GeneratedText[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [subView, setSubView] = useState<'generator' | 'history'>('generator');
  const [isListening, setIsListening] = useState(false);
  const [historyTab, setHistoryTab] = useState<'saved' | 'full'>('saved');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const postContentBeforeListeningRef = useRef<string>('');
  
  const toolConfig = React.useMemo(() => {
    switch (toolMode) {
      case 'caption':
        return {
          placeholder: t('postContentPlaceholder'),
          generateBtn: t('generateCaptions'),
          generatedTitle: t('generatedCaptions'),
          emptyState: t('startCreatingCaptions'),
          politicalToggle: t('politicalCaption'),
          tones: CAPTION_TONES,
          templates: CAPTION_TEMPLATES,
          showImageUpload: true,
          showAdvanced: true,
        };
      case 'comment':
        return {
          placeholder: t('postToCommentOnPlaceholder'),
          generateBtn: t('generateComments'),
          generatedTitle: t('generatedComments'),
          emptyState: t('startCreatingComments'),
          politicalToggle: t('politicalComment'),
          tones: COMMENT_TONES,
          templates: COMMENT_TEMPLATES,
          showImageUpload: true,
          showAdvanced: true,
        };
      case 'hashtag':
         return {
          placeholder: t('hashtagTopicPlaceholder'),
          generateBtn: t('generateHashtags'),
          generatedTitle: t('generatedHashtags'),
          emptyState: t('startCreatingHashtags'),
          politicalToggle: '',
          tones: [],
          templates: [],
          showImageUpload: false,
          showAdvanced: false,
        };
      case 'bio':
        return {
          placeholder: t('bioInfoPlaceholder'),
          generateBtn: t('generateBios'),
          generatedTitle: t('generatedBios'),
          emptyState: t('startCreatingBios'),
          politicalToggle: '',
          tones: BIO_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      case 'idea':
        return {
          placeholder: t('ideaTopicPlaceholder'),
          generateBtn: t('generateIdeas'),
          generatedTitle: t('generatedIdeas'),
          emptyState: t('startCreatingIdeas'),
          politicalToggle: '',
          tones: CAPTION_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      case 'ad-copy':
        return {
          placeholder: t('adCopyProductPlaceholder'),
          generateBtn: t('generateAdCopy'),
          generatedTitle: t('generatedAdCopies'),
          emptyState: t('startCreatingAdCopy'),
          politicalToggle: '',
          tones: AD_COPY_TONES,
          templates: [],
          showImageUpload: true,
          showAdvanced: true,
        };
      case 'youtube-title':
        return {
          placeholder: t('ytTitlePlaceholder'),
          generateBtn: t('generateYtTitle'),
          generatedTitle: t('generatedYtTitles'),
          emptyState: t('startCreatingYtTitle'),
          politicalToggle: '',
          tones: AD_COPY_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      case 'youtube-desc':
        return {
          placeholder: t('ytTitlePlaceholder'),
          generateBtn: t('generateYtDesc'),
          generatedTitle: t('generatedYtDescs'),
          emptyState: t('startCreatingYtDesc'),
          politicalToggle: '',
          tones: CAPTION_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      case 'reel-script':
        return {
          placeholder: t('scriptPlaceholder'),
          generateBtn: t('generateScript'),
          generatedTitle: t('generatedScripts'),
          emptyState: t('startCreatingScript'),
          politicalToggle: '',
          tones: CONTENT_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      case 'tiktok-idea':
        return {
          placeholder: t('ideaTopicPlaceholder'),
          generateBtn: t('generateIdeas'),
          generatedTitle: t('generatedIdeas'),
          emptyState: t('startCreatingIdeas'),
          politicalToggle: '',
          tones: CONTENT_TONES,
          templates: [],
          showImageUpload: false,
          showAdvanced: true,
        };
      default: 
        return {
           placeholder: 'Enter content...',
           generateBtn: 'Generate',
           generatedTitle: 'Results',
           emptyState: 'Start generating...',
           politicalToggle: '',
           tones: CAPTION_TONES,
           templates: [],
           showImageUpload: false,
           showAdvanced: true,
        };
    }
  }, [toolMode, t]);
  
  // Effect to load state from localStorage whenever the toolMode changes
  useEffect(() => {
    // Reset advanced mode if the new tool doesn't support it
    if (!toolConfig.showAdvanced) {
      setIsAdvanced(false);
    }

    const key = (k: string) => `fb-${toolMode}-gen-${k}`;
    const get = <T,>(k: string, defaultValue: T): T => {
        try {
            const stored = localStorage.getItem(key(k));
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    };
    setPostContent(get('postContent', ''));
    setUploadedImage(get('uploadedImage', null));
    setTone(get('tone', toolMode === 'bio' ? Tone.Friendly : Tone.Friendly));
    setLength(get('length', Length.Medium));
    setLanguage(get('language', Language.Bengali));
    setUseEmojis(get('useEmojis', true));
    setIsAdvanced(get('isAdvanced', toolConfig.showAdvanced));
    setContext(get('context', ''));
    setBrandVoice(get('brandVoice', ''));
    setGoal(get('goal', Goal.Engagement));
    setStance(get('stance', Stance.Neutral));
    setPoliticalParty(get('politicalParty', PoliticalParty.None));
    setToneSliderValue(get('toneSliderValue', 2));
    setIsQuickPolitical(get('isQuickPolitical', false));
    setGeneratedItems(get('generatedItems', []));
    setHistory(get('history', []));
    setSavedItems(get('savedItems', []));
    setGeneratedCount(get('generatedCount', 0));
    setSubView(get('subView', 'generator'));
  }, [toolMode, toolConfig.showAdvanced]);

  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    const key = (k: string) => `fb-${toolMode}-gen-${k}`;
    try {
      localStorage.setItem(key('postContent'), JSON.stringify(postContent));
      localStorage.setItem(key('uploadedImage'), JSON.stringify(uploadedImage));
      localStorage.setItem(key('tone'), JSON.stringify(tone));
      localStorage.setItem(key('length'), JSON.stringify(length));
      localStorage.setItem(key('language'), JSON.stringify(language));
      localStorage.setItem(key('useEmojis'), JSON.stringify(useEmojis));
      localStorage.setItem(key('isAdvanced'), JSON.stringify(isAdvanced));
      localStorage.setItem(key('context'), JSON.stringify(context));
      localStorage.setItem(key('brandVoice'), JSON.stringify(brandVoice));
      localStorage.setItem(key('goal'), JSON.stringify(goal));
      localStorage.setItem(key('stance'), JSON.stringify(stance));
      localStorage.setItem(key('politicalParty'), JSON.stringify(politicalParty));
      localStorage.setItem(key('toneSliderValue'), JSON.stringify(toneSliderValue));
      localStorage.setItem(key('isQuickPolitical'), JSON.stringify(isQuickPolitical));
      localStorage.setItem(key('generatedItems'), JSON.stringify(generatedItems));
      localStorage.setItem(key('history'), JSON.stringify(history));
      localStorage.setItem(key('savedItems'), JSON.stringify(savedItems));
      localStorage.setItem(key('generatedCount'), JSON.stringify(generatedCount));
      localStorage.setItem(key('subView'), JSON.stringify(subView));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }, [
    toolMode, postContent, uploadedImage, tone, length, language, useEmojis, isAdvanced, context, brandVoice, goal, stance, politicalParty, toneSliderValue, isQuickPolitical,
    generatedItems, history, savedItems, generatedCount, subView
  ]);
  
  useEffect(() => {
    return () => { recognitionRef.current?.stop(); };
  }, []);


  const handleGenerate = useCallback(async (isRegeneration = false) => {
    if (!postContent.trim() && !uploadedImage) {
      setError(t('errorPostContent'));
      return;
    }
    setIsLoading(true);
    setError(null);

    const params: GenerationParams = {
      postContent, toolMode,
      uploadedImage: (uploadedImage && toolConfig.showImageUpload) ? { mimeType: uploadedImage.mimeType, data: uploadedImage.data } : undefined,
      tone, length, language, useEmojis, 
      isAdvanced: toolConfig.showAdvanced ? isAdvanced : false,
      context: toolConfig.showAdvanced && isAdvanced ? context : '',
      brandVoice: toolConfig.showAdvanced && isAdvanced ? brandVoice : '',
      goal: toolConfig.showAdvanced && isAdvanced ? goal : Goal.Engagement,
      isQuickPolitical: !isAdvanced ? isQuickPolitical : undefined,
      stance: (isAdvanced && tone === Tone.Political) || (!isAdvanced && isQuickPolitical) ? stance : undefined,
      politicalParty: ((isAdvanced && tone === Tone.Political) || (!isAdvanced && isQuickPolitical)) && stance !== Stance.Neutral ? politicalParty : undefined,
      toneSliderValue: !isAdvanced ? toneSliderValue : undefined,
    };

    try {
      const itemsText = await generateText(params);
      const newItems: GeneratedText[] = itemsText.map((text, index) => ({
        id: `${toolMode}-${Date.now()}-${index}`,
        text,
      }));
      
      setGeneratedItems(newItems);
      setHistory(prev => [...prev, newItems]);
      setGeneratedCount(prev => prev + newItems.length);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [postContent, uploadedImage, toolMode, tone, length, language, useEmojis, isAdvanced, context, brandVoice, goal, stance, politicalParty, toneSliderValue, isQuickPolitical, t, toolConfig]);

  const handleTemplateClick = (template: Template) => {
    setPostContent(template.prompt);
  };
  
  const handleSave = (item: GeneratedText) => {
    if (!savedItems.find(c => c.id === item.id)) {
      setSavedItems(prev => [...prev, item]);
    } else {
      setSavedItems(prev => prev.filter(c => c.id !== item.id));
    }
  };
  
  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setGeneratedItems(newHistory[newHistory.length - 1] || []);
    } else if (history.length === 1) {
      setHistory([]);
      setGeneratedItems([]);
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError(t('imageUploadErrorSize'));
        return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        setError(t('imageUploadErrorType'));
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const base64Data = dataUrl.split(',')[1];
        setUploadedImage({
            name: file.name,
            url: dataUrl,
            data: base64Data,
            mimeType: file.type,
        });
        setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
      setUploadedImage(null);
      if (imageInputRef.current) {
          imageInputRef.current.value = '';
      }
  };

  const handleToggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(t('voiceInputUnsupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    postContentBeforeListeningRef.current = postContent;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === Language.Bengali ? 'bn-BD' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setPostContent(postContentBeforeListeningRef.current + (postContentBeforeListeningRef.current ? ' ' : '') + finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  }, [isListening, postContent, language, t]);


  const renderControlGroup = (title: string, children: React.ReactNode) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-textSecondary mb-2">{title}</label>
      {children}
    </div>
  );

  const renderSelect = <T extends string,>(options: T[], value: T, onChange: React.Dispatch<React.SetStateAction<T>>) => (
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value as T)} 
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
  );

  if (subView === 'history') {
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setSubView('generator')} className="flex items-center gap-2 mb-4 text-primary font-semibold hover:underline">
          <ArrowLeft size={18} /> {t('backToGenerator')}
        </button>
        <h2 className="text-3xl font-bold mb-4 text-textPrimary">{t('history')}</h2>
        
        <div className="flex border-b border-gray-200 mb-6">
            <button 
                onClick={() => setHistoryTab('saved')} 
                className={`px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${historyTab === 'saved' ? 'border-b-2 border-primary text-primary' : 'text-textSecondary hover:bg-slate-100 rounded-t-md'}`}
            >
                {t('savedItems')}
            </button>
            <button 
                onClick={() => setHistoryTab('full')}
                className={`px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${historyTab === 'full' ? 'border-b-2 border-primary text-primary' : 'text-textSecondary hover:bg-slate-100 rounded-t-md'}`}
            >
                {t('generationHistory')}
            </button>
        </div>

        {historyTab === 'saved' && (
            <div className="space-y-4">
                {savedItems.length > 0 ? (
                    savedItems.map(item => <GeneratedTextCard key={item.id} item={item} onSave={handleSave} isSaved={true} itemType={toolMode} />)
                ) : (
                    <p className="text-textSecondary text-center py-8">{t('noSavedItems')}</p>
                )}
            </div>
        )}

        {historyTab === 'full' && (
            <div className="space-y-8">
                {history.length > 0 ? (
                    history.slice().reverse().map((batch, index) => (
                        <div key={`batch-${index}`} className="bg-surface p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-textPrimary">
                                Generation #{history.length - index}
                            </h3>
                            <div className="space-y-4">
                                {batch.map(item => (
                                    <GeneratedTextCard
                                    key={item.id}
                                    item={item}
                                    onSave={handleSave}
                                    isSaved={!!savedItems.find(c => c.id === item.id)}
                                    itemType={toolMode}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-textSecondary text-center py-8">{t('noHistory')}</p>
                )}
            </div>
        )}
      </div>
    );
  }

  const sliderToneLabels = ['Formal', 'Polite', 'Friendly', 'Funny'];
  
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Controls Column */}
      <div className="lg:col-span-1 bg-surface p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">{t('create')}</h2>
            <button onClick={() => setSubView('history')} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                <History size={16} /> {t('history')} ({savedItems.length})
            </button>
        </div>
        
        <div className="relative w-full mb-2">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={toolConfig.placeholder}
            className="w-full p-3 pr-28 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out h-28"
          ></textarea>
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {postContent && !isListening && (
              <button
                onClick={() => setPostContent('')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear input"
              >
                <XCircle size={20} />
              </button>
            )}
            {toolConfig.showImageUpload && (
              <>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={t('uploadScreenshot')}
                  aria-label={t('uploadScreenshot')}
                  disabled={isListening}
                >
                  <ImagePlus size={20} />
                </button>
              </>
            )}
            <button
              onClick={handleToggleListening}
              className={`transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}
              title={isListening ? t('voiceInputListening') : t('voiceInput')}
              aria-label={isListening ? t('voiceInputListening') : t('voiceInput')}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        {uploadedImage && toolConfig.showImageUpload && (
            <div className="mb-4 p-2 border border-gray-200 rounded-md relative bg-slate-50">
                <img src={uploadedImage.url} alt="Uploaded preview" className="max-h-32 w-auto rounded-md mx-auto" />
                <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-white rounded-full p-0.5 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label={t('removeImage')}
                >
                    <XCircle size={18} />
                </button>
            </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={() => setShowControls(!showControls)}
            className="w-full flex justify-between items-center text-left text-sm font-semibold text-textSecondary hover:text-textPrimary transition-colors py-2"
          >
            <span>{t('customizeOptions')}</span>
            {showControls ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>


        {showControls && (
          <div className="mt-4">
            {toolConfig.showAdvanced && (
                <div className="flex justify-center mb-6 bg-slate-100 p-1 rounded-full">
                    <button onClick={() => setIsAdvanced(false)} className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!isAdvanced ? 'bg-primary text-white shadow' : 'text-textSecondary'}`}>
                        <Zap size={16} /> {t('quickMode')}
                    </button>
                    <button onClick={() => setIsAdvanced(true)} className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isAdvanced ? 'bg-primary text-white shadow' : 'text-textSecondary'}`}>
                        <Settings2 size={16} /> {t('advanced')}
                    </button>
                </div>
            )}

            {!isAdvanced && toolConfig.showAdvanced && (
                <>
                    {renderControlGroup(t('tone'), (
                        <div className="grid grid-cols-2 gap-2">
                            {sliderToneLabels.map((label, index) => (
                                <button
                                    key={label}
                                    onClick={() => setToneSliderValue(index)}
                                    className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                                        toneSliderValue === index
                                            ? 'bg-primary text-white shadow'
                                            : 'bg-slate-100 text-textSecondary hover:bg-slate-200'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    ))}

                    {renderControlGroup(t('length'), renderSelect(LENGTHS, length, setLength))}
                    
                    {renderControlGroup(t('language'), renderSelect(LANGUAGES, language, setLanguage))}

                    <div className="flex items-center justify-between mb-6">
                      <label htmlFor="emojis-toggle" className="text-sm font-medium text-textSecondary">{t('useEmojis')}</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="emojis-toggle" checked={useEmojis} onChange={() => setUseEmojis(!useEmojis)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    {toolConfig.politicalToggle && <div className="border-t border-gray-200 my-6"></div>}

                    {toolConfig.politicalToggle && <div className="flex items-center justify-between mb-4">
                      <label htmlFor="political-toggle" className="text-sm font-medium text-textSecondary">{toolConfig.politicalToggle}</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="political-toggle" checked={isQuickPolitical} onChange={() => setIsQuickPolitical(!isQuickPolitical)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>}

                    {toolConfig.politicalToggle && isQuickPolitical && (
                      <>
                        {renderControlGroup(t('stance'), renderSelect(STANCES, stance, setStance))}
                        {stance !== Stance.Neutral && renderControlGroup(t('politicalParty'), renderSelect(POLITICAL_PARTIES, politicalParty, setPoliticalParty))}
                      </>
                    )}
                </>
            )}
            
            {(isAdvanced || !toolConfig.showAdvanced) && (
                <>
                    {toolConfig.tones.length > 0 && renderControlGroup(t('tone'), (
                        <div className="grid grid-cols-3 gap-2">
                            {toolConfig.tones.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                                        tone === t
                                            ? 'bg-primary text-white shadow'
                                            : 'bg-slate-100 text-textSecondary hover:bg-slate-200'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    ))}
                    {toolConfig.politicalToggle && tone === Tone.Political && (
                      <>
                        {renderControlGroup(t('stance'), renderSelect(STANCES, stance, setStance))}
                        {stance !== Stance.Neutral && renderControlGroup(t('politicalParty'), renderSelect(POLITICAL_PARTIES, politicalParty, setPoliticalParty))}
                      </>
                    )}
                    {renderControlGroup(t('length'), renderSelect(LENGTHS, length, setLength))}
                    {renderControlGroup(t('language'), renderSelect(LANGUAGES, language, setLanguage))}

                    {toolConfig.showAdvanced && <>
                      <div className="mb-6">
                          <label htmlFor="context-input" className="block text-sm font-medium text-textSecondary mb-2">{t('additionalContext')}</label>
                          <textarea id="context-input" value={context} onChange={(e) => setContext(e.target.value)} placeholder={t('contextPlaceholder')} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" rows={2}></textarea>
                      </div>

                      <div className="mb-6">
                          <label htmlFor="brand-voice-input" className="block text-sm font-medium text-textSecondary mb-2">{t('brandVoice')}</label>
                          <input id="brand-voice-input" type="text" value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} placeholder={t('brandVoicePlaceholder')} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                      </div>
                      
                      {renderControlGroup(t('goal'), renderSelect(GOALS, goal, setGoal))}
                    </>}

                     {toolMode !== 'hashtag' && <div className="flex items-center justify-between mb-6">
                      <label htmlFor="emojis-toggle-adv" className="text-sm font-medium text-textSecondary">{t('useEmojis')}</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="emojis-toggle-adv" checked={useEmojis} onChange={() => setUseEmojis(!useEmojis)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>}
                </>
            )}
          </div>
        )}
      </div>

      {/* Results Column */}
      <div className="lg:col-span-2">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-2xl font-bold text-textPrimary mb-2 sm:mb-0">{toolConfig.generatedTitle}</h2>
            <div className="flex items-center gap-4">
               <button onClick={() => handleGenerate(true)} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline disabled:text-textSecondary disabled:no-underline" disabled={isLoading || generatedItems.length === 0}>
                   <RotateCw size={14} className={isLoading ? 'animate-spin' : ''} /> {t('regenerate')}
               </button>
               <button onClick={handleUndo} className="text-sm font-semibold text-textSecondary hover:underline disabled:text-gray-400" disabled={history.length < 1}>
                   {t('undo')}
               </button>
            </div>
         </div>
        
         <button
            onClick={() => handleGenerate()}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('generating')}</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>{toolConfig.generateBtn} ({5})</span>
              </>
            )}
          </button>

        {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        
        {generatedItems.length === 0 && !isLoading && (
            <div className="text-center py-10 px-6 bg-surface rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-textPrimary mb-2">{toolConfig.emptyState}</h3>
                <p className="text-textSecondary mb-6">{t('startCreatingSub')}</p>
                {toolConfig.templates.length > 0 && (
                    <div className="text-left w-full max-w-md mx-auto">
                        <p className="font-semibold text-sm mb-3 text-textPrimary">{t('tryTemplates')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {toolConfig.templates.slice(0, 4).map(template => (
                                <button key={template.id} onClick={() => handleTemplateClick(template)} className="text-sm text-left p-2 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

        <div className="space-y-4">
          {generatedItems.map(item => (
            <GeneratedTextCard 
              key={item.id} 
              item={item} 
              onSave={handleSave} 
              isSaved={!!savedItems.find(c => c.id === item.id)} 
              itemType={toolMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generator;
