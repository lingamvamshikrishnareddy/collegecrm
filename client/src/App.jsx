import './styles/globals.css';

import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';

// Components
import Loading from './components/common/Loading';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
const Login = React.lazy(() => import('./pages/auth/Login'));
const Signup = React.lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));

// Dashboard
const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard'));

// Social
const Network = React.lazy(() => import('./pages/social/Network'));
const Events = React.lazy(() => import('./pages/social/Events'));
const Clubs = React.lazy(() => import('./pages/social/Clubs'));
const Chat = React.lazy(() => import('./pages/social/Chat'));
const Forums = React.lazy(() => import('./pages/social/Forums'));

// Career
const Placements = React.lazy(() => import('./pages/career/Placements'));
const JobSearch = React.lazy(() => import('./pages/career/JobSearch'));
const SkillDevelopment = React.lazy(() => import('./pages/career/SkillDevelopment'));
const InterviewPrep = React.lazy(() => import('./pages/career/InterviewPrep'));
const Portfolio = React.lazy(() => import('./pages/career/Portfolio'));

// Gig Hub
const GigHub = React.lazy(() => import('./pages/gig-hub/GigHub'));
const PostGig = React.lazy(() => import('./pages/gig-hub/PostGig'));
const MyGigPortfolio = React.lazy(() => import('./pages/gig-hub/MyGigPortfolio'));

// Skill Swap
const SkillSwap = React.lazy(() => import('./pages/skill-swap/SkillSwap'));
const MyCredits = React.lazy(() => import('./pages/skill-swap/MyCredits'));

// Gaming
const GamingHub = React.lazy(() => import('./pages/gaming/GamingHub'));
const Tournaments = React.lazy(() => import('./pages/gaming/Tournaments'));
const FindSquad = React.lazy(() => import('./pages/gaming/FindSquad'));
const GamingLeaderboard = React.lazy(() => import('./pages/gaming/GamingLeaderboard'));

// Entertainment
const WhatToWatch = React.lazy(() => import('./pages/entertainment/WhatToWatch'));
const MediaRental = React.lazy(() => import('./pages/entertainment/MediaRental'));
const Sports = React.lazy(() => import('./pages/entertainment/Sports'));

// Profile
const StudentProfile = React.lazy(() => import('./pages/profile/StudentProfile'));
const EditProfile = React.lazy(() => import('./pages/profile/EditProfile'));
const Settings = React.lazy(() => import('./pages/profile/Settings'));
const Privacy = React.lazy(() => import('./pages/profile/Privacy'));

// Admin
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const CollegeManagement = React.lazy(() => import('./pages/admin/CollegeManagement'));
const Analytics = React.lazy(() => import('./pages/admin/Analytics'));
const Reports = React.lazy(() => import('./pages/admin/Reports'));
const SystemSettings = React.lazy(() => import('./pages/admin/SystemSettings'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              <Router>
                <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* Root redirect */}
                      <Route path="/" element={
                        <ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>
                      } />

                      {/* Dashboard */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute><StudentDashboard /></ProtectedRoute>
                      } />
                      <Route path="/admin-dashboard" element={
                        <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
                      } />

                      {/* Social */}
                      <Route path="/social/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
                      <Route path="/social/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                      <Route path="/social/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>} />
                      <Route path="/social/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                      <Route path="/social/forums" element={<ProtectedRoute><Forums /></ProtectedRoute>} />

                      {/* Career */}
                      <Route path="/career/placements" element={<ProtectedRoute><Placements /></ProtectedRoute>} />
                      <Route path="/career/job-search" element={<ProtectedRoute><JobSearch /></ProtectedRoute>} />
                      <Route path="/career/skill-development" element={<ProtectedRoute><SkillDevelopment /></ProtectedRoute>} />
                      <Route path="/career/interview-prep" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
                      <Route path="/career/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />

                      {/* Gig Hub */}
                      <Route path="/gig-hub" element={<ProtectedRoute><GigHub /></ProtectedRoute>} />
                      <Route path="/gig-hub/post" element={<ProtectedRoute><PostGig /></ProtectedRoute>} />
                      <Route path="/gig-hub/portfolio" element={<ProtectedRoute><MyGigPortfolio /></ProtectedRoute>} />

                      {/* Skill Swap */}
                      <Route path="/skill-swap" element={<ProtectedRoute><SkillSwap /></ProtectedRoute>} />
                      <Route path="/skill-swap/credits" element={<ProtectedRoute><MyCredits /></ProtectedRoute>} />

                      {/* Gaming */}
                      <Route path="/gaming" element={<ProtectedRoute><GamingHub /></ProtectedRoute>} />
                      <Route path="/gaming/tournaments" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
                      <Route path="/gaming/find-squad" element={<ProtectedRoute><FindSquad /></ProtectedRoute>} />
                      <Route path="/gaming/leaderboard" element={<ProtectedRoute><GamingLeaderboard /></ProtectedRoute>} />

                      {/* Entertainment */}
                      <Route path="/entertainment/what-to-watch" element={<ProtectedRoute><WhatToWatch /></ProtectedRoute>} />
                      <Route path="/entertainment/rental" element={<ProtectedRoute><MediaRental /></ProtectedRoute>} />
                      <Route path="/entertainment/sports" element={<ProtectedRoute><Sports /></ProtectedRoute>} />

                      {/* Profile */}
                      <Route path="/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
                      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                      <Route path="/profile/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                      <Route path="/profile/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />

                      {/* Admin */}
                      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
                      <Route path="/admin/college" element={<ProtectedRoute allowedRoles={['admin']}><CollegeManagement /></ProtectedRoute>} />
                      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><Analytics /></ProtectedRoute>} />
                      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
                      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><SystemSettings /></ProtectedRoute>} />

                      {/* Catch all */}
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Suspense>

                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: { background: '#363636', color: '#fff' },
                      success: { duration: 3000 },
                    }}
                  />
                </div>
              </Router>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
