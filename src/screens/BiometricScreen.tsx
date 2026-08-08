import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BiometricShieldIcon } from '../components/SvgIcons';

export const BiometricScreen: React.FC = () => {
  const { navigate, setIsAuthenticated, theme, toggleTheme } = useApp();
  const [isScanning, setIsScanning] = useState(false);

  const isDark = theme === 'dark';

  const handleUnlock = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsScanning(false);
      navigate('profile');
    }, 800);
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-end px-6 pt-6 z-20">
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95 border cursor-pointer ${
            isDark
              ? 'bg-slate-800/90 text-amber-400 border-slate-700/80 hover:bg-slate-700'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Cambiar tema"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-8 py-6 z-10">
        {/* Header Title */}
        <div className="text-center mt-2">
          <h1
            className={`text-2xl font-black tracking-tight mb-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Acceso Biométrico
          </h1>
          <p
            className={`text-xs font-semibold max-w-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Tus datos de salud son privados. Desbloquea la app con tu huella o Face ID.
          </p>
        </div>

        {/* Center Biometric Shield Icon */}
        <div
          className="relative my-8 flex items-center justify-center cursor-pointer group"
          onClick={handleUnlock}
        >
          {/* Animated Glow Rings */}
          <div
            className={`absolute inset-0 rounded-full bg-[#10b981]/25 blur-2xl transition-all duration-700 ${
              isScanning ? 'scale-150 opacity-100' : 'scale-110 opacity-40 group-hover:scale-125'
            }`}
          />
          <div
            className={`transform transition-transform duration-300 ${
              isScanning ? 'scale-95' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <BiometricShieldIcon size={140} />
          </div>
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-extrabold tracking-wider text-[#10b981] bg-slate-950/90 px-3.5 py-1.5 rounded-full border border-[#10b981]/50 shadow-xl animate-pulse">
                Escaneando...
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3.5 mb-4">
          <button
            onClick={handleUnlock}
            disabled={isScanning}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-[#f59e0b]/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Activar Huella</span>
          </button>

          <button
            onClick={handleUnlock}
            className={`w-full py-2 text-xs font-extrabold transition-colors text-center cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Usar PIN de respaldo
          </button>
        </div>
      </div>

      {/* Decorative Mesh Glow */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
