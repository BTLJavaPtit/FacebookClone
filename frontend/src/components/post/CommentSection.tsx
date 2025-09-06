import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../../types';
import { HandThumbUpIcon as ThumbUpIcon } from '@heroicons/react/24/outline';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

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

  const renderComment = (comment: Comment, isReply: boolean = false) => (
    <div key={comment.id} className={`flex space-x-2 ${isReply ? 'ml-10' : ''} mb-3`}>
      <Link to={`/profile/${comment.user?.id}`}>
        <img
          src={comment.user?.profilePicture || 'https://via.placeholder.com/32'}
          alt={comment.user?.firstName}
          className="w-8 h-8 rounded-full"
        />
      </Link>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
          <Link
            to={`/profile/${comment.user?.id}`}
            className="font-semibold text-sm hover:underline"
          >
            {comment.user?.firstName} {comment.user?.lastName}
          </Link>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
          <button className="hover:underline">Like</button>
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="hover:underline"
          >
            Reply
          </button>
          <span>{getTimeAgo(comment.createdAt)}</span>
          {comment.reactions.length > 0 && (
            <div className="flex items-center space-x-1">
              <ThumbUpIcon className="w-3 h-3 text-facebook" />
              <span>{comment.reactions.length}</span>
            </div>
          )}
        </div>

        {/* Reply Input */}
        {replyingTo === comment.id && (
          <div className="flex items-center space-x-2 mt-2">
            <img
              src="https://via.placeholder.com/24"
              alt="User"
              className="w-6 h-6 rounded-full"
            />
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && replyText.trim()) {
                  // Handle reply submission
                  setReplyText('');
                  setReplyingTo(null);
                }
              }}
            />
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
      </div>
    </div>
  );

  return (
    <div>
      {comments.map(comment => renderComment(comment))}
    </div>
  );
};

export default CommentSection;