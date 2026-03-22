import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyCiSSI3xocBG6Qaq9boFxfiSDncMsKOml0";
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks.";

export async function chatWithKoddy(history: {role: 'user' | 'model', parts: {text: string}[]}[], message: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
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
    return `Sorry, I'm having trouble connecting to my brain right now. (Error: ${(error?.message || "Unknown error").substring(0,50)}...)`;
  }
}
