import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, ChevronLeft, Flame, CheckCircle } from 'lucide-react';

const TOURNAMENTS = [
  {
    id: 1, name: 'Spring BGMI Open', game: 'BGMI', icon: '🔫', status: 'Registering',
    date: 'Apr 12, 2025', prize: '₹5,000', format: 'Squad (4v4)', totalSlots: 32, filledSlots: 24,
    organizer: 'Gaming Club', desc: 'Classic TPP mode. Top 8 squads advance to finals. All skill levels welcome.',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 2, name: 'Valorant Campus Cup', game: 'Valorant', icon: '⚔️', status: 'In Progress',
    date: 'Apr 8–20, 2025', prize: '₹3,000', format: 'Team (5v5)', totalSlots: 16, filledSlots: 16,
    organizer: 'ESports Cell', desc: 'Best of 3 rounds. Currently in Quarterfinals.',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 3, name: 'FIFA 25 Inter-Hostel', game: 'FIFA 25', icon: '⚽', status: 'Registering',
    date: 'Apr 26, 2025', prize: '₹2,000', format: '1v1', totalSlots: 64, filledSlots: 44,
    organizer: 'Hostel Council', desc: 'Single elimination. Must represent your hostel block.',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 4, name: 'Chess Blitz Championship', game: 'Chess', icon: '♟️', status: 'Registering',
    date: 'Apr 18, 2025', prize: '₹1,000', format: 'Individual', totalSlots: 64, filledSlots: 36,
    organizer: 'Chess Club', desc: '5+2 blitz format. FIDE-rated event. Open to all.',
    color: 'from-gray-600 to-slate-700'
  },
  {
    id: 5, name: 'COD Mobile Showdown', game: 'COD Mobile', icon: '🎯', status: 'Upcoming',
    date: 'May 3, 2025', prize: '₹4,000', format: 'Squad (5v5)', totalSlots: 20, filledSlots: 0,
    organizer: 'Gaming Club', desc: 'Multiplayer mode. Registration opens Apr 25.',
    color: 'from-blue-500 to-indigo-600'
  }
];

export default function Tournaments() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState({});

  const handleRegister = (id) => {
    setRegistered(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/gaming')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Gaming Hub
          </button>
          <h1 className="text-2xl font-black mb-1 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" /> Tournaments
          </h1>
          <p className="text-gray-400 text-sm">Register, compete, win prizes & glory</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {TOURNAMENTS.map(t => {
          const progress = (t.filledSlots / t.totalSlots) * 100;
          const isRegistered = registered[t.id];
          const canRegister = t.status === 'Registering' && t.filledSlots < t.totalSlots;

          return (
            <div key={t.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors">
              <div className={`bg-gradient-to-r ${t.color} p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{t.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold">{t.name}</h2>
                      <p className="text-white/70 text-sm">Organized by {t.organizer}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    t.status === 'In Progress' ? 'bg-red-600 text-white' :
                    t.status === 'Registering' ? 'bg-white/20 text-white' :
                    'bg-white/10 text-white/70'
                  }`}>
                    {t.status === 'In Progress' && <Flame className="w-3 h-3 inline mr-1" />}
                    {t.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-400 text-sm mb-4">{t.desc}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                  <div className="text-center bg-gray-700/50 rounded-lg p-2">
                    <div className="text-yellow-400 font-bold">{t.prize}</div>
                    <div className="text-xs text-gray-400">Prize Pool</div>
                  </div>
                  <div className="text-center bg-gray-700/50 rounded-lg p-2">
                    <div className="font-bold">{t.format}</div>
                    <div className="text-xs text-gray-400">Format</div>
                  </div>
                  <div className="text-center bg-gray-700/50 rounded-lg p-2">
                    <div className="font-bold flex items-center justify-center gap-1"><Calendar className="w-3.5 h-3.5" />{t.date.split(',')[0]}</div>
                    <div className="text-xs text-gray-400">Date</div>
                  </div>
                  <div className="text-center bg-gray-700/50 rounded-lg p-2">
                    <div className="font-bold flex items-center justify-center gap-1"><Users className="w-3.5 h-3.5" />{t.filledSlots}/{t.totalSlots}</div>
                    <div className="text-xs text-gray-400">Teams</div>
                  </div>
                </div>

                {/* Slot progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{t.totalSlots - t.filledSlots} slots remaining</span>
                    <span>{Math.round(progress)}% full</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${t.color} transition-all`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {isRegistered ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle className="w-5 h-5" /> Registered! Check back for updates.
                  </div>
                ) : (
                  <button
                    onClick={() => canRegister && handleRegister(t.id)}
                    disabled={!canRegister}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                      canRegister
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {t.status === 'In Progress' ? 'Tournament in Progress' :
                     t.status === 'Upcoming' ? 'Registration Not Open Yet' :
                     t.filledSlots >= t.totalSlots ? 'Slots Full' : 'Register Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
