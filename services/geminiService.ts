import { GoogleGenAI, Content } from "@google/genai";
import { Message, User } from '../types';

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
  // In a real app, you might have more sophisticated error handling or logging.
  // For this example, we'll throw an error to make it clear the key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCaption = async (topic: string): Promise<string> => {
  if (!topic) {
    return "Harika yeni bir gönderi! ✨";
  }

  const prompt = `Sen yaratıcı bir sosyal medya fenomenisin. "${topic}" hakkında Instagram tarzı bir gönderi için kısa, ilgi çekici ve havalı bir başlık yaz. 2-3 adet ilgili hashtag ekle. Ton ilham verici ve modern olmalı. Çıktıyı tırnak işaretleri içine alma.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            temperature: 0.7,
            topP: 1,
            topK: 1,
            maxOutputTokens: 80, // Restrict to a reasonable caption length
            thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response
        }
    });
    
    // Use the .text property for direct access to the string
    return response.text.trim();
  } catch (error) {
    console.error("Error generating caption with Gemini:", error);
    return `Harika bir an yakalandı: ${topic}. #gününkaresi`;
  }
};

export const generateBotResponse = async (history: Message[], botUser: User, currentUser: User): Promise<string> => {
    const chatHistory: Content[] = history.map(message => ({
        role: message.senderId === botUser.id ? 'model' : 'user',
        parts: [{ text: message.text }]
    }));

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chatHistory,
            config: {
                systemInstruction: `Sen Gemini Gram uygulamasında 'Gemini Asistan' adında, arkadaş canlısı ve yardımsever bir yapay zeka asistanısın. Kullanıcılarla sohbet et, sorularını yanıtla ve onlara yardımcı ol. Cevaplarını kısa ve sohbet formatına uygun tut.`,
                temperature: 0.8,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating bot response:", error);
        return "Üzgünüm, şu an bir sorunla karşılaştım. Lütfen daha sonra tekrar dene.";
    }
};