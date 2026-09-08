import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X, 
  ExternalLink, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { soundFx } from '../../lib/soundFx';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const { theme, setTheme, setRole, currentUser, role, soundEnabled, toggleSound } = useStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const effectiveRole = currentUser?.role || role || 'USER';

  const allNavItems = [
    { 
      to: '/admin', 
      icon: LayoutDashboard, 
      label: 'Overview', 
      desc: 'Ringkasan Platform', 
      roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] 
    },
    { 
      to: '/admin/cms', 
      icon: FileText, 
      label: 'CMS Dakwah', 
      desc: 'Kelola Ayat & Hadis', 
      roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] 
    },
    { 
      to: '/admin/users', 
      icon: Users, 
      label: 'Pengguna', 
      desc: 'Manajemen Akun', 
      roles: ['SUPER_ADMIN', 'ADMIN'] 
    },
    { 
      to: '/admin/settings', 
      icon: Settings, 
      label: 'Pengaturan', 
      desc: 'Sistem & Database', 
      roles: ['SUPER_ADMIN'] 
    },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(effectiveRole));

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogoutAdmin = () => {
    soundFx.playTap();
    setRole('USER');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    soundFx.playTap();
    setTheme(newTheme);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin': return 'Ringkasan & Metrik Platform';
      case '/admin/cms': return 'Manajemen Konten Syariah (CMS)';
      case '/admin/users': return 'Manajemen Akun Pengguna';
      case '/admin/settings': return 'Pengaturan Database & Sistem';
      default: return 'Admin Console';
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case 'SUPER_ADMIN':
        return { label: 'Super Admin (Root)', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800' };
      case 'CONTENT_ADMIN':
        return { label: 'Content Admin (CMS)', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'ADMIN':
        return { label: 'Administrator', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800' };
      default:
        return { label: r, color: 'text-slate-600 bg-slate-100' };
    }
  };

  const currentRoleInfo = getRoleBadge(effectiveRole);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-200">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shadow-sm transition-colors duration-200">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black shadow-md shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase">Admin Panel</h1>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">Dosa & Tobat Platform</p>
          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 py-5 space-y-1.5 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => soundFx.playTap()}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block leading-none">{item.label}</span>
                  <span className={`text-[10px] font-normal block mt-1 leading-none ${isActive ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.desc}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* Theme Selector Segment in Sidebar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">Mode Tampilan</span>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-xl">
              <button
                onClick={() => handleThemeChange('light')}
                className={`py-1.5 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Mode Terang (Light)"
              >
                <Sun className="w-3.5 h-3.5 mr-1 text-amber-500" /> Terang
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`py-1.5 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Mode Gelap (Dark)"
              >
                <Moon className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Gelap
              </button>

              <button
                onClick={() => handleThemeChange('system')}
                className={`py-1.5 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                  theme === 'system'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Otomatis Sistem"
              >
                <Monitor className="w-3.5 h-3.5 mr-1" /> Auto
              </button>
            </div>
          </div>

          {/* Return to Public Web */}
          <Link
            to="/"
            onClick={() => soundFx.playTap()}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <span>Buka Web Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Exit Admin Mode */}
          <button 
            onClick={handleLogoutAdmin}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 w-full transition-colors cursor-pointer border border-rose-200/50 dark:border-rose-900/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl z-10 p-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-slate-900 dark:text-slate-100">Admin Console</h2>
                    <span className="text-[10px] text-indigo-600 font-bold">Dosa & Tobat</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        soundFx.playTap();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-bold">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`py-1.5 rounded-lg flex items-center justify-center ${theme === 'light' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    <Sun className="w-3.5 h-3.5 mr-1 text-amber-500" /> Terang
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`py-1.5 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900 text-indigo-400 shadow-xs' : 'text-slate-500'}`}
                  >
                    <Moon className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Gelap
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`py-1.5 rounded-lg flex items-center justify-center ${theme === 'system' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'}`}
                  >
                    <Monitor className="w-3.5 h-3.5 mr-1" /> Auto
                  </button>
                </div>

                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50"
                >
                  <span>Buka Web Publik</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Modern Top Header Bar */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex justify-between items-center sticky top-0 z-20 transition-colors duration-200">
          
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playTap();
                setIsMobileMenuOpen(true);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Menu Navigasi"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Admin Console</span>
                <span>/</span>
                <span className="text-indigo-600 dark:text-indigo-400">{location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}</span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* Right: Quick Actions, Theme Toggle Pill, Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Circular Theme Toggle */}
            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                handleThemeChange(next);
              }}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              title={`Beralih ke mode ${theme === 'dark' ? 'Terang' : 'Gelap'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Public App Shortcut Link (Hidden on small phones) */}
            <Link
              to="/"
              onClick={() => soundFx.playTap()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 transition-all cursor-pointer"
            >
              <span>Web Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {/* Admin Profile Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <img 
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-500 shadow-xs"
              />
              <div className="hidden lg:block text-left">
                <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 block leading-tight">
                  {currentUser.name || 'Admin'}
                </span>
                <span className={`text-[10px] font-bold block uppercase leading-none mt-0.5 ${effectiveRole === 'SUPER_ADMIN' ? 'text-indigo-600 dark:text-indigo-400' : effectiveRole === 'CONTENT_ADMIN' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {currentRoleInfo.label}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable View Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

