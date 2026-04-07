import React from 'react';
import { Users } from 'lucide-react';

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
        <p className="text-gray-500 mt-1">Admin panel — coming soon</p>
      </div>
    </div>
  );
}
