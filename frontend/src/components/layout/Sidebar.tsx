import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  PlayIcon,
  ClockIcon,
  BookmarkIcon,
  FlagIcon,
  CalendarIcon,
  BriefcaseIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      icon: UserIcon,
      label: `${user?.firstName} ${user?.lastName}`,
      path: `/profile/${user?.id}`,
    },
    { icon: UsersIcon, label: 'Friends', path: '/friends' },
    { icon: UserGroupIcon, label: 'Groups', path: '/groups' },
    { icon: ShoppingBagIcon, label: 'Marketplace', path: '/marketplace' },
    { icon: PlayIcon, label: 'Watch', path: '/watch' },
    { icon: ClockIcon, label: 'Memories', path: '/memories' },
    { icon: BookmarkIcon, label: 'Saved', path: '/saved' },
    { icon: FlagIcon, label: 'Pages', path: '/pages' },
    { icon: CalendarIcon, label: 'Events', path: '/events' },
    { icon: BriefcaseIcon, label: 'Jobs', path: '/jobs' },
    { icon: HeartIcon, label: 'Dating', path: '/dating' },
  ];

  return (
    <aside className="w-80 h-screen sticky top-16 bg-white p-4 overflow-y-auto">
      <nav className="space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Icon className="w-8 h-8 text-facebook" />
              <span className="text-gray-800 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <hr className="my-4" />

      <div>
        <h3 className="text-gray-600 font-semibold mb-3 px-3">Your Shortcuts</h3>
        <div className="space-y-1">
          <Link
            to="/groups/1"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://via.placeholder.com/32"
              alt="Group"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-gray-800">React Developers</span>
          </Link>
          <Link
            to="/groups/2"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://via.placeholder.com/32"
              alt="Group"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-gray-800">Java Programming</span>
          </Link>
          <Link
            to="/groups/3"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://via.placeholder.com/32"
              alt="Group"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-gray-800">Web Development</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 px-3">
        <p className="text-xs text-gray-500">
          Privacy · Terms · Advertising · Ad Choices · Cookies · More · Facebook © 2024
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;