import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MagnifyingGlassIcon as SearchIcon, EllipsisHorizontalIcon as DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const RightSidebar: React.FC = () => {
  const { friends } = useSelector((state: RootState) => state.friends);

  const onlineFriends = [
    { id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/32', isOnline: true },
    { id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/32', isOnline: true },
    { id: '3', name: 'Mike Johnson', avatar: 'https://via.placeholder.com/32', isOnline: true },
    { id: '4', name: 'Sarah Williams', avatar: 'https://via.placeholder.com/32', isOnline: false },
    { id: '5', name: 'Tom Brown', avatar: 'https://via.placeholder.com/32', isOnline: true },
  ];

  const birthdays = [
    { id: '1', name: 'Alice Cooper', avatar: 'https://via.placeholder.com/32' },
  ];

  return (
    <aside className="w-80 h-screen sticky top-16 p-4 overflow-y-auto hidden lg:block">
      {/* Sponsored */}
      <div className="mb-4">
        <h3 className="text-gray-600 font-semibold mb-2">Sponsored</h3>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img
            src="https://via.placeholder.com/100"
            alt="Ad"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">Amazing Product</p>
            <p className="text-xs text-gray-500">product.com</p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Birthdays */}
      {birthdays.length > 0 && (
        <>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold mb-2">Birthdays</h3>
            <div className="flex items-center space-x-3 p-2">
              <div className="text-3xl">🎂</div>
              <p className="text-sm">
                <strong>{birthdays[0].name}</strong> and{' '}
                <strong>2 others</strong> have birthdays today
              </p>
            </div>
          </div>
          <hr className="my-4" />
        </>
      )}

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-semibold">Contacts</h3>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <VideoCameraIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <SearchIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <DotsHorizontalIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {onlineFriends.map((friend) => (
            <Link
              key={friend.id}
              to={`/messages/${friend.id}`}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-8 h-8 rounded-full"
                />
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="text-sm font-medium">{friend.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Group Conversations */}
      <div className="mt-6">
        <h3 className="text-gray-600 font-semibold mb-2">Group Conversations</h3>
        <div className="space-y-1">
          <Link
            to="/groups/chat/1"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">+</span>
            </div>
            <span className="text-sm font-medium">Create New Group</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;