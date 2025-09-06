import api from './api';
import { User, Friend } from '../types';

class FriendService {
  async getFriends(): Promise<User[]> {
    const response = await api.get('/friends');
    return response.data;
  }

  async getFriendRequests(): Promise<Friend[]> {
    const response = await api.get('/friends/requests');
    return response.data;
  }

  async getSentRequests(): Promise<Friend[]> {
    const response = await api.get('/friends/requests/sent');
    return response.data;
  }

  async getFriendSuggestions(): Promise<User[]> {
    const response = await api.get('/friends/suggestions');
    return response.data;
  }

  async sendFriendRequest(userId: string): Promise<Friend> {
    const response = await api.post('/friends/request', { friendId: userId });
    return response.data;
  }

  async acceptFriendRequest(requestId: string): Promise<void> {
    await api.put(`/friends/accept/${requestId}`);
  }

  async rejectFriendRequest(requestId: string): Promise<void> {
    await api.delete(`/friends/reject/${requestId}`);
  }

  async cancelFriendRequest(requestId: string): Promise<void> {
    await api.delete(`/friends/cancel/${requestId}`);
  }

  async unfriend(friendId: string): Promise<void> {
    await api.delete(`/friends/${friendId}`);
  }

  async blockUser(userId: string): Promise<void> {
    await api.post(`/users/${userId}/block`);
  }

  async unblockUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}/block`);
  }

  async getMutualFriends(userId: string): Promise<User[]> {
    const response = await api.get(`/friends/mutual/${userId}`);
    return response.data;
  }

  async searchFriends(query: string): Promise<User[]> {
    const response = await api.get('/friends/search', { params: { q: query } });
    return response.data;
  }
}

export default new FriendService();