import { apiRequest } from './apiClient';

export interface CoachMessageItem {
  id?: string;
  sender: 'user' | 'coach';
  content: string;
  timestamp: string;
}

export const coachService = {
  async getHistory(): Promise<CoachMessageItem[]> {
    const res = await apiRequest<CoachMessageItem[]>('/coach/history');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async sendMessage(message: string): Promise<CoachMessageItem | null> {
    const res = await apiRequest<{ message: string; voiceTone: string }>('/coach/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

    if (res.success && res.data) {
      return {
        sender: 'coach',
        content: res.data.message,
        timestamp: new Date().toISOString(),
      };
    }
    return null;
  },

  async triggerMotivate(): Promise<string | null> {
    const res = await apiRequest<{ message: string }>('/coach/motivate', {
      method: 'POST',
    });

    if (res.success && res.data) {
      return res.data.message;
    }
    return null;
  },
};
