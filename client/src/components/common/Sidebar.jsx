// components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  Briefcase,
  MessageCircle,
  Settings,
  ChevronLeft,
  GraduationCap,
  Target,
  Film,
  Building,
  RefreshCw,
  Gamepad2,
  Trophy,
  Swords,
  DollarSign,
  Tv,
  ShoppingCart,
  Dumbbell,
  BookOpen,
  Search,
  Star,
  UserCheck
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-blue-500'
  },
  {
    label: 'Social',
    icon: Users,
    color: 'text-purple-500',
    children: [
      { label: 'Network', icon: Users, href: '/social/network' },
      { label: 'Events', icon: Calendar, href: '/social/events' },
      { label: 'Clubs', icon: Building, href: '/social/clubs' },
      { label: 'Chat', icon: MessageCircle, href: '/social/chat' },
      { label: 'Forums', icon: MessageCircle, href: '/social/forums' }
    ]
  },
  {
    label: 'Career',
    icon: Briefcase,
    color: 'text-red-500',
    children: [
      { label: 'Placements', icon: Briefcase, href: '/career/placements' },
      { label: 'Job Search', icon: Search, href: '/career/job-search' },
      { label: 'Skill Development', icon: Target, href: '/career/skill-development' },
      { label: 'Interview Prep', icon: UserCheck, href: '/career/interview-prep' },
      { label: 'Portfolio', icon: Star, href: '/career/portfolio' }
    ]
  },
  {
    label: 'Gig Hub',
    icon: DollarSign,
    color: 'text-violet-500',
    children: [
      { label: 'Browse Gigs', icon: Briefcase, href: '/gig-hub' },
      { label: 'Post a Gig', icon: Target, href: '/gig-hub/post' },
      { label: 'My Portfolio', icon: Star, href: '/gig-hub/portfolio' }
    ]
  },
  {
    label: 'Skill Swap',
    icon: RefreshCw,
    color: 'text-orange-500',
    children: [
      { label: 'Find Skills', icon: RefreshCw, href: '/skill-swap' },
      { label: 'My Credits', icon: Trophy, href: '/skill-swap/credits' }
    ]
  },
  {
    label: 'Gaming',
    icon: Gamepad2,
    color: 'text-green-500',
    children: [
      { label: 'Gaming Hub', icon: Gamepad2, href: '/gaming' },
      { label: 'Tournaments', icon: Trophy, href: '/gaming/tournaments' },
      { label: 'Find Squad', icon: Users, href: '/gaming/find-squad' },
      { label: 'Leaderboard', icon: Swords, href: '/gaming/leaderboard' }
    ]
  },
  {
    label: 'Entertainment',
    icon: Film,
    color: 'text-pink-500',
    children: [
      { label: 'What to Watch', icon: Tv, href: '/entertainment/what-to-watch' },
      { label: 'Media Rental', icon: ShoppingCart, href: '/entertainment/rental' },
      { label: 'Sports', icon: Dumbbell, href: '/entertainment/sports' }
    ]
  }
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState({});

  const toggleExpanded = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (href) => location.pathname === href;

  const isParentActive = (children) =>
    children?.some(child => location.pathname.startsWith(child.href));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700 transition-transform transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">CollegeLife</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-lg transition-colors
                          ${isParentActive(item.children)
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <ChevronLeft className={`w-4 h-4 transition-transform ${
                          expandedItems[item.label] || isParentActive(item.children)
                            ? '-rotate-90'
                            : 'rotate-0'
                        }`} />
                      </button>

                      {(expandedItems[item.label] || isParentActive(item.children)) && (
                        <ul className="mt-1 ml-4 space-y-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                onClick={onClose}
                                className={`
                                  flex items-center gap-3 p-2 rounded-md transition-colors text-sm
                                  ${isActive(child.href)
                                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }
                                `}
                              >
                                <child.icon className="w-4 h-4 shrink-0" />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-colors
                        ${isActive(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/profile/settings"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium text-sm">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
