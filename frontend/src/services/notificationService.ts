import api from './api';
import { Notification } from '../types';

class NotificationService {
  async getNotifications(page: number = 1, limit: number = 20): Promise<Notification[]> {
    const response = await api.get('/notifications', { params: { page, limit } });
    return response.data;
  }

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications/unread-count');
    return response.data.count;
  }

  async markAsRead(notificationId: string): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<void> {
    await api.put('/notifications/read-all');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/notifications/${notificationId}`);
  }

  async updateNotificationSettings(settings: any): Promise<void> {
    await api.put('/notifications/settings', settings);
  }

  async getNotificationSettings(): Promise<any> {
    const response = await api.get('/notifications/settings');
    return response.data;
  }
}

export default new NotificationService();