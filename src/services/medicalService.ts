import { apiRequest } from './apiClient';
import type { BiomarkerItem, MedicalAnalysisResult } from '../types';

export const medicalService = {
  async getAnalysisResults(): Promise<MedicalAnalysisResult | null> {
    const res = await apiRequest<MedicalAnalysisResult>('/medical-vault/results');
    if (res.success && res.data) {
      return res.data;
    }
    return null;
  },

  async getBiomarkers(): Promise<BiomarkerItem[]> {
    const res = await apiRequest<BiomarkerItem[]>('/medical-vault/biomarkers');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async uploadExamFile(file: File): Promise<{ success: boolean; data?: any; error?: string }> {
    const formData = new FormData();
    formData.append('examFile', file);

    return await apiRequest('/medical-vault/upload', {
      method: 'POST',
      body: formData,
    });
  },
};
