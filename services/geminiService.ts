
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateArtisticBio = async (name: string, background: string, style: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional and artistic bio for ${name}. 
      Profile: BA Fine Art graduate from Leeds Arts University (2:1), Junior Creative Designer at Madhya Infosoft, and a Google UX Design candidate.
      Expertise: Bridging traditional fine art (ink-on-wood, spatial installations) with high-growth digital branding (325k+ followers).
      Key details: ${background}. 
      Tone: Sophisticated, forward-thinking, and multidisciplinary.
      Artistic style: ${style}.
      Keep it to 2-3 concise paragraphs.`
    });
    return response.text;
  } catch (error) {
    console.error("Error generating bio:", error);
    return "I am a multidisciplinary artist and designer bridging fine art principles with contemporary digital strategy. A graduate of Leeds Arts University, my work explores spatial storytelling and visual communication across physical and digital mediums.";
  }
};

export const generateCreativePrompt = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a single, experimental art or design prompt for a multidisciplinary creative.
      Context: The creative is a BA Fine Art grad (ink-on-wood, installations) and a Junior Graphic Designer/UX trainee.
      Goal: Suggest a project that bridges traditional physical art with digital UI/UX or social strategy.
      Constraint: Keep it under 40 words. Make it sound inspiring and sophisticated.`
    });
    return response.text;
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "Create a digital interface that translates the tactile texture of ink-on-wood into a fluid mobile navigation experience.";
  }
};
