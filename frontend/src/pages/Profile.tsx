import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../components/layout/Header';
import PostCard from '../components/post/PostCard';
import { CameraIcon } from '@heroicons/react/24/solid';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = user?.id === userId;
  const userPosts = posts.filter(post => post.userId === userId);

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      
      <div className="max-w-6xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-96 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-lg">
          <img
            src={user?.coverPhoto || 'https://via.placeholder.com/1200x400'}
            alt="Cover"
            className="w-full h-full object-cover rounded-b-lg"
          />
          {isOwnProfile && (
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100">
              <CameraIcon className="w-5 h-5" />
              <span>Edit Cover Photo</span>
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="bg-white shadow rounded-b-lg px-4 pb-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-end -mt-8 lg:-mt-20">
            <div className="relative">
              <img
                src={user?.profilePicture || 'https://via.placeholder.com/168'}
                alt={user?.firstName}
                className="w-40 h-40 rounded-full border-4 border-white"
              />
              {isOwnProfile && (
                <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                  <CameraIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex-1 lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left">
              <h1 className="text-3xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              {user?.bio && (
                <p className="text-gray-600 mt-1">{user.bio}</p>
              )}
              <div className="flex justify-center lg:justify-start space-x-2 mt-2 text-gray-500">
                <span>500 friends</span>
                <span>·</span>
                <span>10 mutual</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4 lg:mt-0">
              {isOwnProfile ? (
                <>
                  <button className="bg-facebook text-white px-4 py-2 rounded-lg font-semibold hover:bg-facebook-dark">
                    Add to Story
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-facebook text-white px-4 py-2 rounded-lg font-semibold hover:bg-facebook-dark">
                    Add Friend
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">
                    Message
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-t mt-4 pt-2">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-3 font-semibold ${
                activeTab === 'posts'
                  ? 'text-facebook border-b-4 border-facebook'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-3 font-semibold ${
                activeTab === 'about'
                  ? 'text-facebook border-b-4 border-facebook'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-3 font-semibold ${
                activeTab === 'friends'
                  ? 'text-facebook border-b-4 border-facebook'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-3 font-semibold ${
                activeTab === 'photos'
                  ? 'text-facebook border-b-4 border-facebook'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Photos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-4 mt-4">
          {/* Left Sidebar */}
          <div className="w-2/5 space-y-4">
            {/* Intro */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">Intro</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>🎓</span>
                  <span>Studied at University</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Lives in City</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💼</span>
                  <span>Works at Company</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>❤️</span>
                  <span>Single</span>
                </div>
              </div>
              {isOwnProfile && (
                <button className="w-full mt-4 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300">
                  Edit Details
                </button>
              )}
            </div>

            {/* Photos */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Photos</h2>
                <a href="#" className="text-facebook hover:underline">See All</a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <img
                    key={i}
                    src={`https://via.placeholder.com/100?text=${i}`}
                    alt=""
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Friends */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Friends</h2>
                <a href="#" className="text-facebook hover:underline">See All</a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="text-center">
                    <img
                      src={`https://via.placeholder.com/100?text=${i}`}
                      alt=""
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-xs mt-1">Friend {i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {activeTab === 'posts' && (
              <>
                {isOwnProfile && (
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex space-x-3">
                      <img
                        src={user?.profilePicture || 'https://via.placeholder.com/40'}
                        alt={user?.firstName}
                        className="w-10 h-10 rounded-full"
                      />
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-left text-gray-500">
                        What's on your mind?
                      </button>
                    </div>
                  </div>
                )}

                {userPosts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">No posts to show</p>
                  </div>
                ) : (
                  userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Work and Education</h3>
                    <p className="text-gray-600">Add workplace</p>
                    <p className="text-gray-600">Add education</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Places Lived</h3>
                    <p className="text-gray-600">Add current city</p>
                    <p className="text-gray-600">Add hometown</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact and Basic Info</h3>
                    <p className="text-gray-600">Add contact info</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'friends' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Friends</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <img
                        src={`https://via.placeholder.com/80?text=${i}`}
                        alt=""
                        className="w-20 h-20 rounded-lg"
                      />
                      <div>
                        <p className="font-semibold">Friend Name {i}</p>
                        <p className="text-sm text-gray-500">5 mutual friends</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Photos</h2>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <img
                      key={i}
                      src={`https://via.placeholder.com/200?text=${i}`}
                      alt=""
                      className="w-full h-40 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;