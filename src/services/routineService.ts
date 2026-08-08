import { apiRequest } from './apiClient';

export interface ExerciseItem {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface RoutineDetail {
  id: string;
  title: string;
  phase: string;
  day: number;
  durationSeconds: number;
  durationFormatted: string;
  progressSeconds: number;
  progressFormatted: string;
  heartRateBpm: number;
  targetZone: string;
  burnedCalories: number;
  videoUrl: string;
  exercises: ExerciseItem[];
}

export const routineService = {
  async getRoutines(): Promise<RoutineDetail[]> {
    const res = await apiRequest<RoutineDetail[]>('/routines');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async saveProgress(routineId: string, progressSeconds: number) {
    return await apiRequest(`/routines/${routineId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ progressSeconds }),
    });
  },
};
