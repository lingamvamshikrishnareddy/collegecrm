import React, { useState } from 'react';
import {
  ShoppingCart, Film, Gamepad2, Star, Clock, CheckCircle,
  Search, Filter, Zap, Shield, Tag, X
} from 'lucide-react';

const TABS = ['Movies', 'Games'];

const RENT_OPTIONS = [
  { label: '1 Day', price: 9, sub: 'Stream for 24 hrs' },
  { label: '1 Week', price: 29, sub: 'Stream for 7 days' },
  { label: '1 Month', price: 49, sub: 'Stream for 30 days' }
];

const MOVIES = [
  { id: 1, title: 'Oppenheimer', genre: 'Drama/Thriller', rating: 8.3, year: 2023, duration: '3h', poster: '☢️', lang: 'English', popular: true },
  { id: 2, title: 'Jawan', genre: 'Action', rating: 7.3, year: 2023, duration: '2h 49m', poster: '🚂', lang: 'Hindi', popular: true },
  { id: 3, title: 'Dune: Part Two', genre: 'Sci-fi/Epic', rating: 8.5, year: 2024, duration: '2h 46m', poster: '🏜️', lang: 'English', popular: true },
  { id: 4, title: 'Animal', genre: 'Action/Drama', rating: 7.6, year: 2023, duration: '3h 21m', poster: '🐺', lang: 'Hindi', popular: false },
  { id: 5, title: 'Poor Things', genre: 'Fantasy/Drama', rating: 8.0, year: 2023, duration: '2h 21m', poster: '🌸', lang: 'English', popular: false },
  { id: 6, title: 'Leo', genre: 'Action/Thriller', rating: 7.5, year: 2023, duration: '2h 44m', poster: '🦁', lang: 'Tamil', popular: true },
  { id: 7, title: 'The Holdovers', genre: 'Comedy/Drama', rating: 8.0, year: 2023, duration: '2h 13m', poster: '❄️', lang: 'English', popular: false },
  { id: 8, title: 'Salaar', genre: 'Action', rating: 7.0, year: 2023, duration: '2h 59m', poster: '⚔️', lang: 'Telugu', popular: false }
];

const GAMES = [
  { id: 101, title: 'GTA V', genre: 'Open World', rating: 9.2, platform: 'PC/PS5', poster: '🚗', popular: true, players: '1-4 online' },
  { id: 102, title: 'FIFA 25', genre: 'Sports', rating: 7.8, platform: 'PC/PS5/Xbox', poster: '⚽', popular: true, players: '1-2' },
  { id: 103, title: 'God of War Ragnarök', genre: 'Action/RPG', rating: 9.4, platform: 'PC/PS5', poster: '⚡', popular: true, players: 'Single player' },
  { id: 104, title: 'Spider-Man 2', genre: 'Action/Adventure', rating: 9.1, platform: 'PS5', poster: '🕷️', popular: false, players: 'Single player' },
  { id: 105, title: 'Baldur\'s Gate 3', genre: 'RPG', rating: 9.8, platform: 'PC/PS5', poster: '🧙', popular: false, players: '1-4 co-op' },
  { id: 106, title: 'Red Dead Redemption 2', genre: 'Open World', rating: 9.5, platform: 'PC/PS5', poster: '🤠', popular: false, players: '1-32 online' },
  { id: 107, title: 'Mortal Kombat 1', genre: 'Fighting', rating: 8.1, platform: 'PC/PS5/Xbox', poster: '🥊', popular: true, players: '1-2' },
  { id: 108, title: 'Alan Wake 2', genre: 'Horror/Thriller', rating: 8.9, platform: 'PC/PS5', poster: '🔦', popular: false, players: 'Single player' }
];

function RentalModal({ item, type, onClose, onRent }) {
  const [selected, setSelected] = useState(RENT_OPTIONS[0]);
  const [done, setDone] = useState(false);

  const handleRent = () => {
    setDone(true);
    onRent(item.id);
  };

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-white text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Rental Confirmed!</h2>
          <p className="text-gray-400 mb-1"><strong className="text-white">{item.title}</strong></p>
          <p className="text-gray-400 mb-4">{selected.label} access · ₹{selected.price} charged</p>
          <button onClick={onClose} className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium transition-colors">
            Start {type === 'Movies' ? 'Watching' : 'Playing'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-white" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Rent {type === 'Movies' ? 'Movie' : 'Game'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
        </div>

        <div className="flex items-center gap-3 mb-5 bg-gray-700 rounded-xl p-3">
          <span className="text-4xl">{item.poster}</span>
          <div>
            <p className="font-bold">{item.title}</p>
            <p className="text-xs text-gray-400">{item.genre} · ⭐ {item.rating}</p>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-3 font-medium">Choose rental period:</p>
        <div className="space-y-2 mb-5">
          {RENT_OPTIONS.map(opt => (
            <button
              key={opt.label}
              onClick={() => setSelected(opt)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors ${
                selected.label === opt.label ? 'border-violet-500 bg-violet-900/30' : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-sm">{opt.label}</p>
                <p className="text-xs text-gray-400">{opt.sub}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-violet-400">₹{opt.price}</p>
                <p className="text-xs text-gray-500">student price</p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4" /> Secure payment · Instant access · No subscription needed
        </div>

        <button onClick={handleRent} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors">
          Rent for ₹{selected.price}
        </button>
      </div>
    </div>
  );
}

export default function MediaRental() {
  const [activeTab, setActiveTab] = useState('Movies');
  const [search, setSearch] = useState('');
  const [rented, setRented] = useState({});
  const [modal, setModal] = useState(null);

  const items = activeTab === 'Movies' ? MOVIES : GAMES;
  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.genre.toLowerCase().includes(search.toLowerCase())
  );

  const handleRent = (id) => setRented(prev => ({ ...prev, [id]: true }));

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {modal && (
        <RentalModal
          item={modal}
          type={activeTab}
          onClose={() => setModal(null)}
          onRent={handleRent}
        />
      )}

      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-900 to-gray-900 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium uppercase tracking-wider">Student Media Rental</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Watch & Play. Pay Almost Nothing.</h1>
          <p className="text-gray-400 mb-4">Rent blockbuster movies and AAA games at student-exclusive prices.</p>

          {/* Price highlight */}
          <div className="flex flex-wrap gap-3 mb-8">
            {RENT_OPTIONS.map(opt => (
              <div key={opt.label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-lg text-violet-300">₹{opt.price}</span>
                <span className="text-gray-400 text-sm">/ {opt.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs + Search */}
          <div className="flex gap-4">
            <div className="flex bg-white/10 rounded-xl p-1">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearch(''); }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab === 'Movies' ? <Film className="w-4 h-4" /> : <Gamepad2 className="w-4 h-4" />}
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 flex items-center bg-white/10 backdrop-blur rounded-xl px-4 gap-3">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-500 text-sm py-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Rented items */}
        {Object.keys(rented).length > 0 && (
          <div className="mb-8 bg-green-900/20 border border-green-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
              <CheckCircle className="w-4 h-4" /> Currently Rented
            </div>
            <div className="flex flex-wrap gap-2">
              {[...MOVIES, ...GAMES].filter(i => rented[i.id]).map(i => (
                <span key={i.id} className="text-sm bg-green-800/30 text-green-300 px-3 py-1 rounded-full flex items-center gap-2">
                  {i.poster} {i.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Popular / New */}
        {!search && (
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="flex items-center gap-1.5 text-orange-400 font-medium">
              <Filter className="w-4 h-4" /> Showing all
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400">{filtered.filter(i => i.popular).length} popular</span>
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(item => {
            const isRented = rented[item.id];
            return (
              <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-violet-500/50 transition-colors group">
                {/* Poster */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-40 flex items-center justify-center relative">
                  <span className="text-7xl">{item.poster}</span>
                  {item.popular && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Popular</span>
                  )}
                  {isRented && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-green-400 font-bold text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Rented</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">{item.genre}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{item.rating}</span>
                    {activeTab === 'Movies' && <><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span></>}
                    {activeTab === 'Games' && <><span>·</span><span>{item.platform}</span></>}
                  </div>

                  {activeTab === 'Games' && (
                    <p className="text-xs text-gray-500 mb-2">{item.players}</p>
                  )}
                  {activeTab === 'Movies' && item.lang && (
                    <p className="text-xs text-gray-500 mb-2">{item.lang}</p>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-violet-400 font-bold text-sm">from ₹9</span>
                    <span className="text-xs text-gray-500">/ day</span>
                  </div>

                  <button
                    onClick={() => setModal(item)}
                    disabled={isRented}
                    className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-lg transition-colors ${
                      isRented
                        ? 'bg-green-800/30 text-green-400 cursor-default'
                        : 'bg-violet-600 hover:bg-violet-700 text-white'
                    }`}
                  >
                    {isRented ? (
                      <><CheckCircle className="w-4 h-4" /> Playing Now</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Rent Now</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nothing found for "{search}"</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-10 grid md:grid-cols-3 gap-4 text-sm">
          {[
            { icon: '⚡', title: 'Instant Access', desc: 'Start streaming or downloading immediately after payment' },
            { icon: '🎓', title: 'Student Verified', desc: 'Prices available to verified college students only' },
            { icon: '🔒', title: 'Legal & Legit', desc: 'Licensed content partnerships with major distributors' }
          ].map(f => (
            <div key={f.title} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex gap-3">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <p className="font-semibold text-white">{f.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
