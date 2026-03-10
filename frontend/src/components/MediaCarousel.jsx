import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { API } from "../utilities/api";

export const MediaCarousel = ({ media = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  }, [media.length]);

  const prevSlide = (e) => {
    e?.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (media.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, media.length, isPaused]);

  if (!media || media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-600">
        <ImageIcon size={40} className="mb-2 opacity-20" />
        <p className="text-xs font-mono uppercase tracking-widest">No Media Found</p>
      </div>
    );
  }

  return (
    <div 
      className="relative group/carousel w-full h-full flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Grid - Lowered opacity for cleaner "Fill" view */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Media Display - Removed padding so it can truly "Fill" the screen */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img
          key={currentIndex}
          src={API.media(media[currentIndex])}
          alt={`Project visual ${currentIndex + 1}`}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          className="w-full h-full object-contain transition-all duration-700 ease-in-out animate-in fade-in zoom-in-95"
        />
      </div>

      {/* Navigation Buttons - Higher z-index to stay above the image */}
      {media.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); prevSlide(); }}
            className="absolute left-6 z-30 rounded-full border border-white/10 bg-black/40 p-3 text-white opacity-0 backdrop-blur-md transition-all hover:bg-emerald-500 hover:text-black group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-6 z-30 rounded-full border border-white/10 bg-black/40 p-3 text-white opacity-0 backdrop-blur-md transition-all hover:bg-emerald-500 hover:text-black group-hover/carousel:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {media.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all rounded-full ${
              idx === currentIndex ? "w-8 bg-emerald-500" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};