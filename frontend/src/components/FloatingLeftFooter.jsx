import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Mail from 'lucide-react/dist/esm/icons/mail';
import { API } from "../utilities/api";

export default function FloatingLeftFooter() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch(API.contact).then(r => r.json()).then(setContact);
  }, []);

  return (
    <div className="hidden lg:flex fixed left-0 bottom-0 top-0 w-20 flex-col justify-between items-center py-10 border-r border-emerald-500/20 bg-[#020617] z-40">
      
      {/* Top: Brand/Icon - Maximum Glow */}
      <div className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
        <Terminal size={28} strokeWidth={2.5} />
      </div>

      {/* Middle: Vertical Text - High Contrast Green */}
      <div className="flex items-center">
        <p className="rotate-180 [writing-mode:vertical-lr] text-emerald-400/60 text-[11px] font-mono font-bold tracking-[0.5em] uppercase select-none drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
          Software Engineer — {new Date().getFullYear()}
        </p>
      </div>

      {/* Bottom: Social Links - Brighter Base and Stronger Hover */}
      <div className="flex flex-col gap-8 items-center">
        <a
          href={contact?.github}
          target="_blank"
          rel="noreferrer"
          className="text-emerald-400 hover:text-emerald-200 transition-all hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]"
        >
          <Github size={22} strokeWidth={2.5} />
        </a>
        <a
          href={contact?.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-emerald-400 hover:text-emerald-200 transition-all hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]"
        >
          <Linkedin size={22} strokeWidth={2.5} />
        </a>
        <a
          href={contact ? `mailto:${contact.email}` : undefined}
          className="text-emerald-400 hover:text-emerald-200 transition-all hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]"
        >
          <Mail size={22} strokeWidth={2.5} />
        </a>
        
        {/* Decorative Line: High intensity glow line */}
        <div className="w-[2px] h-24 bg-gradient-to-t from-emerald-400 via-emerald-500/50 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
      </div>
    </div>
  );
}