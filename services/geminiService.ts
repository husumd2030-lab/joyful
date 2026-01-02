
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Sunny", the cheerful and wise sun mascot for "Joyful Kids Care School".
Your tone is incredibly friendly, encouraging, and supportive. 
You answer questions for parents about early childhood education, nutrition, play-based learning, and general childcare advice.
You emphasize the school's core values: Safety, Creativity, and Kindness.
If asked about enrollment, tell them to visit our "Admissions" section or click the "Enroll Now" button.
Keep responses concise and easy for busy parents to read.

LANGUAGE SUPPORT:
You are fully bilingual in English and Amharic. 
- If the user speaks in Amharic, respond in Amharic.
- If the user speaks in English, respond in English.
- Use warm, culturally appropriate greetings for both languages.
`;

export const getGeminiChatResponse = async (userMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I'm feeling a bit shy today. Could you try asking again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My rays are a bit dimmed. Let me try to recharge. (Error connecting to Sunny)";
  }
};

export const generateArtProject = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A vibrant, kid-friendly, playful illustration for a preschool art project: ${prompt}` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
