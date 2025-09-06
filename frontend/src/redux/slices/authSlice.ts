import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';
import authService from '../../services/authService';

// Mock user for development
const mockUser: User = {
  id: '1',
  email: 'demo@facebook.com',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  profilePicture: 'https://i.pravatar.cc/150?img=1',
  coverPhoto: 'https://picsum.photos/1200/400',
  bio: 'Software Developer | Tech Enthusiast',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Enable mock auth for development
const USE_MOCK_AUTH = process.env.NODE_ENV === 'development';

const initialState: AuthState = {
  user: USE_MOCK_AUTH ? mockUser : null,
  token: USE_MOCK_AUTH ? 'mock-token-123' : localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authService.login(email, password);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: Partial<User> & { password: string }) => {
    const response = await authService.register(userData);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setMockAuth: (state) => {
      state.user = mockUser;
      state.token = 'mock-token-123';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { setUser, clearError, setMockAuth } = authSlice.actions;
export default authSlice.reducer;