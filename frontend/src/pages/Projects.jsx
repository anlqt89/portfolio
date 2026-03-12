import { useRef, useState, useEffect } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { useFavicon } from "../components/SetFavicon";
import { API } from "../utilities/api";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import { ProjectNav } from "../components/ProjectNav";
import { ProjectMobileBar } from "../components/ProjectMobileBar";
import { Search } from "lucide-react";

const CATEGORIES = [
  "All",
  "Full-Stack / Backend Engineering",
  "Machine Learning / AI",
  "Systems / Low-Level Engineering",
];

export default function Projects() {
  useFavicon(`${FAVICON_TITLES.PORTFOLIO} | ${FAVICON_TITLES.PROJECTS}`);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null); // null = not searching
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    async function loadProjects() {
      const res = await fetch(API.projects)
      setProjects(await res.json())
    }
    loadProjects()
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setSearchResults(null); return; }
    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(API.search(val));
        const data = await res.json();
        const projectIds = data.results
          .filter(r => r.type === "project")
          .map(r => r.data.id);
        setSearchResults(projectIds);
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 350);
  };

  const filteredProjects = (() => {
    let list = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);
    if (searchResults !== null) {
      list = searchResults.map(id => list.find(p => p.id === id)).filter(Boolean);
    }
    return list;
  })();

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
  }, [filteredProjects]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header Section */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-4xl font-black text-white shrink-0">Projects</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent"></div>
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col gap-4 mb-12">
        {/* Search bar */}
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search projects by skill, tech, keyword..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 transition-colors"
          />
          {searchLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-emerald-500 text-[#020617] border-emerald-500"
                  : "bg-transparent text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-12">

        {/* 1. PROJECT LIST */}
        <div className="flex flex-col gap-32">
          {filteredProjects.map((project, index) => (
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
          projects={filteredProjects}
          activeIndex={activeIndex}
          scrollToProject={scrollToProject}
        />

      </div>
      <ProjectMobileBar
        projects={filteredProjects}
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