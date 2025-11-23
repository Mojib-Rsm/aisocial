

import { GoogleGenAI } from "@google/genai";
import { ImageStyle, ImageAspectRatio } from '../types';

export const generateImage = async (
    prompt: string, 
    style: ImageStyle, 
    aspectRatio: ImageAspectRatio,
    referenceImage?: { mimeType: string; data: string }
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Enhance the prompt with the selected style for better results
    const enhancedPrompt = `${prompt}, ${style} style`;

    // Ensure valid aspect ratio string for API
    // Note: The UI handles calculating 'Original' or 'Auto' to a specific ratio (Square, 3:4, etc.) 
    // BEFORE calling this service if an image is uploaded.
    // However, if 'Auto' or 'Original' is passed here directly (e.g. no image uploaded case falling through),
    // we must default it to a valid string for the API.
    let validAspectRatio = aspectRatio;
    if (validAspectRatio === ImageAspectRatio.Original || validAspectRatio === ImageAspectRatio.Auto) {
        validAspectRatio = ImageAspectRatio.Square;
    }

    try {
        if (referenceImage) {
             // Use Gemini 2.5 Flash for image editing / variation tasks
             const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        {
                            inlineData: {
                                mimeType: referenceImage.mimeType,
                                data: referenceImage.data
                            }
                        },
                        { text: enhancedPrompt }
                    ]
                },
                config: {
                    imageConfig: {
                        aspectRatio: validAspectRatio
                    }
                }
             });

             // Extract image from response parts
             if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
                 for (const part of response.candidates[0].content.parts) {
                     if (part.inlineData) {
                         return part.inlineData.data;
                     }
                 }
                 // Check if text was returned instead (e.g. model refused)
                 const textPart = response.candidates[0].content.parts.find(p => p.text);
                 if (textPart && textPart.text) {
                    throw new Error(`Model returned text instead of image: "${textPart.text}"`);
                 }
             }
             throw new Error("Image generation failed. No image data found in response.");

        } else {
            // Use Imagen for high-quality text-to-image generation
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: enhancedPrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: validAspectRatio,
                },
            });

            const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;

            if (!base64ImageBytes) {
                throw new Error('Image generation succeeded but no image data was returned.');
            }

            return base64ImageBytes;
        }

    } catch (error: any) {
        console.error('Error generating image:', error);
        throw new Error(error.message || 'An unexpected error occurred while generating the image.');
    }
};