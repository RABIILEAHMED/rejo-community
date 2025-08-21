import React, { useMemo, useState } from "react";
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, Target, BarChart2, CalendarDays, DollarSign, Percent, TimerReset, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

/**
 * Full updated component:
 * - Adds filters: Date Range, Session, Asset (Pair)
 * - Adds charts: PnL Over Time (line), Win/Loss by Session (bar)
 * - Keeps your modern stats cards + signals grid + modal
 */

const signals = [
  {
    id: 1,
    pair: "EUR/USD",
    type: "Sell",
    entry: "1.11996",
    sl: "1.12069",
    tp: "1.11526",
    time: "16-May-2025 02:30 PM",
    result: "tp",
    tvLink: "https://www.tradingview.com/x/KkDg8uuf/",
    riskUSD: 100,
    lotSize: 0.5,
  },
  {
    id: 2,
    pair: "GBP/USD",
    type: "Buy",
    entry: "1.32006",
    sl: "1.31894",
    tp: "1.32578",
    time: "12-May-2025 05:15 PM",
    result: "sl",
    tvLink: "https://www.tradingview.com/x/usTVll7w/",
    riskUSD: 100,
    lotSize: 0.5,
  },
  {
    id: 3,
    pair: "XAU/USD",
    type: "Buy",
    entry: "3215.91",
    sl: "3210.22",
    tp: "3233.39",
    time: "15-Apr-2025 10:54 AM",
    result: "tp",
    tvLink: "https://www.tradingview.com/x/gk3nq3zY/",
    riskUSD: 150,
    lotSize: 0.2,
  },
  {
    id: 4,
    pair: "EUR/JPY",
    type: "Buy",
    entry: "169.420",
    sl: "168.950",
    tp: "170.600",
    time: "21-Aug-2025 09:15 AM",
    result: "active",
    tvLink: "https://www.tradingview.com/x/abcd1234/",
    riskUSD: 80,
    lotSize: 0.3,
  },
];

const monthMap = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseSignalTime(str) {
  try {
    const [datePart, timePart, ampm] = str.split(" ");
    const [d, mon, y] = datePart.split("-");
    let [hh, mm] = timePart.split(":").map(Number);
    let hour = hh % 12 + (ampm?.toUpperCase() === "PM" ? 12 : 0);
    const dt = new Date(Number(y), monthMap[mon], Number(d), hour, Number(mm), 0);
    return dt;
  } catch (e) {
    return new Date(str);
  }
}

function formatDateKey(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isToday(date) {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

function isThisWeek(date) {
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // Monday=0
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return date >= monday && date <= sunday;
}

function assignSession(dt) {
  // Rough ranges (local time): Asia 0-8, London 8-16, New York 13-21
  const h = dt.getHours();
  if (h >= 0 && h < 8) return "Asia";
  if (h >= 8 && h < 13) return "London";
  if (h >= 13 && h < 21) return "New York";
  return "After-hours";
}

function calcTradeMetrics(sig) {
  const entry = Number(sig.entry);
  const sl = Number(sig.sl);
  const tp = Number(sig.tp);
  const risk = Number(sig.riskUSD || 0);
  const slDist = Math.abs(entry - sl);
  const tpDist = Math.abs(entry - tp);
  const R = slDist > 0 ? tpDist / slDist : 0;
  let pnl = 0;
  if (sig.result === "tp") pnl = risk * R;
  else if (sig.result === "sl") pnl = -risk;
  return { slDist, tpDist, R, pnl, points: sig.result === "tp" ? tpDist : slDist };
}

const resultIcon = (result) => {
  switch (result) {
    case "tp":
      return <CheckCircle className="text-green-400 w-5 h-5 inline-block mr-1" title="Hit TP" />;
    case "sl":
      return <XCircle className="text-red-400 w-5 h-5 inline-block mr-1" title="Hit SL" />;
    default:
      return <Clock className="text-yellow-300 w-5 h-5 inline-block mr-1" title="Still Active" />;
  }
};

function StatCard({ title, value, sub, icon }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-700/60">{icon}</div>
        <div>
          <div className="text-sm text-gray-400">{title}</div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function formatUSD(n) {
  const v = Number(n || 0);
  return (v < 0 ? "-" : "") + "$" + Math.abs(v).toFixed(2);
}

export default function DailySignalsWithStatsAndFilters() {
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [showResults, setShowResults] = useState(true);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [session, setSession] = useState("All");
  const [asset, setAsset] = useState("All");

  // Decorate signals
  const decorated = useMemo(() => {
    return signals
      .map((s) => {
        const t = parseSignalTime(s.time);
        const m = calcTradeMetrics(s);
        const sess = assignSession(t);
        return { ...s, _date: t, _dateKey: formatDateKey(t), session: sess, ...m };
      })
      .sort((a, b) => b._date - a._date);
  }, []);

  // Dropdown options
  const assets = useMemo(() => ["All", ...Array.from(new Set(decorated.map((d) => d.pair)))], [decorated]);
  const sessions = ["All", "Asia", "London", "New York", "After-hours"];

  // Apply filters
  const filtered = useMemo(() => {
    return decorated.filter((d) => {
      const inDate = (() => {
        if (!startDate && !endDate) return true;
        const key = d._dateKey;
        if (startDate && !endDate) return key >= startDate;
        if (!startDate && endDate) return key <= endDate;
        return key >= startDate && key <= endDate;
      })();
      const inSession = session === "All" ? true : d.session === session;
      const inAsset = asset === "All" ? true : d.pair === asset;
      return inDate && inSession && inAsset;
    });
  }, [decorated, startDate, endDate, session, asset]);

  // Core aggregates (based on filtered)
  const today = filtered.filter((s) => isToday(s._date));
  const thisWeek = filtered.filter((s) => isThisWeek(s._date));
  const closed = filtered.filter((s) => s.result === "tp" || s.result === "sl");
  const wins = closed.filter((s) => s.result === "tp");
  const losses = closed.filter((s) => s.result === "sl");

  const totalPnL = closed.reduce((a, c) => a + c.pnl, 0);
  const totalRisk = filtered.reduce((a, c) => a + Number(c.riskUSD || 0), 0);
  const avgR = wins.length + losses.length > 0 ? wins.reduce((a, c) => a + c.R, 0) / (wins.length || 1) : 0;
  const winRate = closed.length ? (wins.length / closed.length) * 100 : 0;

  const best = closed.length ? closed.reduce((a, c) => (c.pnl > a.pnl ? c : a), closed[0]) : null;
  const worst = closed.length ? closed.reduce((a, c) => (c.pnl < a.pnl ? c : a), closed[0]) : null;

  const todayPnL = today.reduce((a, c) => a + (c.pnl || 0), 0);
  const weekPnL = thisWeek.reduce((a, c) => a + (c.pnl || 0), 0);

  // Chart data
  const pnlByDate = useMemo(() => {
    const map = new Map();
    filtered.forEach((d) => {
      if (!map.has(d._dateKey)) map.set(d._dateKey, 0);
      if (d.result === "tp" || d.result === "sl") {
        map.set(d._dateKey, map.get(d._dateKey) + d.pnl);
      }
    });
    return Array.from(map.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, pnl]) => ({ date, pnl }));
  }, [filtered]);

  const sessionWL = useMemo(() => {
    const buckets = { Asia: { session: "Asia", wins: 0, losses: 0 }, London: { session: "London", wins: 0, losses: 0 }, "New York": { session: "New York", wins: 0, losses: 0 }, "After-hours": { session: "After-hours", wins: 0, losses: 0 } };
    filtered.forEach((d) => {
      if (d.result === "tp") buckets[d.session].wins += 1;
      else if (d.result === "sl") buckets[d.session].losses += 1;
    });
    return Object.values(buckets);
  }, [filtered]);

  return (
    <div className="bg-gray-950 py-10 px-4 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-yellow-400">📈 Daily Forex Signals & Performance</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowResults(!showResults)}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-semibold text-sm text-black"
          >
            {showResults ? "Disable Results" : "Enable Results"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-yellow-400" />
          <h4 className="text-lg font-semibold">Filters</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="text-xs text-gray-400">Start Date</label>
            <input type="date" className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-400">End Date</label>
            <input type="date" className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-400">Session</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2" value={session} onChange={(e) => setSession(e.target.value)}>
              {sessions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400">Asset (Pair)</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2" value={asset} onChange={(e) => setAsset(e.target.value)}>
              {assets.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={() => { setStartDate(""); setEndDate(""); setSession("All"); setAsset("All"); }} className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md font-semibold text-sm">Reset</button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Trades Today" value={today.length} sub={formatUSD(todayPnL) + " PnL"} icon={<CalendarDays className="w-5 h-5" />} />
        <StatCard title="Trades This Week" value={thisWeek.length} sub={formatUSD(weekPnL) + " PnL"} icon={<BarChart2 className="w-5 h-5" />} />
        <StatCard title="Win Rate" value={`${winRate.toFixed(0)}%`} sub={`${wins.length}W / ${losses.length}L`} icon={<Percent className="w-5 h-5" />} />
        <StatCard title="Net PnL" value={formatUSD(totalPnL)} sub={`Total Risked ${formatUSD(totalRisk)}`} icon={totalPnL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Best / Worst */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-semibold">Performance Highlights</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Best Trade</div>
              {best ? (
                <div>
                  <div className="text-white font-medium">{best.pair} · {best.type}</div>
                  <div className="text-green-400 text-xl font-semibold">{formatUSD(best.pnl)}</div>
                  <div className="text-xs text-gray-400 mt-1">R: {best.R.toFixed(2)} · Points: {best.tpDist.toFixed(5)}</div>
                </div>
              ) : <div className="text-gray-400">No closed trades yet.</div>}
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Worst Trade</div>
              {worst ? (
                <div>
                  <div className="text-white font-medium">{worst.pair} · {worst.type}</div>
                  <div className="text-red-400 text-xl font-semibold">{formatUSD(worst.pnl)}</div>
                  <div className="text-xs text-gray-400 mt-1">R: {worst.R.toFixed(2)} · Points: {worst.slDist.toFixed(5)}</div>
                </div>
              ) : <div className="text-gray-400">No closed trades yet.</div>}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">Average R</div>
              <div className="text-white text-xl font-semibold">{avgR.toFixed(2)}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">Average PnL (Closed)</div>
              <div className="text-white text-xl font-semibold">{formatUSD(closed.length ? totalPnL / closed.length : 0)}</div>
            </div>
          </div>
        </div>

        {/* Quick Money Summary */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-semibold">Lacagta & Xisaabinta</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">Total Risked</div>
              <div className="text-white text-xl font-semibold">{formatUSD(totalRisk)}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">PnL (TP Only)</div>
              <div className="text-white text-xl font-semibold">{formatUSD(wins.reduce((a,c)=>a+c.pnl,0))}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">Losses (SL Only)</div>
              <div className="text-white text-xl font-semibold">{formatUSD(losses.reduce((a,c)=>a+c.pnl,0))}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="text-sm text-gray-400">Active Trades</div>
              <div className="text-white text-xl font-semibold">{filtered.filter(s=>s.result==="active").length}</div>
            </div>
          </div>
        </div>

        {/* Notes / Policy */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <TimerReset className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-semibold">Xog & Qaanuun</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Active trades ma saameeyaan win rate ilaa ay xirmaan.</li>
            <li>"Points" = farqiga qiimaha (pip-size symbols way kala duwanaan karaan).</li>
            <li>Haddii <span className="text-yellow-300">riskUSD</span> aan la bixin, PnL waxaa loo qaadanayaa 0.</li>
          </ul>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h4 className="text-lg font-semibold mb-3">📈 PnL Over Time</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pnlByDate} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pnl" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h4 className="text-lg font-semibold mb-3">⚔️ Win/Loss by Session</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionWL} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wins" fill="#16a34a" />
                <Bar dataKey="losses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((signal) => (
          <div
            key={signal.id}
            className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:ring-2 ring-yellow-400 transition-all cursor-pointer"
            onClick={() => setSelectedSignal(signal)}
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-lg font-semibold text-yellow-300">{signal.pair}</h4>
              {showResults && resultIcon(signal.result)}
            </div>
            <p><strong>Type:</strong> {signal.type}</p>
            <p><strong>Entry:</strong> {signal.entry}</p>
            <p><strong>Stop Loss:</strong> {signal.sl}</p>
            <p><strong>Take Profit:</strong> {signal.tp}</p>
            <p className="text-sm text-gray-400 mt-2">{signal.time} • <span className="text-gray-300">{signal.session}</span></p>
            {showResults && (
              <div className="mt-3 text-xs text-gray-300">
                <div>R: {signal.R.toFixed(2)} · Risk: {formatUSD(signal.riskUSD || 0)}</div>
                {signal.result !== "active" && (
                  <div className={signal.pnl >= 0 ? "text-green-400" : "text-red-400"}>PnL: {formatUSD(signal.pnl)}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-xl relative border border-gray-800">
            <button
              onClick={() => setSelectedSignal(null)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h4 className="text-xl font-bold text-yellow-400 mb-4 text-center">{selectedSignal.pair} Signal</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><strong>Type:</strong> {selectedSignal.type}</p>
              <p><strong>Time:</strong> {selectedSignal.time}</p>
              <p><strong>Session:</strong> {selectedSignal.session}</p>
              <p><strong>Entry:</strong> {selectedSignal.entry}</p>
              <p><strong>Stop Loss:</strong> {selectedSignal.sl}</p>
              <p><strong>Take Profit:</strong> {selectedSignal.tp}</p>
              <p><strong>Risk:</strong> {formatUSD(selectedSignal.riskUSD || 0)}</p>
              <p><strong>R Multiple:</strong> {selectedSignal.R.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedSignal.result.toUpperCase()}</p>
            </div>

            <div className="mt-4 flex justify-center">
              <a href={selectedSignal.tvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:underline text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7L21 3z" />
                </svg>
                View on TradingView
              </a>
            </div>

            {showResults && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400">PnL</div>
                  <div className={selectedSignal.pnl >= 0 ? "text-green-400 text-lg font-semibold" : "text-red-400 text-lg font-semibold"}>{formatUSD(selectedSignal.pnl)}</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400">R Multiple</div>
                  <div className="text-white text-lg font-semibold">{selectedSignal.R.toFixed(2)}</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400">Points</div>
                  <div className="text-white text-lg font-semibold">{selectedSignal.result === "tp" ? selectedSignal.tpDist.toFixed(5) : selectedSignal.slDist.toFixed(5)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
