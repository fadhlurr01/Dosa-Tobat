import { Link, useNavigate } from 'react-router-dom';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { motion } from 'motion/react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  User, 
  Zap, 
  Crown, 
  ShieldAlert, 
  Globe, 
  Volume2, 
  VolumeX, 
  LogOut, 
  Check, 
  Sparkles, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import { notificationService, NotificationFrequency } from '../services/notificationService';
import BadgeSystem from '../components/ui/BadgeSystem';
import { useTranslation } from 'react-i18next';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { useState } from 'react';

export default function Profile() {
  const { 
    userName, 
    setUserName, 
    theme, 
    setTheme, 
    notificationFrequency, 
    setNotificationFrequency, 
    plan, 
    role, 
    language, 
    setLanguage,
    currentUser,
    soundEnabled,
    toggleSound,
    loginDemo,
    logout,
    seedDemoData
  } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleFrequencyChange = (freq: NotificationFrequency) => {
    soundFx.playTap();
    setNotificationFrequency(freq);
    notificationService.scheduleEncouragement({
      enabled: true,
      frequency: freq,
    });
  };

  const handleSeedData = () => {
    soundFx.playSuccess();
    seedDemoData();
    triggerConfetti();
    setSeedSuccess(true);
    setTimeout(() => setSeedSuccess(false), 4000);
  };

  const handleSwitchDemo = (demoId: string) => {
    soundFx.playTap();
    loginDemo(demoId);
    triggerConfetti();
  };

  const handleLogout = () => {
    soundFx.playTap();
    logout();
    navigate('/login');
  };

  const isPremium = currentUser.plan !== 'FREE';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-8 pb-24"
    >
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-emerald-950/20 rounded-3xl p-6 border border-emerald-500/20 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md ring-4 ring-emerald-500/20"
            />
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-md">
                <Crown className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight truncate">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : currentUser.role === 'CONTENT_ADMIN' ? 'Ustadz / Content Admin' : isPremium ? 'PRO Member' : 'Basic Member'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{currentUser.email || 'Akun Lokal'}</p>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800/40">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Streak: {currentUser.streakDays || 5} Hari
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </button>
        </div>
      </div>

      {/* Demo Accounts Switcher Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Ganti Akun Demo Pengujian
          </h2>
          <Link to="/login" onClick={() => soundFx.playTap()} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Halaman Login
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {DEMO_ACCOUNTS.map((acc) => {
            const isActive = acc.id === currentUser.id;
            return (
              <motion.button
                key={acc.id}
                onClick={() => handleSwitchDemo(acc.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-xs ring-1 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {acc.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      {acc.role === 'SUPER_ADMIN' ? 'Full Super Admin' : acc.role === 'CONTENT_ADMIN' ? 'Reviewer & Asatidz' : acc.plan !== 'FREE' ? 'PRO VIP Member' : 'Free Member'}
                    </span>
                  </div>
                </div>

                {isActive ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600">
                    Pilih
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="space-y-4">
        <BadgeSystem />
      </section>

      {/* Audio & Interaction Settings */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-500" /> Audio & Efek Suara
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Efek Suara Mikro & Tasbih
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Suara klik tasbih, feedback checklist, dan lonceng ketenangan (Web Audio API).
            </p>
          </div>
          <button
            onClick={() => {
              toggleSound();
              soundFx.playTap();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? 'Aktif' : 'Nonaktif'}
          </button>
        </div>
      </section>

      {/* Subscription Plan */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-4 h-4" /> Paket Berlangganan
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isPremium ? (
                <Crown className="w-5 h-5 text-amber-500" />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
              <h3 className={`font-bold ${isPremium ? 'text-amber-600 dark:text-amber-500' : 'text-slate-700 dark:text-slate-200'}`}>
                {isPremium ? 'Dosa & Tobat Premium' : 'Paket Dasar (Gratis)'}
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isPremium ? `Status Aktif (${currentUser.plan.replace('_', ' ')})` : 'Nikmati fitur premium untuk mendukung perjalanan pemulihanmu.'}
            </p>
          </div>
          <Link 
            to="/premium"
            onClick={() => soundFx.playTap()}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all whitespace-nowrap ${
              isPremium 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700' 
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            {isPremium ? 'Kelola Paket' : 'Upgrade Premium'}
          </Link>
        </div>
      </section>

      {/* Personal Info */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" /> Edit Nama Profil
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Nama Panggilan</label>
          <input 
            type="text" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-[#FDFBF7] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 text-sm"
            placeholder="Masukkan namamu..."
          />
        </div>
      </section>

      {/* Language */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-4 h-4" /> Bahasa / Language
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Pilih Bahasa Aplikasi</label>
          <select 
            value={language}
            onChange={(e) => {
              soundFx.playTap();
              setLanguage(e.target.value);
            }}
            className="w-full bg-[#FDFBF7] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 text-sm"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="tr">Türkçe (Turkish)</option>
          </select>
        </div>
      </section>

      {/* Theme */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Settings className="w-4 h-4" /> Tampilan & Tema
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('light');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'light' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Sun className="w-6 h-6 mb-2" />
              <span className="text-xs">Terang</span>
            </button>
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('dark');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'dark' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Moon className="w-6 h-6 mb-2" />
              <span className="text-xs">Gelap</span>
            </button>
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('system');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'system' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Monitor className="w-6 h-6 mb-2" />
              <span className="text-xs">Sistem</span>
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notifikasi Pengingat
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-3">
            {[
              { id: 'ringan', title: 'Ringan', desc: '1x Sehari. Cocok untuk pengingat harian santai.' },
              { id: 'normal', title: 'Normal', desc: '2x Sehari. Pagi & Malam hari.' },
              { id: 'personal', title: 'Intensif Pemulihan', desc: 'Setiap 4 Jam. Saat masa krisis godaan aktif.' }
            ].map((option) => (
              <label key={option.id} className={`flex items-start p-4 rounded-xl border cursor-pointer transition-colors ${notificationFrequency === option.id ? 'bg-[#E7F5EF] dark:bg-emerald-500/10 border-[#065F46]/30 dark:border-emerald-500/30' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm ${notificationFrequency === option.id ? 'text-[#065F46] dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>{option.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{option.desc}</p>
                </div>
                <input 
                  type="radio" 
                  name="freq" 
                  value={option.id} 
                  checked={notificationFrequency === option.id}
                  onChange={() => handleFrequencyChange(option.id as NotificationFrequency)}
                  className="mt-1 text-[#065F46] focus:ring-[#065F46] border-slate-300"
                />
              </label>
            ))}
          </div>
          <button 
            onClick={() => {
              soundFx.playTap();
              notificationService.requestPermission();
            }}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-semibold text-xs transition-colors mt-2"
          >
            Aktifkan Izin Notifikasi Browser
          </button>
        </div>
      </section>

      {/* Developer & Admin Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> Mode Pengembang & Demo
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          {seedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800"
            >
              <CheckCircle2 className="w-4 h-4" />
              Data demo perjalanan & jurnal berhasil dimuat!
            </motion.div>
          )}

          <button 
            onClick={handleSeedData}
            className="w-full flex items-center justify-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 py-3 rounded-xl font-bold text-xs shadow-sm transition-all hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
          >
            <Zap className="w-4 h-4" />
            Muat Data Demo Lengkap (Seed Data)
          </button>

          <Link 
            to="/admin"
            onClick={() => soundFx.playTap()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all block text-center"
          >
            <ShieldAlert className="w-4 h-4 inline-block" />
            Buka Admin Console (CMS & Users)
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
