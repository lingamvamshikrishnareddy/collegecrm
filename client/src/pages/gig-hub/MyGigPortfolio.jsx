import React from 'react';
import { Star, DollarSign, Briefcase, Award, TrendingUp, ChevronLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMPLETED_GIGS = [
  {
    id: 1, title: 'Designed poster for Techfest', client: 'Rohit S.', pay: '₹300',
    rating: 5, review: 'Super fast and creative! Loved the design.', date: 'Mar 28', skills: ['Canva', 'Design'],
    type: '2-Hour Gig', color: 'bg-pink-50 border-pink-200'
  },
  {
    id: 2, title: 'Edited seminar highlights video', client: 'IEEE Chapter', pay: '₹500',
    rating: 5, review: 'Professional quality work. Will hire again!', date: 'Mar 15', skills: ['Premiere Pro'],
    type: 'Freelance', color: 'bg-red-50 border-red-200'
  },
  {
    id: 3, title: 'Typed Data Structures notes PDF', client: 'Ananya K.', pay: '₹150',
    rating: 4, review: 'Good work, neat formatting.', date: 'Mar 5', skills: ['Typing', 'MS Word'],
    type: 'Campus Work', color: 'bg-blue-50 border-blue-200'
  }
];

const SKILLS_SHOWN = [
  { name: 'Design / Canva', level: 85, gigs: 1, color: 'bg-pink-500' },
  { name: 'Video Editing', level: 78, gigs: 1, color: 'bg-red-500' },
  { name: 'Documentation', level: 70, gigs: 1, color: 'bg-blue-500' }
];

export default function MyGigPortfolio() {
  const navigate = useNavigate();
  const totalEarned = 950;
  const avgRating = 4.7;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate('/gig-hub')} className="flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Hub
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">My Gig Portfolio</h1>
              <p className="text-emerald-200 text-sm">Auto-built from your completed gigs</p>
            </div>
            <button className="flex items-center gap-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" /> Share Portfolio
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <div className="text-xl font-bold">₹{totalEarned}</div>
              <div className="text-xs text-emerald-200">Total Earned</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
              <Briefcase className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <div className="text-xl font-bold">{COMPLETED_GIGS.length}</div>
              <div className="text-xs text-emerald-200">Gigs Done</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
              <Star className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <div className="text-xl font-bold">{avgRating}★</div>
              <div className="text-xs text-emerald-200">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Skills Built */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" /> Skills Demonstrated
          </h2>
          <div className="space-y-4">
            {SKILLS_SHOWN.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-400">{skill.gigs} gig{skill.gigs > 1 ? 's' : ''}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div className={`h-2 rounded-full ${skill.color} transition-all`} style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Skill level auto-calculated from gig ratings and complexity</p>
        </div>

        {/* Completed Gigs */}
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-500" /> Completed Gigs
          </h2>
          <div className="space-y-4">
            {COMPLETED_GIGS.map(gig => (
              <div key={gig.id} className={`bg-white dark:bg-gray-800 rounded-xl p-5 border shadow-sm`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{gig.title}</h3>
                    <p className="text-xs text-gray-400">for {gig.client} · {gig.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold text-sm">{gig.pay}</div>
                    <div className="text-yellow-500 text-xs">{'★'.repeat(gig.rating)}{'☆'.repeat(5 - gig.rating)}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3">"{gig.review}"</p>

                <div className="flex flex-wrap gap-1">
                  {gig.skills.map(s => (
                    <span key={s} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                  <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full ml-auto">{gig.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
