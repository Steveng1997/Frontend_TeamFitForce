import { apiRequest } from './apiClient';

export interface BiometricSummary {
  userId: string;
  date: string;
  steps: number;
  stepsGoal: number;
  stepsPercentage: number;
  activeCalories: number;
  caloriesGoal: number;
  streakDays: number;
  restingHeartRate: number;
  biochemScore: number;
}

export const biometricService = {
  async getTodayBiometrics(): Promise<BiometricSummary | null> {
    const res = await apiRequest<BiometricSummary>('/biometrics/today');
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  async logBiometrics(data: { steps?: number; activeCalories?: number; restingHeartRate?: number }) {
    const res = await apiRequest<BiometricSummary>('/biometrics/log', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res;
  },
};
