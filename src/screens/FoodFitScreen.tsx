import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { ArrowLeftIcon } from '../components/SvgIcons';
import { nutritionService, type NutritionSummary, type RecipeItem } from '../services/nutritionService';

export const FoodFitScreen: React.FC = () => {
  const { setSelectedRecipeId, navigate, theme } = useApp();
  const isDark = theme === 'dark';

  const [summary, setSummary] = useState<NutritionSummary | null>(null);
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const sum = await nutritionService.getSummary();
        if (sum) setSummary(sum);

        const list = await nutritionService.getRecipes();
        if (list) setRecipes(list);
      } catch (err) {
        console.warn('Error cargando datos de nutrición desde la API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const caloriesRatio = summary && summary.caloriesTarget > 0 ? summary.caloriesConsumed / summary.caloriesTarget : 0;
  const strokeOffset = 251.2 * (1 - Math.min(1, caloriesRatio));

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
    navigate('recipe_detail');
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('home', 'inicio')}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeftIcon size={18} />
            </button>
            <div>
              <h1 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Food Fit 360°
              </h1>
              <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Plan adaptativo basado en tu perfil y Bóveda Médica.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('medical', 'medica')}
            className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center space-x-1 cursor-pointer active:scale-95 transition-transform"
          >
            <span>🩺 Bóveda Sync</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10 space-y-2">
            <span className="text-2xl animate-spin inline-block">⚡</span>
            <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Cargando resumen de nutrición desde la API...
            </p>
          </div>
        )}

        {!loading && summary && (
          <>
            {/* Circular Chart & Calories Breakdown Card */}
            <div
              className={`rounded-3xl p-5 border backdrop-blur-xl shadow-lg transition-colors duration-300 ${
                isDark
                  ? 'bg-[#141c2e]/90 border-slate-800/80'
                  : 'bg-white border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Green Circular Progress Ring */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={isDark ? '#1e293b' : '#e2e8f0'}
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray={251.2}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black leading-none text-[#10b981]">
                      {summary.caloriesConsumed.toLocaleString('en-US')}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      kcal
                    </span>
                  </div>
                </div>

                {/* Right Text Breakdown */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <div>
                      <span className={`text-xs font-extrabold block leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Consumidas {summary.caloriesConsumed.toLocaleString('en-US')} kcal
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Meta: {summary.caloriesTarget.toLocaleString('en-US')} kcal
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <div>
                      <span className={`text-xs font-bold block leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Restantes {summary.caloriesRemaining.toLocaleString('en-US')} kcal
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Para completar tu día
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <div>
                      <span className={`text-xs font-bold block leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Quemadas {summary.caloriesBurned.toLocaleString('en-US')} kcal
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Ejercicio activo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Macro Progress Bars */}
              {summary.macros && (
                <div className="mt-6 space-y-3.5 pt-4 border-t border-slate-700/40">
                  {/* Proteína */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-[#10b981]">Proteína</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {summary.macros.protein?.current || 0} / {summary.macros.protein?.target || 0}g
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            ((summary.macros.protein?.current || 0) / (summary.macros.protein?.target || 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Carbohidratos */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-[#f59e0b]">Carbohidratos</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {summary.macros.carbs?.current || 0} / {summary.macros.carbs?.target || 0}g
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-[#f59e0b] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            ((summary.macros.carbs?.current || 0) / (summary.macros.carbs?.target || 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Grasas */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-purple-400">Grasas Saludables</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {summary.macros.fats?.current || 0} / {summary.macros.fats?.target || 0}g
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            ((summary.macros.fats?.current || 0) / (summary.macros.fats?.target || 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Adaptative Smoothies Banner */}
            <div
              onClick={() => navigate('smoothies')}
              className="rounded-3xl p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between cursor-pointer shadow-lg active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🥤</span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 block">
                    Batidos Funcionales Adaptativos
                  </span>
                  <h2 className="text-sm font-black leading-tight">
                    Verde Metabólico & Antiinflamatorio
                  </h2>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md">
                Ver →
              </span>
            </div>

            {/* Suggested Recipes List */}
            <div className="space-y-3 pt-1">
              <h2 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Recetas Inteligentes Sugeridas (RAG Nutricional)
              </h2>

              {recipes.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleSelectRecipe(rec.id)}
                  className={`p-4 rounded-2xl border backdrop-blur-xl flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md ${
                    isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#10b981]/20 text-[#10b981] mb-1 inline-block">
                      {rec.ragBadge || 'Sugerido RAG'}
                    </span>
                    <h3 className={`text-sm font-black leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {rec.title}
                    </h3>
                    <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {rec.calories} kcal • {rec.protein}g proteína • {rec.prepTime || '20 min'}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#10b981]">Ver receta →</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
