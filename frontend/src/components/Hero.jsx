import { BinaryRain } from "./BinaryRain";
import { API } from "../utilities/api";

export default function Hero() {
  return (
    <div className="relative group w-full max-w-[550px] aspect-square mx-auto lg:ml-auto">
      {/* The Outer Box */}
      <div className="relative h-full w-full bg-[#020617] border border-emerald-500/20 rounded-3xl flex items-center justify-center p-6 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
        
        {/* Background Binary Layer */}
        <div className="absolute inset-0 pointer-events-none select-none">
           <BinaryRain />
        </div>

        {/* The Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020617_100%)] z-10" />

        {/* The Circular Profile Image - Thinner border & lower contrast */}
        <div className="relative z-20 w-full h-full max-w-[400px] max-h-[400px] rounded-full border-2 border-emerald-500/40 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500 group-hover:border-emerald-500/60">
            <img
              src={API.media("profile.jpeg")}
              className="w-full h-full object-cover brightness-105 contrast-110 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              alt="Profile"
            />
        </div>
      </div>
    </div>
  );
}
