import { apiRequest } from './apiClient';

export interface MacroDetail {
  current: number;
  target: number;
  unit: string;
}

export interface NutritionSummary {
  userId: string;
  date: string;
  caloriesConsumed: number;
  caloriesTarget: number;
  caloriesRemaining: number;
  caloriesBurned: number;
  macros: {
    protein: MacroDetail;
    carbs: MacroDetail;
    fats: MacroDetail;
  };
}

export interface RecipeItem {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ragBadge: string;
  ragReason: string;
  ingredients: string[];
  preparationSteps: string[];
}

export const nutritionService = {
  async getSummary(): Promise<NutritionSummary | null> {
    const res = await apiRequest<NutritionSummary>('/nutrition/summary');
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  async logMeal(meal: { mealName: string; calories: number; protein: number; carbs: number; fat: number }) {
    return await apiRequest<NutritionSummary>('/nutrition/log-meal', {
      method: 'POST',
      body: JSON.stringify(meal),
    });
  },

  async getRecipes(category?: string): Promise<RecipeItem[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await apiRequest<RecipeItem[]>(`/nutrition/recipes${query}`);
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async getRecipeById(id: string): Promise<RecipeItem | null> {
    const res = await apiRequest<RecipeItem>(`/nutrition/recipes/${id}`);
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },
};
