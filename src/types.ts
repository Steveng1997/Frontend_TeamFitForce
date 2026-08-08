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

export interface MedicalAnalysisResult {
  biochemScore: number;
  alertCount: number;
  alertLevel: 'low' | 'medium' | 'high';
  summary: string;
  recommendedFoods: string[];
  restrictedFoods: string[];
  exerciseAdjustments: string[];
  nextExamDays: number;
  nextExamText: string;
}
