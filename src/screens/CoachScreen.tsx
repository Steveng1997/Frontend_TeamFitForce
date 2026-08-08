import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { RobotAvatarIcon } from '../components/SvgIcons';
import { Waveform } from '../components/Waveform';
import { BottomNavigation } from '../components/BottomNavigation';
import { coachService } from '../services/coachService';

export const CoachScreen: React.FC = () => {
  const { userProfile, isCoachMuted, setIsCoachMuted, navigate, theme } = useApp();
  const isDark = theme === 'dark';

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasAutoplayBlocked, setHasAutoplayBlocked] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthTimerRef = useRef<any>(null);

  const [motivationalText, setMotivationalText] = useState<string>(
    `¡Vamos ${userProfile.name || 'Carlos'}! Veo que tu ritmo bajó. Aprieta el paso, faltan solo 3 minutos.`
  );

  // Cargar lista de voces disponibles en el navegador (asíncrono en Chrome/Safari)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Cargar último mensaje del Coach desde la API Backend
  useEffect(() => {
    async function loadCoachMessage() {
      try {
        const history = await coachService.getHistory();
        if (history && history.length > 0) {
          const lastCoachMsg = [...history].reverse().find((m) => m.sender === 'coach');
          if (lastCoachMsg?.content) {
            setMotivationalText(lastCoachMsg.content);
          }
        }
      } catch (err) {
        console.warn('Error al cargar historial del Coach:', err);
      }
    }
    loadCoachMessage();
  }, []);

  // Función principal para hablar el texto con Voz Sintética en Español
  const speakMotivationalQuote = useCallback(() => {
    if (isCoachMuted || !motivationalText) return;

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Cancelar cualquier audio previo

        const utterance = new SpeechSynthesisUtterance(motivationalText);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('es') ||
            v.name.toLowerCase().includes('spanish') ||
            v.name.toLowerCase().includes('sabina') ||
            v.name.toLowerCase().includes('raul') ||
            v.name.toLowerCase().includes('monica') ||
            v.name.toLowerCase().includes('jorge')
        );

        if (spanishVoice) {
          utterance.voice = spanishVoice;
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
          setIsPaused(false);
          setHasAutoplayBlocked(false);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error:', e);
          setIsSpeaking(false);
          setHasAutoplayBlocked(true);
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      } catch (err) {
        console.warn('Excepción al reproducir síntesis de voz:', err);
        setIsSpeaking(false);
        setHasAutoplayBlocked(true);
      }
    }
  }, [isCoachMuted, motivationalText, availableVoices]);

  // Detener voz al silenciar
  useEffect(() => {
    if (isCoachMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (synthTimerRef.current) {
        clearTimeout(synthTimerRef.current);
      }
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isCoachMuted]);

  // Alternar Reproducir / Pausar
  const togglePlayPause = () => {
    if (isCoachMuted) {
      setIsCoachMuted(false);
    }

    if (isSpeaking && !isPaused) {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
      setIsPaused(true);
      setIsSpeaking(false);
    } else if (isPaused) {
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
        setIsPaused(false);
      } else {
        speakMotivationalQuote();
      }
    } else {
      speakMotivationalQuote();
    }
  };

  // Pedir nueva frase motivacional a la API y hablarla
  const handleReplay = async () => {
    if (isCoachMuted) {
      setIsCoachMuted(false);
    }

    try {
      const newMsg = await coachService.triggerMotivate();
      if (newMsg) {
        setMotivationalText(newMsg);
      }
    } catch (err) {
      console.warn('Error al obtener motivación:', err);
    }
    speakMotivationalQuote();
  };

  const isWaveformActive = isSpeaking && !isCoachMuted;

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pt-6 pb-4 z-10 text-center">
        {/* Status Indicator Badge */}
        <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
          <span
            className={`w-2.5 h-2.5 rounded-full bg-rose-500 ${
              isWaveformActive ? 'animate-ping' : ''
            }`}
          />
          <span className="text-xs font-extrabold text-rose-500 tracking-wide">
            {isSpeaking
              ? 'Coach IA Hablando...'
              : isPaused
              ? 'Voz en Pausa'
              : isCoachMuted
              ? 'Coach Silenciado'
              : 'Coach IA Conectado'}
          </span>
        </div>

        {/* Central Robot Avatar */}
        <div
          className="relative my-4 flex items-center justify-center cursor-pointer group"
          onClick={handleReplay}
          title="Tocar para escuchar voz del Coach"
        >
          <div
            className={`absolute inset-0 rounded-full bg-[#f59e0b]/25 blur-2xl transition-all duration-500 ${
              isWaveformActive ? 'animate-pulse scale-125 opacity-100' : 'scale-100 opacity-30'
            }`}
          />
          <div
            className={`relative z-10 transform transition-transform duration-300 ${
              isWaveformActive ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <RobotAvatarIcon size={120} />
          </div>
        </div>

        {/* Coach Speech Bubble */}
        <div
          className={`w-full rounded-3xl p-5 border backdrop-blur-xl relative transition-all duration-300 ${
            isDark
              ? 'bg-[#141c2e]/90 border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
              : 'bg-white border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
          }`}
        >
          <p
            className={`text-base font-extrabold leading-relaxed italic ${
              isDark ? 'text-slate-100' : 'text-slate-800'
            }`}
          >
            "{motivationalText}"
          </p>

          {/* Autoplay fallback button for browser gesture requirements */}
          {(!isSpeaking || hasAutoplayBlocked) && (
            <button
              onClick={speakMotivationalQuote}
              className="mt-3 py-2 px-4 bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 mx-auto cursor-pointer active:scale-95 transition-transform"
            >
              <span>🔊 Tocar para reproducir voz del Coach</span>
            </button>
          )}
        </div>

        {/* Animated Waveform Audio Indicator */}
        <div className="w-full py-1">
          <Waveform isMuted={!isWaveformActive} />
        </div>

        {/* Bottom Call Controls Bar */}
        <div className="w-full flex items-center justify-center space-x-5 mb-2">
          {/* Back Button */}
          <button
            onClick={() => navigate('home')}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer ${
              isDark
                ? 'bg-[#141c2e] border-slate-700 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Volver al inicio"
          >
            <span className="text-lg font-bold">←</span>
          </button>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer ${
              isDark
                ? 'bg-[#141c2e] border-slate-700 text-amber-400 hover:bg-slate-800'
                : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
            }`}
            title="Siguiente motivación del Coach"
          >
            <span className="text-base font-bold">🔄</span>
          </button>

          {/* Speech Play / Pause Toggle Button */}
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-[#f59e0b]/30 bg-gradient-to-tr from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] active:scale-95 transition-all cursor-pointer"
            title={isSpeaking ? 'Pausar voz' : 'Reproducir voz'}
          >
            <span className="text-xl font-black">{isSpeaking ? '❚❚' : '►'}</span>
          </button>

          {/* Mic Mute / Unmute Button */}
          <button
            onClick={() => setIsCoachMuted((prev) => !prev)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer ${
              isCoachMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                : isDark
                ? 'bg-[#141c2e] border-slate-700 text-emerald-400 hover:bg-slate-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
            }`}
            title={isCoachMuted ? 'Reactivar voz' : 'Silenciar voz'}
          >
            {isCoachMuted ? (
              <svg className="w-5 h-5 fill-current text-rose-500" viewBox="0 0 24 24">
                <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4 0c0 .35-.04.69-.11 1.02l2.36 2.36c.48-.96.75-2.04.75-3.38V5c0-1.66-1.34-3-3-3S12 3.34 12 5v.18l3 3V11zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.27-1.48.42-2.31.42-3.41 0-6.17-2.61-6.17-6H4.17c0 3.86 2.87 7.04 6.64 7.63V21h2.38v-2.37c.86-.14 1.68-.42 2.43-.83L19.73 21 21 19.73 4.27 3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomNavigation />
    </div>
  );
};
