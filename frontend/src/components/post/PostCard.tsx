import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { likePost, commentOnPost } from '../../redux/slices/postSlice';
import { Post, Comment } from '../../types';
import {
  HandThumbUpIcon as ThumbUpIcon,
  ChatBubbleLeftEllipsisIcon as ChatAltIcon,
  ShareIcon,
  EllipsisHorizontalIcon as DotsHorizontalIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as ThumbUpSolidIcon,
  HeartIcon,
  FaceSmileIcon as EmojiHappyIcon,
  FaceSmileIcon as EmojiSadIcon,
} from '@heroicons/react/24/solid';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showReactions, setShowReactions] = useState(false);

  const hasLiked = post.reactions.some(r => r.userId === user?.id);

  const handleReaction = async (type: string) => {
    await dispatch(likePost({ postId: post.id, reactionType: type }));
    setShowReactions(false);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    await dispatch(commentOnPost({ postId: post.id, content: commentText }));
    setCommentText('');
    setShowComments(true);
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const reactionIcons = {
    like: '👍',
    love: '❤️',
    haha: '😂',
    wow: '😮',
    sad: '😢',
    angry: '😡',
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.user?.id}`}>
              <img
                src={post.user?.profilePicture || 'https://via.placeholder.com/40'}
                alt={post.user?.firstName}
                className="w-10 h-10 rounded-full"
              />
            </Link>
            <div>
              <Link
                to={`/profile/${post.user?.id}`}
                className="font-semibold hover:underline"
              >
                {post.user?.firstName} {post.user?.lastName}
              </Link>
              <div className="flex items-center text-sm text-gray-500">
                <span>{getTimeAgo(post.createdAt)}</span>
                <span className="mx-1">·</span>
                <span className="capitalize">{post.privacy}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <DotsHorizontalIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-full object-cover"
              style={{ maxHeight: '500px' }}
            />
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          {post.reactions.length > 0 && (
            <>
              <div className="flex -space-x-1">
                {['like', 'love', 'haha'].map((type) => {
                  const count = post.reactions.filter(r => r.type === type).length;
                  if (count === 0) return null;
                  return (
                    <span key={type} className="text-base">
                      {reactionIcons[type as keyof typeof reactionIcons]}
                    </span>
                  );
                })}
              </div>
              <span>{post.reactions.length}</span>
            </>
          )}
        </div>
        <div className="flex space-x-3">
          {post.comments.length > 0 && (
            <span>{post.comments.length} Comments</span>
          )}
          {post.shares > 0 && (
            <span>{post.shares} Shares</span>
          )}
        </div>
      </div>

      <hr className="mx-4" />

      {/* Post Actions */}
      <div className="px-4 py-1 relative">
        <div className="flex justify-around">
          <button
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setTimeout(() => setShowReactions(false), 500)}
            onClick={() => handleReaction('like')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${
              hasLiked ? 'text-facebook' : 'text-gray-600'
            }`}
          >
            {hasLiked ? (
              <ThumbUpSolidIcon className="w-5 h-5" />
            ) : (
              <ThumbUpIcon className="w-5 h-5" />
            )}
            <span>Like</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <ChatAltIcon className="w-5 h-5" />
            <span>Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <ShareIcon className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Reactions Popup */}
        {showReactions && (
          <div
            className="absolute bottom-12 left-4 bg-white rounded-full shadow-lg px-2 py-1 flex space-x-1"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            {Object.entries(reactionIcons).map(([type, icon]) => (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                className="hover:scale-125 transition-transform text-2xl p-1"
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className="mx-4" />

      {/* Comments Section */}
      {showComments && (
        <div className="p-4">
          <CommentSection comments={post.comments} postId={post.id} />
          
          {/* Add Comment */}
          <form onSubmit={handleComment} className="flex items-center space-x-2 mt-4">
            <img
              src={user?.profilePicture || 'https://via.placeholder.com/32'}
              alt={user?.firstName}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-transparent focus:outline-none"
              />
              <button type="button" className="ml-2">
                <EmojiHappyIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;