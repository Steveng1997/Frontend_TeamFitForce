const BASE_URL = import.meta.env.VITE_API_URL || 'https://njxwstvzx3.us-east-1.awsapprunner.com/api';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; [key: string]: any }> {
  const token = localStorage.getItem('teamfit_token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('teamfit_token');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
      }
      return {
        success: false,
        error: data.error || `Error ${response.status}: Ocurrió un problema en el servidor.`,
      };
    }

    return data;
  } catch (error: any) {
    console.warn(`[API Client Error en ${endpoint}]:`, error);
    return {
      success: false,
      error: 'No se pudo establecer conexión con la API Backend TeamFit Force en AWS.',
    };
  }
}
