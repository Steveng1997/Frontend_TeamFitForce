import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBar } from './StatusBar';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentScreen, navigate, theme, toggleTheme } = useApp();
  // Auto detect if running on small mobile screen or native webview
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [isFrameEnabled, setIsFrameEnabled] = useState<boolean>(true);

  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < 640;
      setIsMobileDevice(isSmallScreen);
      if (isSmallScreen) {
        setIsFrameEnabled(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const screenNames: Record<string, string> = {
    biometric: 'Acceso Biométrico',
    profile: 'Perfil',
    home: 'Inicio',
    food_fit: 'Food Fit 360°',
    ingredient_detail: 'Detalle de Ingrediente',
    recipe_detail: 'Detalle de Receta',
    smoothies: 'Batidos Funcionales',
    routine: 'Rutinas / Ejercicio',
    medical: 'Bóveda Médica',
    coach: 'Coach IA',
  };

  // If on a real mobile device or native webview, render 100% fluid mobile layout
  if (isMobileDevice) {
    return (
      <div
        className={`w-full h-dvh min-h-screen flex flex-col overflow-hidden relative font-sans transition-colors duration-300 ${
          theme === 'dark' ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
        }`}
      >
        <StatusBar />
        <div className="flex-1 overflow-hidden flex flex-col relative">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-2 sm:p-6 font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#070a11] text-slate-100' : 'bg-slate-200 text-slate-900'
      }`}
    >
      {/* Top Header Control Toolbar */}
      <header
        className={`w-full max-w-4xl mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-xl border transition-colors duration-300 z-50 ${
          theme === 'dark'
            ? 'bg-[#141c2e]/90 border-slate-800/80 text-white'
            : 'bg-white/90 border-slate-300/80 text-slate-900 shadow-slate-300/50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#10b981] to-[#f59e0b] flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
            TF
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">TeamFit Force</h1>
            <span className="text-[11px] text-[#10b981] font-semibold block">
              {screenNames[currentScreen] || currentScreen}
            </span>
          </div>
        </div>

        {/* Navigation Quick Switches */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => navigate('biometric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'biometric'
                ? 'bg-[#f59e0b] text-slate-950 shadow-sm font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Biométrico
          </button>
          <button
            onClick={() => navigate('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'profile'
                ? 'bg-[#10b981] text-slate-950 shadow-sm font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. Perfil
          </button>
          <button
            onClick={() => navigate('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'home'
                ? 'bg-[#10b981] text-slate-950 shadow-sm font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Home
          </button>
          <button
            onClick={() => navigate('routine')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'routine'
                ? 'bg-[#10b981] text-slate-950 shadow-sm font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            4. Rutina
          </button>
          <button
            onClick={() => navigate('coach')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'coach'
                ? 'bg-[#f59e0b] text-slate-950 shadow-sm font-bold'
                : theme === 'dark'
                ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            5. Coach IA
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`ml-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm border ${
              theme === 'dark'
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
            title="Alternar Modo Claro/Oscuro"
          >
            <span>{theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}</span>
          </button>

          {/* Toggle Device Frame */}
          <button
            onClick={() => setIsFrameEnabled((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              theme === 'dark'
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isFrameEnabled ? '📱 Marco On' : '🖥️ Completa'}
          </button>
        </div>
      </header>

      {/* Desktop Container View Modes */}
      {isFrameEnabled ? (
        <div className="relative my-2">
          {/* Outer Metallic Phone Body Shell */}
          <div
            className={`relative w-[390px] h-[844px] rounded-[55px] p-[12px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[4px] outline outline-2 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950 border-slate-800 outline-slate-700/50'
                : 'bg-slate-900 border-slate-400 outline-slate-300/60'
            }`}
          >
            {/* Side Buttons Visuals */}
            <div className="absolute -left-[7px] top-[115px] w-[4px] h-[28px] bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[7px] top-[160px] w-[4px] h-[50px] bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[7px] top-[220px] w-[4px] h-[50px] bg-slate-700 rounded-l-md" />
            <div className="absolute -right-[7px] top-[180px] w-[4px] h-[75px] bg-slate-700 rounded-r-md" />

            {/* Dynamic Island Notch */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-50 flex items-center justify-between px-3 border border-slate-800">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]/80" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            </div>

            {/* Inner Screen Display Viewport */}
            <div
              className={`relative w-full h-full rounded-[44px] overflow-hidden flex flex-col pt-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
              }`}
            >
              <StatusBar />
              <div className="flex-1 overflow-hidden flex flex-col relative">{children}</div>

              {/* iOS Bottom Home Bar Pill Indicator */}
              <div
                className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-50 pointer-events-none ${
                  theme === 'dark' ? 'bg-white/40' : 'bg-slate-900/40'
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full max-w-md h-[844px] rounded-3xl overflow-hidden border shadow-2xl relative flex flex-col transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-[#0b0f19] text-slate-100 border-slate-800'
              : 'bg-[#f8fafc] text-slate-900 border-slate-300'
          }`}
        >
          <StatusBar />
          <div className="flex-1 overflow-hidden flex flex-col relative">{children}</div>
        </div>
      )}
    </div>
  );
};
