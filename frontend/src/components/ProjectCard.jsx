import { ExternalLink, Github, ChevronRight, Maximize2 } from "lucide-react"; // Added Github
import { MediaCarousel } from "./MediaCarousel";

// 1. Added 'onClick' to the props destructuring
export const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SECTION: Project Details */}
        <div className="flex flex-col justify-between p-8 lg:p-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                project.deploymentStatus.toLowerCase() === 'completed' 
                  ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' 
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              }`}>
                {project.deploymentStatus}
              </span>
            </div>

            <h3 className="mb-2 text-3xl font-black text-white transition-colors group-hover:text-emerald-400">
              {project.title}
            </h3>

            {/* ACTION LINKS: GitHub and Live Demo */}
            <div className="flex items-center gap-4 mb-6">
              {project.git && (
                <a 
                  href={project.git} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
                  onClick={(e) => e.stopPropagation()} // Prevents opening modal on click
                >
                  <Github size={14} /> Source_Code
                </a>
              )}
              {project.link && (
                <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-emerald-500 animate-pulse hover:text-emerald-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} /> Live_Demo
              </a>
              )}
            </div>

            <p className="mb-8 leading-relaxed text-slate-400 font-medium">
              {project.description}
            </p>

            <div className="space-y-3 mb-8">
              {project.achievements?.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 group/item">
                  <ChevronRight size={14} className="mt-1 text-emerald-500 transition-transform group-hover/item:translate-x-1" />
                  <p className="text-sm text-slate-300 leading-snug">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: Media (Clickable trigger for Modal) */}
        <div 
          onClick={onClick} 
          className="relative flex min-h-[400px] cursor-zoom-in items-center justify-center overflow-hidden border-t border-slate-800 bg-[#020617] lg:border-l lg:border-t-0"
        >
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-emerald-500/0 opacity-0 transition-all duration-300 group-hover/media:bg-emerald-500/10 group-hover/media:opacity-100 group-hover:z-30">
             <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-black shadow-xl scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 size={14} /> VIEW FULLSCREEN
             </div>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="w-full h-full pointer-events-none">
            <MediaCarousel media={project.mediaUrls} />
          </div>
          
          <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-colors" />
        </div>

      </div>
    </div>
  );
};