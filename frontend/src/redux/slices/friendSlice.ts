import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Friend, User } from '../../types';
import friendService from '../../services/friendService';

interface FriendState {
  friends: User[];
  friendRequests: Friend[];
  suggestions: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FriendState = {
  friends: [],
  friendRequests: [],
  suggestions: [],
  isLoading: false,
  error: null,
};

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async () => {
  const response = await friendService.getFriends();
  return response;
});

export const fetchFriendRequests = createAsyncThunk('friends/fetchRequests', async () => {
  const response = await friendService.getFriendRequests();
  return response;
});

export const sendFriendRequest = createAsyncThunk(
  'friends/sendRequest',
  async (userId: string) => {
    const response = await friendService.sendFriendRequest(userId);
    return response;
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptRequest',
  async (requestId: string) => {
    const response = await friendService.acceptFriendRequest(requestId);
    return response;
  }
);

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch friends';
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.friendRequests = state.friendRequests.filter(
          req => req.id !== action.meta.arg
        );
      });
  },
});

export const { clearError } = friendSlice.actions;
export default friendSlice.reducer;