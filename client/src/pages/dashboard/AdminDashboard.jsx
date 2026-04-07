import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Total Students
                </h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Active Courses
                </h3>
                <p className="text-3xl font-bold text-green-600">45</p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  System Health
                </h3>
                <p className="text-3xl font-bold text-green-600">Good</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Admin Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors">
                  Manage Users
                </button>
                <button className="p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                  View Analytics
                </button>
                <button className="p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;