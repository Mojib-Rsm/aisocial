
import React, { useState, useRef } from 'react';
import { ImageStyle, ImageAspectRatio, UploadedImage } from '../types';
import { IMAGE_STYLES, IMAGE_ASPECT_RATIOS } from '../constants';
import { generateImage } from '../services/geminiPhotoService';
import { Sparkles, Download, AlertTriangle, ImagePlus, XCircle } from 'lucide-react';
import { useLanguage } from '../App';

const PhotoGenerator: React.FC = () => {
  const { t } = useLanguage();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.Photorealistic);
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>(ImageAspectRatio.Auto);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [originalImageRatio, setOriginalImageRatio] = useState<ImageAspectRatio | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const calculateClosestAspectRatio = (width: number, height: number): ImageAspectRatio => {
    const ratio = width / height;
    
    const targets = [
        { id: ImageAspectRatio.Square, val: 1 },
        { id: ImageAspectRatio.Portrait, val: 3/4 },
        { id: ImageAspectRatio.PortraitLarge, val: 9/16 },
        { id: ImageAspectRatio.Landscape, val: 16/9 },
        { id: ImageAspectRatio.LandscapeStandard, val: 4/3 },
    ];

    const closest = targets.reduce((prev, curr) => {
        return (Math.abs(curr.val - ratio) < Math.abs(prev.val - ratio) ? curr : prev);
    });

    return closest.id;
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
        
        // Create an image to calculate aspect ratio
        const img = new Image();
        img.onload = () => {
            const closestRatio = calculateClosestAspectRatio(img.width, img.height);
            setOriginalImageRatio(closestRatio);
            setAspectRatio(ImageAspectRatio.Auto); // Default to Auto when uploaded
        };
        img.src = dataUrl;

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
      setOriginalImageRatio(null);
      setAspectRatio(ImageAspectRatio.Auto); // Reset to Auto
      if (imageInputRef.current) {
          imageInputRef.current.value = '';
      }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) {
      setError(t('errorPostContent'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // If "Auto" or "Original" is selected:
      // 1. If uploaded image exists, use calculated original ratio.
      // 2. If no uploaded image (text-to-image), default to Square (1:1).
      let finalAspectRatio = aspectRatio;
      if (aspectRatio === ImageAspectRatio.Auto || aspectRatio === ImageAspectRatio.Original) {
          if (uploadedImage && originalImageRatio) {
              finalAspectRatio = originalImageRatio;
          } else {
              finalAspectRatio = ImageAspectRatio.Square;
          }
      }

      const base64Data = await generateImage(
          prompt, 
          style, 
          finalAspectRatio, 
          uploadedImage ? { mimeType: uploadedImage.mimeType, data: uploadedImage.data } : undefined
      );
      
      const imageUrl = `data:image/jpeg;base64,${base64Data}`;
      setGeneratedImageUrl(imageUrl);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
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
              <label htmlFor="photo-prompt" className="block text-sm font-medium text-textSecondary mb-2">
                Prompt
              </label>
              <div className="relative w-full mb-2">
                  <textarea
                    id="photo-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('photoPromptPlaceholder')}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out h-36 pr-10"
                    disabled={isLoading}
                  />
                   <div className="absolute top-3 right-3 flex items-center gap-2">
                        {prompt && (
                        <button
                            onClick={() => setPrompt('')}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Clear input"
                        >
                            <XCircle size={20} />
                        </button>
                        )}
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
                            disabled={isLoading}
                        >
                            <ImagePlus size={20} />
                        </button>
                    </div>
                </div>
                {uploadedImage && (
                    <div className="mb-4">
                        <div className="p-2 border border-gray-200 rounded-md relative bg-slate-50 mb-2">
                            <img src={uploadedImage.url} alt="Uploaded preview" className="max-h-32 w-auto rounded-md mx-auto" />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 text-gray-500 hover:text-red-500 transition-colors"
                                aria-label={t('removeImage')}
                            >
                                <XCircle size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {renderSelect(t('style'), IMAGE_STYLES, style, setStyle)}
            {renderSelect(t('aspectRatio'), IMAGE_ASPECT_RATIOS, aspectRatio, setAspectRatio)}
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-textPrimary mb-4">{t('generatedPhoto')}</h2>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('generatingPhoto')}</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>{t('generatePhoto')}</span>
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <p>{error}</p>
            </div>
          )}

          <div className="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
            {isLoading ? (
              <div className="text-center p-4">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-textPrimary font-semibold">{t('generatingPhoto')}</p>
              </div>
            ) : generatedImageUrl ? (
                <div className="relative w-full h-full group">
                    <img src={generatedImageUrl} alt="Generated AI" className="w-full h-full object-contain" />
                    <a
                        href={generatedImageUrl}
                        download={`ai-photo-${Date.now()}.jpeg`}
                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        <Download size={16} />
                        {t('downloadPhoto')}
                    </a>
                </div>
            ) : (
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-2">{t('startCreatingPhoto')}</h3>
                <p className="text-textSecondary">{t('startCreatingPhotoSub')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGenerator;
