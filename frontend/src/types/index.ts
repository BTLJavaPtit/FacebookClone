export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  coverPhoto?: string;
  bio?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user?: User;
  content: string;
  images?: string[];
  video?: string;
  privacy: 'public' | 'friends' | 'private';
  location?: string;
  tags?: User[];
  reactions: Reaction[];
  comments: Comment[];
  shares: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  parentCommentId?: string;
  replies?: Comment[];
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: string;
  userId: string;
  user?: User;
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  targetId: string;
  targetType: 'post' | 'comment';
  createdAt: string;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'friend_request' | 'post_like' | 'post_comment' | 'mention' | 'birthday';
  content: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
}