
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, PoliticalParty, Tone } from '../types';
import { PROFANITY_LIST } from '../constants';

const filterProfanity = (text: string): string => {
  let cleanText = text;
  PROFANITY_LIST.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    cleanText = cleanText.replace(regex, '****');
  });
  return cleanText;
};

const getToolConfig = (toolMode: GenerationParams['toolMode']) => {
    switch(toolMode) {
        case 'caption':
            return { generationType: 'caption', jsonKey: 'captions', expert: 'Facebook post caption generator' };
        case 'comment':
            return { generationType: 'comment', jsonKey: 'comments', expert: 'Facebook post comment generator' };
        case 'hashtag':
            return { generationType: 'hashtag', jsonKey: 'hashtags', expert: 'social media hashtag expert' };
        case 'bio':
            return { generationType: 'bio', jsonKey: 'bios', expert: 'social media profile bio expert' };
        case 'idea':
            return { generationType: 'content idea', jsonKey: 'ideas', expert: 'creative content strategist' };
        case 'ad-copy':
            return { generationType: 'ad copy', jsonKey: 'ad_copies', expert: 'expert direct response copywriter' };
        case 'youtube-title':
            return { generationType: 'YouTube title', jsonKey: 'titles', expert: 'YouTube SEO and clickbait expert' };
        case 'youtube-desc':
            return { generationType: 'YouTube description', jsonKey: 'descriptions', expert: 'YouTube SEO expert' };
        case 'reel-script':
            return { generationType: 'short video script', jsonKey: 'scripts', expert: 'viral short video scriptwriter' };
        case 'tiktok-idea':
            return { generationType: 'TikTok concept', jsonKey: 'ideas', expert: 'TikTok trend analyst' };
        default:
            throw new Error(`Invalid tool mode: ${toolMode}`);
    }
}

const buildPrompt = (params: GenerationParams): string => {
    const { generationType, expert } = getToolConfig(params.toolMode);
    
    const lengthMap = {
      'Short (1-10 words)': params.toolMode === 'hashtag' ? '5-10 hashtags' : '1-10 words',
      'Medium (11-30 words)': params.toolMode === 'hashtag' ? '10-20 hashtags' : '11-30 words',
      'Long (30+ words)': params.toolMode === 'hashtag' ? '20-30+ hashtags' : 'more than 30 words',
    };
    const lengthInstruction = lengthMap[params.length];

    const sliderToneDescriptions = ['Formal', 'Polite and Professional', 'Friendly and Casual', 'Funny and Witty'];
    let toneInstruction: string;
    if (params.toolMode === 'hashtag') {
      toneInstruction = `Generate a mix of popular and niche hashtags.`;
    } else if (!params.isAdvanced && params.isQuickPolitical) {
      toneInstruction = 'The tone should be Political.';
    } else if (params.isAdvanced) {
      toneInstruction = `The tone should be ${params.tone}.`;
    } else {
      toneInstruction = `The tone should be ${sliderToneDescriptions[params.toneSliderValue ?? 2]}.`;
    }

    const inputTopic = {
        caption: `Post Content/Topic: "${params.postContent}"`,
        comment: `Post Content to comment on: "${params.postContent}"`,
        hashtag: `Topic: "${params.postContent}"`,
        bio: `Information about the user/brand: "${params.postContent}"`,
        idea: `Topic for content ideas: "${params.postContent}"`,
        'ad-copy': `Product/Service to advertise: "${params.postContent}"`,
        'youtube-title': `Video Topic: "${params.postContent}"`,
        'youtube-desc': `Video Topic/Title: "${params.postContent}"`,
        'reel-script': `Video Concept: "${params.postContent}"`,
        'tiktok-idea': `Niche/Topic: "${params.postContent}"`,
    }[params.toolMode];

    let prompt = `You are an expert ${expert}. Your task is to generate 5 distinct ${generationType}s based on the following criteria.\n`;

    if (params.toolMode !== 'hashtag') {
        prompt += `\n**IMPORTANT RULE: Your highest priority is to generate ${generationType}s with a "human touch". They must sound natural, authentic, and not robotic. Use conversational language, varied sentence structures, and avoid generic phrases.**\n`;
    } else {
        prompt += `\n**IMPORTANT RULE: Hashtags must start with '#', contain no spaces, and be relevant to the topic.**\n`;
    }
    
    if (params.toolMode === 'idea' || params.toolMode === 'tiktok-idea') {
        prompt += `\n**Idea Format:** Generate a mix of ideas, such as listicles, how-to guides, questions for the audience, and myth-busting topics.\n`;
    }
    if (params.toolMode === 'ad-copy') {
        prompt += `\n**Ad Copy Structure:** Each ad copy should include a compelling Headline, persuasive Body text, and a clear Call to Action (CTA). Format each as a single string.\n`;
    }
    if (params.toolMode === 'reel-script') {
        prompt += `\n**Script Structure:** Provide a short script with a Hook, Body, and CTA. Keep it concise for short-form video.\n`;
    }
    if (params.toolMode === 'youtube-title') {
        prompt += `\n**Title Style:** Generate high-CTR, catchy titles optimized for clicks (Clickbait but honest).\n`;
    }

    prompt += `\n${inputTopic}\n`;

    prompt += `
**Instructions:**
1.  **Language:** Generate the ${generationType}s in ${params.language}.
2.  **Tone:** ${toneInstruction}
3.  **Length:** Generate a list of ${generationType}s. The total number of ${generationType}s should be approximately ${lengthInstruction}.
4.  **Emojis:** ${params.useEmojis && params.toolMode !== 'hashtag' ? 'Include relevant emojis.' : 'Do not include any emojis.'}
5.  **Variety:** Ensure the ${generationType}s are unique and varied.
6.  **Filter:** Do not use any profane, offensive, or inappropriate language.
`;
    
    if (params.toolMode === 'caption' || params.toolMode === 'comment') {
        prompt += `7.  **Political Topics:** Generate constructive and respectful ${generationType}s. Avoid inflammatory language, personal attacks, and hate speech.\n`;
        const isPolitical = (params.isAdvanced && params.tone === Tone.Political) || (!params.isAdvanced && params.isQuickPolitical);
        if (isPolitical && params.stance) {
            let stanceInstruction = `The ${generationType}s must strictly reflect a stance that is **${params.stance}** the post's topic.`;
            if (params.politicalParty && params.politicalParty !== PoliticalParty.None) {
                stanceInstruction += ` This stance should be from the perspective of the **${params.politicalParty}** political party.`
            }
            prompt += `8.  **Political Stance:** ${stanceInstruction}\n`;
        }
    }

    if (params.isAdvanced && params.toolMode !== 'hashtag') {
        prompt += `
**Advanced Criteria:**
- **Additional Context:** ${params.context || 'None'}
- **Brand Voice:** ${params.brandVoice || 'None'}
- **Goal:** The primary goal of the ${generationType}s is ${params.goal}.
`;
    }
  
    return prompt;
}


export const generateText = async (params: GenerationParams): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    const { generationType } = getToolConfig(params.toolMode);
    return [`This is a mock ${generationType} because the API key is missing.`, `Here is another example ${generationType}.`];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { generationType, jsonKey } = getToolConfig(params.toolMode);

  let prompt = buildPrompt(params);
  prompt += `
Return the output as a JSON object with a key "${jsonKey}" which is an array of 5 ${generationType} strings.
`;

  try {
    const textPart = { text: prompt };
    const parts: any[] = [textPart];

    if (params.uploadedImage && (params.toolMode === 'caption' || params.toolMode === 'comment' || params.toolMode === 'ad-copy')) {
      textPart.text += `\n**Image Context:** An image has also been provided. Your ${generationType}s should be relevant to both the text and the image.`;
      const imagePart = {
        inlineData: {
          mimeType: params.uploadedImage.mimeType,
          data: params.uploadedImage.data,
        },
      };
      parts.push(imagePart);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            [jsonKey]: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        },
        temperature: 0.9,
        topP: 0.9,
      }
    });
    
    let jsonString = response.text || "";
    
    // Sanitize: Extract JSON object if wrapped in markdown or other text
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        jsonString = jsonMatch[0];
    }

    if (!jsonString) {
        throw new Error("Received empty or invalid response from the model.");
    }
    
    const result = JSON.parse(jsonString);

    if (result && Array.isArray(result[jsonKey])) {
        return result[jsonKey].map(filterProfanity);
    }
    
    return [];

  } catch (error) {
    console.error(`Error generating ${generationType}s:`, error);
    throw new Error(`Failed to generate ${generationType}s. Please try again.`);
  }
};
