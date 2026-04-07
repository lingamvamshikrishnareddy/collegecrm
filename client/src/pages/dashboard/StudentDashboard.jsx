import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Student Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Assignments Due
                </h3>
                <p className="text-3xl font-bold text-indigo-600">3</p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Upcoming Exams
                </h3>
                <p className="text-3xl font-bold text-red-600">2</p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Skill Points
                </h3>
                <p className="text-3xl font-bold text-green-600">150</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/social/network"
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">Network</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with peers</p>
              </Link>

              <Link
                to="/career/job-search"
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">Career</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Find opportunities</p>
              </Link>

              <Link
                to="/gaming"
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">Gaming</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compete & relax</p>
              </Link>

              <Link
                to="/skill-swap"
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">Skill Swap</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn & teach</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;