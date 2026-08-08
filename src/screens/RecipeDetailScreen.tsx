import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { ArrowLeftIcon, PlusIcon, MinusIcon } from '../components/SvgIcons';
import { nutritionService, type RecipeItem } from '../services/nutritionService';

export const RecipeDetailScreen: React.FC = () => {
  const { selectedRecipeId, navigate, theme } = useApp();
  const isDark = theme === 'dark';
  const [portions, setPortions] = useState<number>(1);
  const [recipe, setRecipe] = useState<RecipeItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      try {
        const item = await nutritionService.getRecipeById(selectedRecipeId || 'rec1');
        if (item) {
          setRecipe(item);
        } else {
          const list = await nutritionService.getRecipes();
          if (list && list.length > 0) {
            setRecipe(list[0]);
          }
        }
      } catch (err) {
        console.warn('Error al cargar detalle de receta desde API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecipe();
  }, [selectedRecipeId]);

  const handleDecrease = () => {
    if (portions > 1) setPortions(portions - 1);
  };

  const handleIncrease = () => {
    if (portions < 6) setPortions(portions + 1);
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('food_fit')}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeftIcon size={18} />
          </button>
          <h1 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Detalle de Receta
          </h1>
          <div className="w-9" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10 space-y-2">
            <span className="text-2xl animate-spin inline-block">⚡</span>
            <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Cargando receta inteligente desde la base de datos...
            </p>
          </div>
        )}

        {!loading && recipe && (
          <>
            {/* Recipe Title & Hero Info */}
            <div className="space-y-2.5">
              <h2 className={`text-2xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {recipe.title}
              </h2>

              {/* Info Badges */}
              <div className="space-y-1.5">
                <div className="inline-block px-3 py-1 bg-blue-500/15 border border-blue-500/30 rounded-xl text-[11px] font-bold text-blue-400">
                  Fuente: Guías OMS / USDA FoodData Central
                </div>
                <div className="block px-3 py-1.5 bg-[#10b981]/15 border border-[#10b981]/30 rounded-xl text-[11px] font-bold text-[#10b981]">
                  {recipe.ragBadge || 'Ajustado a tu Bóveda Médica: Bajo índice glucémico y alto perfil proteico.'}
                </div>
              </div>
            </div>

            {/* Portion Controller Card */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-xl flex items-center justify-between transition-colors duration-300 shadow-md ${
                isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Porciones sugeridas
                </span>
                <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {portions} {portions === 1 ? 'Porción' : 'Porciones'}
                </span>
              </div>

              {/* Controls - and + */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrease}
                  disabled={portions <= 1}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold active:scale-95 transition-all cursor-pointer ${
                    portions <= 1
                      ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-500'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <MinusIcon size={16} />
                </button>
                <button
                  onClick={handleIncrease}
                  disabled={portions >= 6}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold active:scale-95 transition-all cursor-pointer ${
                    portions >= 6
                      ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-500'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Nutrition Overview Cards */}
            <div className="grid grid-cols-4 gap-2">
              <div className={`p-3 rounded-2xl border text-center ${isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Calorías</span>
                <span className="text-sm font-black text-[#10b981]">
                  {recipe.calories * portions} kcal
                </span>
              </div>
              <div className={`p-3 rounded-2xl border text-center ${isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Proteína</span>
                <span className="text-sm font-black text-emerald-400">
                  {recipe.protein * portions}g
                </span>
              </div>
              <div className={`p-3 rounded-2xl border text-center ${isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Carbos</span>
                <span className="text-sm font-black text-amber-400">
                  {(recipe.carbs || 45) * portions}g
                </span>
              </div>
              <div className={`p-3 rounded-2xl border text-center ${isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Grasas</span>
                <span className="text-sm font-black text-purple-400">
                  {(recipe.fats || 16) * portions}g
                </span>
              </div>
            </div>

            {/* Ingredients List */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ingredientes Requeridos
                </h3>

                <div className="space-y-2">
                  {recipe.ingredients.map((ing: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => navigate('ingredient_detail')}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isDark ? 'bg-[#141c2e]/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className={`text-xs font-black block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {typeof ing === 'string' ? ing : ing.name}
                        </span>
                        {typeof ing === 'object' && ing.tag && (
                          <span className="text-[10px] font-bold text-[#10b981]">{ing.tag}</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-400">Ver nutriente →</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
