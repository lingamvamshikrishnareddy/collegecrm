import React from 'react';

const Network = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Network</h1>
      <p>Connect with your peers and build your network.</p>
      {/* Placeholder content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Peer Connections</h3>
          <p>Find and connect with fellow students.</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Study Groups</h3>
          <p>Join or create study groups.</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Mentorship</h3>
          <p>Find mentors or become one.</p>
        </div>
      </div>
    </div>
  );
};

export default Network;