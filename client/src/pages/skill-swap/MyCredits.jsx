import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, TrendingDown, Award, ChevronLeft, RefreshCw } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, type: 'earned', desc: 'Taught Python to Priya S.', hours: 1.5, date: 'Apr 2', partner: 'PS' },
  { id: 2, type: 'spent', desc: 'Guitar lesson from Karan L.', hours: 1.0, date: 'Apr 1', partner: 'KL' },
  { id: 3, type: 'earned', desc: 'Helped Neha R. with DSA', hours: 1.0, date: 'Mar 28', partner: 'NR' },
  { id: 4, type: 'earned', desc: 'Web dev basics to Dev P.', hours: 1.0, date: 'Mar 25', partner: 'DP' },
  { id: 5, type: 'spent', desc: 'French lesson from Amit T.', hours: 1.0, date: 'Mar 22', partner: 'AT' },
  { id: 6, type: 'earned', desc: 'Taught Python to Rohit', hours: 2.0, date: 'Mar 18', partner: 'RS' },
];

const PENDING_SWAPS = [
  { id: 1, partner: 'Meera J.', you: 'Python basics', they: 'Physics tutoring', status: 'Awaiting response' },
  { id: 2, partner: 'Sara K.', you: 'Web dev help', they: 'Yoga sessions', status: 'Confirmed – Apr 7' }
];

export default function MyCredits() {
  const navigate = useNavigate();
  const totalEarned = TRANSACTIONS.filter(t => t.type === 'earned').reduce((s, t) => s + t.hours, 0);
  const totalSpent = TRANSACTIONS.filter(t => t.type === 'spent').reduce((s, t) => s + t.hours, 0);
  const balance = totalEarned - totalSpent;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/skill-swap')} className="flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Skill Swap
          </button>
          <h1 className="text-2xl font-bold mb-1">Time Credit Wallet</h1>
          <p className="text-amber-100 text-sm">1 hour taught = 1 credit earned</p>

          {/* Balance */}
          <div className="mt-6 bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-amber-200" />
            <div className="text-5xl font-black mb-1">{balance.toFixed(1)}</div>
            <div className="text-amber-200 font-medium">Credits Available (hrs)</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-300" />
              <div className="text-xl font-bold">{totalEarned.toFixed(1)} hrs</div>
              <div className="text-xs text-amber-200">Total Taught</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
              <TrendingDown className="w-5 h-5 mx-auto mb-1 text-red-300" />
              <div className="text-xl font-bold">{totalSpent.toFixed(1)} hrs</div>
              <div className="text-xs text-amber-200">Total Learned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Pending Swaps */}
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-orange-500" /> Pending Swaps
          </h2>
          <div className="space-y-3">
            {PENDING_SWAPS.map(swap => (
              <div key={swap.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{swap.partner}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    swap.status.includes('Confirmed') ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>{swap.status}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>You teach: <strong className="text-gray-700 dark:text-gray-300">{swap.you}</strong></span>
                  <span>They teach: <strong className="text-gray-700 dark:text-gray-300">{swap.they}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Transaction History
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  tx.type === 'earned' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tx.partner}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <div className={`font-bold text-sm ${tx.type === 'earned' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'earned' ? '+' : '−'}{tx.hours} hr
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> How Time Credits Work
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Teach any skill for 1 hour → earn 1 credit</li>
            <li>• Spend 1 credit to learn any skill for 1 hour</li>
            <li>• Credits never expire and are campus-wide</li>
            <li>• Both parties must confirm the session for credits to transfer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
