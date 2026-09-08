/**
 * IndexedDB Database Service for Dosa & Tobat Platform
 * Database: DosaTobatDB (Version 1)
 * Stores: users, journeys, journals, cms_items, settings, activity_logs, daily_ibadah
 */

import { UserAccount, UserJourney, JournalEntry, ContentItem, Role, SubscriptionPlan, AccountStatus, ContentStatus } from '../types';

const DB_NAME = 'DosaTobatDB';
const DB_VERSION = 1;

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface AppSettings {
  appName: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  defaultDailyTarget: number;
  notificationFrequency: 'low' | 'normal' | 'high';
  enableAudioRecitation: boolean;
  defaultLanguage: string;
  lastBackupDate?: string;
}

export const INITIAL_SETTINGS: AppSettings = {
  appName: 'Dosa & Tobat™ - Platform Pemulihan Jiwa',
  allowRegistration: true,
  maintenanceMode: false,
  defaultDailyTarget: 33,
  notificationFrequency: 'normal',
  enableAudioRecitation: true,
  defaultLanguage: 'id',
};

export const INITIAL_USERS: UserAccount[] = [
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

export const INITIAL_CMS: ContentItem[] = [
  {
    id: 'cms_1',
    title: 'Hadis tentang Keutamaan Taubat',
    type: 'HADIS',
    status: 'PUBLISHED',
    author: 'Ust. Farhan Az-Zuhri, Lc.',
    reviewer: 'Dewan Syariah',
    version: 1,
    lastUpdated: new Date().toISOString(),
    arabic: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
    translation: 'Setiap anak Adam pasti sering berbuat dosa, dan sebaik-baik orang yang berbuat dosa adalah yang bertaubat.',
    reference: 'H.R. Tirmidzi no. 2499'
  },
  {
    id: 'cms_2',
    title: 'Ayat Rahmat Luas & Ampunan Allah',
    type: 'AYAT',
    status: 'PUBLISHED',
    author: 'Content Team',
    reviewer: 'Ust. Farhan Az-Zuhri, Lc.',
    version: 2,
    lastUpdated: new Date().toISOString(),
    arabic: 'قُلْ يَاعِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
    translation: 'Katakanlah: "Hai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri, janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya. Sesungguhnya Dialah Yang Maha Pengampun lagi Maha Penyayang."',
    reference: 'Q.S. Az-Zumar: 53'
  },
  {
    id: 'cms_3',
    title: 'Doa Sayyidul Istighfar',
    type: 'DOA',
    status: 'PUBLISHED',
    author: 'Dewan Syariah',
    reviewer: 'Ust. Farhan Az-Zuhri, Lc.',
    version: 1,
    lastUpdated: new Date().toISOString(),
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    translation: 'Ya Allah, Engkau adalah Rabbku, tidak ada tuhan yang berhak disembah selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu.',
    reference: 'H.R. Bukhari no. 6306'
  }
];

class DatabaseService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise<IDBDatabase>((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB is not supported in this environment'));
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store: users
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
          userStore.createIndex('role', 'role', { unique: false });
          userStore.createIndex('status', 'status', { unique: false });
        }

        // Store: journals
        if (!db.objectStoreNames.contains('journals')) {
          const journalStore = db.createObjectStore('journals', { keyPath: 'id' });
          journalStore.createIndex('userId', 'userId', { unique: false });
          journalStore.createIndex('date', 'date', { unique: false });
        }

        // Store: journeys
        if (!db.objectStoreNames.contains('journeys')) {
          const journeyStore = db.createObjectStore('journeys', { keyPath: 'id' });
          journeyStore.createIndex('userId', 'userId', { unique: false });
          journeyStore.createIndex('sinId', 'sinId', { unique: false });
        }

        // Store: cms_items
        if (!db.objectStoreNames.contains('cms_items')) {
          const cmsStore = db.createObjectStore('cms_items', { keyPath: 'id' });
          cmsStore.createIndex('type', 'type', { unique: false });
          cmsStore.createIndex('status', 'status', { unique: false });
        }

        // Store: settings
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        // Store: activity_logs
        if (!db.objectStoreNames.contains('activity_logs')) {
          const logStore = db.createObjectStore('activity_logs', { keyPath: 'id' });
          logStore.createIndex('userId', 'userId', { unique: false });
          logStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Store: daily_ibadah
        if (!db.objectStoreNames.contains('daily_ibadah')) {
          const ibadahStore = db.createObjectStore('daily_ibadah', { keyPath: 'id' });
          ibadahStore.createIndex('userId', 'userId', { unique: false });
        }
      };

      request.onsuccess = async (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        await this.seedInitialDataIfEmpty();
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });

    return this.initPromise;
  }

  /**
   * Automatically seeds initial demo users and CMS data on fresh DB creation
   */
  private async seedInitialDataIfEmpty() {
    try {
      const users = await this.getAll<UserAccount>('users');
      if (users.length === 0) {
        for (const user of INITIAL_USERS) {
          await this.put('users', user);
        }
      }

      const cms = await this.getAll<ContentItem>('cms_items');
      if (cms.length === 0) {
        for (const item of INITIAL_CMS) {
          await this.put('cms_items', item);
        }
      }

      const settings = await this.getSetting();
      if (!settings) {
        await this.saveSetting(INITIAL_SETTINGS);
      }

      const logs = await this.getAll<ActivityLog>('activity_logs');
      if (logs.length === 0) {
        await this.logActivity({
          userId: 'system',
          userName: 'System Database',
          action: 'DATABASE_INITIALIZED',
          details: 'IndexedDB DosaTobatDB berhasil diinisialisasi & di-seed.',
        });
      }
    } catch (e) {
      console.warn('DB Seeding warning:', e);
    }
  }

  // ================= GENERIC CRUD HELPERS =================

  public async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  public async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  public async put<T>(storeName: string, item: T): Promise<T> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(item);
      req.onerror = () => reject(req.error);
    });
  }

  public async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async clearStore(storeName: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // ================= DOMAIN SPECIFIC METHODS =================

  // --- USERS ---
  public async getUsers(): Promise<UserAccount[]> {
    return this.getAll<UserAccount>('users');
  }

  public async getUserByEmail(email: string): Promise<UserAccount | undefined> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const index = store.index('email');
      const req = index.get(email.toLowerCase().trim());
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  public async createUser(user: UserAccount): Promise<UserAccount> {
    await this.put('users', {
      ...user,
      email: user.email.toLowerCase().trim()
    });
    await this.logActivity({
      userId: user.id,
      userName: user.name,
      action: 'USER_REGISTERED',
      details: `Pendaftaran pengguna baru (${user.email}).`,
    });
    return user;
  }

  public async updateUser(user: UserAccount): Promise<UserAccount> {
    await this.put('users', user);
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete('users', id);
    await this.logActivity({
      userId: 'admin',
      userName: 'Administrator',
      action: 'USER_DELETED',
      details: `Menghapus akun pengguna ID: ${id}`,
    });
  }

  // --- CMS CONTENT ---
  public async getCmsItems(): Promise<ContentItem[]> {
    return this.getAll<ContentItem>('cms_items');
  }

  public async createCmsItem(item: ContentItem): Promise<ContentItem> {
    await this.put('cms_items', item);
    await this.logActivity({
      userId: 'admin',
      userName: item.author || 'Admin',
      action: 'CMS_CREATED',
      details: `Menambahkan konten baru: "${item.title}" (${item.type})`,
    });
    return item;
  }

  public async updateCmsItem(item: ContentItem): Promise<ContentItem> {
    await this.put('cms_items', item);
    return item;
  }

  public async deleteCmsItem(id: string): Promise<void> {
    await this.delete('cms_items', id);
    await this.logActivity({
      userId: 'admin',
      userName: 'Admin',
      action: 'CMS_DELETED',
      details: `Menghapus item konten ID: ${id}`,
    });
  }

  // --- SETTINGS ---
  public async getSetting(): Promise<AppSettings | null> {
    const record = await this.get<{ key: string; value: AppSettings }>('settings', 'app_config');
    return record ? record.value : null;
  }

  public async saveSetting(settings: AppSettings): Promise<AppSettings> {
    await this.put('settings', { key: 'app_config', value: settings });
    return settings;
  }

  // --- ACTIVITY LOGS ---
  public async logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    const entry: ActivityLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      timestamp: new Date().toISOString(),
    };
    try {
      await this.put('activity_logs', entry);
    } catch {
      // ignore
    }
    return entry;
  }

  public async getActivityLogs(limit = 20): Promise<ActivityLog[]> {
    const logs = await this.getAll<ActivityLog>('activity_logs');
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  }

  // --- FULL DB BACKUP / EXPORT / IMPORT / RESET ---
  public async exportDatabase(): Promise<string> {
    const users = await this.getAll('users');
    const cms = await this.getAll('cms_items');
    const settings = await this.getSetting();
    const logs = await this.getAll('activity_logs');
    const journals = await this.getAll('journals');
    const journeys = await this.getAll('journeys');

    const backup = {
      version: DB_VERSION,
      exportedAt: new Date().toISOString(),
      data: {
        users,
        cms_items: cms,
        settings,
        activity_logs: logs,
        journals,
        journeys,
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  public async importDatabase(jsonString: string): Promise<boolean> {
    try {
      const backup = JSON.parse(jsonString);
      if (!backup?.data) throw new Error('Invalid backup format');

      if (Array.isArray(backup.data.users)) {
        await this.clearStore('users');
        for (const u of backup.data.users) await this.put('users', u);
      }

      if (Array.isArray(backup.data.cms_items)) {
        await this.clearStore('cms_items');
        for (const c of backup.data.cms_items) await this.put('cms_items', c);
      }

      if (backup.data.settings) {
        await this.saveSetting(backup.data.settings);
      }

      if (Array.isArray(backup.data.activity_logs)) {
        for (const l of backup.data.activity_logs) await this.put('activity_logs', l);
      }

      await this.logActivity({
        userId: 'admin',
        userName: 'Admin',
        action: 'DATABASE_RESTORED',
        details: 'Database berhasil dipulihkan dari file backup JSON.',
      });

      return true;
    } catch (e) {
      console.error('Import database error:', e);
      return false;
    }
  }

  public async resetToDefaults(): Promise<void> {
    await this.clearStore('users');
    await this.clearStore('cms_items');
    await this.clearStore('activity_logs');
    await this.clearStore('journals');
    await this.clearStore('journeys');
    await this.clearStore('settings');

    for (const user of INITIAL_USERS) await this.put('users', user);
    for (const item of INITIAL_CMS) await this.put('cms_items', item);
    await this.saveSetting(INITIAL_SETTINGS);

    await this.logActivity({
      userId: 'system',
      userName: 'System Database',
      action: 'DATABASE_RESET',
      details: 'Database telah di-reset kembali ke data default pabrik.',
    });
  }

  public async getStorageStats(): Promise<{
    userCount: number;
    cmsCount: number;
    logCount: number;
    journalCount: number;
    dbStatus: 'CONNECTED' | 'ERROR';
  }> {
    try {
      const users = await this.getAll('users');
      const cms = await this.getAll('cms_items');
      const logs = await this.getAll('activity_logs');
      const journals = await this.getAll('journals');
      return {
        userCount: users.length,
        cmsCount: cms.length,
        logCount: logs.length,
        journalCount: journals.length,
        dbStatus: 'CONNECTED',
      };
    } catch {
      return {
        userCount: 0,
        cmsCount: 0,
        logCount: 0,
        journalCount: 0,
        dbStatus: 'ERROR',
      };
    }
  }
}

export const dbService = new DatabaseService();
