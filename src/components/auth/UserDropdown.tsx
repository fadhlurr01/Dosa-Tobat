import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Crown, 
  ShieldCheck, 
  ShieldAlert, 
  Flame, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Settings, 
  LayoutDashboard,
  LogIn
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../../store/useStore';
import { soundFx } from '../../lib/soundFx';
import { triggerConfetti } from '../ui/Confetti';
import { Role } from '../../types';

export default function UserDropdown() {
  const { currentUser, isAuthenticated, logout, loginDemo, soundEnabled, toggleSound } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchAccount = (demoId: string) => {
    soundFx.playTap();
    loginDemo(demoId);
    triggerConfetti();
    setIsOpen(false);
  };

  const handleLogout = () => {
    soundFx.playTap();
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />;
      case 'CONTENT_ADMIN':
      case 'ADMIN':
        return <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <User className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        onClick={() => soundFx.playTap()}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
      >
        <LogIn className="w-3.5 h-3.5" />
        Masuk / Demo
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => {
          soundFx.playTap();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-sm transition-all group"
      >
        <div className="relative">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover border border-emerald-500/30"
          />
          {currentUser.plan !== 'FREE' && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold shadow-sm">
              ★
            </span>
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {currentUser.name}
          </span>
          <span className="text-[10px] text-slate-400 font-medium leading-tight">
            {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : currentUser.role === 'CONTENT_ADMIN' ? 'Admin / Ustadz' : currentUser.plan !== 'FREE' ? 'Member PRO' : 'Pengguna'}
          </span>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2.5 z-50 overflow-hidden"
          >
            {/* Header info */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {currentUser.name}
                    </h4>
                    {getRoleIcon(currentUser.role)}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser.email || 'Akun Lokal'}</p>
                </div>
              </div>

              {currentUser.streakDays && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Streak Bersih:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {currentUser.streakDays} Hari
                  </span>
                </div>
              )}
            </div>

            {/* Admin Console shortcut if user has admin privileges */}
            {(currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'CONTENT_ADMIN') && (
              <Link
                to="/admin"
                onClick={() => {
                  soundFx.playTap();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors mb-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                Buka Admin Console
              </Link>
            )}

            {/* Quick Demo Switch Section */}
            <div className="my-1 border-t border-slate-100 dark:border-slate-800 pt-2">
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Ganti Akun Demo
              </span>
              <div className="space-y-1">
                {DEMO_ACCOUNTS.map((acc) => {
                  const isActive = acc.id === currentUser.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleSwitchAccount(acc.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                        <span className="truncate">{acc.name}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {acc.role === 'SUPER_ADMIN' ? 'Super' : acc.role === 'CONTENT_ADMIN' ? 'Ustadz' : acc.plan !== 'FREE' ? 'PRO' : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Settings and Sound */}
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <button
                onClick={() => {
                  toggleSound();
                  soundFx.playTap();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  Efek Suara Audio
                </span>
                <span className={`text-[10px] font-bold ${soundEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  {soundEnabled ? 'Aktif' : 'Mati'}
                </span>
              </button>

              <Link
                to="/profil"
                onClick={() => {
                  soundFx.playTap();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Pengaturan Profil
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Keluar Akun
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
