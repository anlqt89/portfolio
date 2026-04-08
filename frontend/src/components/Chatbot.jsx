import React, { useState, useEffect, useRef } from 'react';
import { API } from '../utilities/api';
import { 
  MessageCircle, 
  X, 
  Send, 
  Briefcase, 
  GraduationCap, 
  Code,
  Folder,
  FileText
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "System Online. How can I assist with An's profile today?", sender: 'bot' }
  ]);

  const scrollRef = useRef(null);

  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (query) => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(API.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.answer, sender: 'bot' }]);
      console.log(data)
    } catch (error) {
      console.log(error);
      setMessages((prev) => [...prev, { text: 'Something went wrong.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (textOverride = '') => {
    const msg = (textOverride || input).trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { text: msg, sender: 'user' }]);
    generateResponse(msg);

    if (!textOverride) {
      setInput('');
    }
  };

const quickActions = [
  { label: 'Experience', Icon: Briefcase, prompt: "Tell me about An's experience" },
  { label: 'Education', Icon: GraduationCap, prompt: "What is An's education?" },
  { label: 'Tech Stack', Icon: Code, prompt: "What technologies does An use?" },
  { label: 'Projects', Icon: Folder, prompt: "Show me An's projects" },
  { label: 'Resume', Icon: FileText, prompt: "Where can I download An's resume?" }
];

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[340px] h-[500px] bg-[#020617] border border-emerald-500/20 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-emerald-500/10 flex justify-between items-center bg-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_12px_#10b981] animate-pulse" />
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
                An_Bot v1.0
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-emerald-500/50 hover:text-emerald-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-lg text-sm ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-[#020617] font-semibold rounded-tr-none shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-100 rounded-tl-none'
                  }`}
                >
                  {m.text.split('\n').map((line, j) => {
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    const parts = line.split(urlRegex);
                    return (
                      <span key={j}>
                        {parts.map((part, k) =>
                          urlRegex.test(part) ? (
                            <a key={k} href={part} target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-300 break-all">
                              {part}
                            </a>
                          ) : part
                        )}
                        {j < m.text.split('\n').length - 1 && <br />}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 flex flex-wrap gap-2 border-t border-emerald-500/10">
            {quickActions.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSend(label)}
                className="flex items-center gap-2 bg-[#020617] border border-emerald-500/20 text-emerald-500/70 px-3 py-1.5 rounded-full text-[10px] hover:border-emerald-500 hover:text-emerald-500 transition-all"
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-emerald-500/5 flex gap-3">
            <input
              className="flex-1 bg-transparent border-b border-emerald-500/20 text-emerald-50 text-sm outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-900"
              placeholder="System prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="text-emerald-500 hover:scale-110 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-[#10b981] text-[#020617] rounded-full flex items-center justify-center shadow-[0_0_20px_#10b981] hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;