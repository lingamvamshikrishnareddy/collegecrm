import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ChevronLeft, Zap, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const GAMES = ['All Games', 'BGMI', 'Valorant', 'FIFA 25', 'Chess', 'COD Mobile'];

const PLAYERS = [
  { rank: 1, prev: 1, name: 'Rohit "Clutch" Singh', game: 'BGMI', wins: 47, kd: '4.2', points: 2840, avatar: 'RS', hostel: 'Block A', badge: '👑' },
  { rank: 2, prev: 3, name: 'Dev "Sharp" Patel', game: 'Valorant', wins: 38, kd: '3.8', points: 2710, avatar: 'DP', hostel: 'Block B', badge: '🥈' },
  { rank: 3, prev: 2, name: 'Karan "King" Mehta', game: 'FIFA 25', wins: 52, kd: '—', points: 2600, avatar: 'KM', hostel: 'Block D', badge: '🥉' },
  { rank: 4, prev: 4, name: 'Ankit "Ace" Sharma', game: 'BGMI', wins: 41, kd: '3.5', points: 2540, avatar: 'AS', hostel: 'Block A', badge: null },
  { rank: 5, prev: 6, name: 'Priya "Pro" Verma', game: 'Chess', wins: 35, kd: '—', points: 2490, avatar: 'PV', hostel: 'Block C', badge: null },
  { rank: 6, prev: 5, name: 'Arjun "Flash" Tiwari', game: 'Valorant', wins: 29, kd: '3.1', points: 2380, avatar: 'AT', hostel: 'Block A', badge: null },
  { rank: 7, prev: 8, name: 'Neha "Ninja" Rajput', game: 'BGMI', wins: 33, kd: '2.9', points: 2310, avatar: 'NR', hostel: 'Block E', badge: null },
  { rank: 8, prev: 7, name: 'Siddharth "Sid" Nair', game: 'COD Mobile', wins: 28, kd: '3.3', points: 2260, avatar: 'SN', hostel: 'Block B', badge: null },
  { rank: 9, prev: 10, name: 'Meera "M" Joshi', game: 'Chess', wins: 22, kd: '—', points: 2180, avatar: 'MJ', hostel: 'Block F', badge: null },
  { rank: 10, prev: 9, name: 'Virat "V-God" Kumar', game: 'FIFA 25', wins: 30, kd: '—', points: 2100, avatar: 'VK', hostel: 'Block D', badge: null }
];

const GAME_COLORS = {
  'BGMI': 'text-orange-400', 'Valorant': 'text-red-400',
  'FIFA 25': 'text-green-400', 'Chess': 'text-gray-400', 'COD Mobile': 'text-blue-400'
};

function Trend({ current, prev }) {
  const diff = prev - current;
  if (diff > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
  if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
}

export default function GamingLeaderboard() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState('All Games');

  const filtered = PLAYERS.filter(p => activeGame === 'All Games' || p.game === activeGame);
  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 px-6 pt-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate('/gaming')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Gaming Hub
          </button>
          <h1 className="text-2xl font-black mb-1 flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-400" /> Campus Leaderboard
          </h1>
          <p className="text-gray-400 text-sm mb-6">Updated after every tournament & ranked match</p>

          {/* Game filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {GAMES.map(game => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeGame === game ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Podium top 3 */}
        {top3.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-10">
            {/* 2nd */}
            <div className="text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-sm font-bold mx-auto mb-2 border-4 border-gray-500">
                {top3[1].avatar}
              </div>
              <p className="text-xs font-bold truncate">{top3[1].name.split(' ')[0]}</p>
              <p className={`text-xs ${GAME_COLORS[top3[1].game]}`}>{top3[1].game}</p>
              <div className="mt-2 bg-gray-600 h-20 rounded-t-lg flex items-center justify-center">
                <span className="text-3xl">🥈</span>
              </div>
            </div>
            {/* 1st */}
            <div className="text-center flex-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-sm font-bold mx-auto mb-2 border-4 border-yellow-400">
                {top3[0].avatar}
              </div>
              <p className="text-xs font-bold truncate">{top3[0].name.split(' ')[0]}</p>
              <p className={`text-xs ${GAME_COLORS[top3[0].game]}`}>{top3[0].game}</p>
              <div className="mt-2 bg-yellow-600/40 border border-yellow-500/30 h-28 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">👑</span>
              </div>
            </div>
            {/* 3rd */}
            <div className="text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-sm font-bold mx-auto mb-2 border-4 border-amber-600">
                {top3[2].avatar}
              </div>
              <p className="text-xs font-bold truncate">{top3[2].name.split(' ')[0]}</p>
              <p className={`text-xs ${GAME_COLORS[top3[2].game]}`}>{top3[2].game}</p>
              <div className="mt-2 bg-amber-800/40 h-14 rounded-t-lg flex items-center justify-center">
                <span className="text-3xl">🥉</span>
              </div>
            </div>
          </div>
        )}

        {/* Full table */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-12 text-xs text-gray-500 uppercase tracking-wider px-4 py-3 border-b border-gray-700 bg-gray-900">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">W</div>
            <div className="col-span-2 text-center">K/D</div>
            <div className="col-span-2 text-right">Pts</div>
          </div>

          {filtered.map((player, i) => (
            <div key={player.rank} className={`grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-750 transition-colors ${i !== filtered.length - 1 ? 'border-b border-gray-700/50' : ''}`}>
              <div className="col-span-1 font-black text-sm flex items-center gap-1">
                <Trend current={player.rank} prev={player.prev} />
                <span className={player.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}>{player.rank}</span>
              </div>
              <div className="col-span-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                    {player.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold truncate">{player.name}</p>
                    <p className={`text-xs ${GAME_COLORS[player.game]}`}>{player.game}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-center text-sm font-medium">{player.wins}</div>
              <div className="col-span-2 text-center text-sm text-gray-400">{player.kd}</div>
              <div className="col-span-2 text-right font-bold text-purple-400 flex items-center justify-end gap-1 text-sm">
                <Zap className="w-3.5 h-3.5" />{player.points}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-800 rounded-xl p-4 flex items-center gap-3 border border-gray-700">
          <Trophy className="w-8 h-8 text-yellow-400 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Your Rank: <span className="text-purple-400">#23</span></p>
            <p className="text-xs text-gray-400">1,840 pts · Play more to climb! Next rank in 120 pts.</p>
          </div>
          <div className="ml-auto">
            <div className="h-1.5 w-32 bg-gray-700 rounded-full">
              <div className="h-1.5 rounded-full bg-purple-500" style={{ width: '68%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
