import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Mail, Phone, BookOpen } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', branch: '', year: '', bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate('/profile'), 1500);
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field('First Name', 'firstName')}
              {field('Last Name', 'lastName')}
            </div>
            {field('Email', 'email', 'email')}
            {field('Phone', 'phone', 'tel')}
            <div className="grid grid-cols-2 gap-4">
              {field('Branch', 'branch', 'text', 'e.g. Computer Science')}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                <select value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500">
                  <option value="">Select</option>
                  {['1st', '2nd', '3rd', '4th'].map(y => <option key={y} value={y}>{y} Year</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Tell others about yourself..."
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none" />
            </div>
          </div>

          <button type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            <Save className="w-4 h-4" />
            {saved ? 'Saved! Redirecting...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
