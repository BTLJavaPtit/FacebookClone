import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { 
  HomeIcon, 
  UsersIcon, 
  PlayIcon, 
  ShoppingBagIcon, 
  UserGroupIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon as ChatIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon as SearchIcon,
  Bars3Icon as MenuIcon
} from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-facebook text-4xl font-bold">
            f
          </Link>
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Facebook"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-facebook w-60"
            />
          </form>
        </div>

        {/* Center section - Navigation */}
        <nav className="hidden lg:flex space-x-2">
          <Link
            to="/"
            className="px-10 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <HomeIcon className="w-7 h-7 text-gray-600" />
          </Link>
          <Link
            to="/friends"
            className="px-10 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <UsersIcon className="w-7 h-7 text-gray-600" />
          </Link>
          <Link
            to="/watch"
            className="px-10 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <PlayIcon className="w-7 h-7 text-gray-600" />
          </Link>
          <Link
            to="/marketplace"
            className="px-10 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ShoppingBagIcon className="w-7 h-7 text-gray-600" />
          </Link>
          <Link
            to="/groups"
            className="px-10 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <UserGroupIcon className="w-7 h-7 text-gray-600" />
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <MenuIcon className="w-6 h-6" />
          </button>
          
          <Link
            to="/messages"
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition relative"
          >
            <ChatIcon className="w-6 h-6" />
          </Link>

          <Link
            to="/notifications"
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition relative"
          >
            <BellIcon className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-200 transition"
            >
              <img
                src={user?.profilePicture || 'https://via.placeholder.com/40'}
                alt={user?.firstName}
                className="w-10 h-10 rounded-full"
              />
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2">
                <Link
                  to={`/profile/${user?.id}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <img
                    src={user?.profilePicture || 'https://via.placeholder.com/40'}
                    alt={user?.firstName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">See your profile</p>
                  </div>
                </Link>

                <hr className="my-2" />

                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Settings & Privacy
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Help & Support
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;