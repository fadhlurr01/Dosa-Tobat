/**
 * Dosa & Tobat REST API Client
 * Terhubung ke Backend Laravel API v1 (http://127.0.0.1:8000/api/v1)
 */

export const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // If running locally, connect to local Laravel API
  if (typeof window !== 'undefined') {
    const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
    if (isLocal) {
      return 'http://127.0.0.1:8000/api/v1';
    }
    // On live production domain (cPanel / custom domain), connect to /api/v1 on current domain
    return `${window.location.origin}/api/v1`;
  }
  return '/api/v1';
};

export const isLocalLoopbackSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return true;
};

export const API_BASE_URL = getApiBaseUrl();

class ApiClient {
  private tokenKey = 'dt_auth_token';

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = getApiBaseUrl();
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error: any = new Error(data.message || `API Server Error (${response.status})`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err: any) {
      console.warn(`[API Client] Request to ${baseUrl}${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // Authentication
  public auth = {
    register: (payload: { name: string; email: string; phone?: string; password?: string; plan?: string }) =>
      this.request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),

    login: (payload: { email: string; password?: string }) =>
      this.request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

    demo: (id: string) =>
      this.request(`/auth/demo/${id}`),

    me: () =>
      this.request('/auth/me'),

    updateProfile: (payload: { name?: string; email?: string; phone?: string; avatar?: string; title?: string }) =>
      this.request('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),

    updatePassword: (payload: { current_password?: string; new_password: string }) =>
      this.request('/auth/password', { method: 'POST', body: JSON.stringify(payload) }),

    logout: () =>
      this.request('/auth/logout', { method: 'POST' }),
  };

  // Categories
  public categories = {
    getAll: () => this.request('/categories'),
  };

  // Sins Catalog
  public sins = {
    getAll: (params?: { category?: string; search?: string; sort?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.append('category', params.category);
      if (params?.search) searchParams.append('search', params.search);
      if (params?.sort) searchParams.append('sort', params.sort);
      const qs = searchParams.toString();
      return this.request(`/sins${qs ? `?${qs}` : ''}`);
    },

    getDetail: (id: string) =>
      this.request(`/sins/${id}`),

    toggleBookmark: (id: string) =>
      this.request(`/sins/${id}/bookmark`, { method: 'POST' }),
  };

  // User Journeys
  public journeys = {
    getAll: () => this.request('/journeys'),

    create: (payload: { sin_id: string; notes?: string }) =>
      this.request('/journeys', { method: 'POST', body: JSON.stringify(payload) }),

    relapse: (sinId: string) =>
      this.request(`/journeys/${sinId}/relapse`, { method: 'POST' }),

    delete: (sinId: string) =>
      this.request(`/journeys/${sinId}`, { method: 'DELETE' }),
  };

  // 5-Step Muhasabah Journals
  public journals = {
    getAll: () => this.request('/journals'),

    create: (payload: {
      date?: string;
      sin_id?: string;
      mistake: string;
      trigger: string;
      hurt: string;
      fix: string;
      prevent: string;
      mood?: string;
    }) => this.request('/journals', { method: 'POST', body: JSON.stringify(payload) }),

    delete: (id: number | string) =>
      this.request(`/journals/${id}`, { method: 'DELETE' }),
  };

  // Daily Ibadah Checklist
  public ibadah = {
    get: (date?: string) =>
      this.request(`/ibadah${date ? `?date=${date}` : ''}`),

    toggle: (payload: { date: string; ibadah_id: string }) =>
      this.request('/ibadah/toggle', { method: 'POST', body: JSON.stringify(payload) }),
  };

  // Dzikir Logs
  public dzikir = {
    log: (payload: { preset_id: string; title: string; count_reached: number; session_date?: string }) =>
      this.request('/dzikir/log', { method: 'POST', body: JSON.stringify(payload) }),
  };

  // Content Management System (CMS)
  public cms = {
    getContents: (type?: string) =>
      this.request(`/cms/contents${type ? `?type=${type}` : ''}`),

    createContent: (payload: {
      title: string;
      type: 'AYAT' | 'HADIS' | 'DOA';
      arabic?: string;
      latin?: string;
      translation: string;
      reference?: string;
      status?: string;
    }) => this.request('/cms/contents', { method: 'POST', body: JSON.stringify(payload) }),

    updateStatus: (id: number | string, status: string, reviewer?: string) =>
      this.request(`/cms/contents/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reviewer }),
      }),
  };

  // Feedback
  public feedback = {
    send: (payload: { tool?: string; rating?: number; comment: string; name?: string; email?: string }) =>
      this.request('/feedback', { method: 'POST', body: JSON.stringify(payload) }),
  };

  // Admin User & Platform Management
  public admin = {
    getUsers: () => this.request('/admin/users'),

    updateUser: (id: string, payload: { name?: string; email?: string; phone?: string; role?: string; plan?: string; status?: string; title?: string; avatar?: string; original_email?: string }) =>
      this.request(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),

    deleteUser: (id: string, email?: string) => {
      const qs = email ? `?email=${encodeURIComponent(email)}` : '';
      return this.request(`/admin/users/${id}${qs}`, { method: 'DELETE' });
    },

    updateUserStatus: (id: string, status: 'ACTIVE' | 'SUSPENDED', email?: string) =>
      this.request(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, email }),
      }),

    backup: () =>
      this.request('/admin/backup'),

    restore: (payload: any) =>
      this.request('/admin/restore', { method: 'POST', body: JSON.stringify(payload) }),

    reset: () =>
      this.request('/admin/reset', { method: 'POST' }),
  };
}

export const api = new ApiClient();
