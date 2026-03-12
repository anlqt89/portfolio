import { useRef, useEffect } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LogarithmicScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(BarElement, CategoryScale, LogarithmicScale, LinearScale, Tooltip, Legend);

const METHODS = ["BFS", "UCS", "DFS", "DLS", "IDS", "Greedy", "A*"];
const COLORS  = ["#6366f1","#8b5cf6","#ef4444","#f59e0b","#10b981","#ec4899","#06b6d4"];

const DATA = {
  popped:    [2333,   6120,   155479, 86154, 86152, 48,   1407],
  expanded:  [2332,   6119,   155478, 29621, 29619, 47,   1406],
  generated: [6227,   16611,  411758, 86173, 86166, 131,  3813],
  fringe:    [1284,   3420,   42912,  36,    31,    25,   16  ],
  depth:     [12,     12,     31072,  14,    12,    26,   12  ],
  cost:      [63,     63,     140275, 77,    63,    149,  63  ],
};

const TABLE = [
  { name: "BFS",    popped: "2,333",   expanded: "2,332",   generated: "6,227",   fringe: "1,284", depth: "12",     cost: "63",      optimal: true  },
  { name: "UCS",    popped: "6,120",   expanded: "6,119",   generated: "16,611",  fringe: "3,420", depth: "12",     cost: "63",      optimal: true  },
  { name: "DFS",    popped: "155,479", expanded: "155,478", generated: "411,758", fringe: "42,912",depth: "31,072", cost: "140,275", optimal: false },
  { name: "DLS",    popped: "86,154",  expanded: "29,621",  generated: "86,173",  fringe: "36",    depth: "14",     cost: "77",      optimal: false },
  { name: "IDS",    popped: "86,152",  expanded: "29,619",  generated: "86,166",  fringe: "31",    depth: "12",     cost: "63",      optimal: true  },
  { name: "Greedy", popped: "48",      expanded: "47",      generated: "131",     fringe: "25",    depth: "26",     cost: "149",     optimal: false },
  { name: "A*",     popped: "1,407",   expanded: "1,406",   generated: "3,813",   fringe: "16",    depth: "12",     cost: "63",      optimal: true  },
];

const BEST  = { popped: "48", expanded: "47", generated: "131", fringe: "16", depth: "12", cost: "63" };
const WORST = { popped: "155,479", expanded: "155,478", generated: "411,758", fringe: "42,912", depth: "31,072", cost: "140,275" };

const baseOpts = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "#94a3b8", font: { size: 11 } } },
    tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}` } },
  },
  scales: {
    x: { ticks: { color: "#64748b" }, grid: { color: "#1e293b" } },
    y: { type: "logarithmic", ticks: { color: "#64748b", callback: (v) => v.toLocaleString() }, grid: { color: "#334155" } },
  },
};

const chartCard = "bg-[#1e293b] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]";
const cardTitle = "text-[0.8rem] font-bold uppercase tracking-widest text-slate-400 mb-4";

export default function PerformanceChart() {
  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-200 p-8 font-sans">
      <h1
        className="text-center text-2xl font-black mb-1"
        style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        8-Puzzle Search Algorithm Performance Comparison
      </h1>
      <p className="text-center text-slate-500 text-sm mb-10">
        Start: [2,3,6 / 1,0,7 / 4,8,5] → Goal: [1,2,3 / 4,5,6 / 7,8,0]
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-6xl mx-auto">

        {/* Chart 1: Nodes Popped & Expanded */}
        <div className={chartCard}>
          <h2 className={cardTitle}>Nodes Popped &amp; Expanded</h2>
          <Bar
            data={{
              labels: METHODS,
              datasets: [
                { label: "Nodes Popped",    data: DATA.popped,   backgroundColor: COLORS.map((c) => c + "cc"), borderColor: COLORS, borderWidth: 2, borderRadius: 6 },
                { label: "Nodes Expanded",  data: DATA.expanded, backgroundColor: COLORS.map((c) => c + "55"), borderColor: COLORS, borderWidth: 2, borderRadius: 6 },
              ],
            }}
            options={baseOpts}
          />
        </div>

        {/* Chart 2: Nodes Generated */}
        <div className={chartCard}>
          <h2 className={cardTitle}>Nodes Generated</h2>
          <Bar
            data={{
              labels: METHODS,
              datasets: [
                { label: "Nodes Generated", data: DATA.generated, backgroundColor: COLORS.map((c) => c + "bb"), borderColor: COLORS, borderWidth: 2, borderRadius: 6 },
              ],
            }}
            options={baseOpts}
          />
        </div>

        {/* Chart 3: Max Fringe */}
        <div className={chartCard}>
          <h2 className={cardTitle}>Max Fringe Size (Memory)</h2>
          <Bar
            data={{
              labels: METHODS,
              datasets: [
                { label: "Max Fringe Size", data: DATA.fringe, backgroundColor: COLORS.map((c) => c + "bb"), borderColor: COLORS, borderWidth: 2, borderRadius: 6 },
              ],
            }}
            options={baseOpts}
          />
        </div>

        {/* Chart 4: Cost & Depth */}
        <div className={chartCard}>
          <h2 className={cardTitle}>Solution Cost &amp; Depth</h2>
          <Bar
            data={{
              labels: METHODS,
              datasets: [
                { label: "Solution Cost",  data: DATA.cost,  backgroundColor: COLORS.map((c) => c + "cc"), borderColor: COLORS, borderWidth: 2, borderRadius: 6, yAxisID: "y"  },
                { label: "Solution Depth", data: DATA.depth, backgroundColor: COLORS.map((c) => c + "44"), borderColor: COLORS, borderWidth: 2, borderRadius: 6, yAxisID: "y1" },
              ],
            }}
            options={{
              ...baseOpts,
              scales: {
                x: baseOpts.scales.x,
                y:  { type: "logarithmic", position: "left",  ticks: { color: "#64748b", callback: (v) => v.toLocaleString() }, grid: { color: "#334155" }, title: { display: true, text: "Cost (log)",  color: "#64748b" } },
                y1: { type: "logarithmic", position: "right", ticks: { color: "#64748b", callback: (v) => v.toLocaleString() }, grid: { drawOnChartArea: false },              title: { display: true, text: "Depth (log)", color: "#64748b" } },
              },
            }}
          />
        </div>

        {/* Summary Table */}
        <div className={`${chartCard} lg:col-span-2 overflow-x-auto`}>
          <h2 className={cardTitle}>Full Results Summary</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Method","Nodes Popped","Nodes Expanded","Nodes Generated","Max Fringe","Depth","Cost","Optimal?"].map((h, i) => (
                  <th key={h} className={`text-[0.72rem] font-bold uppercase tracking-wider text-slate-400 py-2.5 px-3.5 border-b border-slate-700 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row) => (
                <tr key={row.name} className="hover:bg-[#243044] transition-colors">
                  <td className="py-2.5 px-3.5 text-left font-bold text-violet-300 border-b border-slate-800">{row.name}</td>
                  {(["popped","expanded","generated","fringe","depth","cost"] ).map((col) => (
                    <td key={col} className={`py-2.5 px-3.5 text-right border-b border-slate-800 ${row[col] === BEST[col] ? "text-emerald-400 font-black" : row[col] === WORST[col] ? "text-red-400" : ""}`}>
                      {row[col]}
                    </td>
                  ))}
                  <td className={`py-2.5 px-3.5 text-right border-b border-slate-800 font-bold ${row.optimal ? "text-emerald-400" : "text-red-400"}`}>
                    {row.optimal ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[0.7rem] text-slate-600 mt-3">
            * Green = best in column · Red = worst in column · DFS excluded from log-scale charts where noted to preserve readability
          </p>
        </div>

      </div>
    </div>
  );
}
