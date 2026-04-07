import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, ChevronLeft, Search, Mic, Target, Clock, MessageCircle, Wifi } from 'lucide-react';

const GAMES = ['All', 'BGMI', 'Valorant', 'FIFA 25', 'Chess', 'COD Mobile', 'Free Fire'];
const SKILL_LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Pro'];

const PLAYERS = [
  {
    id: 1, name: 'Rohit S.', avatar: 'RS', game: 'BGMI', role: 'Entry Fragger',
    skill: 'Advanced', rank: 'Platinum II', playtime: 'Evenings 8–11pm',
    looking: 'Consistent squad for ranked grind', hostel: 'Block A', online: true,
    tags: ['Mic-ready', 'Serious player', 'Daily grinder']
  },
  {
    id: 2, name: 'Ananya K.', avatar: 'AK', game: 'Valorant', role: 'Sentinel / IGL',
    skill: 'Intermediate', rank: 'Gold III', playtime: 'Afternoons & weekends',
    looking: 'Chill squad for unrated + occasional ranked', hostel: 'Block C', online: true,
    tags: ['Mic-ready', 'IGL experience']
  },
  {
    id: 3, name: 'Karan M.', avatar: 'KM', game: 'FIFA 25', role: 'Striker',
    skill: 'Pro', rank: 'Elite', playtime: 'Post 9pm',
    looking: 'Team for inter-hostel tournament', hostel: 'Block D', online: false,
    tags: ['Tournament-focused']
  },
  {
    id: 4, name: 'Dev P.', avatar: 'DP', game: 'BGMI', role: 'Sniper / Support',
    skill: 'Intermediate', rank: 'Gold I', playtime: 'Any time (flexible)',
    looking: 'Chill squad to have fun and improve', hostel: 'Block B', online: true,
    tags: ['Mic-ready', 'Flexible schedule']
  },
  {
    id: 5, name: 'Priya V.', avatar: 'PV', game: 'Chess', role: 'Player',
    skill: 'Advanced', rank: '1800 ELO', playtime: 'Evenings',
    looking: 'Study partner / practice opponent', hostel: 'Block E', online: true,
    tags: ['FIDE rated', 'Tournament player']
  },
  {
    id: 6, name: 'Arjun T.', avatar: 'AT', game: 'Valorant', role: 'Duelist',
    skill: 'Advanced', rank: 'Diamond I', playtime: 'Late nights 10pm–2am',
    looking: 'High-elo duo/trio for ranked push', hostel: 'Block A', online: false,
    tags: ['Serious ranked', 'High-elo only']
  }
];

const SKILL_COLORS = {
  'Beginner': 'bg-gray-600 text-gray-200',
  'Intermediate': 'bg-blue-600/30 text-blue-300',
  'Advanced': 'bg-purple-600/30 text-purple-300',
  'Pro': 'bg-yellow-600/30 text-yellow-300'
};

export default function FindSquad() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState('All');
  const [activeSkill, setActiveSkill] = useState('All Levels');
  const [search, setSearch] = useState('');

  const filtered = PLAYERS.filter(p => {
    const matchGame = activeGame === 'All' || p.game === activeGame;
    const matchSkill = activeSkill === 'All Levels' || p.skill === activeSkill;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.looking.toLowerCase().includes(search.toLowerCase());
    return matchGame && matchSkill && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/gaming')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Gaming Hub
          </button>
          <h1 className="text-2xl font-black mb-1 flex items-center gap-3">
            <Users className="w-6 h-6 text-green-400" /> Find Squad Near Me
          </h1>
          <p className="text-gray-400 mb-6">Match with campus players by game, skill level & playtime</p>

          <div className="flex items-center bg-white/10 backdrop-blur rounded-xl px-4 py-3 gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or what they're looking for..."
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Game filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
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

        {/* Skill filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {SKILL_LEVELS.map(level => (
            <button
              key={level}
              onClick={() => setActiveSkill(level)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeSkill === level ? 'bg-blue-600 text-white' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Player cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(player => (
            <div key={player.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold shrink-0">
                    {player.avatar}
                  </div>
                  {player.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{player.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${SKILL_COLORS[player.skill]}`}>{player.skill}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{player.hostel}</span>
                    {player.online && <span className="flex items-center gap-1 text-green-400"><Wifi className="w-3 h-3" />Online</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16 shrink-0">Game</span>
                  <span className="font-medium">{player.game} · {player.role}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16 shrink-0">Rank</span>
                  <span className="font-medium text-yellow-400">{player.rank}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16 shrink-0 flex items-center gap-1"><Clock className="w-3 h-3" />Play</span>
                  <span className="text-gray-300">{player.playtime}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16 shrink-0 flex items-center gap-1"><Target className="w-3 h-3" />Want</span>
                  <span className="text-gray-300 text-xs">{player.looking}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {player.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 flex items-center gap-1 ${tag === 'Mic-ready' ? 'text-green-300 bg-green-900/30' : ''}`}>
                    {tag === 'Mic-ready' && <Mic className="w-2.5 h-2.5" />}{tag}
                  </span>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" /> Send Invite
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No players found</p>
            <p className="text-sm">Try different filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
