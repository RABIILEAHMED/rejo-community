import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const signals = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'Buy',
    entry: '1.0800',
    sl: '1.0750',
    tp: '1.0900',
    time: '12-Apr-2025 10:30 AM',
    result: 'tp', // tp | sl | active
  },
  {
    id: 2,
    pair: 'GBP/USD',
    type: 'Sell',
    entry: '1.2600',
    sl: '1.2650',
    tp: '1.2500',
    time: '12-Apr-2025 08:00 AM',
    result: 'sl',
  },
  {
    id: 3,
    pair: 'XAU/USD',
    type: 'Buy',
    entry: '2310.00',
    sl: '2295.00',
    tp: '2340.00',
    time: '12-Apr-2025 09:15 AM',
    result: 'active',
  },
];

const resultIcon = (result) => {
  switch (result) {
    case 'tp':
      return <CheckCircle className="text-green-400 w-5 h-5 inline-block mr-1" title="Hit TP" />;
    case 'sl':
      return <XCircle className="text-red-400 w-5 h-5 inline-block mr-1" title="Hit SL" />;
    default:
      return <Clock className="text-yellow-300 w-5 h-5 inline-block mr-1" title="Still Active" />;
  }
};

const DailySignalsSection = () => {
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [showResults, setShowResults] = useState(true); // toggle state

  return (
    <div className="bg-gray-950 py-10 px-4 text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-yellow-400">📈 Daily Forex Signals</h3>
        <button
          onClick={() => setShowResults(!showResults)}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-semibold text-sm text-black"
        >
          {showResults ? 'Disable Results' : 'Enable Results'}
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

      {/* Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedSignal(null)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 text-sm"
            >
              ✕
            </button>
            <h4 className="text-xl font-bold text-yellow-400 mb-4 text-center">{selectedSignal.pair} Signal</h4>
            <p><strong>Type:</strong> {selectedSignal.type}</p>
            <p><strong>Entry:</strong> {selectedSignal.entry}</p>
            <p><strong>Stop Loss:</strong> {selectedSignal.sl}</p>
            <p><strong>Take Profit:</strong> {selectedSignal.tp}</p>
            <p className="text-sm text-gray-400 mt-4 text-center">Posted on {selectedSignal.time}</p>
            {showResults && (
              <div className="mt-4 text-center">
                {resultIcon(selectedSignal.result)}
                <span className="ml-2">
                  {selectedSignal.result === 'tp'
                    ? 'Take Profit Reached ✅'
                    : selectedSignal.result === 'sl'
                    ? 'Stop Loss Hit ❌'
                    : 'Trade Still Running ⏳'}
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
