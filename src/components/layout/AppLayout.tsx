import { useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Book, 
  ShieldAlert, 
  Heart, 
  User, 
  NotebookPen, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sparkles, 
  LayoutDashboard,
  Globe,
  HeartHandshake,
  Compass,
  LifeBuoy
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import { notificationService } from '../../services/notificationService';
import { soundFx } from '../../lib/soundFx';
import UserDropdown from '../auth/UserDropdown';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export default function AppLayout() {
  const { theme, setTheme, notificationFrequency, language, soundEnabled, toggleSound, currentUser, role } = useStore();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    notificationService.scheduleEncouragement({
      enabled: true,
      frequency: notificationFrequency,
    });
  }, [notificationFrequency]);

  const navItems = [
    { to: '/app', icon: Home, label: t('nav.home') },
    { to: '/direktori', icon: Book, label: t('nav.directory') },
    { to: '/sos', icon: ShieldAlert, label: t('nav.sos'), isAlert: true },
    { to: '/perjalanan', icon: Heart, label: t('nav.journey') },
    { to: '/jurnal', icon: NotebookPen, label: t('nav.journal') },
    { to: '/profil', icon: User, label: t('nav.profile') },
  ];

  const handleNavClick = () => {
    soundFx.playTap();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 pb-20 md:pb-0 md:pl-64 flex flex-col font-sans text-[#1F2937] dark:text-slate-200 transition-colors duration-300">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed top-0 left-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800 shadow-sm z-50 transition-colors duration-300">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80">
          <Link to="/" onClick={handleNavClick} className="block group">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-700/30 group-hover:scale-105 transition-transform">
                DT
              </div>
              <div>
                <h1 className="text-base font-black text-[#065F46] dark:text-emerald-400 tracking-tight leading-tight">
                  DOSA & TOBAT™
                </h1>
                <span className="text-[10px] text-emerald-600/70 dark:text-emerald-500 font-medium">
                  Sistem Pemulihan Jiwa
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-serif leading-tight">
              "{t('slogan')}"
            </p>
          </Link>
        </div>

        {/* Quick User summary in Sidebar */}
        <div className="p-3.5 mx-3.5 my-3 bg-gradient-to-r from-slate-50 to-emerald-50/30 dark:from-slate-800/60 dark:to-emerald-950/20 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/40 ring-2 ring-emerald-500/20"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : currentUser.role === 'CONTENT_ADMIN' ? 'Content Admin' : currentUser.plan !== 'FREE' ? 'Member PRO ★' : 'Free Member'}
              </p>
            </div>
          </div>
          <Link
            to="/login"
            onClick={handleNavClick}
            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95 shadow-2xs"
            title="Ganti Akun Demo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </Link>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-3.5 space-y-1.5 mt-2 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 relative group',
                  isActive
                    ? item.isAlert
                      ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-600/30 scale-[1.02]'
                      : 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-700/30 dark:shadow-emerald-500/25 scale-[1.02]'
                    : item.isAlert
                      ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:translate-x-1'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-300 hover:translate-x-1'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-4.5 h-4.5 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : item.isAlert ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  )} />
                  <span className="truncate tracking-wide">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute right-2.5 w-1.5 h-4 bg-white/90 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Admin shortcut in sidebar if admin */}
          {(role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'CONTENT_ADMIN') && (
            <Link
              to="/admin"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:shadow-md hover:shadow-indigo-500/10 transition-all mt-4 border border-indigo-200/80 dark:border-indigo-800/40"
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span className="truncate">Admin Console</span>
            </Link>
          )}
        </nav>

        {/* Sidebar bottom toolbar */}
        <div className="p-3.5 mx-3.5 mb-3 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between shadow-2xs">
          <button
            onClick={() => {
              toggleSound();
              soundFx.playTap();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95 shadow-2xs"
            title={soundEnabled ? 'Efek Suara Aktif' : 'Efek Suara Nonaktif'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95 shadow-2xs"
            title="Ganti Tema Terang/Gelap"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
          </button>

          <Link
            to="/login"
            onClick={handleNavClick}
            className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-2.5 py-1.5 rounded-xl transition-all"
          >
            Demo Login
          </Link>
        </div>
      </aside>

      {/* Top Header Bar for Desktop & Mobile */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-3 py-2.5 sm:px-6 transition-colors shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Mobile Brand & Desktop Nav Links with Icons */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile brand header */}
            <div className="flex items-center gap-2 md:hidden">
              <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 font-extrabold text-[#065F46] dark:text-emerald-400 text-sm group">
                <span className="w-7 h-7 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                  DT
                </span>
                <span className="truncate font-black">DOSA & TOBAT</span>
              </Link>
            </div>

            {/* Desktop Quick Nav Links with Icons */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold">
              <Link
                to="/app"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                  location.pathname === '/app' || location.pathname === '/beranda'
                    ? "bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold shadow-xs"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Home className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Beranda</span>
              </Link>

              <Link
                to="/dzikir"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                  location.pathname === '/dzikir'
                    ? "bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold shadow-xs"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tasbih & Dzikir</span>
              </Link>

              <Link
                to="/taubat"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                  location.pathname === '/taubat'
                    ? "bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold shadow-xs"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Panduan Taubat</span>
              </Link>

              <Link
                to="/"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                  location.pathname === '/' || location.pathname === '/landing'
                    ? "bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold shadow-xs"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>Landing Page</span>
              </Link>
            </nav>
          </div>

          {/* Right: Actions, SOS Quick Pill, Sound, Theme, User Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick SOS Trigger Button in Header */}
            <Link
              to="/sos"
              onClick={handleNavClick}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-bold transition-all active:scale-95 shadow-xs"
              title="Mode Darurat SOS 90-Detik"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-spin-slow" />
              <span className="hidden sm:inline">SOS</span>
              <span className="text-[10px] font-extrabold px-1 py-0.2 bg-rose-200/80 dark:bg-rose-900 text-rose-800 dark:text-rose-200 rounded">90s</span>
            </Link>

            {/* Quick sound toggle */}
            <button
              onClick={() => {
                toggleSound();
                soundFx.playTap();
              }}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              title={soundEnabled ? 'Efek Suara Aktif' : 'Efek Suara Mati'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Quick theme toggle */}
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              title="Ganti Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Dropdown with 1-click Demo Switching */}
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto md:max-w-4xl p-4 md:p-8 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 px-2 py-2 flex justify-around items-center z-50 safe-area-bottom transition-colors duration-300 shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 justify-center w-14 h-13 rounded-2xl transition-all duration-200 relative',
                isActive
                  ? item.isAlert
                    ? 'text-rose-600 dark:text-rose-400 font-black'
                    : 'text-emerald-700 dark:text-emerald-400 font-black'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "p-1 rounded-xl transition-all",
                  isActive && !item.isAlert && "bg-emerald-50 dark:bg-emerald-950/60 shadow-sm shadow-emerald-600/30",
                  isActive && item.isAlert && "bg-rose-50 dark:bg-rose-950/60 shadow-sm shadow-rose-600/30"
                )}>
                  <item.icon className={cn("w-5 h-5", item.isAlert && "text-rose-600 dark:text-rose-400")} />
                </div>
                <span className={cn("text-[9px] font-bold uppercase", item.isAlert && "text-rose-600 dark:text-rose-400")}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className={cn(
                      "absolute bottom-0.5 w-7 h-1 rounded-full shadow-xs",
                      item.isAlert ? "bg-rose-600 shadow-rose-500/50" : "bg-emerald-600 dark:bg-emerald-400 shadow-emerald-500/50"
                    )}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
