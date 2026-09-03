import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { SubscriptionPlan } from '../types';

export default function SubscriptionView() {
  const { plan, setPlan } = useStore();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('PREMIUM_MONTHLY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    soundFx.playTap();
    setIsProcessing(true);
    // Simulate checkout
    setTimeout(() => {
      setPlan(selectedPlan);
      setIsProcessing(false);
      setShowSuccess(true);
      soundFx.playSuccess();
      triggerConfetti();
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1200);
  };

  const plans = [
    {
      id: 'PREMIUM_MONTHLY',
      title: 'Bulanan',
      price: 'Rp19.000',
      period: '/bulan',
      features: ['Semua fitur Premium', 'Akses AI Terbatas (50/hari)', 'Batal kapan saja'],
      popular: false,
    },
    {
      id: 'PREMIUM_3_MONTHS',
      title: '3 Bulan',
      price: 'Rp49.000',
      period: '/3 bulan',
      features: ['Lebih hemat 15%', 'Semua fitur Premium', 'Akses AI Terbatas (50/hari)'],
      popular: true,
    },
    {
      id: 'PREMIUM_YEARLY',
      title: 'Tahunan',
      price: 'Rp149.000',
      period: '/tahun',
      features: ['Paling hemat 35%', 'Semua fitur Premium', 'Akses AI Prioritas'],
      popular: false,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="mb-6 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight leading-none mb-2">Premium Experience</h1>
        <p className="text-slate-500 dark:text-slate-400">Dapatkan akses penuh ke seluruh fitur dan program perubahan.</p>
      </header>

      {plan !== 'FREE' && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">Status Premium Aktif</p>
            <p className="text-emerald-600 dark:text-emerald-400/80 text-xs">Kamu sudah menikmati seluruh fitur Premium.</p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div 
            key={p.id}
            onClick={() => setSelectedPlan(p.id as SubscriptionPlan)}
            className={`relative rounded-3xl p-6 border-2 transition-all cursor-pointer ${
              selectedPlan === p.id 
                ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/5 shadow-md scale-[1.02]' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-200 dark:hover:border-amber-500/30'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Paling Populer
              </div>
            )}
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">{p.title}</h3>
            <div className="mb-4">
              <span className="text-2xl font-extrabold text-[#065F46] dark:text-emerald-400">{p.price}</span>
              <span className="text-sm text-slate-400">{p.period}</span>
            </div>
            <ul className="space-y-3">
              {p.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
        <button
          onClick={handleCheckout}
          disabled={isProcessing || plan !== 'FREE'}
          className="w-full sm:w-auto px-12 py-4 bg-[#065F46] dark:bg-emerald-600 text-white font-bold rounded-2xl shadow-md hover:bg-[#044c38] dark:hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
        >
          {isProcessing ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Zap className="w-5 h-5" />
          )}
          {plan !== 'FREE' ? 'Premium Aktif' : 'Tingkatkan Sekarang'}
        </button>
        <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> Ini adalah simulasi (Mockup). Tidak ada tagihan nyata.
        </p>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 z-50"
          >
            <Check className="w-5 h-5" /> Pembayaran Berhasil!
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
