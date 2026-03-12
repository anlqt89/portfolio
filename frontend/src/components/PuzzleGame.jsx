import { useState, useEffect, useCallback } from "react";

const START = [2, 3, 6, 1, 0, 7, 4, 8, 5];
const GOAL  = [1, 2, 3, 4, 5, 6, 7, 8, 0];

function manhattan(state, goal) {
  const pos = {};
  goal.forEach((v, i) => { pos[v] = i; });
  let d = 0;
  state.forEach((v, i) => {
    if (v === 0) return;
    const gr = Math.floor(pos[v] / 3), gc = pos[v] % 3;
    const sr = Math.floor(i / 3),       sc = i % 3;
    d += Math.abs(gr - sr) + Math.abs(gc - sc);
  });
  return d;
}

function astar(start, goal) {
  const goalKey = goal.join(",");
  const DIRS = [-3, 3, -1, 1];
  const heap = [];
  const push = (node) => { heap.push(node); heap.sort((a, b) => a.f - b.f); };
  const pop  = () => heap.shift();
  const h    = (s) => manhattan(s, goal);
  push({ state: start, g: 0, f: h(start), path: [] });
  const visited = new Set();
  while (heap.length) {
    const { state, g, path } = pop();
    const key = state.join(",");
    if (visited.has(key)) continue;
    visited.add(key);
    if (key === goalKey) return path;
    const zi = state.indexOf(0);
    const zc = zi % 3;
    for (const d of DIRS) {
      const ti = zi + d;
      if (ti < 0 || ti > 8) continue;
      if (d === -1 && zc === 0) continue;
      if (d ===  1 && zc === 2) continue;
      const ns = [...state];
      ns[zi] = ns[ti]; ns[ti] = 0;
      const ng = g + state[ti];
      push({ state: ns, g: ng, f: ng + h(ns), path: [...path, { from: ti, to: zi, tile: state[ti] }] });
    }
  }
  return null;
}

function moveLabel(from, to) {
  const d = to - from;
  if (d === -3) return "↑";
  if (d ===  3) return "↓";
  if (d === -1) return "←";
  if (d ===  1) return "→";
  return "?";
}

export default function PuzzleGame() {
  const [board,   setBoard]   = useState([...START]);
  const [moves,   setMoves]   = useState(0);
  const [won,     setWon]     = useState(false);
  const [hint,    setHint]    = useState(null);
  const [optimal, setOptimal] = useState(null);
  const [solving, setSolving] = useState(false);

  const goalKey = GOAL.join(",");

  useEffect(() => {
    if (board.join(",") === goalKey) setWon(true);
  }, [board, goalKey]);

  const movable = useCallback((idx) => {
    const zi = board.indexOf(0);
    const d  = idx - zi;
    if (![-3, 3, -1, 1].includes(d)) return false;
    const zc = zi % 3;
    if (d === -1 && zc === 0) return false;
    if (d ===  1 && zc === 2) return false;
    return true;
  }, [board]);

  const slide = useCallback((idx) => {
    if (won || !movable(idx)) return;
    const zi = board.indexOf(0);
    const nb = [...board];
    nb[zi] = nb[idx]; nb[idx] = 0;
    setBoard(nb);
    setMoves((m) => m + 1);
    setHint((prev) => {
      if (!prev || prev.length === 0) return null;
      const next = prev[0];
      if (next.from === idx && next.to === zi) return prev.length > 1 ? prev.slice(1) : null;
      return null;
    });
  }, [board, won, movable]);

  useEffect(() => {
    const KEY = { ArrowUp: -3, ArrowDown: 3, ArrowLeft: -1, ArrowRight: 1, w: -3, s: 3, a: -1, d: 1 };
    const handler = (e) => {
      const d = KEY[e.key];
      if (d === undefined) return;
      e.preventDefault();
      const zi = board.indexOf(0);
      const ti = zi + d;
      if (ti < 0 || ti > 8) return;
      const zc = zi % 3;
      if (d === -1 && zc === 0) return;
      if (d ===  1 && zc === 2) return;
      slide(ti);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [board, slide]);

  const getHint = () => {
    setSolving(true);
    setTimeout(() => {
      const path = astar(board, GOAL);
      setSolving(false);
      if (!path || path.length === 0) return;
      setHint(path);
      setOptimal(moves + path.length);
    }, 20);
  };

  const reset = () => {
    setBoard([...START]);
    setMoves(0);
    setWon(false);
    setHint(null);
    setOptimal(null);
  };

  const tileClass = (val, i) => {
    const base = "w-[90px] h-[90px] rounded-xl flex items-center justify-center text-3xl font-black select-none transition-transform duration-100";
    if (val === 0) return `${base} bg-slate-950 shadow-inner cursor-default`;
    if (won)       return `${base} cursor-pointer bg-gradient-to-br from-emerald-500 to-emerald-300 text-white shadow-[0_4px_20px_rgba(16,185,129,0.5)]`;
    if (movable(i)) return `${base} cursor-pointer bg-gradient-to-br from-violet-500 to-violet-300 text-white shadow-[0_4px_20px_rgba(139,92,246,0.6)] animate-pulse hover:scale-105 active:scale-95`;
    return `${base} cursor-pointer bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center font-sans text-slate-200">
      <div className="flex flex-col items-center gap-8 p-8">

        <h1 className="text-4xl font-black tracking-wide" style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          8-Puzzle
        </h1>

        <div className="flex gap-10 items-start">
          {/* Current board */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Current</span>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-800 rounded-2xl p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {board.map((val, i) => (
                <div key={i} className={tileClass(val, i)} onClick={() => slide(i)}>
                  {val !== 0 ? val : ""}
                </div>
              ))}
            </div>
          </div>

          {/* Goal board */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Goal</span>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-800 rounded-2xl p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {GOAL.map((val, i) => (
                <div key={i} className="w-[90px] h-[90px] rounded-xl flex items-center justify-center text-2xl font-black select-none bg-[#1e3a5f] text-blue-400 cursor-default">
                  {val !== 0 ? val : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[1.8rem] font-black text-violet-300">{moves}</span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">Moves</span>
          </div>
          {optimal !== null && (
            <>
              <div className="w-px h-10 bg-slate-700" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[1.8rem] font-black text-violet-300">{optimal}</span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">Optimal</span>
              </div>
            </>
          )}
        </div>

        {/* Hint banner */}
        {hint && hint.length > 0 && (
          <div className="bg-slate-800 border border-indigo-500 rounded-xl px-5 py-3 text-sm text-violet-300 text-center max-w-sm">
            {hint.length} step(s) left · Next: press <strong className="text-white">{moveLabel(hint[0].from, hint[0].to)}</strong> to move tile <strong className="text-white">{hint[0].tile}</strong> <span className="text-slate-400">(highlighted in purple)</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={getHint}
            disabled={won || solving}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:-translate-y-px active:translate-y-0 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {solving ? "Thinking…" : "💡 Hint (A*)"}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-700 hover:-translate-y-px active:translate-y-0 transition-transform"
          >
            ↺ Reset
          </button>
        </div>

        <p className="text-xs text-slate-600">Click tiles · or use W A S D / arrow keys</p>

        {/* Win overlay */}
        {won && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10 animate-in fade-in duration-300" onClick={reset}>
            <div className="bg-slate-800 rounded-3xl p-12 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)] flex flex-col gap-4 items-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-5xl font-black" style={{ background: "linear-gradient(135deg,#10b981,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Solved!
              </h2>
              <p className="text-slate-400">You completed the puzzle in</p>
              <span className="text-5xl font-black text-violet-300">{moves}</span>
              <p className="text-slate-400">move{moves !== 1 ? "s" : ""}{optimal !== null ? ` (optimal: ${optimal})` : ""}</p>
              <button onClick={reset} className="mt-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-700 hover:-translate-y-px transition-transform">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
