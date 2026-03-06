import { useRef, useState, useEffect } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal"; // 1. Import the Modal
import { ProjectsData } from "../data/ProjectsData";
import { useFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import { ProjectNav } from "../components/ProjectNav";
import { ProjectMobileBar } from "../components/ProjectMobileBar";

export default function Projects() {
  useFavicon(`${FAVICON_TITLES.PORTFOLIO} | ${FAVICON_TITLES.PROJECTS}`);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null); // 2. State for Modal
  const projectRefs = useRef([]);

  const scrollToProject = (index) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.3 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header Section */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-4xl font-black text-white shrink-0">Projects</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-12">
    
        {/* 1. PROJECT LIST */}
        <div className="flex flex-col gap-32">
          {ProjectsData.map((project, index) => (
            <div 
              key={project.id} 
              data-index={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="scroll-mt-40"
            >
              {/* 3. Pass onClick to open Modal */}
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            </div>
          ))}
        </div>

        <ProjectNav
          ProjectsData={ProjectsData} 
          activeIndex={activeIndex} 
          scrollToProject={scrollToProject} 
        />
      
      </div>
          <ProjectMobileBar
          ProjectsData={ProjectsData} 
          activeIndex={activeIndex} 
          scrollToProject={scrollToProject} 
        />
      {/* 4. THE MODAL COMPONENT */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      
    </section>

    
  );
}