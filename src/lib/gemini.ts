import { GoogleGenerativeAI } from '@google/generative-ai';

// MUST be provided via environment variables in Vercel
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const systemInstruction = "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks.";

export async function chatWithKoddy(history: {role: 'user' | 'model', parts: {text: string}[]}[], message: string) {
  if (!genAI) {
    return "🚨 Setup Error: VITE_GEMINI_API_KEY is completely missing from your deployed build! Please go to Vercel Settings -> Environment Variables, add VITE_GEMINI_API_KEY, and click REDEPLOY. (The old fallback key was revoked by Google).";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      systemInstruction
    });
    
    const chatSession = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
      }
    });

    const result = await chatSession.sendMessage(message);
    return result.response.text() || "I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return `API Key detected, but Google rejected the request: ${(error?.message || "Unknown error").substring(0,100)}... Make sure your API key from Google AI Studio is active and correctly pasted.`;
  }
}
