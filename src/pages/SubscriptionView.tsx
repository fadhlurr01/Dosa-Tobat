import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  AlertCircle, 
  Crown, 
  ArrowRight, 
  RotateCcw, 
  HeartHandshake,
  CheckCircle2,
  Star,
  LogIn,
  UserCheck
} from 'lucide-react';
import { SubscriptionPlan } from '../types';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

export default function SubscriptionView() {
  const { plan, setPlan, currentUser, isAuthenticated, editUser } = useStore();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('PREMIUM_3_MONTHS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSelectPlan = (planId: SubscriptionPlan) => {
    soundFx.playTap();
    setSelectedPlan(planId);
  };

  const handleCheckout = async () => {
    soundFx.playTap();

    // Must be authenticated to checkout/pay
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      setPlan(selectedPlan);

      // Sync with backend if user has a valid ID
      if (currentUser?.id) {
        try {
          await editUser(currentUser.id, { plan: selectedPlan });
        } catch (e) {
          console.log('[Subscription] Local plan updated:', e);
        }
      }

      setIsProcessing(false);
      const planName = plans.find(p => p.id === selectedPlan)?.title || 'Premium';
      setSuccessMsg(`Alhamdulillah! Paket ${planName} aktif untuk akun ${currentUser.name}. Nikmati seluruh fitur tanpa batas.`);
      setShowSuccess(true);
      soundFx.playSuccess();
      triggerConfetti();
      setTimeout(() => setShowSuccess(false), 5000);
    }, 800);
  };

  const handleDowngrade = async () => {
    soundFx.playTap();
    setPlan('FREE');
    if (currentUser?.id) {
      try {
        await editUser(currentUser.id, { plan: 'FREE' });
      } catch (e) {
        console.log('[Subscription] Plan reset to FREE:', e);
      }
    }
    setSuccessMsg('Paket dikembalikan ke status Free Member.');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const plans = [
    {
      id: 'PREMIUM_MONTHLY',
      title: 'Bulanan',
      price: 'Rp19.000',
      period: '/bulan',
      badge: 'Fleksibel',
      features: [
        'Semua fitur Panduan & Direktori Dosa',
        'Jurnal Muhasabah 5 Langkah Unlimited',
        'Akses AI Konsultasi Syar\'i (50x/hari)',
        'Mode Darurat SOS 90-Detik Lengkap',
        'Batal kapan saja tanpa komitmen'
      ],
      popular: false,
    },
    {
      id: 'PREMIUM_3_MONTHS',
      title: '3 Bulan',
      price: 'Rp49.000',
      period: '/3 bulan',
      badge: 'Paling Populer',
      features: [
        'Lebih hemat 15% dari bulanan',
        'Semua fitur Panduan & Direktori Dosa',
        'Jurnal Muhasabah & Tracking Hijrah',
        'Akses AI Konsultasi Syar\'i Prioritas',
        'Kafarat & Fiqih Pembersihan Harta'
      ],
      popular: true,
    },
    {
      id: 'PREMIUM_YEARLY',
      title: 'Tahunan',
      price: 'Rp149.000',
      period: '/tahun',
      badge: 'Paling Hemat 35%',
      features: [
        'Paling hemat 35% setahun penuh',
        'Akses Eksklusif Materi Dakwah Baru',
        'Badge Profil Donatur & Ahli Kebaikan',
        'Akses AI Prioritas Kecepatan Tinggi',
        'Infaq jariyah untuk pengembangan dakwah'
      ],
      popular: false,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-10 px-2 sm:px-0"
    >
      {/* Header Banner */}
      <header className="text-center space-y-2.5">
        <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
          <Sparkles className="w-7 h-7 text-amber-300 animate-pulse" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-400 tracking-tight leading-tight">
          Premium Experience & Infaq Dakwah
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Dapatkan akses penuh tanpa batas ke seluruh direktori pemulihan tobat, analisis muhasabah, dan dukung kelangsungan dakwah digital.
        </p>
      </header>

      {/* Guest Mode Alert (When Not Logged In) */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-amber-900 dark:text-amber-300 text-sm">
                Perhatian: Anda Belum Masuk Akun
              </p>
              <p className="text-amber-800/80 dark:text-amber-400/90 text-xs">
                Untuk melakukan infaq / pembayaran dan mengaitkan lencana ke profil, silakan masuk terlebih dahulu.
              </p>
            </div>
          </div>
          <Link
            to="/login?redirect=/premium"
            onClick={() => soundFx.playTap()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-amber-600/20 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk / Daftar Akun</span>
          </Link>
        </div>
      )}

      {/* Current Active Status Indicator (When Logged In) */}
      {isAuthenticated && plan !== 'FREE' ? (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-1.5 justify-center sm:justify-start">
                Status Premium Aktif ({plan})
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </p>
              <p className="text-emerald-700 dark:text-emerald-400/90 text-xs">
                Akun <b>{currentUser?.name}</b> sedang menikmati seluruh fasilitas Member Pro.
              </p>
            </div>
          </div>
          <button
            onClick={handleDowngrade}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset ke Free
          </button>
        </div>
      ) : isAuthenticated && (
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-3.5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 text-center">
          <Star className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Akun <b>{currentUser?.name}</b> saat ini menggunakan paket <b>Free Member</b>. Pilih paket di bawah untuk meng-upgrade:</span>
        </div>
      )}

      {/* Plan Selection Cards (Responsive 1-col on mobile, 3-col on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          return (
            <div 
              key={p.id}
              onClick={() => handleSelectPlan(p.id as SubscriptionPlan)}
              className={`relative rounded-3xl p-5 sm:p-6 border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected 
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-xl shadow-emerald-900/10 scale-[1.01] ring-2 ring-emerald-500/20' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-emerald-300 dark:hover:border-emerald-700/60 shadow-xs'
              }`}
            >
              {/* Badge */}
              {p.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap ${
                  p.popular 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {p.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base sm:text-lg">
                    {p.title}
                  </h3>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-2xl font-black text-[#065F46] dark:text-emerald-400">{p.price}</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">{p.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {p.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select Button */}
              <button
                type="button"
                className={`w-full py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                }`}
              >
                <span>{isSelected ? 'Paket Terpilih' : 'Pilih Paket Ini'}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Card & Confirmation */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-4">
        <div className="max-w-md mx-auto space-y-1">
          <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
            Siap Berhijrah & Meraih Ridha-Nya?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isAuthenticated 
              ? 'Klik tombol di bawah untuk mengaktifkan paket pilihan Anda ke akun Anda.' 
              : 'Silakan masuk akun terlebih dahulu untuk mengaktifkan paket dan infaq dakwah.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 hover:scale-[1.02] active:scale-95 transition-all group cursor-pointer disabled:opacity-50"
          >
            <span>
              {isProcessing 
                ? 'Memproses...' 
                : !isAuthenticated 
                  ? 'Masuk & Tingkatkan Sekarang' 
                  : plan !== 'FREE' 
                    ? 'Perbarui Paket Sekarang' 
                    : 'Tingkatkan Sekarang'}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-800 transition-all shadow-xs">
              {isProcessing ? (
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
            </div>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Mode Simulasi (Mockup Pengujian). Paket akan langsung aktif tanpa memotong saldo nyata.</span>
        </p>
      </div>

      {/* Modern Center Modal: Login Required for Checkout */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-center space-y-5 z-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <Crown className="w-7 h-7 text-amber-500 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Harus Masuk Akun Terlebih Dahulu
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Untuk mengaktifkan paket infaq <b>{plans.find(p => p.id === selectedPlan)?.title}</b> dan mendapatkan lencana PRO, silakan masuk atau buat akun baru agar status paket terhubung permanen.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  to={`/login?redirect=/premium`}
                  onClick={() => {
                    soundFx.playTap();
                    setShowAuthModal(false);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Akun / Pilih Akun Demo</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playTap();
                    setShowAuthModal(false);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
                >
                  Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto max-w-md mx-auto bg-emerald-800 text-white px-5 sm:px-6 py-3 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2.5 z-50 text-xs border border-emerald-500/40 text-center"
          >
            <div className="w-5 h-5 rounded-full bg-white text-emerald-800 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="truncate">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
