import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { SINS } from '../data/mockData';
import { calculateStreak } from '../lib/utils';
import { 
  Heart, 
  ArrowRight, 
  Flame, 
  RotateCcw, 
  Trash2, 
  LifeBuoy, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Plus,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RecoveryTracker from '../components/ui/RecoveryTracker';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

export default function Journey() {
  const navigate = useNavigate();
  const { journeys, removeJourney, recordRelapse, bookmarks } = useStore();
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'BOOKMARKS'>('ALL');
  const [confirmRelapseId, setConfirmRelapseId] = useState<string | null>(null);

  const activeJourneys = Object.values(journeys || {});

  // Calculate total streak days across journeys
  const totalDays = activeJourneys.reduce((acc, j) => {
    return acc + calculateStreak(j.startDate, j.lastRelapse);
  }, 0);

  const handleRelapseConfirm = (sinId: string) => {
    soundFx.playTap();
    recordRelapse(sinId);
    setConfirmRelapseId(null);
    navigate(`/taubat-guide/${sinId}`);
  };

  const handleRemove = (sinId: string) => {
    soundFx.playTap();
    removeJourney(sinId);
  };

  const filteredJourneys = activeJourneys.filter(j => {
    if (filter === 'ACTIVE') return j.status === 'STABLE' || j.status === 'RECOVERING';
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight leading-tight">
            Perjalanan Taubat & Istiqomah
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-serif italic">
            Pantau progress hari bersih, perbaiki niat saat terjatuh, dan raih kemenangan jiwa.
          </p>
        </div>

        <Link
          to="/direktori"
          onClick={() => soundFx.playTap()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Target Taubat
        </Link>
      </header>

      {/* Overview Statistics Card */}
      {activeJourneys.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Total Akumulasi</p>
              <h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300">{totalDays} Hari Bersih</h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-900 dark:to-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Sedang Diperjuangkan</p>
              <h3 className="text-lg font-black text-amber-800 dark:text-amber-300">{activeJourneys.length} Topik</h3>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/30 border border-blue-200/80 dark:border-indigo-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Target Milestone</p>
              <h3 className="text-lg font-black text-blue-800 dark:text-blue-300">Istiqomah 40 Hari</h3>
            </div>
          </div>
        </div>
      )}

      {/* Journey List Section */}
      {activeJourneys.length === 0 ? (
        <div className="text-center p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Belum Ada Perjalanan Taubat Aktif
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-xs sm:text-sm max-w-md mx-auto">
            Mulailah dari satu hal yang ingin Anda perbaiki hari ini. Pilih dari katalog dosa dan bangun komitmen istiqomah.
          </p>
          <Link 
            to="/direktori" 
            onClick={() => soundFx.playTap()}
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all active:scale-95"
          >
            Pilih Topik Perbaikan dari Katalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredJourneys.map(journey => {
              const sin = SINS.find(s => s.id === journey.sinId);
              if (!sin) return null;
              const days = calculateStreak(journey.startDate, journey.lastRelapse);
              
              return (
                <motion.div 
                  key={journey.sinId}
                  layout
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-xs relative overflow-hidden group"
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {sin.category}
                        </span>
                        <h3 className="font-black text-lg text-slate-900 dark:text-slate-100 mt-1">
                          {sin.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => handleRemove(journey.sinId)}
                        className="p-1.5 rounded-xl text-slate-300 hover:text-rose-600 dark:text-slate-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Hapus perjalanan ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Streak & Recovery Tracker Component */}
                    <RecoveryTracker daysInRecovery={days} />

                    {journey.lastRelapse && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-medium">
                        Terakhir bangkit: {new Date(journey.lastRelapse).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>

                  {/* Interactive Action Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                    <Link 
                      to={`/dosa/${sin.id}`}
                      onClick={() => soundFx.playTap()}
                      className="flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline group"
                    >
                      <span>Panduan Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to="/sos"
                        onClick={() => soundFx.playTap()}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/40 text-[11px] font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
                      >
                        <LifeBuoy className="w-3 h-3 text-rose-500" />
                        SOS
                      </Link>

                      <button
                        onClick={() => setConfirmRelapseId(journey.sinId)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 text-[11px] font-bold border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Catat Terjatuh
                      </button>
                    </div>
                  </div>

                  {/* Confirmation Modal for Relapse */}
                  {confirmRelapseId === journey.sinId && (
                    <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-5 flex flex-col justify-center items-center text-center z-20">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                        Apakah Anda Baru Saja Terjatuh?
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
                        Jangan berputus asa dari rahmat Allah. Kami akan memandu Anda melalui 5 rukun taubat nasuha seketika.
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setConfirmRelapseId(null)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleRelapseConfirm(journey.sinId)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
                        >
                          Ya, Pandu Taubat Sekarang
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Advice Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/20 rounded-3xl p-6 border border-emerald-200/80 dark:border-emerald-800/40">
        <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Satu Langkah Kecil Tetap Membawa Pahala
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          Tidak perlu menunggu menjadi sempurna untuk bertaubat. Rasulullah ﷺ bersabda bahwa orang yang bertaubat dari dosanya bagaikan orang yang tidak memiliki dosa sama sekali (H.R. Ibnu Majah). Teruslah bangkit dan jaga istiqomahmu!
        </p>
      </div>
    </motion.div>
  );
}
