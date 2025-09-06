import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createPost } from '../../redux/slices/postSlice';
import {
  VideoCameraIcon,
  PhotoIcon as PhotographIcon,
  FaceSmileIcon as EmojiHappyIcon,
  MapPinIcon as LocationMarkerIcon,
  UserPlusIcon as UserAddIcon,
} from '@heroicons/react/24/solid';

const CreatePost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    await dispatch(createPost({
      content,
      privacy,
      images: images.map(img => URL.createObjectURL(img)),
    }));

    setContent('');
    setImages([]);
    setShowModal(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex space-x-3">
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/40'}
            alt={user?.firstName}
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-left text-gray-500"
          >
            What's on your mind, {user?.firstName}?
          </button>
        </div>

        <hr className="my-3" />

        <div className="flex justify-around">
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            <VideoCameraIcon className="w-6 h-6 text-red-500" />
            <span className="text-gray-600">Live Video</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            <PhotographIcon className="w-6 h-6 text-green-500" />
            <span className="text-gray-600">Photo/Video</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
            <EmojiHappyIcon className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-600">Feeling/Activity</span>
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Create Post</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={user?.profilePicture || 'https://via.placeholder.com/40'}
                  alt={user?.firstName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                    className="text-sm bg-gray-100 rounded px-2 py-1"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends</option>
                    <option value="private">Only Me</option>
                  </select>
                </div>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${user?.firstName}?`}
                className="w-full p-2 text-lg resize-none focus:outline-none"
                rows={4}
              />

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 bg-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 p-3 border rounded-lg">
                <span className="text-sm font-medium">Add to your post</span>
                <div className="flex space-x-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <PhotographIcon className="w-8 h-8 text-green-500 hover:bg-gray-100 p-1 rounded" />
                  </label>
                  <button type="button">
                    <UserAddIcon className="w-8 h-8 text-blue-500 hover:bg-gray-100 p-1 rounded" />
                  </button>
                  <button type="button">
                    <EmojiHappyIcon className="w-8 h-8 text-yellow-500 hover:bg-gray-100 p-1 rounded" />
                  </button>
                  <button type="button">
                    <LocationMarkerIcon className="w-8 h-8 text-red-500 hover:bg-gray-100 p-1 rounded" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!content.trim() && images.length === 0}
                className="w-full mt-4 bg-facebook text-white py-2 rounded-lg font-semibold hover:bg-facebook-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;