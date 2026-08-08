import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  ArrowLeftIcon,
  ShareIcon,
  SpotifyIcon,
  YouTubeMusicIcon,
  AppleMusicIcon,
  StopwatchIcon,
} from '../components/SvgIcons';
import { routineService, type RoutineDetail } from '../services/routineService';

export const RoutineScreen: React.FC = () => {
  const {
    navigate,
    theme,
    activeMusicPlatform,
    setActiveMusicPlatform,
    isMusicPlaying,
    currentTrack,
    nextTrack,
    prevTrack,
    toggleMusicPlay,
  } = useApp();
  const isDark = theme === 'dark';

  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [routine, setRoutine] = useState<RoutineDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadRoutine() {
      setLoading(true);
      try {
        const list = await routineService.getRoutines();
        if (list && list.length > 0) {
          setRoutine(list[0]);
        }
      } catch (err) {
        console.warn('Error al cargar la rutina desde la API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRoutine();
  }, []);

  const toggleVideo = () => setIsPlayingVideo(!isPlayingVideo);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
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

          <h1 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {routine?.title || 'Rutina de Ejercicio'}
          </h1>

          <button
            onClick={() => alert('Compartiendo rutina...')}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Compartir"
          >
            <ShareIcon size={18} />
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-10 space-y-2">
            <span className="text-2xl animate-spin inline-block">⚡</span>
            <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Cargando rutina y ejercicios desde la API...
            </p>
          </div>
        )}

        {!loading && routine && (
          <>
            {/* Top Green Phase Status Bar */}
            <div className="w-full bg-[#10b981] text-slate-950 px-4 py-2 rounded-2xl font-black text-xs text-center tracking-wide uppercase shadow-md">
              {routine.phase}
            </div>

            {/* Video Player Card */}
            <div
              className={`rounded-3xl border overflow-hidden backdrop-blur-xl relative shadow-xl transition-all duration-300 ${
                isDark ? 'bg-[#141c2e]' : 'bg-slate-900 text-white'
              }`}
            >
              <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />

                <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 space-y-3">
                  <button
                    onClick={toggleVideo}
                    className="w-16 h-16 rounded-full bg-[#10b981] text-slate-950 flex items-center justify-center shadow-xl shadow-[#10b981]/40 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="text-2xl font-black ml-1">{isPlayingVideo ? '❚❚' : '►'}</span>
                  </button>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981] block">
                      {isPlayingVideo ? 'REPRODUCIENDO EN TIEMPO REAL' : 'REPRODUCIR DEMOSTRACIÓN'}
                    </span>
                    <p className="text-xs font-bold text-slate-200 mt-0.5">
                      Técnica Perfecta & Ritmo Guiado
                    </p>
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-extrabold text-white flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span>{routine.targetZone || 'Zona 2 Cardio (128 BPM)'}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#10b981]">{formatTime(routine.progressSeconds || 0)}</span>
                  <span className="text-slate-400">{formatTime(routine.durationSeconds || 900)}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10b981] rounded-full transition-all duration-300"
                    style={{
                      width: `${((routine.progressSeconds || 0) / (routine.durationSeconds || 900)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Integrated Music Player Controls */}
            <div
              className={`rounded-3xl border p-4 backdrop-blur-xl space-y-3 shadow-md transition-all duration-300 ${
                isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-700/40 pb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Música Sincronizada
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveMusicPlatform('Spotify')}
                    className={`p-1.5 rounded-lg border transition-all ${
                      activeMusicPlatform === 'Spotify'
                        ? 'bg-[#1db954]/20 border-[#1db954] text-[#1db954]'
                        : 'border-transparent opacity-50'
                    }`}
                    title="Spotify"
                  >
                    <SpotifyIcon size={16} />
                  </button>
                  <button
                    onClick={() => setActiveMusicPlatform('YouTube Music')}
                    className={`p-1.5 rounded-lg border transition-all ${
                      activeMusicPlatform === 'YouTube Music'
                        ? 'bg-red-500/20 border-red-500 text-red-500'
                        : 'border-transparent opacity-50'
                    }`}
                    title="YouTube Music"
                  >
                    <YouTubeMusicIcon size={16} />
                  </button>
                  <button
                    onClick={() => setActiveMusicPlatform('Apple Music')}
                    className={`p-1.5 rounded-lg border transition-all ${
                      activeMusicPlatform === 'Apple Music'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-500'
                        : 'border-transparent opacity-50'
                    }`}
                    title="Apple Music"
                  >
                    <AppleMusicIcon size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10b981] to-blue-500 flex items-center justify-center shrink-0 shadow-md text-white font-black text-xs">
                    🎵
                  </div>
                  <div className="truncate">
                    <h4 className={`text-xs font-black truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {currentTrack.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={prevTrack}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold ${
                      isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'
                    }`}
                  >
                    ⏮
                  </button>
                  <button
                    onClick={toggleMusicPlay}
                    className="w-8 h-8 rounded-full bg-[#10b981] text-slate-950 flex items-center justify-center font-black text-xs shadow-md"
                  >
                    {isMusicPlaying ? '❚❚' : '►'}
                  </button>
                  <button
                    onClick={nextTrack}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold ${
                      isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-100'
                    }`}
                  >
                    ⏭
                  </button>
                </div>
              </div>
            </div>

            {/* Current Exercise Detail Card */}
            {routine.exercises && routine.exercises.length > 0 && (
              <div
                className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 shadow-xl space-y-4 ${
                  isDark ? 'bg-[#141c2e]/90 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#10b981] block mb-1">
                    Ejercicio Actual
                  </span>
                  <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {routine.exercises[0].name}
                  </h2>
                  <p className="text-sm font-extrabold text-[#10b981] mt-0.5">
                    {routine.exercises[0].sets} Series x {routine.exercises[0].reps} Reps
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border flex items-center space-x-3 text-xs ${isDark ? 'bg-amber-950/30 border-amber-800/40 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                  <StopwatchIcon size={20} color="#f59e0b" />
                  <span className="font-extrabold">
                    Descanso sugerido: {routine.exercises[0].restSeconds} segundos entre series
                  </span>
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
