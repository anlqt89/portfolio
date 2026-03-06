export const ProjectNav = ({ ProjectsData, activeIndex, scrollToProject }) => {
  return (
    <aside className="hidden lg:block border-l border-slate-800/50 pl-8">
      <nav className="sticky top-40 flex flex-col gap-10">
        {ProjectsData.map((project, index) => (
          <button
            key={project.id}
            onClick={() => scrollToProject(index)}
            className="group flex items-center justify-between w-full text-right"
          >
            <div className="flex flex-col items-end">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeIndex === index
                    ? "text-emerald-400"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {project.title.split(" ")[0]} {project.title.split(" ")[1] || ""}
              </span>
              <span className="font-mono text-[9px] text-slate-600">
                0{index + 1}
              </span>
            </div>

            <div
              className={`h-12 w-[3px] rounded-full transition-all duration-500 ml-6 ${
                activeIndex === index
                  ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-y-125"
                  : "bg-slate-800 group-hover:bg-slate-700"
              }`}
            />
          </button>
        ))}
      </nav>
    </aside>
  );
};