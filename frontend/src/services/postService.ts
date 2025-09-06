import api from './api';
import { Post, Comment, Reaction } from '../types';

class PostService {
  async getFeed(page: number = 1, limit: number = 10): Promise<Post[]> {
    const response = await api.get('/posts/feed', { params: { page, limit } });
    return response.data;
  }

  async getPost(postId: string): Promise<Post> {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    const formData = new FormData();
    
    if (postData.content) formData.append('content', postData.content);
    if (postData.privacy) formData.append('privacy', postData.privacy);
    if (postData.location) formData.append('location', postData.location);
    
    if (postData.images && postData.images.length > 0) {
      postData.images.forEach((image, index) => {
        formData.append('images', image);
      });
    }

    const response = await api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async updatePost(postId: string, postData: Partial<Post>): Promise<Post> {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  }

  async deletePost(postId: string): Promise<void> {
    await api.delete(`/posts/${postId}`);
  }

  async reactToPost(postId: string, reactionType: string): Promise<Reaction> {
    const response = await api.post(`/posts/${postId}/react`, { type: reactionType });
    return response.data;
  }

  async removeReaction(postId: string): Promise<void> {
    await api.delete(`/posts/${postId}/react`);
  }

  async commentOnPost(postId: string, content: string, parentCommentId?: string): Promise<Comment> {
    const response = await api.post(`/posts/${postId}/comment`, { 
      content, 
      parentCommentId 
    });
    return response.data;
  }

  async updateComment(commentId: string, content: string): Promise<Comment> {
    const response = await api.put(`/comments/${commentId}`, { content });
    return response.data;
  }

  async deleteComment(commentId: string): Promise<void> {
    await api.delete(`/comments/${commentId}`);
  }

  async sharePost(postId: string, content?: string): Promise<Post> {
    const response = await api.post(`/posts/${postId}/share`, { content });
    return response.data;
  }
}

export default new PostService();