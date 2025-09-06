import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostState } from '../../types';
import postService from '../../services/postService';

// Mock posts for development
const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    content: 'Just finished building an amazing React application! 🚀',
    images: ['https://picsum.photos/600/400?random=1'],
    privacy: 'public',
    reactions: [
      { id: '1', userId: '3', type: 'like', targetId: '1', targetType: 'post', createdAt: new Date().toISOString() },
      { id: '2', userId: '4', type: 'love', targetId: '1', targetType: 'post', createdAt: new Date().toISOString() },
    ],
    comments: [
      {
        id: '1',
        postId: '1',
        userId: '3',
        content: 'Great work! Keep it up!',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        user: {
          id: '3',
          email: 'jane@example.com',
          username: 'janesmith',
          firstName: 'Jane',
          lastName: 'Smith',
          profilePicture: 'https://i.pravatar.cc/150?img=2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        reactions: [],
      },
    ],
    shares: 5,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    user: {
      id: '2',
      email: 'alice@example.com',
      username: 'alicejohnson',
      firstName: 'Alice',
      lastName: 'Johnson',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '2',
    userId: '3',
    content: 'Beautiful sunset today! Nature never fails to amaze me 🌅',
    images: ['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3'],
    privacy: 'friends',
    reactions: [
      { id: '3', userId: '1', type: 'love', targetId: '2', targetType: 'post', createdAt: new Date().toISOString() },
      { id: '4', userId: '2', type: 'wow', targetId: '2', targetType: 'post', createdAt: new Date().toISOString() },
      { id: '5', userId: '4', type: 'like', targetId: '2', targetType: 'post', createdAt: new Date().toISOString() },
    ],
    comments: [],
    shares: 2,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
    user: {
      id: '3',
      email: 'bob@example.com',
      username: 'bobwilliams',
      firstName: 'Bob',
      lastName: 'Williams',
      profilePicture: 'https://i.pravatar.cc/150?img=4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '3',
    userId: '4',
    content: 'Started learning TypeScript today! Any tips for beginners? 🤔💻',
    privacy: 'public',
    reactions: [
      { id: '6', userId: '1', type: 'like', targetId: '3', targetType: 'post', createdAt: new Date().toISOString() },
    ],
    comments: [
      {
        id: '2',
        postId: '3',
        userId: '1',
        content: 'Start with the official documentation and practice with small projects!',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
        user: {
          id: '1',
          email: 'john@example.com',
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: 'https://i.pravatar.cc/150?img=1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        reactions: [{ id: '7', userId: '4', type: 'like', targetId: '2', targetType: 'comment', createdAt: new Date().toISOString() }],
      },
    ],
    shares: 0,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    updatedAt: new Date(Date.now() - 21600000).toISOString(),
    user: {
      id: '4',
      email: 'emma@example.com',
      username: 'emmadavis',
      firstName: 'Emma',
      lastName: 'Davis',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

// Use mock posts in development
const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

const initialState: PostState = {
  posts: USE_MOCK_DATA ? mockPosts : [],
  currentPost: null,
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await postService.getFeed();
  return response;
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: Partial<Post>) => {
    const response = await postService.createPost(postData);
    return response;
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, reactionType }: { postId: string; reactionType: string }) => {
    const response = await postService.reactToPost(postId, reactionType);
    return { postId, reaction: response };
  }
);

export const commentOnPost = createAsyncThunk(
  'posts/commentOnPost',
  async ({ postId, content }: { postId: string; content: string }) => {
    const response = await postService.commentOnPost(postId, content);
    return { postId, comment: response };
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setMockPosts: (state) => {
      state.posts = mockPosts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.reactions.push(action.payload.reaction);
        }
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.comments.push(action.payload.comment);
        }
      });
  },
});

export const { setCurrentPost, clearError, setMockPosts } = postSlice.actions;
export default postSlice.reducer;