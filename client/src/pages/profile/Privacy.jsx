import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';

export default function Privacy() {
  const [privacy, setPrivacy] = useState({
    profileVisible: true, showEmail: false, showPhone: false,
    showGigHistory: true, showSkillSwaps: true, allowMessages: true
  });

  const toggle = (key) => setPrivacy(p => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ val, onToggle }) => (
    <button onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${val ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-5' : ''}`} />
    </button>
  );

  const Row = ({ label, desc, val, onToggle }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
      </div>
      <Toggle val={val} onToggle={onToggle} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Privacy</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-300">Your data is only shared with other verified students on your campus.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 px-5">
          <div className="py-3 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" /> Profile Visibility
          </div>
          <Row label="Public Profile" desc="Other students can find and view your profile" val={privacy.profileVisible} onToggle={() => toggle('profileVisible')} />
          <Row label="Show Email" desc="Display email on your public profile" val={privacy.showEmail} onToggle={() => toggle('showEmail')} />
          <Row label="Show Phone" desc="Display phone number on your profile" val={privacy.showPhone} onToggle={() => toggle('showPhone')} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 px-5">
          <div className="py-3 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <EyeOff className="w-3.5 h-3.5" /> Activity Visibility
          </div>
          <Row label="Show Gig History" desc="Others can see your completed gigs" val={privacy.showGigHistory} onToggle={() => toggle('showGigHistory')} />
          <Row label="Show Skill Swaps" desc="Others can see your swap activity" val={privacy.showSkillSwaps} onToggle={() => toggle('showSkillSwaps')} />
          <Row label="Allow Messages" desc="Anyone on campus can message you" val={privacy.allowMessages} onToggle={() => toggle('allowMessages')} />
        </div>
      </div>
    </div>
  );
}
