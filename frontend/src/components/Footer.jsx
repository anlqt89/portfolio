import { Terminal, ArrowUp } from "lucide-react";
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Mail from 'lucide-react/dist/esm/icons/mail';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] border-t border-slate-800/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white font-black text-xl tracking-tighter">
              {/* Changed bg-violet-600 to bg-emerald-600 */}
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Terminal size={18} className="text-white" />
              </div>
              <span className="uppercase tracking-tight">An Lam</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Specializing in high-concurrency systems and large-scale data architecture. 
              Available for specialized consulting and full-stack roles.
            </p>
          </div>

          {/* Quick Links Column - Now Uppercase */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-[0.2em] text-emerald-500/80">Navigation</h4>
            <a href="#about" className="text-slate-400 hover:text-emerald-400 transition-colors text-[11px] uppercase font-bold tracking-widest">About</a>
            <a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors text-[11px] uppercase font-bold tracking-widest">Projects</a>
            <a href="#stack" className="text-slate-400 hover:text-emerald-400 transition-colors text-[11px] uppercase font-bold tracking-widest">Tech Stack</a>
            <a href="#contact" className="text-slate-400 hover:text-emerald-400 transition-colors text-[11px] uppercase font-bold tracking-widest">Contact</a>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] text-emerald-500/80">Connect</h4>
            <div className="flex gap-4">
              {/* Social Buttons: Changed hover from violet to emerald */}
              <a href="#" className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10">
                <Github size={20} />
              </a>
              <a href="#" className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10">
                <Linkedin size={20} />
              </a>
              <a href="mailto:an.lam@example.com" className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-slate-600 text-xs font-mono">
              &copy; {new Date().getFullYear()} — Optimized for Performance
            </p>
            {/* System Status Tag - This already fits perfectly! */}
            <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Systems Nominal</span>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}