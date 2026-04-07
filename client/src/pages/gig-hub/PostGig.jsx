import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, Clock, Tag, ChevronLeft, CheckCircle } from 'lucide-react';

const GIG_TYPES = ['2-Hour Gig', 'Freelance', 'Volunteering', 'Campus Work'];
const SKILL_SUGGESTIONS = ['Design', 'Video Editing', 'Coding', 'Writing', 'Photography', 'Teaching', 'Music', 'Management', 'Translation', 'Data Entry'];

export default function PostGig() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', type: '2-Hour Gig', description: '', pay: '',
    duration: '', skills: [], deadline: '', contactInfo: ''
  });
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (s) => {
    const skill = s || skillInput.trim();
    if (skill && !form.skills.includes(skill)) {
      setForm(f => ({ ...f, skills: [...f.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center max-w-md w-full shadow-lg">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gig Posted!</h2>
          <p className="text-gray-500 mb-6">Your gig is live. Students will start applying soon.</p>
          <div className="space-y-3">
            <button onClick={() => navigate('/gig-hub')} className="w-full bg-violet-600 text-white py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors">
              Browse All Gigs
            </button>
            <button onClick={() => setSubmitted(false)} className="w-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/gig-hub')} className="flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Hub
          </button>
          <h1 className="text-2xl font-bold">Post a Micro-Gig</h1>
          <p className="text-violet-200 text-sm mt-1">Get help from talented students on campus</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gig Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Gig Type</label>
            <div className="grid grid-cols-2 gap-3">
              {GIG_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type }))}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    form.type === type
                      ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-600'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-violet-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gig Title *</label>
              <input
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Design a poster for college fest"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description *</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Describe the task in detail. What exactly needs to be done? Any specific requirements?"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Pay & Duration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <DollarSign className="w-3.5 h-3.5 inline mr-1" />Pay / Reward *
                </label>
                <input
                  required
                  value={form.pay}
                  onChange={e => setForm(f => ({ ...f, pay: e.target.value }))}
                  placeholder="₹300 / Certificate / Free Food"
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />Time Required *
                </label>
                <input
                  required
                  value={form.duration}
                  onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                  placeholder="2 hrs / 1 day / Flexible"
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Tag className="w-3.5 h-3.5 inline mr-1" />Skills Required
            </label>
            <div className="flex gap-2 mb-3">
              <input
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Enter"
                className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
              />
              <button type="button" onClick={() => addSkill()} className="bg-violet-100 text-violet-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-violet-200 transition-colors">Add</button>
            </div>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 6).map(s => (
                <button key={s} type="button" onClick={() => addSkill(s)} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full hover:bg-violet-100 hover:text-violet-600 transition-colors">
                  + {s}
                </button>
              ))}
            </div>
            {/* Selected */}
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map(s => (
                  <span key={s} className="flex items-center gap-1 bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full">
                    {s}
                    <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-500 ml-1">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Deadline & Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Deadline / Urgency</label>
              <input
                value={form.deadline}
                onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                type="date"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Contact / How to Apply</label>
              <input
                value={form.contactInfo}
                onChange={e => setForm(f => ({ ...f, contactInfo: e.target.value }))}
                placeholder="WhatsApp number, Instagram handle, or email"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Briefcase className="w-5 h-5" />
            Post Gig Now
          </button>
        </form>
      </div>
    </div>
  );
}
