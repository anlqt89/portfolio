export const FloatingName = () => {
    return (
      <>
        <div className="fixed top-8 left-28 z-40 hidden lg:block">
          <span className="text-white font-black tracking-tighter text-2xl uppercase group cursor-default">
            AN<span className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-500">LAM.</span>
          </span>
          
          {/* Subtle Status Line - Optional: adds to the "System Engineer" feel */}
          <div className="h-[1px] w-8 bg-gradient-to-r from-emerald-500/50 to-transparent mt-1"></div>
        </div>
      </>
    )
}