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
  const { role, currentUser, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const effectiveRole = currentUser?.role || role || 'USER';

  if (!allowedRoles.includes(effectiveRole)) {
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
              Akses Ditolak (403 Forbidden)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Halaman ini dikhususkan bagi Administrator. Akun Anda saat ini ({currentUser?.name || 'Pengguna'}) terdaftar sebagai peran <span className="font-bold text-rose-600 dark:text-rose-400">{effectiveRole}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-left space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Batasan Hak Akses:
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pengguna biasa tidak diizinkan masuk atau mengelola konsol administratif tanpa izin khusus dari Super Administrator.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/app"
              onClick={() => soundFx.playTap()}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard Utama
            </Link>

            <Link
              to="/login"
              onClick={() => soundFx.playTap()}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Masuk dengan Akun Admin
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
