import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Role } from '../types';
import { ShieldAlert, LogIn, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from './ui/Confetti';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role, isAuthenticated, loginDemo } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    const handleQuickAdminLogin = () => {
      soundFx.playSuccess();
      loginDemo('demo_user_4'); // Siti Rahmah (Super Admin)
      triggerConfetti();
    };

    return (
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Akses Terbatas: Admin Console
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Halaman ini membutuhkan hak akses peran Admin atau Super Admin. Akun Anda saat ini bertindak sebagai <span className="font-bold text-emerald-600 dark:text-emerald-400">{role}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Solusi Instan (Demo Mode)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Anda dapat langsung beralih ke akun Super Admin Demo untuk menguji seluruh fitur Content Management & Dashboard.
            </p>
            <button
              onClick={handleQuickAdminLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Beralih ke Super Admin (1-Klik)
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/"
              onClick={() => soundFx.playTap()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </Link>

            <Link
              to="/login"
              onClick={() => soundFx.playTap()}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Ganti Akun Lain
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
