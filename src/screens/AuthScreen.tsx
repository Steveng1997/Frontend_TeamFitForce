import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';

export const AuthScreen: React.FC = () => {
  const { setUserProfile, setIsAuthenticated, navigate, theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>(''); // email o usuario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setWelcomeToast(null);

    if (mode === 'login') {
      if (!identifier.trim() || !password.trim()) {
        setError('Por favor ingresa tu correo o usuario y tu contraseña.');
        return;
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Por favor completa todos los campos obligatorios.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await authService.login(identifier.trim(), password);
        if (res.success && res.data) {
          setUserProfile(res.data.user);
          setIsAuthenticated(true);
          setWelcomeToast(`🎉 ¡Bienvenido de nuevo, ${res.data.user.name || 'Atleta'}!`);

          setTimeout(() => {
            navigate('home', 'inicio');
          }, 1200);
        } else {
          setError(res.error || 'Usuario, correo o contraseña incorrectos. Por favor intenta de nuevo.');
        }
      } else {
        const cleanUsername = username.trim() || email.split('@')[0];
        const res = await authService.register(name.trim(), cleanUsername, email.trim(), password);
        if (res.success && res.data) {
          setUserProfile(res.data.user);
          setIsAuthenticated(true);
          setWelcomeToast(`🚀 ¡Cuenta creada exitosamente! Bienvenido, ${res.data.user.name}.`);

          setTimeout(() => {
            navigate('profile');
          }, 1200);
        } else {
          setError(res.error || 'No se pudo completar el registro. Intenta con otro correo o usuario.');
        }
      }
    } catch (err: any) {
      setError('Error de conexión con la API Backend TeamFit Force.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center max-w-md mx-auto w-full space-y-6">
        {/* Header Theme Switch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#10b981] to-[#f59e0b] flex items-center justify-center font-black text-white text-lg shadow-lg">
              TF
            </div>
            <span className="text-lg font-black tracking-tight">TeamFit Force</span>
          </div>

          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95 border ${
              isDark
                ? 'bg-slate-800/90 text-amber-400 border-slate-700/80 hover:bg-slate-700'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Welcome Title */}
        <div className="text-left space-y-1">
          <h1 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {mode === 'login' ? '¡Bienvenido de nuevo! 👋' : 'Crea tu cuenta gratis 🚀'}
          </h1>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {mode === 'login'
              ? 'Ingresa tu usuario o correo y contraseña para acceder.'
              : 'Empieza hoy tu transformación física y bioquímica personalizada.'}
          </p>
        </div>

        {/* Tab Switcher Mode */}
        <div className={`p-1 rounded-2xl border flex ${isDark ? 'bg-[#141c2e] border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
              setWelcomeToast(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#10b981] text-slate-950 shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
              setWelcomeToast(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-[#10b981] text-slate-950 shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Welcome Toast Notification */}
        {welcomeToast && (
          <div className="p-4 rounded-2xl bg-[#10b981] text-slate-950 text-xs font-black shadow-lg shadow-[#10b981]/30 flex items-center space-x-2 animate-bounce">
            <span className="text-lg">✨</span>
            <span className="flex-1 text-sm">{welcomeToast}</span>
          </div>
        )}

        {/* Error Alert Box */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center space-x-2 animate-shake">
            <span className="text-base">⚠️</span>
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === 'register' ? (
            <>
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  required
                  className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all outline-none ${
                    isDark
                      ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. carlos123"
                  className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all outline-none ${
                    isDark
                      ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@teamfit.com"
                  required
                  className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all outline-none ${
                    isDark
                      ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                  }`}
                />
              </div>
            </>
          ) : (
            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Correo Electrónico o Usuario
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="carlos@teamfit.com o carlos123"
                required
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
            </div>
          )}

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Contraseña
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-3.5 pr-12 rounded-2xl text-sm font-semibold border transition-all outline-none ${
                  isDark
                    ? 'bg-[#141c2e] border-slate-700/80 text-white focus:border-[#10b981]'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-[#10b981]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer select-none"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || Boolean(welcomeToast)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-[#10b981]/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2 mt-2"
          >
            {isLoading ? (
              <span className="animate-spin text-lg">⚡</span>
            ) : (
              <span>{mode === 'login' ? 'Entrar a TeamFit Force →' : 'Crear mi Cuenta →'}</span>
            )}
          </button>
        </form>

        <p className={`text-center text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {mode === 'login' ? '¿No tienes una cuenta aún? ' : '¿Ya tienes una cuenta registrada? '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError(null);
              setWelcomeToast(null);
            }}
            className="text-[#10b981] font-black hover:underline cursor-pointer ml-1"
          >
            {mode === 'login' ? 'Regístrate gratis' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};
