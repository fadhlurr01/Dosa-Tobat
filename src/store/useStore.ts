import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserJourney, JournalEntry, Role, SubscriptionPlan, ContentItem, ContentStatus, UserAccount, AccountStatus } from '../types';
import { NotificationFrequency } from '../services/notificationService';
import { soundFx } from '../lib/soundFx';
import { api } from '../lib/api';

type ThemeMode = 'light' | 'dark' | 'system';

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'demo_user_1',
    name: 'Ahmad Fauzi',
    email: 'ahmad@example.com',
    role: 'USER',
    plan: 'FREE',
    status: 'ACTIVE',
    title: 'Penuntut Kebaikan',
    streakDays: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    lastActive: new Date().toISOString(),
    registrationDate: '2023-01-15T08:30:00Z',
    isDemo: true,
  },
  {
    id: 'demo_user_2',
    name: 'Citra Kirana',
    email: 'citra@example.com',
    role: 'USER',
    plan: 'PREMIUM_YEARLY',
    status: 'ACTIVE',
    title: 'Pejuang Istiqomah (PRO)',
    streakDays: 18,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    lastActive: new Date().toISOString(),
    registrationDate: '2023-03-05T14:45:00Z',
    isDemo: true,
  },
  {
    id: 'demo_user_3',
    name: 'Ust. Farhan Az-Zuhri, Lc.',
    email: 'farhan@taubat.app',
    role: 'CONTENT_ADMIN',
    plan: 'PREMIUM_YEARLY',
    status: 'ACTIVE',
    title: 'Dewan Syariah & Reviewer Konten',
    streakDays: 90,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    lastActive: new Date().toISOString(),
    registrationDate: '2022-06-10T10:00:00Z',
    isDemo: true,
  },
  {
    id: 'demo_user_4',
    name: 'Siti Rahmah (Super Admin)',
    email: 'admin@taubat.app',
    role: 'SUPER_ADMIN',
    plan: 'PREMIUM_YEARLY',
    status: 'ACTIVE',
    title: 'Platform Super Administrator',
    streakDays: 120,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    lastActive: new Date().toISOString(),
    registrationDate: '2022-01-01T00:00:00Z',
    isDemo: true,
  },
];

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

  // Actions
  login: (email: string, name?: string, role?: Role, plan?: SubscriptionPlan) => void;
  loginDemo: (demoId: string) => void;
  logout: () => void;
  registerUser: (name: string, email: string) => void;
  setUserName: (name: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: string) => void;
  setNotificationFrequency: (freq: NotificationFrequency) => void;
  setRole: (role: Role) => void;
  setPlan: (plan: SubscriptionPlan) => void;
  toggleSound: () => void;
  addCmsItem: (item: Omit<ContentItem, 'id' | 'version' | 'lastUpdated'>) => void;
  updateCmsItemStatus: (id: string, status: ContentStatus, reviewer?: string) => void;
  updateMockUserStatus: (id: string, status: AccountStatus) => void;
  startJourney: (sinId: string) => void;
  removeJourney: (sinId: string) => void;
  updateJourneyStatus: (sinId: string, status: UserJourney['status']) => void;
  recordRelapse: (sinId: string) => void;
  addJournal: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  deleteJournal: (id: string) => void;
  toggleBookmark: (sinId: string) => void;
  toggleDailyIbadah: (dateStr: string, ibadahId: string) => void;
  seedDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: DEMO_ACCOUNTS[0],
      isAuthenticated: true,
      soundEnabled: true,
      bookmarks: ['zina-mata', 'ghibah'],
      journeys: {
        'marah': {
          sinId: 'marah',
          startDate: new Date(Date.now() - 14 * 86400000).toISOString(),
          status: 'STABLE',
        },
        'ghibah': {
          sinId: 'ghibah',
          startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
          lastRelapse: new Date(Date.now() - 2 * 86400000).toISOString(),
          status: 'RECOVERING',
        }
      },
      journals: [
        {
          id: 'init_journal_1',
          date: new Date(Date.now() - 86400000).toISOString(),
          mistake: 'Terbawa suasana mengeluh berlebihan saat terjebak macet.',
          trigger: 'Kelelahan setelah pulang kerja.',
          hurt: 'Diri sendiri, hati jadi gelisah dan lalai mengingat nikmat.',
          fix: 'Segera beristighfar dan menggantinya dengan menyetel murottal.',
          prevent: 'Siapkan playlist dzikir dan istighfar di kendaraan.'
        }
      ],
      dailyIbadah: {},
      userName: DEMO_ACCOUNTS[0].name,
      theme: 'system',
      language: 'id',
      notificationFrequency: 'normal',
      role: DEMO_ACCOUNTS[0].role,
      plan: DEMO_ACCOUNTS[0].plan,
      cmsItems: [
        {
          id: 'cms_1',
          title: 'Hadis tentang Taubat',
          type: 'HADIS',
          status: 'PUBLISHED',
          author: 'Admin',
          version: 1,
          lastUpdated: new Date().toISOString(),
          arabic: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
          translation: 'Setiap anak Adam pasti sering berbuat dosa, dan sebaik-baik orang yang berbuat dosa adalah yang bertaubat.',
          reference: 'H.R. Tirmidzi no. 2499'
        },
        {
          id: 'cms_2',
          title: 'Ayat Rahmat Allah',
          type: 'AYAT',
          status: 'VERIFIED',
          author: 'Content Team',
          reviewer: 'Ust. Farhan Az-Zuhri, Lc.',
          version: 2,
          lastUpdated: new Date().toISOString(),
          arabic: 'قُلْ يَاعِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
          translation: 'Katakanlah: "Hai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri, janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya. Sesungguhnya Dialah Yang Maha Pengampun lagi Maha Penyayang."',
          reference: 'Q.S. Az-Zumar: 53'
        }
      ],
      mockUsers: DEMO_ACCOUNTS,

      login: (email, name, role = 'USER', plan = 'FREE') => {
        const found = get().mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        const isDemo = DEMO_ACCOUNTS.some(d => d.email.toLowerCase() === email.toLowerCase());
        
        const user: UserAccount = found || {
          id: `usr_${Date.now()}`,
          name: name || email.split('@')[0],
          email,
          role,
          plan,
          status: 'ACTIVE',
          title: 'Hamba Allah',
          streakDays: 0,
          lastActive: new Date().toISOString(),
          registrationDate: new Date().toISOString(),
        };

        // Sync with Laravel REST API in background & fetch user's saved data
        api.auth.login({ email, password: 'password123' })
          .then((res) => {
            if (res?.data?.token) {
              api.setToken(res.data.token);
              // Fetch user's journeys from backend
              api.journeys.getAll().then((jRes) => {
                if (jRes?.data && Array.isArray(jRes.data)) {
                  const journeysMap: Record<string, UserJourney> = {};
                  jRes.data.forEach((j: any) => {
                    journeysMap[j.sin_id] = {
                      sinId: j.sin_id,
                      startDate: j.start_date,
                      lastRelapse: j.last_relapse || undefined,
                      status: j.status,
                    };
                  });
                  set({ journeys: journeysMap });
                }
              }).catch(() => {});

              // Fetch user's journals from backend
              api.journals.getAll().then((jrRes) => {
                if (jrRes?.data && Array.isArray(jrRes.data)) {
                  set({ journals: jrRes.data });
                }
              }).catch(() => {});
            }
          })
          .catch(() => {});

        set({
          currentUser: user,
          isAuthenticated: true,
          userName: user.name,
          role: user.role,
          plan: user.plan,
          // If not demo user, ensure clean data if not previously saved
          ...(isDemo ? {} : {
            journeys: {},
            journals: [],
            dailyIbadah: {},
            bookmarks: [],
          }),
        });
      },

      loginDemo: (demoId: string) => {
        const target = DEMO_ACCOUNTS.find(a => a.id === demoId) || DEMO_ACCOUNTS[0];

        // Sync demo login token from Laravel
        api.auth.demo(demoId)
          .then((res) => {
            if (res?.data?.token) api.setToken(res.data.token);
          })
          .catch(() => {});

        // Populate sample demo journeys and journals for evaluator review
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
        api.auth.logout().catch(() => {});
        api.setToken(null);

        set({
          isAuthenticated: false,
          currentUser: {
            id: 'guest',
            name: 'Tamu (Belum Masuk)',
            email: '',
            role: 'USER',
            plan: 'FREE',
            status: 'ACTIVE',
            lastActive: new Date().toISOString(),
            registrationDate: new Date().toISOString(),
          },
          userName: 'Tamu',
          role: 'USER',
          plan: 'FREE',
          journeys: {},
          journals: [],
          bookmarks: [],
        });
      },

      registerUser: (name, email) => {
        const newUser: UserAccount = {
          id: `usr_${Date.now()}`,
          name,
          email,
          role: 'USER',
          plan: 'FREE',
          status: 'ACTIVE',
          title: 'Penuntut Kebaikan Baru',
          streakDays: 0,
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
          lastActive: new Date().toISOString(),
          registrationDate: new Date().toISOString(),
        };

        // Sync with Laravel backend
        api.auth.register({ name, email, password: 'password123' })
          .then((res) => {
            if (res?.data?.token) api.setToken(res.data.token);
          })
          .catch(() => {});

        // Data akun baru benar-benar KOSONG dari awal
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

      addCmsItem: (item) => {
        api.cms.createContent(item).catch(() => {});
        set((state) => ({
          cmsItems: [
            {
              ...item,
              id: Math.random().toString(36).substring(7),
              version: 1,
              lastUpdated: new Date().toISOString(),
            },
            ...state.cmsItems,
          ]
        }));
      },

      updateCmsItemStatus: (id, status, reviewer) => {
        api.cms.updateStatus(id, status, reviewer).catch(() => {});
        set((state) => ({
          cmsItems: state.cmsItems.map(item => item.id === id ? { 
            ...item, 
            status, 
            reviewer: reviewer || item.reviewer,
            version: item.version + 1,
            lastUpdated: new Date().toISOString()
          } : item)
        }));
      },

      updateMockUserStatus: (id, status) => set((state) => ({
        mockUsers: state.mockUsers.map(user => user.id === id ? { ...user, status } : user)
      })),

      startJourney: (sinId) => {
        api.journeys.create({ sin_id: sinId }).catch(() => {});
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

      removeJourney: (sinId) => {
        api.journeys.delete(sinId).catch(() => {});
        set((state) => {
          const nextJourneys = { ...state.journeys };
          delete nextJourneys[sinId];
          return { journeys: nextJourneys };
        });
      },

      recordRelapse: (sinId) => {
        api.journeys.relapse(sinId).catch(() => {});
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

      addJournal: (entry) => {
        api.journals.create(entry).catch(() => {});
        set((state) => ({
          journals: [
            {
              ...entry,
              id: Math.random().toString(36).substring(7),
              date: new Date().toISOString(),
            },
            ...state.journals,
          ],
        }));
      },

      deleteJournal: (id) => {
        api.journals.delete(id).catch(() => {});
        set((state) => ({
          journals: state.journals.filter((j) => j.id !== String(id)),
        }));
      },

      toggleBookmark: (sinId) => {
        api.sins.toggleBookmark(sinId).catch(() => {});
        set((state) => {
          const exists = (state.bookmarks || []).includes(sinId);
          return {
            bookmarks: exists
              ? (state.bookmarks || []).filter((id) => id !== sinId)
              : [...(state.bookmarks || []), sinId],
          };
        });
      },

      toggleDailyIbadah: (dateStr, ibadahId) => {
        api.ibadah.toggle({ date: dateStr, ibadah_id: ibadahId }).catch(() => {});
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

      seedDemoData: () => set((state) => {
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
    }),
    {
      name: 'doa-tobat-storage',
    }
  )
);
