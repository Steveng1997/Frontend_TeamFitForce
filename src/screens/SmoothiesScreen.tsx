import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { ArrowLeftIcon, CheckIcon } from '../components/SvgIcons';
import { smoothieService, type SmoothieItem } from '../services/smoothieService';

export const SmoothiesScreen: React.FC = () => {
  const { navigate, theme } = useApp();
  const isDark = theme === 'dark';

  const [smoothies, setSmoothies] = useState<SmoothieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSmoothies() {
      setLoading(true);
      try {
        const list = await smoothieService.getSmoothies();
        if (list) {
          setSmoothies(list);
        }
      } catch (err) {
        console.warn('Error al cargar batidos desde la API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSmoothies();
  }, []);

  const handleToggleConsume = async (id: string) => {
    setSmoothies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isConsumed: !item.isConsumed } : item))
    );
    await smoothieService.toggleConsume(id);
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
            Batidos Funcionales
          </h1>
          <div className="w-9" />
        </div>

        {/* Phase Subtitle Badge */}
        <div className="text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 shadow-sm">
            FASE ACTIVA: OPTIMIZACIÓN DEL PROGRESO
          </span>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-10 space-y-2">
            <span className="text-2xl animate-spin inline-block">⚡</span>
            <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Cargando batidos adaptativos desde la API...
            </p>
          </div>
        )}

        {/* Smoothie Cards */}
        {!loading && smoothies.map((sm, index) => (
          <div
            key={sm.id || index}
            className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 shadow-lg relative overflow-hidden ${
              isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xl shadow-inner ${
                    sm.type === 'verde'
                      ? 'bg-emerald-500/20 border-emerald-500/40'
                      : 'bg-purple-500/20 border-purple-500/40'
                  }`}
                >
                  {sm.type === 'verde' ? '🟢' : '🟣'}
                </div>
                <div>
                  <h2 className={`text-base font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {sm.title}
                  </h2>
                  <span
                    className={`text-[11px] font-bold ${
                      sm.type === 'verde' ? 'text-[#10b981]' : 'text-purple-400'
                    }`}
                  >
                    {sm.consumptionTiming}
                  </span>
                </div>
              </div>

              {/* Consumido Badge */}
              <button
                onClick={() => handleToggleConsume(sm.id)}
                className={`px-3 py-1 rounded-xl text-xs font-black flex items-center space-x-1 transition-all cursor-pointer ${
                  sm.isConsumed
                    ? sm.type === 'verde'
                      ? 'bg-[#10b981] text-slate-950 shadow-md'
                      : 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-700/50 text-slate-400'
                }`}
              >
                {sm.isConsumed && <CheckIcon size={14} />}
                <span>{sm.isConsumed ? 'Consumido' : 'Marcar'}</span>
              </button>
            </div>

            {/* Detailed Ingredients */}
            {sm.ingredients && sm.ingredients.length > 0 && (
              <div className="mt-4 space-y-2 pt-3 border-t border-slate-700/40">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ingredientes Fórmulas:
                </span>
                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {Array.isArray(sm.ingredients) ? sm.ingredients.join(', ') : sm.ingredients}
                </p>
              </div>
            )}

            {/* Expert Evidence Box */}
            {sm.benefits && sm.benefits.length > 0 && (
              <div
                className={`mt-4 p-3.5 rounded-2xl border text-xs ${
                  sm.type === 'verde'
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : isDark
                    ? 'bg-purple-950/40 border-purple-800/40 text-purple-200'
                    : 'bg-purple-50 border-purple-200 text-purple-900'
                }`}
              >
                <span
                  className={`font-black block text-[11px] uppercase tracking-wide mb-0.5 ${
                    sm.type === 'verde' ? 'text-[#10b981]' : 'text-purple-400'
                  }`}
                >
                  🧪 Evidencia Experta:
                </span>
                <p className="leading-snug">
                  {Array.isArray(sm.benefits) ? sm.benefits.join('. ') : sm.benefits}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
