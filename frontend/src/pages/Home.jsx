import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css"
import { useFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import { API } from "../utilities/api";

export default function Home() {
     useFavicon(`${FAVICON_TITLES.PORTFOLIO} | ${FAVICON_TITLES.HOME}`);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [contact, setContact] = useState(null);
    const [education, setEducation] = useState([]);

    useEffect(() => {
      async function loadData() {
        const [contactRes, educationRes] = await Promise.all([
          fetch(API.contact),
          fetch(API.education),
        ])
        setContact(await contactRes.json())
        setEducation(await educationRes.json())
      }
      loadData()
    }, [])

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = API.resumeDownload;
        link.setAttribute('download', 'resume-anlam.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleHireMe = () => {
        navigate("/contact")
    }

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8">
          
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
    <div className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-base font-bold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <span>Hi! I'm </span> <span className="text-white">{contact?.name}</span>
    </div>

    <div className={`flex items-center gap-3 px-4 py-1.5 rounded-lg border transition-all duration-300 ${
                            isHovered ? "bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-emerald-500/5 border-emerald-500/40"
                        }`}>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs uppercase font-black tracking-[0.2em] text-emerald-400 block mt-1">
                                    {isHovered ? (
                                        <span className="typing-container inline-block">Ready to Build</span>
                                    ) : (
                                        <span className="opacity-80">{contact?.status}</span>
                                    )}
                                </span>
                        </div>
                    </div>
          
          <h1 className="text-3xl lg:text-4xl font-black leading-[1] tracking-tighter">
          {contact?.title} <br/>
          <span className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.25)]">
           
          </span>
        </h1>
          
          <div className="space-y-4">
            <p className="mt-4 text-lg text-gray-300">
              Software Engineer pursuing an 
              <span className="text-emerald-400 font-bold"> 
                MS in Computer Science at UT Arlington
              </span>, 
              {contact?.goal}
            </p>
          </div>

          {/* Academic & Tech Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-800/50">
            <div>
              <p className="text-emerald-500 font-black text-xl">{education[0]?.gpa ?? '4.0'}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">GPA @ UTA</p>
            </div>
            <div>
              <p className="text-emerald-500 font-black text-xl">29M+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Rows Managed</p>
            </div>
            <div>
              <p className="text-emerald-500 font-black text-xl">20x</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Query Speedup</p>
            </div>
            <div>
              <p className="text-emerald-500 font-black text-xl">Summa</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cum Laude</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleHireMe}
                            className="bg-emerald-600 px-8 py-4 rounded-md font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 uppercase tracking-widest text-xs min-w-[180px]"
                        >
                            {isHovered ? "Click Me" : "Hire Me"}
                        </button>
            <button 
  onClick={handleDownload} 
  className="border border-emerald-500/20 px-8 py-4 rounded-md font-bold transition-all text-slate-300 uppercase tracking-widest text-xs
             hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
>
  Download Resumé
</button>
          </div>
        </div>

        <Hero />
      </div>
    </div>
  );
}