import React from 'react';
import { Mail } from 'lucide-react';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center max-w-md w-full shadow-lg">
        <Mail className="w-14 h-14 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
        <p className="text-gray-500">We sent a verification link to your email address. Click it to activate your account.</p>
      </div>
    </div>
  );
}
