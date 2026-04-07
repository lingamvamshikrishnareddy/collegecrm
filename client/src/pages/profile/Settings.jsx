import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, ChevronRight } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: false, emailNotifs: true, pushNotifs: true,
    gigAlerts: true, swapRequests: true, tournamentUpdates: true,
    language: 'English'
  });

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const Toggle = ({ val, onToggle }) => (
    <button onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${val ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-5' : ''}`} />
    </button>
  );

  const Row = ({ label, desc, val, onToggle }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
      </div>
      <Toggle val={val} onToggle={onToggle} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 px-5">
          <div className="py-3 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" /> Appearance
          </div>
          <Row label="Dark Mode" val={settings.darkMode} onToggle={() => toggle('darkMode')} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 px-5">
          <div className="py-3 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" /> Notifications
          </div>
          <Row label="Email Notifications" desc="Receive updates via email" val={settings.emailNotifs} onToggle={() => toggle('emailNotifs')} />
          <Row label="Push Notifications" desc="Browser push alerts" val={settings.pushNotifs} onToggle={() => toggle('pushNotifs')} />
          <Row label="Gig Alerts" desc="New gigs matching your skills" val={settings.gigAlerts} onToggle={() => toggle('gigAlerts')} />
          <Row label="Skill Swap Requests" desc="When someone requests a swap" val={settings.swapRequests} onToggle={() => toggle('swapRequests')} />
          <Row label="Tournament Updates" desc="Brackets, results, registrations" val={settings.tournamentUpdates} onToggle={() => toggle('tournamentUpdates')} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 px-5">
          <div className="py-3 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> Language
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
            <span className="text-sm text-gray-500 flex items-center gap-1">{settings.language} <ChevronRight className="w-4 h-4" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
