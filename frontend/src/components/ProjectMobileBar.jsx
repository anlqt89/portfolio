import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export const ProjectMobileBar = ({ projects, activeIndex, scrollToProject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrev = () => {
    if (activeIndex > 0) scrollToProject(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) scrollToProject(activeIndex + 1);
  };

  const handleSelect = (index) => {
    scrollToProject(index);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden fixed top-[70px] left-0 right-0 z-[100] w-full px-6 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto relative">
        
        {/* DROPDOWN MENU PANEL */}
        {isOpen && (
          <div className="fixed top-[130px] left-6 right-6 max-w-md mx-auto z-[101] bg-[#020617]/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar py-2">
              <div className="px-5 py-3 border-b border-white/5 mb-1">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Select Project</span>
              </div>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => handleSelect(index)}
                  className={`w-full flex items-center justify-between px-6 py-5 transition-colors border-l-2 ${
                    activeIndex === index 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                      : "border-transparent text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest text-left leading-relaxed">
                    {project.title}
                  </span>
                  {activeIndex === index && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MAIN NAVIGATION BAR */}
        <div className={`flex items-center justify-between bg-[#020617]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-3 shadow-2xl transition-all ${isOpen ? "border-emerald-500/40" : ""}`}>
          
          {/* PREVIOUS - White */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`flex items-center p-2 transition-all ${
              activeIndex === 0 ? "opacity-10" : "text-white active:scale-90"
            }`}
          >
            <div className="p-1.5 bg-white/10 border border-white/10 rounded-full">
              <ChevronLeft size={18} strokeWidth={3} />
            </div>
          </button>

          {/* CENTER ITEM: Expanded Title Only */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex flex-col items-center justify-center px-4 group active:scale-95 transition-transform overflow-hidden"
          >
            <div className="flex items-center gap-2 max-w-full">
              <span className="text-[11px] font-black text-white uppercase tracking-[0.15em] truncate">
                {projects[activeIndex]?.title}
              </span>
              <ChevronDown 
                size={14} 
                className={`text-emerald-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
              />
            </div>
            <div className={`w-full max-w-[60px] h-[2px] mt-1.5 rounded-full transition-all duration-500 ${isOpen ? "bg-emerald-400 w-full" : "bg-emerald-500/20"}`} />
          </button>

          {/* NEXT - Green */}
          <button
            onClick={handleNext}
            disabled={activeIndex === projects.length - 1}
            className={`flex items-center p-2 transition-all ${
              activeIndex === projects.length - 1 ? "opacity-10" : "text-emerald-500 active:scale-90"
            }`}
          >
            <div className="p-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <ChevronRight size={18} strokeWidth={3} />
            </div>
          </button>

        </div>
      </div>

      {/* BACKGROUND SHUTTER */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1] bg-black/60 backdrop-blur-sm transition-all duration-300" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};