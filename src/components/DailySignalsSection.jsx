import React, { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

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
    tvLink: "https://www.tradingview.com/x/KkDg8uuf/",  // Link gaar ah signal 1
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
    tvLink: "https://www.tradingview.com/x/usTVll7w/",  // Link gaar ah signal 2 (tusaale)
  },
  {
    id: 3,
    pair: "XAU/USD",
    type: "Buy",
    entry: "3215.91",
    sl: "3210.22",
    tp: "3233.39",
    time: "15-Apr-2025 10:54 AM",
    // result: "active",
    result: "tp",
    tvLink: "https://www.tradingview.com/x/gk3nq3zY/",  // Link gaar ah signal 3 (tusaale)
  },
];

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

const DailySignalsSection = () => {
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="bg-gray-950 py-10 px-4 text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-yellow-400">📈 Daily Forex Signals</h3>
        <button
          onClick={() => setShowResults(!showResults)}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-semibold text-sm text-black"
        >
          {showResults ? "Disable Results" : "Enable Results"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="bg-gray-800 p-4 rounded-xl shadow-lg hover:ring-2 ring-yellow-400 transition-all cursor-pointer"
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
            <p className="text-sm text-gray-400 mt-2">{signal.time}</p>
          </div>
        ))}
      </div>

      {selectedSignal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedSignal(null)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h4 className="text-xl font-bold text-yellow-400 mb-4 text-center">{selectedSignal.pair} Signal</h4>
            <p><strong>Type:</strong> {selectedSignal.type}</p>
            <p><strong>Entry:</strong> {selectedSignal.entry}</p>
            <p><strong>Stop Loss:</strong> {selectedSignal.sl}</p>
            <p><strong>Take Profit:</strong> {selectedSignal.tp}</p>
            <p className="text-sm text-gray-400 mt-4 text-center">Posted on {selectedSignal.time}</p>

            {/* TradingView Link unique for each signal */}
            <div className="mt-4 flex justify-center">
              <a
                href={selectedSignal.tvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:underline text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 3h7v7m0 0L10 21l-7-7L21 3z"
                  />
                </svg>
                View on TradingView
              </a>
            </div>

            {showResults && (
              <div className="mt-4 text-center">
                {resultIcon(selectedSignal.result)}
                <span className="ml-2">
                  {selectedSignal.result === "tp"
                    ? "Take Profit Reached ✅"
                    : selectedSignal.result === "sl"
                    ? "Stop Loss Hit ❌"
                    : "Trade Still Running ⏳"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySignalsSection;
