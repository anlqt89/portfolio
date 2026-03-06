import React, { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-xl cursor-zoom-out animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Media Window */}
      <div className={`relative z-10 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl flex items-center justify-center 
        ${isZoomed 
          ? "w-screen h-screen rounded-0 border-none" 
          : "w-full max-w-6xl aspect-video md:aspect-auto md:h-full max-h-[85vh] rounded-2xl border border-white/5 animate-in zoom-in-95"
        } bg-black`}
      >
        
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          {/* Zoom Toggle Button (YouTube Style) */}
          <button 
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all backdrop-blur-md border border-white/10"
            title={isZoomed ? "Minimize" : "Full Screen"}
          >
            {isZoomed ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all backdrop-blur-md border border-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Media Container */}
        <div className="w-full h-full flex items-center justify-center">
          <MediaCarousel media={project.mediaUrls} />
        </div>

        {/* Minimal Title Overlay - Hidden when zoomed for cinematic feel */}
        {!isZoomed && (
          <div className="absolute bottom-6 left-6 pointer-events-none hidden md:block">
            <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              Viewing: {project.title}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};