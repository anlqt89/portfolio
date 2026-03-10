import { useState, useEffect } from "react";
import { Database, Globe, Terminal } from "lucide-react";
import { StackLevel } from "../data/StackData";
import { useFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import { API } from "../utilities/api";

export default function Stack() {
useFavicon(`${FAVICON_TITLES.PORTFOLIO} | ${FAVICON_TITLES.STACK}`);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function loadSkills() {
      const res = await fetch(API.skills)
      setSkills(await res.json())
    }
    loadSkills()
  }, [])
  return (
    <div className="bg-[#020617] min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Changed violet to emerald */}
        <div className="mb-16">
          <h1 className="text-5xl font-black mb-4">Tech <span className="text-emerald-500">Stack</span></h1>
          <p className="text-slate-400 max-w-xl border-l-2 border-emerald-500/30 pl-4">
            My ecosystem for building high-concurrency applications and managing 
            massive datasets with millisecond precision.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-500 group/card">
              <div className="flex items-center gap-3 mb-8">
                {/* Icon wrapper changed to emerald */}
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover/card:scale-110 transition-transform">
                  {idx === 0 ? <Terminal size={20}/> : idx === 1 ? <Database size={20}/> : <Globe size={20}/>}
                </div>
                <h2 className="text-xl font-bold">{group.category}</h2>
              </div>

              <div className="space-y-6">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="group/tool">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-slate-200 font-semibold group-hover/tool:text-emerald-400 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-tighter text-slate-500">
                        {tool.level}
                      </span>
                    </div>
                    {/* Visual Progress Bar - Changed to Emerald/Teal Gradient */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        style={{ width: StackLevel[tool.level]}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}