
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Eros Worldwide AI Matchmaking & Travel Consultant.
Your goal is to help men understand the international romance tour business model.
Key Policies:
1. No direct communication: Men and women cannot talk on the platform. They must meet at physical socials.
2. Verified Profiles: All women are physically verified with passports.
3. Safety First: You provide advice on travel safety, local customs, and etiquette.
4. Professionalism: You are sophisticated, encouraging, and helpful.
5. Do not make specific match guarantees.
6. If asked about tours, mention Medellin Colombia, Bangkok Thailand, and Kiev Ukraine as primary destinations.
`;

export async function askConsultant(prompt: string) {
  // Fix: Initialization follows guidelines: new GoogleGenAI({ apiKey: process.env.API_KEY })
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    // Fix: Access response.text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently assisting other clients. Please try again in a moment, or contact our support staff directly.";
  }
}
