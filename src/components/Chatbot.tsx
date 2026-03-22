import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { chatWithKoddy } from '../lib/gemini';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: 'Hi! I\'m Koddy, your AI coding assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    // Format history for Gemini
    const history: {role: 'user' | 'model', parts: {text: string}[]}[] = messages
      .filter((m, i) => !(i === 0 && m.role === 'ai')) // Skip initial greeting
      .map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

    const response = await chatWithKoddy(history, userMessage);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'fixed'} bottom-6 right-6 bg-primary-500 text-white p-4 rounded-2xl shadow-lg hover:bg-primary-400 transition-all z-50 transform hover:scale-105`}
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-[#18181b] border border-[#27272a] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden text-left h-[500px]">
          
          {/* Header */}
          <div className="bg-primary-600 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Koddy Assistant</h3>
              <p className="text-primary-100 text-xs">Always online</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-black/50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 max-w-[80%] rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-sm' 
                    : 'bg-[#27272a] text-zinc-200 rounded-tl-sm border border-[#3f3f46]'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-[#27272a] rounded-2xl rounded-tl-sm border border-[#3f3f46]">
                  <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <form className="p-3 border-t border-[#27272a] bg-[#18181b] flex items-center" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-black text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 border border-[#27272a] text-sm"
            />
            <button type="submit" disabled={isLoading} className="ml-2 bg-primary-600 hover:bg-primary-500 text-white p-2 rounded-xl transition-colors text-sm disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default Chatbot;
