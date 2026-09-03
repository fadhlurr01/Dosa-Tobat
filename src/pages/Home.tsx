import { Link } from 'react-router-dom';
import { 
  Shield, 
  LifeBuoy, 
  HeartHandshake, 
  BookOpen, 
  ChevronRight, 
  Search, 
  Heart, 
  Check, 
  CheckCircle2, 
  Moon, 
  Sparkles,
  Flame,
  Crown,
  Volume2,
  VolumeX,
  ArrowRight
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { SINS } from '../data/mockData';
import { calculateStreak } from '../lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReligiousCard from '../components/ui/ReligiousCard';
import DailyReflection from '../components/ui/DailyReflection';
import { useTranslation } from 'react-i18next';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

const IBADAH_LIST = [
  { id: 'shalat', label: 'Shalat 5 Waktu', icon: Moon, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { id: 'doa', label: 'Berdoa & Munajat', icon: HeartHandshake, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  { id: 'dzikir', label: 'Dzikir Pagi & Petang', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { id: 'ngaji', label: 'Tilawah Al-Quran', icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
];

const NASIHAT_HARIAN = [
  {
    type: 'AYAT' as const,
    arabic: 'لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ',
    translation: 'Janganlah kamu berputus asa dari rahmat Allah.',
    source: 'Q.S. Az-Zumar: 53'
  },
  {
    type: 'HADIS' as const,
    arabic: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
    translation: 'Setiap anak Adam pasti sering berbuat dosa, dan sebaik-baik orang yang berbuat dosa adalah yang bertaubat.',
    source: 'H.R. Tirmidzi'
  },
  {
    type: 'NASEHAT' as const,
    arabic: 'مَنْ عَرَفَ نَفْسَهُ عَرَفَ رَبَّهُ',
    translation: 'Taubat bukanlah akhir dari keburukan, melainkan awal dari kebaikan yang terus-menerus.',
    source: 'Ibnu Qayyim Al-Jauziyyah'
  }
];

export default function Home() {
  const { 
    userName, 
    journeys, 
    dailyIbadah, 
    toggleDailyIbadah, 
    currentUser, 
    isAuthenticated, 
    soundEnabled, 
    toggleSound,
    loginDemo 
  } = useStore();
  const { t } = useTranslation();
  const activeJourneys = Object.values(journeys);
  const [searchQuery, setSearchQuery] = useState('');
  const [nasihat, setNasihat] = useState(NASIHAT_HARIAN[0]);

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const completedIbadahCount = useMemo(() => {
    return IBADAH_LIST.filter(item => dailyIbadah[`${todayStr}_${item.id}`]).length;
  }, [dailyIbadah, todayStr]);

  const isAllIbadahDone = completedIbadahCount === IBADAH_LIST.length;

  useEffect(() => {
    const dayIndex = new Date().getDay() % NASIHAT_HARIAN.length;
    setNasihat(NASIHAT_HARIAN[dayIndex]);
  }, []);

  const handleIbadahToggle = (ibadahId: string) => {
    const isCurrentlyDone = dailyIbadah[`${todayStr}_${ibadahId}`];
    toggleDailyIbadah(todayStr, ibadahId);

    if (!isCurrentlyDone) {
      soundFx.playCheck();
      // If this check completes the 4th item, trigger big celebration
      if (completedIbadahCount + 1 === IBADAH_LIST.length) {
        setTimeout(() => {
          soundFx.playSuccess();
          triggerConfetti();
        }, 200);
      }
    } else {
      soundFx.playTap();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Dynamic Profile Welcome Banner with Avatar & Streak */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#FDFBF7] to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 rounded-3xl p-6 sm:p-7 border border-emerald-500/15 dark:border-emerald-500/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-emerald-500/30"
              />
              {currentUser.plan !== 'FREE' && (
                <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white rounded-full p-1 shadow-sm">
                  <Crown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Assalamu'alaikum, {currentUser.name.split(' ')[0]}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                  {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : currentUser.role === 'CONTENT_ADMIN' ? 'Admin Asatidz' : currentUser.plan !== 'FREE' ? 'PRO' : 'Hamba Allah'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 italic font-serif">
                "Pintu taubat terbuka seluas langit dan bumi."
              </p>
            </div>
          </div>

          {/* Streak badge */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                Streak Bersih
              </div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">
                {currentUser.streakDays || 5} Hari
              </div>
            </div>
          </div>
        </div>

        {/* Quick Demo Switch Pill Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Demo Switcher:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  soundFx.playTap();
                  loginDemo(acc.id);
                  triggerConfetti();
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  acc.id === currentUser.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                {acc.name.split(' ')[0]} ({acc.role === 'SUPER_ADMIN' ? 'Admin' : acc.role === 'CONTENT_ADMIN' ? 'Ust' : acc.plan !== 'FREE' ? 'PRO' : 'Free'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions with Spring Animations */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}>
          <Link 
            to="/direktori" 
            onClick={() => soundFx.playTap()}
            className="p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] to-white dark:from-slate-900 dark:to-slate-800 border border-[#065F46]/10 dark:border-emerald-500/20 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-all group h-full justify-between"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <Shield className="w-20 h-20" />
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-[#065F46] dark:text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide block">Pencegahan Dini</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Katalog & Solusi Dosa</span>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}>
          <Link 
            to="/sos" 
            onClick={() => soundFx.playTap()}
            className="p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-[#FEF2F2] to-white dark:from-rose-950/30 dark:to-slate-900 border border-red-100 dark:border-rose-500/20 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-all group h-full justify-between"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 text-red-500 group-hover:scale-110 transition-transform">
              <LifeBuoy className="w-20 h-20" />
            </div>
            <div className="bg-red-50 dark:bg-rose-500/10 p-3 rounded-2xl mb-2 shadow-inner shadow-red-500/10 group-hover:scale-110 transition-transform">
              <LifeBuoy className="w-6 h-6 text-red-600 dark:text-rose-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide block">Mode Darurat (SOS)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Saat Sedang Tergoda</span>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}>
          <Link 
            to="/taubat" 
            onClick={() => soundFx.playTap()}
            className="p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] to-white dark:from-slate-900 dark:to-slate-800 border border-[#065F46]/10 dark:border-emerald-500/20 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-all group h-full justify-between"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-20 h-20" />
            </div>
            <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide block">Panduan Taubat</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Langkah Bertaubat Nasuha</span>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}>
          <Link 
            to="/dzikir" 
            onClick={() => soundFx.playTap()}
            className="p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] to-white dark:from-slate-900 dark:to-slate-800 border border-[#065F46]/10 dark:border-emerald-500/20 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-all group h-full justify-between"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-20 h-20" />
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide block">Tasbih & Dzikir</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Counter Interaktif</span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Checklist Ibadah with Progress Bar & Micro-Interactions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {t('home.dailyWorship')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {completedIbadahCount} dari {IBADAH_LIST.length} amalan selesai
            </p>
          </div>
          {isAllIbadahDone && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Sempurna Hari Ini!
            </motion.span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400"
            initial={{ width: 0 }}
            animate={{ width: `${(completedIbadahCount / IBADAH_LIST.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>

        <div className="space-y-2.5">
          {IBADAH_LIST.map((ibadah) => {
            const Icon = ibadah.icon;
            const isDone = Boolean(dailyIbadah[`${todayStr}_${ibadah.id}`]);
            
            return (
              <motion.div 
                key={ibadah.id}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isDone 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40' 
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ibadah.bg}`}>
                    <Icon className={`w-4 h-4 ${ibadah.color}`} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-semibold transition-all ${isDone ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                      {ibadah.label}
                    </span>
                    {(ibadah.id === 'doa' || ibadah.id === 'dzikir') && (
                      <Link to={`/${ibadah.id}`} onClick={() => soundFx.playTap()} className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider hover:underline mt-0.5 flex items-center gap-0.5">
                        Buka Tasbih / Panduan <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <motion.button 
                  onClick={() => handleIbadahToggle(ibadah.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                    isDone 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Search Bar with Live Results Dropdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t('home.whatToFix')}</h2>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 uppercase tracking-wider"
            >
              Reset
            </button>
          )}
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari nama dosa, kebiasaan, pemicu (contoh: ghibah, zina mata, riya)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3.5 bg-white dark:bg-slate-900 rounded-2xl text-xs sm:text-sm border border-slate-200/80 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all dark:text-slate-200 shadow-xs"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Live Search Quick Preview */}
        {searchQuery.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-lg space-y-1.5 max-h-60 overflow-y-auto"
          >
            {SINS.filter(s => 
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              s.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.triggers.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            ).slice(0, 5).map(sin => (
              <Link
                key={sin.id}
                to={`/dosa/${sin.id}`}
                onClick={() => soundFx.playTap()}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors group text-left"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {sin.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                    {sin.definition}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            {SINS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.definition.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <p className="text-xs text-slate-400 text-center py-3">Tidak ditemukan topik yang sesuai "{searchQuery}"</p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Nasihat Harian with Shuffle Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Kalam Hikmah & Pengingat Jiwa</h2>
          <button
            onClick={() => {
              soundFx.playTap();
              const nextIndex = (NASIHAT_HARIAN.indexOf(nasihat) + 1) % NASIHAT_HARIAN.length;
              setNasihat(NASIHAT_HARIAN[nextIndex]);
            }}
            className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            Ganti Nasihat
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={nasihat.arabic}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <ReligiousCard 
              type={nasihat.type}
              arabic={nasihat.arabic}
              translation={nasihat.translation}
              reference={nasihat.source}
              title="Reminder Harian"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Perjalanan Saya */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t('home.recentActivity')}</h2>
          <Link to="/perjalanan" onClick={() => soundFx.playTap()} className="text-[10px] font-bold uppercase text-[#065F46] dark:text-emerald-400 hover:opacity-80">Lihat semua ({activeJourneys.length})</Link>
        </div>
        
        {activeJourneys.length > 0 ? (
          <div className="space-y-3">
            {activeJourneys.map(journey => {
              const sin = SINS.find(s => s.id === journey.sinId);
              if (!sin) return null;
              const days = calculateStreak(journey.startDate, journey.lastRelapse);
              
              return (
                <Link 
                  key={journey.sinId} 
                  to={`/dosa/${sin.id}`} 
                  onClick={() => soundFx.playTap()}
                  className="block p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-[#065F46] dark:from-emerald-950 dark:to-slate-900 rounded-3xl text-white border border-emerald-600/30 dark:border-emerald-500/30 hover:shadow-lg transition-all group shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm sm:text-base text-emerald-50">{sin.name}</span>
                    <span className="text-[10px] font-extrabold bg-white/20 dark:bg-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-emerald-100 border border-white/20">
                      Day {days}
                    </span>
                  </div>
                  <div className="w-full bg-black/20 dark:bg-slate-800/60 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-amber-300 to-amber-400 dark:from-emerald-400 dark:to-teal-300 h-full transition-all" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(5, (days / 30) * 100))}%` }}
                    />
                  </div>
                  <div className="text-[11px] mt-3 opacity-90 text-emerald-100 italic flex items-center justify-between">
                    <span>"Perjalananmu menunjukkan kemajuan. Terus istiqomah."</span>
                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <Heart className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Belum ada perjalanan aktif</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 mb-4">Mulai dari satu hal yang ingin kamu perbaiki hari ini.</p>
            <Link to="/direktori" onClick={() => soundFx.playTap()} className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-[#065F46] dark:text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors border border-emerald-200 dark:border-emerald-800/40">
              Pilih Topik Perbaikan
            </Link>
          </div>
        )}
      </motion.div>

      <DailyReflection />

      {/* Edukasi 5R with Staggered Scroll Animations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Sistem Perubahan (Metode 5R)</h2>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Framework Taubat</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            {
              num: 1,
              title: 'Recognize',
              desc: 'Kenali dosa secara spesifik. Petakan waktu, pemicu emosi, dan lingkungan terjadinya.',
              bg: 'from-emerald-50/80 to-white dark:from-emerald-950/20 dark:to-slate-900',
              border: 'border-emerald-200/60 dark:border-emerald-900/40',
              badgeBg: 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300',
              textColor: 'text-emerald-800 dark:text-emerald-400'
            },
            {
              num: 2,
              title: 'Remove',
              desc: 'Hilangkan sumbernya. Putus akses fisik dan jauhi pemicu sebelum godaan memuncak.',
              bg: 'from-amber-50/80 to-white dark:from-amber-950/20 dark:to-slate-900',
              border: 'border-amber-200/60 dark:border-amber-900/40',
              badgeBg: 'bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
              textColor: 'text-amber-800 dark:text-amber-400'
            },
            {
              num: 3,
              title: 'Repent',
              desc: 'Taubat Nasuha. Berhenti seketika, sesali setulus hati, perbanyak istighfar, dan perbaiki akibatnya.',
              bg: 'from-rose-50/80 to-white dark:from-rose-950/20 dark:to-slate-900',
              border: 'border-rose-200/60 dark:border-rose-900/40',
              badgeBg: 'bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300',
              textColor: 'text-rose-800 dark:text-rose-400'
            },
            {
              num: 4,
              title: 'Replace',
              desc: 'Ganti dengan kebiasaan baik positif. Hati manusia tidak boleh dibiarkan dalam kondisi hampa.',
              bg: 'from-blue-50/80 to-white dark:from-blue-950/20 dark:to-slate-900',
              border: 'border-blue-200/60 dark:border-blue-900/40',
              badgeBg: 'bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300',
              textColor: 'text-blue-800 dark:text-blue-400'
            },
            {
              num: 5,
              title: 'Repeat & Recovery',
              desc: 'Bangun daya tahan istiqomah. Bila terjatuh, segera bangkit tanpa putus asa dari rahmat Allah.',
              bg: 'from-indigo-50/80 to-white dark:from-indigo-950/20 dark:to-slate-900',
              border: 'border-indigo-200/60 dark:border-indigo-900/40',
              badgeBg: 'bg-indigo-200 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300',
              textColor: 'text-indigo-800 dark:text-indigo-400'
            }
          ].map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${step.bg} border ${step.border} shadow-2xs`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2 ${step.textColor}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step.badgeBg}`}>
                  {step.num}
                </span>
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
