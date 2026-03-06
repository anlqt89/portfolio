import "./binaryrain.css"
export const BinaryRain = ()=>{
  const binaryString = "101101001101".repeat(20);
  
  return (
    <div className="flex justify-around w-full h-full overflow-hidden px-1">
      {[...Array(18)].map((_, i) => (
        <div 
          key={i}
          className="animate-binary-fall whitespace-nowrap font-mono text-xl font-black tracking-[0.1em] text-emerald-400"
          style={{
            writingMode: 'vertical-rl',
            // FASTER SPEED: 2-4 seconds instead of 8+
            animationDuration: `${Math.random() * 2 + 2}s`, 
            animationDelay: `${Math.random() * 2}s`,
            // SHARPNESS: Removes sub-pixel blurring
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            // GLOW: High intensity, low spread for sharpness
            textShadow: '0 0 4px #10b981', 
            opacity: Math.random() * 0.8 + 0.2
          }}
        >
          {binaryString}
        </div>
      ))}
    </div>
  );
}