import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RefreshCw, Search, Clock, Star, MessageCircle, Filter,
  Code, Music, BookOpen, Palette, Camera, Dumbbell, Globe, ChevronRight, Plus
} from 'lucide-react';

const CATEGORIES = ['All', 'Tech', 'Arts', 'Music', 'Academics', 'Fitness', 'Language'];

const SKILL_OFFERS = [
  {
    id: 1, name: 'Arjun M.', branch: 'CSE 3rd yr', avatar: 'AM',
    offering: 'Python / Web Dev', wants: 'Guitar lessons',
    rating: 4.8, swaps: 12, available: 'Evenings',
    icon: Code, color: 'bg-blue-100 text-blue-600', category: 'Tech'
  },
  {
    id: 2, name: 'Priya S.', branch: 'Fine Arts 2nd yr', avatar: 'PS',
    offering: 'Sketching / Illustration', wants: 'Math help (Calculus)',
    rating: 4.9, swaps: 8, available: 'Weekends',
    icon: Palette, color: 'bg-pink-100 text-pink-600', category: 'Arts'
  },
  {
    id: 3, name: 'Karan L.', branch: 'Music 1st yr', avatar: 'KL',
    offering: 'Guitar (Beginner-Intermediate)', wants: 'English speaking practice',
    rating: 4.7, swaps: 5, available: 'Mornings',
    icon: Music, color: 'bg-purple-100 text-purple-600', category: 'Music'
  },
  {
    id: 4, name: 'Neha R.', branch: 'MBA 1st yr', avatar: 'NR',
    offering: 'Video Editing (Premiere)', wants: 'Python basics',
    rating: 4.6, swaps: 9, available: 'Flexible',
    icon: Camera, color: 'bg-red-100 text-red-600', category: 'Arts'
  },
  {
    id: 5, name: 'Dev P.', branch: 'ECE 2nd yr', avatar: 'DP',
    offering: 'DSA / Interview prep', wants: 'Fitness / Workout coaching',
    rating: 5.0, swaps: 15, available: 'Evenings',
    icon: Code, color: 'bg-yellow-100 text-yellow-600', category: 'Tech'
  },
  {
    id: 6, name: 'Sara K.', branch: 'PE 3rd yr', avatar: 'SK',
    offering: 'Fitness coaching / Yoga', wants: 'Canva design help',
    rating: 4.9, swaps: 11, available: 'Mornings',
    icon: Dumbbell, color: 'bg-green-100 text-green-600', category: 'Fitness'
  },
  {
    id: 7, name: 'Amit T.', branch: 'Linguistics 2nd yr', avatar: 'AT',
    offering: 'French / Spanish lessons', wants: 'Guitar or any music',
    rating: 4.8, swaps: 7, available: 'Weekends',
    icon: Globe, color: 'bg-indigo-100 text-indigo-600', category: 'Language'
  },
  {
    id: 8, name: 'Meera J.', branch: 'Physics 3rd yr', avatar: 'MJ',
    offering: 'Physics / Math tutoring', wants: 'Video editing basics',
    rating: 4.7, swaps: 4, available: 'Evenings',
    icon: BookOpen, color: 'bg-teal-100 text-teal-600', category: 'Academics'
  }
];

export default function SkillSwap() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = SKILL_OFFERS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.offering.toLowerCase().includes(search.toLowerCase()) ||
      p.wants.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">Skill Swap Network</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Skills are the New Currency</h1>
          <p className="text-orange-100 mb-6">Teach what you know. Learn what you don't. 1 hour = 1 credit.</p>

          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-white/20 backdrop-blur rounded-xl px-4 py-3 gap-3">
              <Search className="w-5 h-5 text-white/70" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by skill offered or wanted..."
                className="bg-transparent flex-1 text-white placeholder-white/60 outline-none"
              />
            </div>
            <Link
              to="/skill-swap/offer"
              className="flex items-center gap-2 bg-white text-orange-600 font-semibold px-5 py-3 rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Offer a Skill
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Credits Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Your Time Credits: 3.5 hrs
            </div>
            <div className="text-sm text-gray-500">You've taught 3.5 hrs · Learned 2 hrs · Balance: +1.5 hr</div>
          </div>
          <Link to="/skill-swap/credits" className="flex items-center gap-1 text-orange-600 font-medium text-sm hover:underline">
            View Wallet <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(person => (
            <div key={person.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                    <span className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                      <Star className="w-3 h-3 fill-yellow-500" />{person.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{person.branch} · {person.swaps} swaps done</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider w-16 shrink-0">Offering</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{person.offering}</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider w-16 shrink-0">Wants</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{person.wants}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />Available: {person.available}
                </span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Message
                  </button>
                  <button className="flex items-center gap-1 text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" /> Request Swap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No matches found</p>
            <p className="text-sm">Try a different skill or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
