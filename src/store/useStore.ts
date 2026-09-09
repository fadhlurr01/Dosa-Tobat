import { create } from 'zustand';
import { UserJourney, JournalEntry, Role, SubscriptionPlan, ContentItem, ContentStatus, UserAccount, AccountStatus } from '../types';
import { NotificationFrequency } from '../services/notificationService';
import { soundFx } from '../lib/soundFx';
import { api } from '../lib/api';
import { INITIAL_USERS, INITIAL_CMS, AppSettings, INITIAL_SETTINGS, ActivityLog } from '../lib/constants';

type ThemeMode = 'light' | 'dark' | 'system';

const DEFAULT_USER: UserAccount = {
  id: '',
  name: 'Tamu',
  email: '',
  role: 'USER',
  plan: 'FREE',
  status: 'ACTIVE',
  title: 'Penuntut Kebaikan',
  streakDays: 0,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  lastActive: new Date().toISOString(),
  registrationDate: new Date().toISOString(),
  isDemo: false,
};

export const DEMO_ACCOUNTS: UserAccount[] = INITIAL_USERS;

interface LoginResult {
  success: boolean;
  error?: 'NOT_REGISTERED' | 'SUSPENDED' | 'INVALID';
  message?: string;
}

interface AppState {
  currentUser: UserAccount;
  isAuthenticated: boolean;
  soundEnabled: boolean;
  journeys: Record<string, UserJourney>;
  journals: JournalEntry[];
  userName: string;
  theme: ThemeMode;
  language: string;
  notificationFrequency: NotificationFrequency;
  role: Role;
  plan: SubscriptionPlan;
  cmsItems: ContentItem[];
  mockUsers: UserAccount[];
  bookmarks: string[];
  dailyIbadah: Record<string, boolean>;
  appSettings: AppSettings;
  activityLogs: ActivityLog[];
  isDbReady: boolean;

  // Actions
  initDB: () => Promise<void>;
  login: (email: string, password?: string) => Promise<LoginResult>;
  loginDemo: (demoId: string) => void;
  logout: () => void;
  registerUser: (name: string, email: string, phone?: string, password?: string, initialGoal?: string) => Promise<{ success: boolean; message?: string }>;
  updateCurrentUserProfile: (data: { name?: string; email?: string; phone?: string; avatar?: string; title?: string }) => Promise<{ success: boolean; message?: string }>;
  updateCurrentUserPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (id: string, updatedData: Partial<UserAccount>) => Promise<void>;
  backupData: () => Promise<string>;
  restoreData: (jsonString: string) => Promise<{ success: boolean; message?: string }>;
  resetData: () => Promise<{ success: boolean; message?: string }>;
  setUserName: (name: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: string) => void;
  setNotificationFrequency: (freq: NotificationFrequency) => void;
  setRole: (role: Role) => void;
  setPlan: (plan: SubscriptionPlan) => void;
  toggleSound: () => void;
  addCmsItem: (item: Omit<ContentItem, 'id' | 'version' | 'lastUpdated'>) => Promise<void>;
  updateCmsItem: (item: ContentItem) => Promise<void>;
  deleteCmsItem: (id: string) => Promise<void>;
  updateCmsItemStatus: (id: string, status: ContentStatus, reviewer?: string) => Promise<void>;
  updateMockUserStatus: (id: string, status: AccountStatus) => Promise<void>;
  updateAppSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  startJourney: (sinId: string) => void;
  removeJourney: (sinId: string) => void;
  updateJourneyStatus: (sinId: string, status: UserJourney['status']) => void;
  recordRelapse: (sinId: string) => void;
  addJournal: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  deleteJournal: (id: string) => void;
  toggleBookmark: (sinId: string) => void;
  toggleDailyIbadah: (dateStr: string, ibadahId: string) => void;
  seedDemoData: () => void;
  refreshFromDB: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: DEFAULT_USER,
  isAuthenticated: false,
  soundEnabled: true,
  bookmarks: [],
  journeys: {},
  journals: [],
  dailyIbadah: {},
  userName: 'Tamu',
  theme: 'system',
  language: 'id',
  notificationFrequency: 'normal',
  role: 'USER',
  plan: 'FREE',
  cmsItems: INITIAL_CMS,
  mockUsers: INITIAL_USERS,
  appSettings: INITIAL_SETTINGS,
  activityLogs: [],
  isDbReady: false,

  initDB: async () => {
    try {
      let users: UserAccount[] = INITIAL_USERS;

      // 1. Live Fetch from Laravel REST API
      try {
        const apiUsersRes = await api.admin.getUsers();
        if (apiUsersRes && apiUsersRes.success && Array.isArray(apiUsersRes.data)) {
          users = apiUsersRes.data.map((u: any) => ({
            id: String(u.id),
            name: u.name,
            email: u.email,
            role: (u.role as Role) || 'USER',
            plan: (u.plan as SubscriptionPlan) || 'FREE',
            status: (u.status as AccountStatus) || 'ACTIVE',
            title: u.title || (u.plan !== 'FREE' ? 'Pejuang Istiqomah (PRO)' : 'Penuntut Kebaikan'),
            streakDays: u.streak_days || 0,
            avatar: u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            lastActive: u.updated_at || u.created_at || new Date().toISOString(),
            registrationDate: u.created_at || new Date().toISOString(),
            isDemo: Boolean(u.is_demo),
          }));
        }
      } catch (err: any) {
        console.log('[API Admin Notice] Live fetch from backend API:', err.message);
      }

      set({
        mockUsers: users.length > 0 ? users : INITIAL_USERS,
        cmsItems: INITIAL_CMS,
        appSettings: INITIAL_SETTINGS,
        isDbReady: true,
      });
    } catch (e) {
      console.warn('Init DB warning:', e);
      set({ isDbReady: true });
    }
  },

  refreshFromDB: async () => {
    try {
      const apiUsersRes = await api.admin.getUsers();
      if (apiUsersRes && apiUsersRes.success && Array.isArray(apiUsersRes.data)) {
        const users = apiUsersRes.data.map((u: any) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          role: (u.role as Role) || 'USER',
          plan: (u.plan as SubscriptionPlan) || 'FREE',
          status: (u.status as AccountStatus) || 'ACTIVE',
          title: u.title || (u.plan !== 'FREE' ? 'Pejuang Istiqomah (PRO)' : 'Penuntut Kebaikan'),
          streakDays: u.streak_days || 0,
          avatar: u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          lastActive: u.updated_at || u.created_at || new Date().toISOString(),
          registrationDate: u.created_at || new Date().toISOString(),
          isDemo: Boolean(u.is_demo),
        }));

        set({ mockUsers: users });
      }
    } catch (e: any) {
      console.warn('Refresh from DB warning:', e.message);
    }
  },

  login: async (email: string, password?: string): Promise<LoginResult> => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Send Login Request to Backend API
    try {
      const apiRes = await api.auth.login({ email: cleanEmail, password: password || 'password' });
      if (apiRes && apiRes.data) {
        if (apiRes.data.token) {
          api.setToken(apiRes.data.token);
        }
        const beUser = apiRes.data.user;
        const mappedUser: UserAccount = {
          id: String(beUser.id || `usr_${Date.now()}`),
          name: beUser.name,
          email: beUser.email,
          role: beUser.role || 'USER',
          plan: beUser.plan || 'FREE',
          status: beUser.status || 'ACTIVE',
          title: beUser.title || 'Penuntut Kebaikan',
          streakDays: beUser.streak_days || 0,
          avatar: beUser.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
          lastActive: new Date().toISOString(),
          registrationDate: beUser.created_at || new Date().toISOString(),
          isDemo: false,
        };

        // Fetch user's real DB journeys and journals
        let userJourneys: Record<string, UserJourney> = {};
        let userJournals: JournalEntry[] = [];
        try {
          const [jRes, jnRes] = await Promise.all([
            api.journeys.getAll().catch(() => null),
            api.journals.getAll().catch(() => null),
          ]);
          if (jRes && jRes.success && Array.isArray(jRes.data)) {
            jRes.data.forEach((j: any) => {
              userJourneys[j.sin_id] = {
                sinId: j.sin_id,
                startDate: j.start_date || j.created_at,
                lastRelapse: j.last_relapse,
                status: j.status || 'STABLE',
              };
            });
          }
          if (jnRes && jnRes.success && Array.isArray(jnRes.data)) {
            userJournals = jnRes.data.map((entry: any) => ({
              id: String(entry.id),
              date: entry.created_at || entry.date || new Date().toISOString(),
              mistake: entry.mistake,
              trigger: entry.trigger,
              hurt: entry.hurt,
              fix: entry.fix,
              prevent: entry.prevent,
            }));
          }
        } catch (syncErr) {
          console.log('[API Sync Notice]', syncErr);
        }

        set((state) => ({
          currentUser: mappedUser,
          isAuthenticated: true,
          userName: mappedUser.name,
          role: mappedUser.role,
          plan: mappedUser.plan,
          journeys: userJourneys,
          journals: userJournals,
          mockUsers: state.mockUsers.some(u => u.id === mappedUser.id)
            ? state.mockUsers.map(u => u.id === mappedUser.id ? mappedUser : u)
            : [mappedUser, ...state.mockUsers],
        }));

        return { success: true };
      }
    } catch (e: any) {
      console.log('[API Login Notice] Backend status:', e.status, e.message);
      if (e.status === 404 || (e.message && e.message.includes('belum terdaftar'))) {
        return {
          success: false,
          error: 'NOT_REGISTERED',
          message: 'Akun belum terdaftar di database. Silakan lakukan pendaftaran akun terlebih dahulu.'
        };
      }
      if (e.status === 403 || (e.message && e.message.includes('dinonaktifkan'))) {
        return {
          success: false,
          error: 'SUSPENDED',
          message: 'Akun Anda sedang dinonaktifkan oleh Administrator. Hubungi bantuan.'
        };
      }
      return {
        success: false,
        error: 'INVALID',
        message: e.data?.message || e.message || 'Email atau password salah.'
      };
    }

    return {
      success: false,
      error: 'NOT_REGISTERED',
      message: 'Akun belum terdaftar di Database Server.'
    };
  },

  loginDemo: (demoId: string) => {
    const target = DEMO_ACCOUNTS.find(a => a.id === demoId) || DEMO_ACCOUNTS[0];

    // Trigger API demo login in background
    api.auth.demo(demoId).then(res => {
      if (res?.data?.token) api.setToken(res.data.token);
    }).catch(() => {});

    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    set({
      currentUser: target,
      isAuthenticated: true,
      userName: target.name,
      role: target.role,
      plan: target.plan,
      journeys: {
        'marah': {
          sinId: 'marah',
          startDate: thirtyDaysAgo.toISOString(),
          status: 'STABLE',
        },
        'ghibah': {
          sinId: 'ghibah',
          startDate: tenDaysAgo.toISOString(),
          lastRelapse: twoDaysAgo.toISOString(),
          status: 'RECOVERING',
        },
        'riba': {
          sinId: 'riba',
          startDate: twoDaysAgo.toISOString(),
          status: 'FALLEN',
        }
      },
      journals: [
        {
          id: 'demo_j_1',
          date: today.toISOString(),
          mistake: 'Tadi sempat hampir terpancing emosi saat ada perselisihan.',
          trigger: 'Kelelahan setelah aktivitas seharian.',
          hurt: 'Hati menjadi gelisah dan kurang tenang.',
          fix: 'Segera berwudhu dan membaca ta\'awwudz serta istighfar 33x.',
          prevent: 'Menjaga jeda nafas dan tidak langsung merespon saat sedang emosi.'
        }
      ],
      bookmarks: ['ghibah', 'zina-mata', 'riba'],
    });
  },

  logout: () => {
    // Call API logout
    api.auth.logout().catch(() => {});
    api.setToken(null);

    set({
      isAuthenticated: false,
      currentUser: DEFAULT_USER,
      userName: 'Tamu',
      role: 'USER',
      plan: 'FREE',
      journeys: {},
      journals: [],
      bookmarks: [],
    });
  },

  registerUser: async (name: string, email: string, phone?: string, password?: string, initialGoal?: string) => {
    const cleanEmail = email.toLowerCase().trim();

    try {
      const apiRes = await api.auth.register({
        name: name.trim(),
        email: cleanEmail,
        phone: phone?.trim() || undefined,
        password: password || 'password123',
        plan: 'FREE'
      });

      if (apiRes && apiRes.data) {
        if (apiRes.data.token) {
          api.setToken(apiRes.data.token);
        }

        const beUser = apiRes.data.user;
        const newUser: UserAccount = {
          id: String(beUser.id),
          name: beUser.name,
          email: beUser.email,
          phone: beUser.phone || undefined,
          role: (beUser.role as Role) || 'USER',
          plan: (beUser.plan as SubscriptionPlan) || 'FREE',
          status: (beUser.status as AccountStatus) || 'ACTIVE',
          title: initialGoal ? `Fokus: ${initialGoal}` : 'Penuntut Kebaikan Baru',
          streakDays: 0,
          avatar: beUser.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
          lastActive: new Date().toISOString(),
          registrationDate: beUser.created_at || new Date().toISOString(),
          isDemo: false,
        };

        set((state) => ({
          mockUsers: [newUser, ...state.mockUsers],
          currentUser: newUser,
          isAuthenticated: true,
          userName: newUser.name,
          role: 'USER',
          plan: 'FREE',
          journeys: {},
          journals: [],
          dailyIbadah: {},
          bookmarks: [],
        }));

        return {
          success: true,
          message: `Pendaftaran berhasil. Selamat datang, ${newUser.name}!`
        };
      }
    } catch (apiErr: any) {
      console.log('[API Register Error]:', apiErr.message);
      return {
        success: false,
        message: apiErr.data?.message || apiErr.message || 'Gagal mendaftarkan akun ke server.'
      };
    }

    return {
      success: false,
      message: 'Gagal menghubungi server database.'
    };
  },

  updateCurrentUserProfile: async (data: { name?: string; email?: string; phone?: string; avatar?: string; title?: string }) => {
    const user = get().currentUser;
    if (!user || user.id === '') {
      return { success: false, message: 'Anda belum login.' };
    }

    const updatedUser: UserAccount = {
      ...user,
      ...(data.name ? { name: data.name.trim() } : {}),
      ...(data.email ? { email: data.email.toLowerCase().trim() } : {}),
      ...(data.phone !== undefined ? { phone: data.phone.trim() } : {}),
      ...(data.avatar ? { avatar: data.avatar } : {}),
      ...(data.title ? { title: data.title } : {}),
      lastActive: new Date().toISOString(),
    };

    try {
      await api.auth.updateProfile({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        title: updatedUser.title,
      });
    } catch (apiErr: any) {
      console.log('[API Profile Update Notice]:', apiErr.message);
    }

    set((state) => ({
      currentUser: updatedUser,
      userName: updatedUser.name,
      mockUsers: state.mockUsers.map(u => u.id === updatedUser.id ? updatedUser : u),
    }));

    return { success: true, message: 'Profil berhasil diperbarui di Database!' };
  },

  updateCurrentUserPassword: async (currentPassword: string, newPassword: string) => {
    try {
      const res = await api.auth.updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      if (res && res.message) {
        return { success: true, message: res.message };
      }
    } catch (apiErr: any) {
      return { success: false, message: apiErr.message || 'Gagal mengubah password.' };
    }

    return { success: true, message: 'Password akun Anda berhasil diperbarui.' };
  },

  deleteUser: async (id: string) => {
    const userToDelete = get().mockUsers.find(u => u.id === id);
    const userEmail = userToDelete?.email;

    try {
      await api.admin.deleteUser(id, userEmail);
    } catch (apiErr: any) {
      console.log('[API Admin Delete Notice]:', apiErr.message);
    }

    set((state) => ({
      mockUsers: state.mockUsers.filter(u => u.id !== id),
      currentUser: state.currentUser.id === id ? DEFAULT_USER : state.currentUser,
      isAuthenticated: state.currentUser.id === id ? false : state.isAuthenticated,
    }));
  },

  editUser: async (id: string, updatedData: Partial<UserAccount>) => {
    const existing = get().mockUsers.find(u => u.id === id);
    if (!existing) return;

    const merged: UserAccount = {
      ...existing,
      ...updatedData,
      lastActive: new Date().toISOString(),
    };

    try {
      await api.admin.updateUser(id, {
        name: merged.name,
        email: merged.email,
        phone: merged.phone,
        role: merged.role,
        plan: merged.plan,
        status: merged.status,
        title: merged.title,
        avatar: merged.avatar,
        original_email: existing.email,
      });
    } catch (apiErr: any) {
      console.log('[API Admin Update Notice]:', apiErr.message);
    }

    set((state) => ({
      mockUsers: state.mockUsers.map(u => u.id === id ? merged : u),
      currentUser: state.currentUser.id === id ? merged : state.currentUser,
    }));
  },

  backupData: async (): Promise<string> => {
    try {
      const apiBackup = await api.admin.backup();
      if (apiBackup && apiBackup.data) {
        return JSON.stringify(apiBackup.data, null, 2);
      }
    } catch (e) {
      console.log('[Backup Notice]:', e);
    }

    const stateBackup = {
      timestamp: new Date().toISOString(),
      platform: 'Dosa & Tobat Platform',
      version: '1.0.0',
      users: get().mockUsers,
      cmsItems: get().cmsItems,
      settings: get().appSettings,
      storeState: {
        journeys: get().journeys,
        journals: get().journals,
        bookmarks: get().bookmarks,
        dailyIbadah: get().dailyIbadah,
      }
    };

    return JSON.stringify(stateBackup, null, 2);
  },

  restoreData: async (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);

      try {
        await api.admin.restore({ data: parsed });
      } catch (err) {
        console.log('[Restore API Notice]:', err);
      }

      if (parsed.storeState) {
        set({
          journeys: parsed.storeState.journeys || {},
          journals: parsed.storeState.journals || [],
          bookmarks: parsed.storeState.bookmarks || [],
          dailyIbadah: parsed.storeState.dailyIbadah || {},
        });
      }

      await get().refreshFromDB();

      return { success: true, message: 'Data cadangan (backup) berhasil dipulihkan.' };
    } catch (e: any) {
      return { success: false, message: 'Gagal memulihkan data: Format file JSON tidak valid.' };
    }
  },

  resetData: async () => {
    try {
      await api.admin.reset();
      await get().refreshFromDB();
      return { success: true, message: 'Sistem berhasil direset ke pengaturan dan data awal.' };
    } catch (e: any) {
      return { success: false, message: 'Gagal mereset data.' };
    }
  },

  toggleSound: () => {
    const current = get().soundEnabled;
    const next = !current;
    soundFx.setEnabled(next);
    if (next) soundFx.playTap();
    set({ soundEnabled: next });
  },

  setUserName: (name) => {
    set((state) => ({
      userName: name,
      currentUser: { ...state.currentUser, name }
    }));
  },

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setNotificationFrequency: (notificationFrequency) => set({ notificationFrequency }),
  setRole: (role) => set((state) => ({ role, currentUser: { ...state.currentUser, role } })),
  setPlan: (plan) => set((state) => ({ plan, currentUser: { ...state.currentUser, plan } })),

  addCmsItem: async (item) => {
    const newItem: ContentItem = {
      ...item,
      id: `cms_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      version: 1,
      lastUpdated: new Date().toISOString(),
    };

    api.cms.createContent({
      title: item.title,
      type: item.type as any,
      arabic: item.arabic,
      latin: item.latin,
      translation: item.translation,
      reference: item.reference,
      status: item.status,
    }).catch(() => {});

    set((state) => ({
      cmsItems: [newItem, ...state.cmsItems]
    }));
  },

  updateCmsItem: async (item: ContentItem) => {
    const updated = {
      ...item,
      version: item.version + 1,
      lastUpdated: new Date().toISOString()
    };
    set((state) => ({
      cmsItems: state.cmsItems.map(c => c.id === item.id ? updated : c)
    }));
  },

  deleteCmsItem: async (id: string) => {
    set((state) => ({
      cmsItems: state.cmsItems.filter(c => c.id !== id)
    }));
  },

  updateCmsItemStatus: async (id, status, reviewer) => {
    const item = get().cmsItems.find(c => c.id === id);
    if (!item) return;

    api.cms.updateStatus(id, status, reviewer).catch(() => {});

    const updated: ContentItem = {
      ...item,
      status,
      reviewer: reviewer || item.reviewer,
      version: item.version + 1,
      lastUpdated: new Date().toISOString()
    };

    set((state) => ({
      cmsItems: state.cmsItems.map(c => c.id === id ? updated : c)
    }));
  },

  updateMockUserStatus: async (id, status) => {
    const targetUser = get().mockUsers.find(u => u.id === id);
    const userEmail = targetUser?.email;

    try {
      await api.admin.updateUserStatus(id, status, userEmail);
    } catch (apiErr: any) {
      console.log('[API Admin Status Notice]:', apiErr.message);
    }

    set((state) => ({
      mockUsers: state.mockUsers.map(u => u.id === id ? { ...u, status } : u),
      currentUser: state.currentUser.id === id ? { ...state.currentUser, status } : state.currentUser,
    }));
  },

  updateAppSettings: async (newSettings: Partial<AppSettings>) => {
    const current = get().appSettings;
    const updated = { ...current, ...newSettings };
    set({ appSettings: updated });
  },

  startJourney: async (sinId) => {
    try {
      await api.journeys.create({ sin_id: sinId });
    } catch (e) {
      console.log('[API Journey sync notice]:', e);
    }

    set((state) => ({
      journeys: {
        ...state.journeys,
        [sinId]: {
          sinId,
          startDate: new Date().toISOString(),
          status: 'STABLE',
        },
      },
    }));
  },

  updateJourneyStatus: (sinId, status) =>
    set((state) => {
      const journey = state.journeys[sinId];
      if (!journey) return state;
      return {
        journeys: {
          ...state.journeys,
          [sinId]: { ...journey, status },
        },
      };
    }),

  removeJourney: async (sinId) => {
    try {
      await api.journeys.delete(sinId);
    } catch (e) {
      console.log('[API Journey delete notice]:', e);
    }

    set((state) => {
      const nextJourneys = { ...state.journeys };
      delete nextJourneys[sinId];
      return { journeys: nextJourneys };
    });
  },

  recordRelapse: async (sinId) => {
    try {
      await api.journeys.relapse(sinId);
    } catch (e) {
      console.log('[API Relapse sync notice]:', e);
    }

    set((state) => {
      const journey = state.journeys[sinId];
      if (!journey) return state;
      return {
        journeys: {
          ...state.journeys,
          [sinId]: {
            ...journey,
            lastRelapse: new Date().toISOString(),
            status: 'FALLEN',
          },
        },
      };
    });
  },

  addJournal: async (entry) => {
    const tempId = Math.random().toString(36).substring(7);
    const dateNow = new Date().toISOString();

    let savedId = tempId;
    try {
      const res = await api.journals.create({
        mistake: entry.mistake,
        trigger: entry.trigger,
        hurt: entry.hurt,
        fix: entry.fix,
        prevent: entry.prevent,
        date: dateNow,
      });
      if (res && res.data && res.data.id) {
        savedId = String(res.data.id);
      }
    } catch (e) {
      console.log('[API Journal create notice]', e);
    }

    set((state) => ({
      journals: [
        {
          ...entry,
          id: savedId,
          date: dateNow,
        },
        ...state.journals,
      ],
    }));
  },

  deleteJournal: async (id) => {
    try {
      await api.journals.delete(id);
    } catch (e) {
      console.log('[API Journal delete notice]:', e);
    }

    set((state) => ({
      journals: state.journals.filter((j) => j.id !== String(id)),
    }));
  },

  toggleBookmark: async (sinId) => {
    try {
      await api.sins.toggleBookmark(sinId);
    } catch (e) {
      console.log('[API Bookmark sync notice]:', e);
    }

    set((state) => {
      const exists = (state.bookmarks || []).includes(sinId);
      return {
        bookmarks: exists
          ? (state.bookmarks || []).filter((id) => id !== sinId)
          : [...(state.bookmarks || []), sinId],
      };
    });
  },

  toggleDailyIbadah: async (dateStr, ibadahId) => {
    try {
      await api.ibadah.toggle({ date: dateStr, ibadah_id: ibadahId });
    } catch (e) {
      console.log('[API Ibadah toggle notice]:', e);
    }

    set((state) => {
      const key = `${dateStr}_${ibadahId}`;
      return {
        dailyIbadah: {
          ...state.dailyIbadah,
          [key]: !state.dailyIbadah[key]
        }
      };
    });
  },

  seedDemoData: () => set(() => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const yesterdayStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate() + 1).padStart(2, '0')}`;

    return {
      userName: 'Ahmad Fauzi (Demo)',
      currentUser: DEMO_ACCOUNTS[0],
      isAuthenticated: true,
      journeys: {
        'marah': {
          sinId: 'marah',
          startDate: thirtyDaysAgo.toISOString(),
          status: 'STABLE',
        },
        'ghibah': {
          sinId: 'ghibah',
          startDate: tenDaysAgo.toISOString(),
          lastRelapse: twoDaysAgo.toISOString(),
          status: 'RECOVERING',
        },
        'riya': {
          sinId: 'riya',
          startDate: twoDaysAgo.toISOString(),
          status: 'FALLEN',
        }
      },
      journals: [
        {
          id: 'demo_1',
          date: today.toISOString(),
          mistake: 'Tadi sempat hampir marah ke rekan kerja saat diskusi panas.',
          trigger: 'Pekerjaan tidak sesuai deadline yang disepakati.',
          hurt: 'Rekan kerja mungkin merasa tidak nyaman.',
          fix: 'Minta maaf dan bicarakan baik-baik besok pagi.',
          prevent: 'Lebih bersabar, ambil nafas dalam, dan konfirmasi progress lebih awal.'
        },
        {
          id: 'demo_2',
          date: twoDaysAgo.toISOString(),
          mistake: 'Ikut membicarakan keburukan orang lain (ghibah) di jam makan siang.',
          trigger: 'Terbawa suasana saat ngobrol santai bersama teman.',
          hurt: 'Orang yang dibicarakan, dan merusak kesucian hatiku sendiri.',
          fix: 'Banyak istighfar dan berniat mendoakan kebaikan bagi orang tersebut.',
          prevent: 'Menghindari circle yang suka berghibah atau pamit jika topik ghibah mulai.'
        },
        {
          id: 'demo_3',
          date: tenDaysAgo.toISOString(),
          mistake: 'Merasa ibadahku lebih baik dari orang lain (Riya/Ujub).',
          trigger: 'Mendapat pujian setelah shalat jamaah tepat waktu.',
          hurt: 'Pahalaku sendiri bisa terhapus karena niat yang salah.',
          fix: 'Istighfar dan mengingat semua nikmat datang murni dari pertolongan Allah.',
          prevent: 'Sembunyikan amalan sunnah sebaik mungkin dan perbaiki niat saat takbir.'
        }
      ],
      dailyIbadah: {
        [`${todayStr}_shalat`]: true,
        [`${todayStr}_dzikir`]: true,
        [`${yesterdayStr}_shalat`]: true,
        [`${yesterdayStr}_doa`]: true,
        [`${yesterdayStr}_ngaji`]: true,
      }
    };
  }),
}));

// Initialize database immediately on startup
if (typeof window !== 'undefined') {
  useStore.getState().initDB();
}
