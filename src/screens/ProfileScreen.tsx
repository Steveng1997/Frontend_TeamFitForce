import React from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { authService } from '../services/authService';

export const ProfileScreen: React.FC = () => {
  const { userProfile, setUserProfile, updateUserProfile, setIsAuthenticated, navigate, theme, toggleTheme } = useApp();

  const isDark = theme === 'dark';

  const handleInputChange = (field: keyof typeof userProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(userProfile);
    navigate('home');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('auth');
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Container */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Perfil
            </h1>
            <p
              className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Administra tus datos personales y tu meta física.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-black hover:bg-rose-500/25 transition-all cursor-pointer active:scale-95"
          >
            Cerrar Sesión 🚪
          </button>
        </div>

        {/* Theme Settings Switch Card */}
        <div
          className={`rounded-2xl p-4 border backdrop-blur-xl flex items-center justify-between shadow-md transition-all duration-300 ${
            isDark
              ? 'bg-[#141c2e]/90 border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
              : 'bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 text-lg">
              {isDark ? '🌙' : '☀️'}
            </div>
            <div>
              <span
                className={`text-sm font-extrabold block ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Modo Visual
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {isDark ? 'Modo Oscuro Elegante' : 'Modo Claro Impoluto'}
              </span>
            </div>
          </div>

          {/* Interactive Switch Component */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative cursor-pointer ${
              isDark ? 'bg-[#10b981]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${
                isDark ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label
              className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Nombre Completo
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Tu nombre"
              className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                isDark
                  ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
              }`}
            />
          </div>

          {/* Nombre de Usuario y Correo Electrónico */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Usuario
              </label>
              <input
                type="text"
                value={userProfile.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="ej. carlos123"
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                value={userProfile.email || ''}
                disabled
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border opacity-70 cursor-not-allowed ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
              />
            </div>
          </div>

          {/* Grid de Edad y Peso */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Edad
              </label>
              <input
                type="text"
                value={userProfile.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Ej. 32"
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Peso (kg)
              </label>
              <input
                type="text"
                value={userProfile.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="Ej. 82"
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
          </div>

          {/* Grid de Talla y Estatura */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Talla Camiseta
              </label>
              <input
                type="text"
                value={userProfile.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                placeholder="S, M, L, XL"
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Estatura (cm)
              </label>
              <input
                type="text"
                value={userProfile.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="Ej. 178"
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
          </div>

          {/* Objetivo Principal */}
          <div>
            <label
              className={`block text-xs font-black uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Objetivo de Transformación
            </label>
            <input
              type="text"
              value={userProfile.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              placeholder="Tonificar, ganar masa..."
              className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 outline-none ${
                isDark
                  ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-[#10b981]/20 active:scale-[0.98] transition-all cursor-pointer mt-4"
          >
            Guardar Cambios →
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
};
