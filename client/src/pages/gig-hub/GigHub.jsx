import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Clock, DollarSign, Search, Filter, Plus,
  Star, MapPin, Tag, ChevronRight, Zap, Users, Camera,
  Code, Music, BookOpen, Mic, Edit3, Video, Palette
} from 'lucide-react';

const GIG_TYPES = ['All', '2-Hour Gig', 'Freelance', 'Volunteering', 'Campus Work'];

const GIGS = [
  {
    id: 1, type: '2-Hour Gig', title: 'Design a Fest Poster', pay: '₹300', duration: '2 hrs',
    postedBy: 'Rohit S. (CSE 3rd yr)', skills: ['Canva', 'Design'], urgency: 'Today',
    icon: Palette, color: 'bg-pink-100 text-pink-600', badge: 'Hot'
  },
  {
    id: 2, type: 'Freelance', title: 'Edit YouTube Vlog – 5 min video', pay: '₹500', duration: '1 day',
    postedBy: 'Campus Media Club', skills: ['Premiere Pro', 'Video'], urgency: 'Tomorrow',
    icon: Video, color: 'bg-red-100 text-red-600', badge: null
  },
  {
    id: 3, type: 'Campus Work', title: 'Notes Sharing – Data Structures', pay: '₹150', duration: '1 hr',
    postedBy: 'Ananya K. (ECE 2nd yr)', skills: ['Typing', 'DS'], urgency: 'Flexible',
    icon: BookOpen, color: 'bg-blue-100 text-blue-600', badge: null
  },
  {
    id: 4, type: '2-Hour Gig', title: 'Translate 500 words Hindi→English', pay: '₹200', duration: '2 hrs',
    postedBy: 'Startup Cell', skills: ['Hindi', 'English'], urgency: 'Today',
    icon: Edit3, color: 'bg-green-100 text-green-600', badge: 'Urgent'
  },
  {
    id: 5, type: 'Volunteering', title: 'Event Coordinator – Annual Day', pay: 'Certificate + Food', duration: '8 hrs',
    postedBy: 'Student Council', skills: ['Communication', 'Management'], urgency: 'Sat Apr 12',
    icon: Users, color: 'bg-purple-100 text-purple-600', badge: null
  },
  {
    id: 6, type: 'Freelance', title: 'Build a landing page (HTML/CSS)', pay: '₹800', duration: '2 days',
    postedBy: 'Local Cafe – BrewSpace', skills: ['HTML', 'CSS', 'JS'], urgency: 'This week',
    icon: Code, color: 'bg-yellow-100 text-yellow-600', badge: 'New'
  },
  {
    id: 7, type: 'Campus Work', title: 'Photographer for Seminar', pay: '₹400', duration: '3 hrs',
    postedBy: 'IEEE Student Chapter', skills: ['Photography', 'DSLR'], urgency: 'Wed Apr 9',
    icon: Camera, color: 'bg-orange-100 text-orange-600', badge: null
  },
  {
    id: 8, type: 'Volunteering', title: 'Live DJ for College Party', pay: 'Free Entry + Dinner', duration: '4 hrs',
    postedBy: 'Hostel Block B', skills: ['DJ', 'Music'], urgency: 'Sat Apr 12',
    icon: Music, color: 'bg-indigo-100 text-indigo-600', badge: null
  },
  {
    id: 9, type: '2-Hour Gig', title: 'Record a voice-over (30 sec ad)', pay: '₹250', duration: '1 hr',
    postedBy: 'NSS Unit 7', skills: ['Voice', 'Clear Speech'], urgency: 'Tomorrow',
    icon: Mic, color: 'bg-teal-100 text-teal-600', badge: null
  }
];

const STATS = [
  { label: 'Active Gigs', value: '142', icon: Zap, color: 'text-yellow-500' },
  { label: 'Total Earned (campus)', value: '₹4.2L', icon: DollarSign, color: 'text-green-500' },
  { label: 'Students Hired', value: '389', icon: Users, color: 'text-blue-500' },
  { label: 'Avg. Rating', value: '4.8★', icon: Star, color: 'text-orange-500' }
];

export default function GigHub() {
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = GIGS.filter(g => {
    const matchType = activeType === 'All' || g.type === activeType;
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">Micro-Opportunity Hub</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Earn While You Learn</h1>
          <p className="text-violet-200 mb-6">Quick gigs, freelance tasks & campus work posted by seniors, clubs & local businesses.</p>

          {/* Search */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-white/20 backdrop-blur rounded-xl px-4 py-3 gap-3">
              <Search className="w-5 h-5 text-white/70" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search gigs, skills..."
                className="bg-transparent flex-1 text-white placeholder-white/60 outline-none"
              />
            </div>
            <Link
              to="/gig-hub/post"
              className="flex items-center gap-2 bg-white text-violet-600 font-semibold px-5 py-3 rounded-xl hover:bg-violet-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Post a Gig
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <s.icon className={`w-6 h-6 mx-auto mb-1 ${s.color}`} />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Portfolio CTA */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">Your Gig Portfolio</div>
            <div className="text-sm text-gray-500">3 gigs completed · ₹950 earned · 4.9★ avg rating</div>
          </div>
          <Link to="/gig-hub/portfolio" className="flex items-center gap-1 text-emerald-600 font-medium text-sm hover:underline">
            View Portfolio <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {GIG_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeType === type
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Gig Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(gig => (
            <div key={gig.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${gig.color}`}>
                  <gig.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  {gig.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      gig.badge === 'Urgent' ? 'bg-red-100 text-red-600' :
                      gig.badge === 'Hot' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>{gig.badge}</span>
                  )}
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{gig.type}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 transition-colors">{gig.title}</h3>
              <p className="text-xs text-gray-500 mb-3">by {gig.postedBy}</p>

              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="flex items-center gap-1 font-semibold text-green-600">
                  <DollarSign className="w-3.5 h-3.5" />{gig.pay}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />{gig.duration}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />{gig.urgency}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {gig.skills.map(s => (
                  <span key={s} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />{s}
                  </span>
                ))}
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No gigs found</p>
            <p className="text-sm">Try a different filter or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
