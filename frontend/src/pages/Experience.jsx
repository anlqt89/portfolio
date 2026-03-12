import { useState, useEffect } from "react";
import { MapPin, Calendar, Phone, Mail } from "lucide-react";
import { useFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import { API } from "../utilities/api";

export default function Experience() {
  useFavicon(`${FAVICON_TITLES.PORTFOLIO} | Experience`);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    async function loadExperience() {
      const res = await fetch(API.experience);
      setExperience(await res.json());
    }
    loadExperience();
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-6 mb-16">
          <h1 className="text-5xl font-black shrink-0">
            Work <span className="text-emerald-500">Experience</span>
          </h1>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-12">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-emerald-500/20" />

          {experience.map((job, idx) => (
            <div key={idx} className="flex gap-8">
              {/* Dot */}
              <div className="relative mt-1 shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-emerald-500 bg-[#020617] shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
              </div>

              {/* Card */}
              <div className="flex-1 bg-slate-900/40 border border-slate-800/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-xl font-black text-white">{job.title}</h2>
                    <p className="text-emerald-400 font-bold">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 text-slate-500 text-xs font-bold uppercase tracking-wider shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {job.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {job.location}
                    </span>
                  </div>
                </div>

                {/* Supervisor */}
                {job.supervisor && (
                  <p className="text-xs text-slate-400 mb-3">
                    Supervisor: <span className="text-slate-300 font-semibold">{job.supervisor}</span>
                  </p>
                )}

                {/* Employer contact */}
                {(job.phone || job.email) && (
                  <div className="flex flex-wrap gap-4 mb-5 text-xs text-slate-400">
                    {job.phone && (
                      <a href={`tel:${job.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                        <Phone size={12} className="text-emerald-500" /> {job.phone}
                      </a>
                    )}
                    {job.email && (
                      <a href={`mailto:${job.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                        <Mail size={12} className="text-emerald-500" /> {job.email}
                      </a>
                    )}
                  </div>
                )}

                {/* Tech stack */}
                {job.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tech_stack.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                <ul className="space-y-2">
                  {job.highlights?.map((point, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                      <span className="text-emerald-500 mt-1 shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
