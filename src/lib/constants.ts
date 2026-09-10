import { UserAccount, ContentItem } from '../types';

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
    id: 'cms_ayat_1',
    title: 'An-Nisa: 31 (Penghapusan Dosa-Dosa Kecil)',
    type: 'AYAT',
    status: 'PUBLISHED',
    author: 'Ust. Farhan Az-Zuhri, Lc.',
    reviewer: 'Dewan Fatwa',
    version: 1,
    lastUpdated: '2024-01-15T10:00:00Z',
    arabic: 'إِن تَجْتَنِبُوا۟ كَبَآئِرَ مَا تُنْهَوْنَ عَنْهُ نُكَفِّرْ عَنكُمْ سَيِّـَٔاتِكُمْ وَنُدْخِلْكُم مُّدْخَلًۭا كَرِيمًۭا',
    translation: 'Jika kamu menjauhi dosa-dosa besar di antara dosa-dosa yang dilarang kamu mengerjakannya, niscaya Kami hapus kesalahan-kesalahanmu (dosa-dosamu yang kecil) dan Kami masukkan kamu ke tempat yang mulia (surga).',
    reference: 'QS. An-Nisa [4]: 31'
  },
  {
    id: 'cms_hadis_1',
    title: 'HR. At-Tirmidzi: Hakikat Setiap Anak Adam Berbuat Salah',
    type: 'HADIS',
    status: 'PUBLISHED',
    author: 'Ust. Farhan Az-Zuhri, Lc.',
    reviewer: 'Dewan Hadits Shahih',
    version: 1,
    lastUpdated: '2024-01-16T12:00:00Z',
    arabic: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
    translation: 'Setiap anak keturunan Adam pasti sering berbuat salah/dosa, dan sebaik-baik orang yang berbuat salah adalah mereka yang senantiasa bertaubat.',
    reference: 'HR. At-Tirmidzi no. 2499 (Hasan)'
  },
  {
    id: 'cms_doa_1',
    title: 'Sayyidul Istighfar (Raja Segala Istighfar)',
    type: 'DOA',
    status: 'PUBLISHED',
    author: 'Ust. Farhan Az-Zuhri, Lc.',
    reviewer: 'Dewan Syariah',
    version: 1,
    lastUpdated: '2024-01-17T09:00:00Z',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan yang berhak disembah selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu...',
    reference: 'HR. Bukhari no. 6306'
  }
];
