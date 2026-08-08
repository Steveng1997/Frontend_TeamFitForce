import React from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { ArrowLeftIcon } from '../components/SvgIcons';

export const IngredientDetailScreen: React.FC = () => {
  const { navigate, theme } = useApp();
  const isDark = theme === 'dark';

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
            Detalle de Ingrediente
          </h1>
          <div className="w-9" />
        </div>

        {/* Hero Card for Espárragos */}
        <div
          className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-colors duration-300 shadow-xl ${
            isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Header Image Banner */}
          <div className="h-44 bg-gradient-to-tr from-emerald-700 to-green-500 relative flex items-center justify-center overflow-hidden">
            <span className="text-6xl drop-shadow-md">🌿</span>
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-wider border border-white/20">
              Superalimento Prebiótico
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Espárragos
                </h2>
                <span className="text-xs font-bold text-[#10b981]">
                  Asparagus officinalis
                </span>
              </div>
              <button className="px-4 py-2 bg-[#10b981] text-slate-950 font-black text-xs rounded-2xl shadow-md flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all">
                <span>⏱️</span>
                <span>25 min</span>
              </button>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Los espárragos son una excelente fuente de folato, fósforo, potasio y vitaminas A, C y K. Poseen un alto contenido de inulina, una fibra prebiótica que estimula la microbiota intestinal y mejora la absorción de nutrientes según tu perfil bioquímico.
            </p>

            {/* Quick Nutrient Badges */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Calorías</span>
                <span className="text-sm font-extrabold text-[#10b981]">20 kcal</span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Fibra</span>
                <span className="text-sm font-extrabold text-blue-500">2.1 g</span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Índice Glic.</span>
                <span className="text-sm font-extrabold text-orange-500">Bajo (15)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Batidos Funcionales Adaptativos */}
        <div
          onClick={() => navigate('smoothies')}
          className={`p-4 rounded-3xl border cursor-pointer transition-all duration-300 shadow-md active:scale-[0.99] flex items-center justify-between ${
            isDark
              ? 'bg-gradient-to-r from-[#141c2e] to-purple-950/40 border-purple-800/40 hover:border-purple-600/60'
              : 'bg-gradient-to-r from-purple-50 to-emerald-50 border-purple-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl shadow-inner">
              🥤
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block">
                Sección Recomendada
              </span>
              <h3 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Batidos Funcionales Adaptativos
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Optimización de recuperación en Fase Activa
              </p>
            </div>
          </div>
          <span className="text-base text-purple-400 font-bold">›</span>
        </div>

        {/* Shortcut to full recipe detail */}
        <button
          onClick={() => navigate('recipe_detail')}
          className="w-full py-3.5 px-5 bg-[#10b981] hover:bg-emerald-600 text-slate-950 font-black text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 active:scale-98 transition-all cursor-pointer"
        >
          <span>Ver Receta Completa (Bowl de Pollo)</span>
          <span>→</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
