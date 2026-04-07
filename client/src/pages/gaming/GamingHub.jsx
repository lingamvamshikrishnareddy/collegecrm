import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2, Trophy, Users, Swords, ChevronRight, Zap,
  Crown, Target, Flame, Medal, Calendar
} from 'lucide-react';

const ACTIVE_LEAGUES = [
  { id: 1, game: 'BGMI', icon: '🔫', teams: 24, prize: '₹5,000', status: 'Group Stage', color: 'from-orange-500 to-red-600' },
  { id: 2, game: 'Valorant', icon: '⚔️', teams: 16, prize: '₹3,000', status: 'Quarterfinals', color: 'from-red-500 to-rose-600' },
  { id: 3, game: 'FIFA 25', icon: '⚽', teams: 32, prize: '₹2,000', status: 'Round of 16', color: 'from-green-500 to-emerald-600' },
  { id: 4, game: 'Chess', icon: '♟️', teams: 48, prize: '₹1,000', status: 'Knockout', color: 'from-gray-600 to-slate-700' }
];

const UPCOMING_TOURNAMENTS = [
  { id: 1, name: 'Spring BGMI Open', game: 'BGMI', date: 'Apr 12', slots: '8 left', icon: '🔫' },
  { id: 2, name: 'Valorant Cup 2025', game: 'Valorant', date: 'Apr 20', slots: '12 left', icon: '⚔️' },
  { id: 3, name: 'College FIFA League', game: 'FIFA 25', date: 'Apr 26', slots: '20 left', icon: '⚽' }
];

const TOP_PLAYERS = [
  { rank: 1, name: 'Rohit "Clutch" Singh', game: 'BGMI', points: 2840, avatar: 'RS', badge: '👑' },
  { rank: 2, name: 'Dev "Sharp" Patel', game: 'Valorant', points: 2710, avatar: 'DP', badge: '🥈' },
  { rank: 3, name: 'Karan "King" Mehta', game: 'FIFA 25', points: 2600, avatar: 'KM', badge: '🥉' },
  { rank: 4, name: 'Ankit "Ace" Sharma', game: 'BGMI', points: 2540, avatar: 'AS', badge: null },
  { rank: 5, name: 'Priya "Pro" Verma', game: 'Chess', points: 2490, avatar: 'PV', badge: null }
];

export default function GamingHub() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 px-6 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 mb-3">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-purple-300">Campus Gaming Ecosystem</span>
          </div>
          <h1 className="text-4xl font-black mb-2">Level Up. Compete. <span className="text-purple-400">Dominate.</span></h1>
          <p className="text-gray-400 mb-8">Esports leagues, tournaments, and squad finder — all on your campus.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Leagues', value: '4', icon: Trophy, color: 'text-yellow-400', link: '/gaming/tournaments' },
              { label: 'Players', value: '847', icon: Users, color: 'text-blue-400', link: '/gaming/leaderboard' },
              { label: 'Find Squad', value: '→', icon: Users, color: 'text-green-400', link: '/gaming/find-squad' },
              { label: 'Leaderboard', value: '#1?', icon: Crown, color: 'text-purple-400', link: '/gaming/leaderboard' }
            ].map(stat => (
              <Link key={stat.label} to={stat.link} className="bg-white/10 backdrop-blur hover:bg-white/20 rounded-xl p-4 text-center transition-colors">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Active Leagues */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Swords className="w-5 h-5 text-red-400" /> Active Leagues
            </h2>
            <Link to="/gaming/tournaments" className="text-purple-400 text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {ACTIVE_LEAGUES.map(league => (
              <div key={league.id} className={`bg-gradient-to-r ${league.color} rounded-xl p-5 relative overflow-hidden`}>
                <div className="absolute right-4 top-4 text-4xl opacity-20">{league.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{league.icon}</span>
                  <h3 className="font-bold text-lg">{league.game}</h3>
                  <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3" /> {league.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{league.teams} teams</span>
                  <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5" />{league.prize} prize</span>
                </div>
                <button className="mt-3 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                  View Bracket →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> Register for Tournaments
            </h2>
            <Link to="/gaming/tournaments" className="text-purple-400 text-sm hover:underline flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {UPCOMING_TOURNAMENTS.map(t => (
              <div key={t.id} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-750 transition-colors">
                <span className="text-3xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.game} · Starts {t.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-400 mb-1">{t.slots} slots</div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-1.5 rounded-lg transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Players */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" /> Campus Leaderboard
            </h2>
            <Link to="/gaming/leaderboard" className="text-purple-400 text-sm hover:underline flex items-center gap-1">
              Full Leaderboard <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            {TOP_PLAYERS.map((player, i) => (
              <div key={player.rank} className={`flex items-center gap-4 p-4 ${i !== TOP_PLAYERS.length - 1 ? 'border-b border-gray-700' : ''} hover:bg-gray-750 transition-colors`}>
                <div className={`w-8 text-center font-black text-lg ${
                  player.rank === 1 ? 'text-yellow-400' : player.rank === 2 ? 'text-gray-300' : player.rank === 3 ? 'text-amber-600' : 'text-gray-500'
                }`}>
                  {player.badge || `#${player.rank}`}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{player.name}</div>
                  <div className="text-xs text-gray-400">{player.game}</div>
                </div>
                <div className="flex items-center gap-1 text-purple-400 font-bold">
                  <Zap className="w-3.5 h-3.5" />{player.points}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Find Squad CTA */}
        <Link to="/gaming/find-squad" className="block bg-gradient-to-r from-purple-800 to-indigo-800 rounded-xl p-6 hover:from-purple-700 hover:to-indigo-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-purple-300" />
                <span className="text-purple-300 font-medium">Find Squad Near Me</span>
              </div>
              <h3 className="text-xl font-bold">Solo queuing? Find teammates!</h3>
              <p className="text-gray-400 text-sm mt-1">Match with players by game, skill level & playtime</p>
            </div>
            <ChevronRight className="w-8 h-8 text-purple-400" />
          </div>
        </Link>
      </div>
    </div>
  );
}
