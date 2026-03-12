import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, ExternalLink, Github, Briefcase, Code } from 'lucide-react';
import { API } from '../utilities/api';

const ResultCard = ({ result }) => {
  const { type, score, data } = result;

  if (type === 'project') {
    return (
      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all">
        <div className="mt-0.5 shrink-0 rounded-lg bg-emerald-500/10 p-1.5">
          <Code size={14} className="text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{data.title}</span>
            <span className="text-[9px] font-mono text-emerald-500/60 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {(score * 100).toFixed(0)}% match
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{data.description}</p>
          <div className="flex items-center gap-3 mt-1.5">
            {data.git && (
              <a href={data.git} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-emerald-400 transition-colors">
                <Github size={10} /> Code
              </a>
            )}
            {data.link && (
              <a href={data.link} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400 transition-colors">
                <ExternalLink size={10} /> Live
              </a>
            )}
            <div className="flex gap-1 flex-wrap">
              {data.technologies?.slice(0, 3).map(t => (
                <span key={t} className="text-[9px] text-slate-600 border border-slate-800 px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'experience') {
    return (
      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all">
        <div className="mt-0.5 shrink-0 rounded-lg bg-blue-500/10 p-1.5">
          <Briefcase size={14} className="text-blue-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{data.title}</span>
            <span className="text-[9px] font-mono text-blue-500/60 bg-blue-500/10 px-1.5 py-0.5 rounded">
              {(score * 100).toFixed(0)}% match
            </span>
          </div>
          <p className="text-xs text-emerald-400/70 mt-0.5">{data.company}</p>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
            {data.highlights?.[0]}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setQuery(''); setResults([]); }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(API.search(val));
        const data = await res.json();
        setResults(data.results || []);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 350);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs font-mono"
      >
        <SearchIcon size={13} />
        <span className="hidden sm:inline">Search...</span>
        <span className="hidden sm:inline text-[10px] border border-slate-700 rounded px-1 text-slate-600">/</span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-xl bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
              <SearchIcon size={16} className="text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleInput}
                placeholder="Search projects, skills, experience..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-600"
              />
              {loading && (
                <div className="w-4 h-4 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin shrink-0" />
              )}
              <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-400 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-3 space-y-2">
                  <p className="text-[10px] font-mono text-slate-600 px-1 mb-2">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                  {results.map((r, i) => <ResultCard key={i} result={r} />)}
                </div>
              ) : query && !loading ? (
                <div className="p-8 text-center text-slate-600 text-sm">
                  No results for "{query}"
                </div>
              ) : !query ? (
                <div className="p-6 text-center text-slate-700 text-xs font-mono">
                  Try "machine learning", "React", "iOS", "PostgreSQL"...
                </div>
              ) : null}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
