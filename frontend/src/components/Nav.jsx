import { NavLink, Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="bg-[#020617] border-b border-white/5 py-5 sticky top-0 z-[100] backdrop-blur-md w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-white tracking-tighter group shrink-0">
            AN<span className="text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all">LAM</span>.
        </Link>

        {/* THE SPACER - Pushes the menu to the right */}
        <div className="flex-grow min-w-[20px]" />

        {/* Links - Reduced gap on mobile (gap-3) to ensure 'Contact' fits */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-10 shrink-0">
          {[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "Stack", path: "/stack" },
            { name: "Experience", path: "/experience" },
            { name: "Contact", path: "/contact" }
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 whitespace-nowrap
                ${isActive 
                  ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" 
                  : "text-slate-500 hover:text-emerald-400/80"}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}