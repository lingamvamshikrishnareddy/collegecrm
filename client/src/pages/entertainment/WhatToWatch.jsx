import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Film, Search, Star, Clock, Users, ThumbsUp, Share2,
  Shuffle, ChevronRight, Play, MessageCircle, Tv, Zap
} from 'lucide-react';

const MOODS = [
  { label: 'Mind-blown', emoji: '🤯', desc: 'Complex plot twists' },
  { label: 'Laugh hard', emoji: '😂', desc: 'Pure comedy' },
  { label: 'Late-night hostel', emoji: '🌙', desc: 'Chill & atmospheric' },
  { label: 'Group watch', emoji: '👥', desc: 'Fun for everyone' },
  { label: 'Short & sweet', emoji: '⚡', desc: 'Under 90 min' },
  { label: 'Cry it out', emoji: '😭', desc: 'Emotional rollercoaster' },
  { label: 'Scary night', emoji: '😱', desc: 'Horror & thriller' },
  { label: 'Inspire me', emoji: '🔥', desc: 'Motivational' }
];

const RECOMMENDATIONS = {
  'Mind-blown': [
    { id: 1, title: 'Dark', type: 'Series', lang: 'German', rating: 8.8, duration: '3 seasons', desc: 'Time travel, family secrets, and mind-bending paradoxes.', poster: '🌑', genres: ['Sci-fi', 'Mystery'], platform: 'Netflix' },
    { id: 2, title: 'Arrival', type: 'Movie', lang: 'English', rating: 7.9, duration: '1h 56m', desc: 'What if learning an alien language rewires your brain?', poster: '🛸', genres: ['Sci-fi', 'Drama'], platform: 'Prime' },
    { id: 3, title: 'Interstellar', type: 'Movie', lang: 'English', rating: 8.6, duration: '2h 49m', desc: 'Love transcends space and time.', poster: '🌌', genres: ['Sci-fi', 'Drama'], platform: 'Prime' }
  ],
  'Laugh hard': [
    { id: 4, title: 'Phir Hera Pheri', type: 'Movie', lang: 'Hindi', rating: 8.2, duration: '2h 27m', desc: 'The iconic trio in their funniest chaos.', poster: '😎', genres: ['Comedy'], platform: 'Prime' },
    { id: 5, title: 'The Office (US)', type: 'Series', lang: 'English', rating: 9.0, duration: '9 seasons', desc: 'A mockumentary about the most relatable coworkers ever.', poster: '📋', genres: ['Comedy'], platform: 'Prime' }
  ],
  'Late-night hostel': [
    { id: 6, title: 'Dune', type: 'Movie', lang: 'English', rating: 8.0, duration: '2h 35m', desc: 'Epic, slow-burn, gorgeous. Perfect for late nights.', poster: '🏜️', genres: ['Sci-fi', 'Epic'], platform: 'Prime' },
    { id: 7, title: 'Into the Wild', type: 'Movie', lang: 'English', rating: 8.1, duration: '2h 28m', desc: 'A man abandons everything to live in Alaska. Beautiful and haunting.', poster: '🌲', genres: ['Drama', 'Adventure'], platform: 'Netflix' }
  ],
  'Group watch': [
    { id: 8, title: 'RRR', type: 'Movie', lang: 'Telugu', rating: 7.8, duration: '3h 7m', desc: 'The most action-packed, crowd-pleasing masala film ever made.', poster: '🦁', genres: ['Action', 'Drama'], platform: 'Netflix' },
    { id: 9, title: 'Squid Game', type: 'Series', lang: 'Korean', rating: 8.0, duration: '2 seasons', desc: 'Survival games. Everyone has an opinion.', poster: '🟢', genres: ['Thriller', 'Drama'], platform: 'Netflix' }
  ],
  'Short & sweet': [
    { id: 10, title: 'Chhichhore', type: 'Movie', lang: 'Hindi', rating: 8.3, duration: '2h 23m', desc: 'College nostalgia, friendship, and life lessons.', poster: '🎓', genres: ['Drama', 'Comedy'], platform: 'Netflix' },
    { id: 11, title: '3 Idiots', type: 'Movie', lang: 'Hindi', rating: 8.4, duration: '2h 50m', desc: "Every engineering student's anthem.", poster: '🤓', genres: ['Comedy', 'Drama'], platform: 'Netflix' }
  ],
  'Cry it out': [
    { id: 12, title: 'Taare Zameen Par', type: 'Movie', lang: 'Hindi', rating: 8.4, duration: '2h 45m', desc: 'A dyslexic child finds his voice. Bring tissues.', poster: '⭐', genres: ['Drama'], platform: 'Prime' }
  ],
  'Scary night': [
    { id: 13, title: 'Get Out', type: 'Movie', lang: 'English', rating: 7.7, duration: '1h 44m', desc: 'Social horror at its finest. Watch with the lights on.', poster: '😨', genres: ['Horror', 'Thriller'], platform: 'Prime' }
  ],
  'Inspire me': [
    { id: 14, title: 'The Pursuit of Happyness', type: 'Movie', lang: 'English', rating: 8.0, duration: '1h 57m', desc: 'A homeless man fights his way to Wall Street.', poster: '💪', genres: ['Drama', 'Biography'], platform: 'Netflix' }
  ]
};

const PLATFORM_COLORS = { 'Netflix': 'bg-red-100 text-red-600', 'Prime': 'bg-blue-100 text-blue-600' };

export default function WhatToWatch() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [search, setSearch] = useState('');
  const [pollActive, setPollActive] = useState(false);

  const getResults = () => {
    if (!selectedMood) return [];
    return RECOMMENDATIONS[selectedMood] || [];
  };

  const allMovies = Object.values(RECOMMENDATIONS).flat();
  const searchResults = search.length > 1
    ? allMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase()))
    : [];

  const displayMovies = search ? searchResults : getResults();

  const randomPick = () => {
    const moodKeys = Object.keys(MOODS.reduce((a, m) => ({ ...a, [m.label]: true }), {}));
    const mood = Object.keys(RECOMMENDATIONS)[Math.floor(Math.random() * Object.keys(RECOMMENDATIONS).length)];
    const picks = RECOMMENDATIONS[mood];
    const pick = picks[Math.floor(Math.random() * picks.length)];
    setSelectedMood(mood);
    alert(`Surprise pick!\n\n🎬 "${pick.title}" (${pick.type})\n${pick.desc}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-rose-900/30 to-gray-900 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Tv className="w-5 h-5 text-rose-400" />
            <span className="text-sm text-rose-300 font-medium uppercase tracking-wider">What to Watch</span>
          </div>
          <h1 className="text-3xl font-black mb-2">No More Scroll Fatigue</h1>
          <p className="text-gray-400 mb-8">Pick a mood → get the perfect watch in 5 seconds.</p>

          {/* Search */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 flex items-center bg-white/10 backdrop-blur rounded-xl px-4 py-3 gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search title, genre, language..."
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={randomPick}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
            >
              <Shuffle className="w-4 h-4" /> Surprise Me
            </button>
          </div>

          {/* Mood picker */}
          {!search && (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {MOODS.map(mood => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(prev => prev === mood.label ? null : mood.label)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedMood === mood.label
                      ? 'bg-rose-600 ring-2 ring-rose-400'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium leading-tight">{mood.label}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Group Watch Poll */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" /> Start a Group Watch Poll
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Let your friends vote on what to watch tonight</p>
          </div>
          <button
            onClick={() => setPollActive(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            {pollActive ? '✓ Poll Started!' : 'Start Poll'}
          </button>
        </div>

        {/* Rental CTA */}
        <Link to="/entertainment/rental" className="block bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-violet-700/50 rounded-xl p-4 mb-8 hover:border-violet-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold flex items-center gap-2 mb-0.5">
                <Zap className="w-4 h-4 text-violet-400" /> Student Media Rental
              </div>
              <p className="text-xs text-gray-400">Rent movies & games at student prices · ₹9/day · ₹49/month</p>
            </div>
            <ChevronRight className="w-5 h-5 text-violet-400" />
          </div>
        </Link>

        {/* Results */}
        {displayMovies.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Film className="w-5 h-5 text-rose-400" />
              {search ? `Results for "${search}"` : `${selectedMood} picks`}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {displayMovies.map(movie => (
                <div key={movie.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-rose-500/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl shrink-0">{movie.poster}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-lg leading-tight">{movie.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${PLATFORM_COLORS[movie.platform] || 'bg-gray-700 text-gray-300'}`}>
                          {movie.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{movie.rating}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{movie.duration}</span>
                        <span>·</span>
                        <span>{movie.lang}</span>
                        <span>·</span>
                        <span>{movie.type}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{movie.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {movie.genres.map(g => (
                          <span key={g} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{g}</span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                          <Play className="w-3.5 h-3.5" /> Watch Now
                        </button>
                        <button className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" /> Like
                        </button>
                        <button className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedMood && !search && (
          <div className="text-center py-16 text-gray-500">
            <Film className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-lg">Pick a mood above</p>
            <p className="text-sm">Or search for a specific title</p>
          </div>
        )}

        {search && searchResults.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nothing found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
