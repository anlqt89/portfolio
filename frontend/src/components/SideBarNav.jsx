import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Stack", id: "stack" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = navLinks.find((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted range for better scroll detection accuracy
          return rect.top >= -200 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 flex-col justify-between items-center py-8 z-50 border-r border-white/5 bg-[#020617]">
      
      {/* Top: Brand Logo & Status Dot */}
      <div className="flex flex-col items-center gap-4">
        {/* Changed violet-500 to emerald-500 */}
        <div className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
          <Terminal size={24} />
        </div>
        
        {/* The Active Connected Dot: Now strictly emerald with a high-intensity glow */}
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse transition-all duration-500 shadow-[0_0_12px_#10b981]" />
        </div>
      </div>

      {/* Middle: Vertical Navigation Links */}
      <div className="flex flex-col gap-10">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rotate-180 [writing-mode:vertical-lr] text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
              activeSection === link.id 
                ? "text-emerald-500 scale-110 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" 
                : "text-slate-500 hover:text-emerald-400/80"
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Bottom: Socials */}
      <div className="flex flex-col gap-6 items-center">
        <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
          <Github size={18} />
        </a>
        <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
          <Linkedin size={18} />
        </a>
        {/* Bottom decorative line matching the emerald theme */}
        <div className="w-px h-12 bg-gradient-to-t from-transparent via-emerald-500/20 to-emerald-500/20"></div>
      </div>
    </nav>
  );
}