import { GoogleGenerativeAI } from '@google/generative-ai';

// MUST be provided via environment variables in Vercel
// Strip any accidental quotes that might have been pasted in Vercel
const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const apiKey = rawApiKey.replace(/^["'`]+|["'`]+$/g, '').trim();

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const systemInstruction = "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks.";

export async function chatWithKoddy(history: {role: 'user' | 'model', parts: {text: string}[]}[], message: string) {
  if (!genAI) {
    return "🚨 Setup Error: VITE_GEMINI_API_KEY is completely missing from your deployed build! Please go to Vercel Settings -> Environment Variables, add VITE_GEMINI_API_KEY, and click REDEPLOY.";
  }

  // Robust fallback chain for varying Google API regions and key tiers
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: modelName, 
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
      console.warn(`Model ${modelName} failed:`, error?.message);
      lastError = error;
      // If it's a 404 meaning model not found or supported, loop to next.
      // If it's something else (like API Key invalid), continue might still be safe, but typically we want to break.
      if (!error?.message?.includes("is not found") && !error?.message?.includes("404")) {
         // Just break if it's an API Key invalid error which won't be fixed by changing the model
         if(error?.message?.includes("API key not valid") || error?.message?.includes("PERMISSION_DENIED")) {
           break;
         }
      }
    }
  }

  console.error("All Gemini models failed. Last Error:", lastError);
  return `API Key detected, but Google rejected the request: ${(lastError?.message || "Unknown error").substring(0,100)}... Make sure your API key from Google AI Studio is active and has no trailing spaces.`;
}
