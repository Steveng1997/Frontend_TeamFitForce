import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  ArrowLeftIcon,
  StethoscopeTabIcon,
  UploadCloudIcon,
  CheckIcon,
  FlameIcon,
} from '../components/SvgIcons';
import type { BiomarkerItem, MedicalAnalysisResult } from '../types';
import { medicalService } from '../services/medicalService';

export const MedicalVaultScreen: React.FC = () => {
  const { userProfile, navigate, theme } = useApp();
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [biomarkers, setBiomarkers] = useState<BiomarkerItem[]>([]);
  const [analysis, setAnalysis] = useState<MedicalAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiResponseId, setAiResponseId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const list = await medicalService.getBiomarkers();
        setBiomarkers(list || []);

        const res = await medicalService.getAnalysisResults();
        setAnalysis(res);
      } catch (err) {
        console.warn('Error cargando datos de Bóveda Médica desde API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file.name);
    setIsAnalyzing(true);

    try {
      const res = await medicalService.uploadExamFile(file);
      if (res.success && res.data) {
        if (res.data.aiResponseId) setAiResponseId(res.data.aiResponseId);

        if (res.data.analysis) {
          setAnalysis(res.data.analysis);
          if (res.data.analysis.biomarkers) {
            setBiomarkers(res.data.analysis.biomarkers);
          }
        }
      }
    } catch (err) {
      console.warn('Error subiendo examen:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusBadgeStyle = (status: BiomarkerItem['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40';
      case 'stable':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'high':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-5">
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
            Bóveda Médica & Telemetría IA
          </h1>
          <div className="w-9" />
        </div>

        {/* Upload Examen Card */}
        <div
          className={`rounded-3xl p-5 border backdrop-blur-xl transition-all duration-300 shadow-xl space-y-4 ${
            isDark
              ? 'bg-[#141c2e]/95 border-slate-800/90 shadow-slate-950/40'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#10b981]/20 flex items-center justify-center shadow-inner">
                <UploadCloudIcon size={22} color="#10b981" />
              </div>
              <div>
                <h2 className={`text-base font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Valoración Clínica IA
                </h2>
                <span className="text-[11px] font-bold text-[#10b981] block">
                  Lectura & Procesamiento de Exámenes
                </span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
              IA Activa
            </span>
          </div>

          <div
            onClick={handleTriggerFileInput}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 relative overflow-hidden group ${
              isDark
                ? 'border-slate-700 bg-slate-900/60 hover:border-[#10b981]/60 hover:bg-slate-900/90'
                : 'border-slate-300 bg-slate-50 hover:border-[#10b981] hover:bg-emerald-50/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#10b981]/15 flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform">
                <UploadCloudIcon size={24} color="#10b981" />
              </div>
              <div>
                <p className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedFile
                    ? `📄 Adjuntado: ${selectedFile}`
                    : 'Presiona para adjuntar tu examen o estudio de laboratorio'}
                </p>
                <p className={`text-[10px] font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Soporta archivos en formato PDF, PNG o JPG (Máx. 25MB)
                </p>
              </div>
            </div>

            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center space-y-2 z-10">
                <span className="text-2xl animate-spin">⚡</span>
                <span className="text-xs font-black text-[#10b981] uppercase tracking-wider">
                  Analizando Examen Médico en Tiempo Real con IA...
                </span>
                <div className="w-3/4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full animate-pulse w-4/5" />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleTriggerFileInput}
            disabled={isAnalyzing}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#10b981]/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>🧪 Analizar y Guardar Examen con IA</span>
          </button>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1 border-t border-slate-800/60">
            <span className="flex items-center space-x-1 text-[#10b981]">
              <CheckIcon size={12} color="#10b981" />
              <span>Sincronizado con IA Bóveda Médica & Base de Datos</span>
            </span>
            {aiResponseId && (
              <span className="text-slate-400">ID IA: {aiResponseId.slice(0, 14)}...</span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-6">
            <span className="text-xl animate-spin inline-block">⚡</span>
            <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Cargando telemetría de Bóveda Médica desde la API...
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* If no biomarkers exist */}
            {biomarkers.length === 0 ? (
              <div className={`p-6 rounded-3xl border border-dashed text-center space-y-3 ${isDark ? 'bg-[#141c2e]/60 border-slate-800' : 'bg-white border-slate-300'}`}>
                <span className="text-4xl inline-block">🧬</span>
                <div>
                  <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Sin Biomarcadores Registrados
                  </h3>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Aún no has adjuntado ningún examen médico de laboratorio. Presiona en <b>"Analizar y Guardar Examen con IA"</b> para extraer tus resultados reales y prescribir tu nutrición y entrenamiento.
                  </p>
                </div>
              </div>
            ) : (
              /* Biomarkers Grid */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Biomarcadores Clínicos Procesados
                    </h2>
                    <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Evaluados para {userProfile.name || 'Usuario'} • {userProfile.age || '32'} años
                    </p>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981]">
                    {biomarkers.length} Detectados
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {biomarkers.map((bm) => (
                    <div
                      key={bm.id}
                      className={`p-3.5 rounded-2xl border backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-md ${
                        isDark
                          ? 'bg-[#141c2e]/90 border-slate-800/80 hover:border-slate-700'
                          : 'bg-white border-slate-200 shadow-slate-200/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 truncate">
                            {bm.category}
                          </span>
                          <span
                            className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${getStatusBadgeStyle(
                              bm.status
                            )}`}
                          >
                            {bm.statusLabel}
                          </span>
                        </div>
                        <h3 className={`text-xs font-black leading-snug truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {bm.name}
                        </h3>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
                        <div>
                          <span
                            className={`text-lg font-black tracking-tight ${
                              bm.status === 'high'
                                ? 'text-amber-400'
                                : bm.status === 'low'
                                ? 'text-blue-400'
                                : 'text-[#10b981]'
                            }`}
                          >
                            {bm.value}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 ml-1">{bm.unit}</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400 block truncate">
                          Ref: {bm.referenceRange}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Prescribed Nutrition & Exercise Adaptations */}
            {analysis && (analysis.recommendedFoods?.length > 0 || analysis.exerciseAdjustments?.length > 0) && (
              <div
                className={`rounded-3xl p-5 border backdrop-blur-xl space-y-4 shadow-xl ${
                  isDark
                    ? 'bg-[#141c2e]/95 border-slate-800/90 shadow-slate-950/40'
                    : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner">
                    <FlameIcon size={22} color="#f59e0b" />
                  </div>
                  <div>
                    <h2 className={`text-base font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Prescripción Inteligente IA
                    </h2>
                    <span className="text-[11px] font-bold text-amber-400 block">
                      Recetas & Nutrientes según Edad, Género y Examen
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'}`}>
                    <span className="text-[10px] font-black uppercase text-[#10b981] block mb-1.5 flex items-center gap-1">
                      <span>🥗</span> Proteínas, Carbos & Grasas
                    </span>
                    <ul className={`text-[11px] font-semibold space-y-1 ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                      {analysis.recommendedFoods?.map((food, i) => (
                        <li key={i}>• {food}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-red-950/20 border-red-800/40' : 'bg-red-50 border-red-200'}`}>
                    <span className="text-[10px] font-black uppercase text-red-400 block mb-1.5 flex items-center gap-1">
                      <span>🚫</span> Alimentos a Restringir
                    </span>
                    <ul className={`text-[11px] font-semibold space-y-1 ${isDark ? 'text-red-200' : 'text-red-900'}`}>
                      {analysis.restrictedFoods?.map((food, i) => (
                        <li key={i}>• {food}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {analysis.exerciseAdjustments && (
                  <div className={`p-3.5 rounded-2xl border text-xs ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
                    <span className="font-extrabold text-[#10b981] block text-xs uppercase mb-1">
                      🏋️‍♂️ Rutina & Ejercicio Adaptado por IA:
                    </span>
                    <ul className="space-y-1 text-[11px] font-medium leading-relaxed">
                      {Array.isArray(analysis.exerciseAdjustments)
                        ? analysis.exerciseAdjustments.map((adj, idx) => (
                            <li key={idx}>• {adj}</li>
                          ))
                        : <li>• {analysis.exerciseAdjustments}</li>}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Disclaimer Card */}
        <div className={`p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-md ${isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'}`}>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
              <StethoscopeTabIcon active size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                Aviso Legal & Exención de Responsabilidad Institucional
              </span>
              <p className="text-[11px] font-medium leading-relaxed">
                Estas recomendaciones son orientativas, basadas en guías generales de salud (OMS/FDA) — no reemplazan el diagnóstico de tu médico. Ante cualquier valor alterado, consulta con un profesional.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
