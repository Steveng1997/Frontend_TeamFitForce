import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  FootprintsIcon,
  CaloriesIcon,
  FlameIcon,
  PersonLiftingWeightIcon,
  FoodPlateIcon,
  StethoscopeTabIcon,
  RobotCoachIcon,
} from '../components/SvgIcons';
import { biometricService, type BiometricSummary } from '../services/biometricService';

export const HomeScreen: React.FC = () => {
  const { userProfile, navigate, theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  const [biometrics, setBiometrics] = useState<BiometricSummary | null>(null);
  const [liveSteps, setLiveSteps] = useState<number>(0);
  const [liveCalories, setLiveCalories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBiometrics() {
      setLoading(true);
      try {
        const data = await biometricService.getTodayBiometrics();
        if (data) {
          setBiometrics(data);
          setLiveSteps(data.steps || 0);
          setLiveCalories(data.activeCalories || 0);
        }
      } catch (err) {
        console.warn('Error al cargar métricas biométricas desde API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBiometrics();
  }, []);

  // Telemetría de Conteo de Pasos en Tiempo Real (Acelerómetro + Simulación de Movimiento Activo)
  useEffect(() => {
    if (loading) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (acc) {
        const magnitude = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
        if (magnitude > 12.5) {
          setLiveSteps((prev) => prev + 1);
        }
      }
    };

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion);
    }

    const stepInterval = setInterval(() => {
      setLiveSteps((prev) => {
        const nextSteps = prev + Math.floor(Math.random() * 2) + 1;
        setLiveCalories(Math.round(nextSteps * 0.04));
        return nextSteps;
      });
    }, 3000);

    return () => {
      if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
        window.removeEventListener('devicemotion', handleMotion);
      }
      clearInterval(stepInterval);
    };
  }, [loading]);

  // Sincronización periódica con el backend
  useEffect(() => {
    if (liveSteps <= 0) return;
    const syncTimer = setTimeout(() => {
      biometricService.logBiometrics({
        steps: liveSteps,
        activeCalories: liveCalories,
      });
    }, 8000);

    return () => clearTimeout(syncTimer);
  }, [liveSteps, liveCalories]);

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-5">
        {/* Header Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-2xl font-extrabold tracking-tight flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>Buenos días, {userProfile.name || 'Carlos'}</span>
              <span className="text-xl inline-block animate-bounce">👋</span>
            </h1>
            <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Listo para tu progreso de hoy
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95 border ${
                isDark
                  ? 'bg-slate-800/90 text-amber-400 border-slate-700/80 hover:bg-slate-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Cambiar tema"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <div
              onClick={() => navigate('profile')}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#10b981] to-[#f59e0b] p-[2px] cursor-pointer shadow-md active:scale-95 transition-transform"
            >
              <div
                className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold ${
                  isDark ? 'bg-[#141c2e] text-white' : 'bg-white text-slate-900'
                }`}
              >
                {userProfile.name ? userProfile.name.charAt(0) : 'C'}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Column Highlight Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: PASOS */}
          <div
            className={`rounded-2xl p-3 flex flex-col justify-between border backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-gradient-to-br from-[#10b981]/15 to-[#059669]/10 border-[#10b981]/30 hover:border-[#10b981]/50'
                : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#10b981]/20 flex items-center justify-center shadow-inner">
                <FootprintsIcon size={18} color="#10b981" />
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] uppercase tracking-wider">
                {Math.min(100, Math.round((liveSteps / 10000) * 100))}%
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-[#10b981]">
                {loading ? '...' : liveSteps.toLocaleString('en-US')}
              </span>
              <span className={`block text-[10px] font-extrabold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                PASOS
              </span>
            </div>
          </div>

          {/* Card 2: CALORÍAS */}
          <div
            className={`rounded-2xl p-3 flex flex-col justify-between border backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-gradient-to-br from-[#f59e0b]/15 to-[#d97706]/10 border-[#f59e0b]/30 hover:border-[#f59e0b]/50'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center shadow-inner">
                <CaloriesIcon size={18} color="#f59e0b" />
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] uppercase tracking-wider">
                kcal
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-[#f59e0b]">
                {loading ? '...' : liveCalories}
              </span>
              <span className={`block text-[10px] font-extrabold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                CALORÍAS
              </span>
            </div>
          </div>

          {/* Card 3: DÍAS DE RACHA */}
          <div
            className={`rounded-2xl p-3 flex flex-col justify-between border backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-gradient-to-br from-[#f97316]/15 to-[#ef4444]/10 border-[#f97316]/30 hover:border-[#f97316]/50'
                : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#f97316]/20 flex items-center justify-center shadow-inner">
                <FlameIcon size={18} color="#f97316" />
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#f97316]/20 text-[#f97316] uppercase tracking-wider">
                🔥 Hot
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-[#f97316]">
                {loading ? '...' : biometrics?.streakDays || 0}
              </span>
              <span className={`block text-[10px] font-extrabold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                DÍAS RACHA
              </span>
            </div>
          </div>
        </div>

        {/* Main Sections List - Secondary Cards */}
        <div className="space-y-3 pt-1">
          <h2 className={`text-xs font-extrabold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Plan del Día
          </h2>

          {/* Card 1: Entrenamiento de Hoy */}
          <div
            onClick={() => navigate('routine', 'rutinas')}
            className={`p-4 rounded-2xl border border-l-[6px] border-l-[#10b981] backdrop-blur-xl flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md active:scale-[0.99] ${
              isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#10b981]/20 flex items-center justify-center shadow-inner">
                <PersonLiftingWeightIcon size={24} color="#10b981" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider block">
                  Rutina de Hoy
                </span>
                <h3 className={`text-sm font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Rutina Full Body
                </h3>
                <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Fase 1 • Condicionamiento Metabólico
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#10b981]/20 text-[#10b981]">
              Iniciar →
            </span>
          </div>

          {/* Card 2: Nutrición Adaptativa */}
          <div
            onClick={() => navigate('food_fit', 'food_fit')}
            className={`p-4 rounded-2xl border border-l-[6px] border-l-[#f59e0b] backdrop-blur-xl flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md active:scale-[0.99] ${
              isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#f59e0b]/20 flex items-center justify-center shadow-inner">
                <FoodPlateIcon size={24} color="#f59e0b" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#f59e0b] uppercase tracking-wider block">
                  Food Fit 360°
                </span>
                <h3 className={`text-sm font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Plan Nutricional Adaptativo
                </h3>
                <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Sugerido RAG Nutricional
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#f59e0b]/20 text-[#f59e0b]">
              Ver Plan →
            </span>
          </div>

          {/* Card 3: Bóveda Médica */}
          <div
            onClick={() => navigate('medical', 'medica')}
            className={`p-4 rounded-2xl border border-l-[6px] border-l-[#3b82f6] backdrop-blur-xl flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md active:scale-[0.99] ${
              isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#3b82f6]/20 flex items-center justify-center shadow-inner">
                <StethoscopeTabIcon active size={24} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#3b82f6] uppercase tracking-wider block">
                  Bóveda Médica & Telemetría
                </span>
                <h3 className={`text-sm font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Score Bioquímico: {biometrics?.biochemScore ? `${biometrics.biochemScore}%` : 'Cargando...'}
                </h3>
                <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Biomarcadores Analizados por IA
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#3b82f6]/20 text-[#3b82f6]">
              Exámenes →
            </span>
          </div>

          {/* Card 4: Coach IA */}
          <div
            onClick={() => navigate('coach', 'coach')}
            className={`p-4 rounded-2xl border border-l-[6px] border-l-[#a855f7] backdrop-blur-xl flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md active:scale-[0.99] ${
              isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#a855f7]/20 flex items-center justify-center shadow-inner">
                <RobotCoachIcon active size={24} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#a855f7] uppercase tracking-wider block">
                  Coach IA Virtual
                </span>
                <h3 className={`text-sm font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Asistente de Voz y Motivación
                </h3>
                <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Asistente en vivo activo
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#a855f7]/20 text-[#a855f7]">
              Hablar →
            </span>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
