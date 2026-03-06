import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Briefcase, GraduationCap, Code } from 'lucide-react';
import { MyContact } from '../data/MyContact';
import { MyStackData } from '../data/MyStackData';
import { ProjectsData } from '../data/ProjectsData';
import { WorkExperienceData } from '../data/WorkExperienceData';
import { EducationData } from '../data/EducationData';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "System Online. How can I assist with An's profile today?", sender: 'bot' }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("education") || q.includes("gpa")) {
      const ms = EducationData[0];
      return `An is a Master's student at ${ms.school} maintaining a perfect ${ms.gpa} GPA.`;
    }
    if (q.includes("work") || q.includes("experience")) {
      const job = WorkExperienceData[0];
      return `An recently served as a ${job.role} at ${job.company}, delivering a 15% revenue increase through full-stack optimization.`;
    }
    if (q.includes("skill") || q.includes("tech")) {
      return `Expertise includes: ${MyStackData[0].tools.slice(0, 5).map(t => t.name).join(", ")}.`;
    }
    return `Query received. You can reach An directly at ${MyContact.email}.`;
  };

  const handleSend = (textOverride) => {
    const msg = textOverride || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: generateResponse(msg), sender: 'bot' }]);
    }, 500);
    if (!textOverride) setInput('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-85 h-[500px] bg-[#020617] border border-emerald-500/20 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header - Styled like your .section-dot */}
          <div className="p-4 border-b border-emerald-500/10 flex justify-between items-center bg-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_12px_#10b981] animate-pulse" />
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">An_Bot v1.0</span>
            </div>
            <X className="text-emerald-500/50 cursor-pointer hover:text-emerald-500" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-lg text-sm ${
                  m.sender === 'user' 
                    ? 'bg-emerald-500 text-[#020617] font-semibold rounded-tr-none shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-3 flex flex-wrap gap-2 border-t border-emerald-500/10">
            {[
              { l: 'Experience', i: Briefcase },
              { l: 'Education', i: GraduationCap },
              { l: 'Tech Stack', i: Code }
            ].map(btn => (
              <button key={btn.l} onClick={() => handleSend(btn.l)} className="flex items-center gap-2 bg-[#020617] border border-emerald-500/20 text-emerald-500/70 px-3 py-1.5 rounded-full text-[10px] hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <btn.i size={12} /> {btn.l}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-emerald-500/5 flex gap-3">
            <input 
              className="flex-1 bg-transparent border-b border-emerald-500/20 text-emerald-50 text-sm outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-900"
              placeholder="System prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={() => handleSend()} className="text-emerald-500 hover:scale-110 transition-transform">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Launcher Button - Matches .section-dot style */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#10b981] text-[#020617] rounded-full flex items-center justify-center shadow-[0_0_20px_#10b981] hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;