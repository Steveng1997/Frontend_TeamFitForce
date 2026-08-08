import { apiRequest } from './apiClient';
import type { UserProfile } from '../types';

export interface AuthResponseData {
  user: UserProfile;
  token: string;
}

export const authService = {
  async login(usernameOrEmail: string, password: string): Promise<{ success: boolean; data?: AuthResponseData; error?: string; message?: string }> {
    const res = await apiRequest<AuthResponseData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (res.success && res.data?.token) {
      localStorage.setItem('teamfit_token', res.data.token);
    }
    return res;
  },

  async register(name: string, username: string, email: string, password: string): Promise<{ success: boolean; data?: AuthResponseData; error?: string; message?: string }> {
    const res = await apiRequest<AuthResponseData>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
    });

    if (res.success && res.data?.token) {
      localStorage.setItem('teamfit_token', res.data.token);
    }
    return res;
  },

  async getProfile(): Promise<UserProfile | null> {
    const res = await apiRequest<UserProfile>('/users/profile');
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    const res = await apiRequest<UserProfile>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  logout() {
    localStorage.removeItem('teamfit_token');
  },
};
