export type ScreenType =
  | 'auth'
  | 'biometric'
  | 'profile'
  | 'home'
  | 'food_fit'
  | 'ingredient_detail'
  | 'recipe_detail'
  | 'smoothies'
  | 'routine'
  | 'medical'
  | 'coach';

export type TabType = 'inicio' | 'food_fit' | 'rutinas' | 'medica' | 'coach';

export interface UserProfile {
  name: string;
  username?: string;
  email?: string;
  age: string;
  weight: string;
  size: string;
  height: string;
  goal: string;
}

export type BiomarkerStatus = 'optimal' | 'stable' | 'high' | 'low';

export interface BiomarkerItem {
  id: string;
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: BiomarkerStatus;
  statusLabel: string;
  category: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
}

export interface WorkoutRoutineAI {
  title: string;
  phase: string;
  targetZone: string;
  weeklyFrequency: string;
  safetyNotes: string;
  exercises: WorkoutExercise[];
}

export interface MedicalAnalysisResult {
  biochemScore: number;
  alertCount: number;
  alertLevel: 'low' | 'medium' | 'high';
  summary: string;
  recommendedFoods: string[];
  restrictedFoods: string[];
  exerciseAdjustments: string[];
  workoutRoutine?: WorkoutRoutineAI | null;
  nextExamDays: number;
  nextExamText: string;
}
