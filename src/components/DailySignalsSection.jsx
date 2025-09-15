import React, { useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart2,
  CalendarDays,
  DollarSign,
  Percent,
  TimerReset,
  Filter,
  Wallet,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// ======= Signals Data =======
const signals = [
  {
    id: 1,
    pair: "XAU/USD",
    type: "Sell",
    entry: "3376.91",
    sl: "3380.49",
    tp: "	3376.46",
    time: "26-Aug-2025 12:00 PM",
    result: "tp",
    tvLink: "https://www.tradingview.com/x/KkDg8uuf/",
    riskUSD: 100,
    lotSize: 0.28,
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

// ===== Helpers =====
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
    return new Date(Number(y), monthMap[mon], Number(d), hour, Number(mm), 0);
  } catch {
    return new Date(str);
  }
}

function formatDateKey(dt) {
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
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
      return <CheckCircle className="text-green-400 w-5 h-5 inline-block mr-1" />;
    case "sl":
      return <XCircle className="text-red-400 w-5 h-5 inline-block mr-1" />;
    default:
      return <Clock className="text-yellow-300 w-5 h-5 inline-block mr-1" />;
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

// ===== Main Component =====
export default function DailySignalsWithStatsAndFilters() {
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [showResults, setShowResults] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [session, setSession] = useState("All");
  const [asset, setAsset] = useState("All");

  const initialBalance = 9745.71;

  // Decorate signals
  const decorated = useMemo(() => {
    return signals
      .map((s) => {
        const t = parseSignalTime(s.time);
        const m = calcTradeMetrics(s);
        const sess = assignSession(t);
        return { ...s, _date: t, _dateKey: formatDateKey(t), session: sess, ...m };
      })
      .sort((a, b) => a._date - b._date);
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

  // Core aggregates
  const today = filtered.filter((s) => isToday(s._date));
  const thisWeek = filtered.filter((s) => isThisWeek(s._date));
  const closed = filtered.filter((s) => s.result === "tp" || s.result === "sl");
  const wins = closed.filter((s) => s.result === "tp");
  const losses = closed.filter((s) => s.result === "sl");

  const totalPnL = closed.reduce((a, c) => a + c.pnl, 0);
  const totalRisk = filtered.reduce((a, c) => a + Number(c.riskUSD || 0), 0);
  const winRate = closed.length ? (wins.length / closed.length) * 100 : 0;

  // Account balance over time
  const balanceTimeline = useMemo(() => {
    let balance = initialBalance;
    const arr = [];
    decorated.forEach((d) => {
      if (d.result === "tp" || d.result === "sl") {
        balance += d.pnl;
        arr.push({ date: d._dateKey, balance });
      }
    });
    return arr;
  }, [decorated]);

  const currentBalance =
    balanceTimeline.length > 0 ? balanceTimeline[balanceTimeline.length - 1].balance : initialBalance;

  // Session WL
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

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Trades Today" value={today.length} sub={`PnL ${formatUSD(today.reduce((a,c)=>a+(c.pnl||0),0))}`} icon={<CalendarDays className="w-5 h-5" />} />
        <StatCard title="Trades This Week" value={thisWeek.length} sub={`PnL ${formatUSD(thisWeek.reduce((a,c)=>a+(c.pnl||0),0))}`} icon={<BarChart2 className="w-5 h-5" />} />
        <StatCard title="Win Rate" value={`${winRate.toFixed(0)}%`} sub={`${wins.length}W / ${losses.length}L`} icon={<Percent className="w-5 h-5" />} />
        <StatCard title="Net PnL" value={formatUSD(totalPnL)} sub={`Risked ${formatUSD(totalRisk)}`} icon={totalPnL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />} />
        <StatCard title="Account Balance" value={formatUSD(currentBalance)} sub={`Start ${formatUSD(initialBalance)}`} icon={<Wallet className="w-5 h-5" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h4 className="text-lg font-semibold mb-3">📈 Balance Over Time</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h4 className="text-lg font-semibold mb-3">⚔️ Win/Loss by Session</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionWL}>
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
              <p><strong>Status:</strong> {selectedSignal.result.toUpperCase()}</p>
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
