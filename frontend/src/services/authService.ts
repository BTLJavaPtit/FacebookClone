import api from './api';
import { User } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData: Partial<User> & { password: string }): Promise<LoginResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/users/profile', userData);
    return response.data;
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await api.put('/auth/change-password', { oldPassword, newPassword });
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  }
}

export default new AuthService();