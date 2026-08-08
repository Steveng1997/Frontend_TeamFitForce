import { apiRequest } from './apiClient';

export interface SmoothieItem {
  id: string;
  title: string;
  type: string;
  phase: string;
  consumptionTiming: string;
  ingredients: string[];
  benefits: string[];
  isConsumed: boolean;
  consumedAt?: string;
}

export const smoothieService = {
  async getSmoothies(): Promise<SmoothieItem[]> {
    const res = await apiRequest<SmoothieItem[]>('/smoothies');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async toggleConsume(id: string): Promise<SmoothieItem | null> {
    const res = await apiRequest<SmoothieItem>(`/smoothies/${id}/toggle-consume`, {
      method: 'PATCH',
    });
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },
};
