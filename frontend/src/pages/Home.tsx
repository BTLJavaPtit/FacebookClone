import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPosts } from '../redux/slices/postSlice';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CreatePost from '../components/post/CreatePost';
import PostCard from '../components/post/PostCard';
import RightSidebar from '../components/layout/RightSidebar';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="flex">
        <Sidebar />
        
        {/* Main Feed */}
        <main className="flex-1 max-w-2xl mx-auto py-4 px-4">
          <CreatePost />
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-facebook"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;