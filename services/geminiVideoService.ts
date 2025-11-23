import { GoogleGenAI } from "@google/genai";
import { VideoResolution, VideoAspectRatio } from '../types';

const pollOperation = async (ai: GoogleGenAI, operation: any): Promise<any> => {
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        try {
            operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (error) {
            console.error("Polling failed:", error);
            // Decide if the error is fatal or if polling should continue.
            // For simplicity, we'll re-throw, but you might want more robust handling.
            throw new Error("Failed while polling for video generation status.");
        }
    }
    return operation;
}

export const generateVideo = async (
    prompt: string, 
    resolution: VideoResolution, 
    aspectRatio: VideoAspectRatio
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    
    // Create a new instance right before the call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        let initialOperation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: resolution,
                aspectRatio: aspectRatio
            }
        });

        const finalOperation = await pollOperation(ai, initialOperation);

        const downloadLink = finalOperation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            console.error("Final operation result:", finalOperation);
            throw new Error('Video generation finished, but no download link was found.');
        }

        return downloadLink;

    } catch (error: any) {
        console.error('Error generating video:', error);
        // Re-throw a more user-friendly error message.
        throw new Error(error.message || 'An unexpected error occurred while generating the video.');
    }
};