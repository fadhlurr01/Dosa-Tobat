import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  LogIn, 
  UserPlus, 
  Volume2, 
  VolumeX, 
  Flame, 
  Check, 
  ArrowLeft,
  Sun,
  Moon,
  HeartHandshake,
  BookOpen,
  LifeBuoy
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { Role } from '../types';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, registerUser, soundEnabled, toggleSound, theme, setTheme } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginSubTab, setLoginSubTab] = useState<'demo' | 'email'>('demo');
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register Form States
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [initialSinGoal, setInitialSinGoal] = useState('Pembersihan Hati & Lisan');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = (location.state as any)?.from?.pathname || '/app';

  const handleDemoSelect = (demoId: string) => {
    soundFx.playTap();
    setIsLoading(true);
    setTimeout(() => {
      loginDemo(demoId);
      setIsLoading(false);
      soundFx.playSuccess();
      triggerConfetti();
      setSuccessMessage('Berhasil masuk dengan akun demo!');
      setTimeout(() => {
        const target = DEMO_ACCOUNTS.find(a => a.id === demoId);
        if (target?.role === 'ADMIN' || target?.role === 'SUPER_ADMIN' || target?.role === 'CONTENT_ADMIN') {
          navigate('/admin');
        } else {
          navigate(redirectPath);
        }
      }, 600);
    }, 350);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Silakan masukkan email Anda');
      return;
    }
    soundFx.playTap();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      login(email, email.split('@')[0], 'USER', 'FREE');
      setIsLoading(false);
      soundFx.playSuccess();
      triggerConfetti();
      setSuccessMessage('Selamat datang kembali!');
      setTimeout(() => navigate(redirectPath), 600);
    }, 450);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !regEmail) {
      setErrorMessage('Lengkapi nama dan email Anda');
      return;
    }
    if (regPassword && regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok');
      return;
    }
    soundFx.playTap();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      registerUser(name, regEmail);
      setIsLoading(false);
      soundFx.playSuccess();
      triggerConfetti();
      setSuccessMessage(`Akun berhasil dibuat. Selamat datang, ${name}!`);
      setTimeout(() => navigate(redirectPath), 700);
    }, 550);
  };

  const toggleAuthMode = (mode: 'login' | 'signup') => {
    soundFx.playTap();
    setErrorMessage('');
    setSuccessMessage('');
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 relative">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Header Full Screen */}
      <header className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 h-16 shrink-0">
        <Link to="/" onClick={() => soundFx.playTap()} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            DT
          </div>
          <div>
            <span className="font-black text-base text-[#065F46] dark:text-emerald-400 tracking-tight leading-none block">
              DOSA & TOBAT™
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Platform Pemulihan Spiritual</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            onClick={() => soundFx.playTap()}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Landing</span>
            <span className="sm:hidden">Landing</span>
          </Link>
          
          <button
            onClick={() => {
              soundFx.playTap();
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-2xs"
            title="Ganti Tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              toggleSound();
              soundFx.playTap();
            }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-2xs"
            title={soundEnabled ? 'Matikan Suara Audio' : 'Nyalakan Suara Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Main Dual-Frame Split Screen (Full Page Bleed) */}
      <div className="flex-1 w-full flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        
        {/* ======================= FRAME 1: WEBSITE COVER HERO (Desktop Only) ======================= */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`hidden md:flex md:w-5/12 lg:w-5/12 p-8 lg:p-12 text-white relative overflow-hidden flex-col justify-between shrink-0 ${
            authMode === 'signup' 
              ? 'md:order-2 bg-gradient-to-br from-amber-700 via-amber-800 to-slate-950' 
              : 'md:order-1 bg-gradient-to-br from-[#065F46] via-emerald-800 to-teal-950'
          }`}
        >
          {/* Subtle Ambient Graphic Layer */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute right-[-20%] bottom-[-10%] opacity-15 pointer-events-none">
            <Sparkles className="w-80 h-80" />
          </div>

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white mb-6 border border-white/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              {authMode === 'signup' ? 'Daftar Perjalanan Hijrah' : 'Portal Muhasabah & Taubat'}
            </div>

            <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-3">
              {authMode === 'signup' ? (
                <>Mulai Langkah Baru <br /><span className="text-amber-300">Menuju Ridha-Nya.</span></>
              ) : (
                <>Pintu Taubat Selalu Terbuka, <br /><span className="text-emerald-300">Jangan Berputus Asa.</span></>
              )}
            </h2>

            <p className="text-sm text-white/80 leading-relaxed font-light">
              {authMode === 'signup' ? (
                'Bergabunglah bersama ribuan pejuang istiqomah. Catat muhasabah harian, pelajari panduan taubat syar\'i, dan bangun kebiasaan taat tanpa rasa malu.'
              ) : (
                'Kembali kepada Allah dengan hati yang tulus. Akses fitur Mode Darurat SOS 90-detik, tasbih dzikir counter, dan katalog pencegahan maksiat.'
              )}
            </p>
          </div>

          {/* Middle Highlight Badges */}
          <div className="my-6 relative z-10 space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-4 h-4 text-amber-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">Mode Darurat SOS 90-Detik</h4>
                <p className="text-[11px] text-white/70 truncate">Meredakan dorongan syahwat saat godaan memuncak.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">5 Rukun Taubat Nasuha</h4>
                <p className="text-[11px] text-white/70 truncate">Al-Iqla', An-Nadam, Al-Istighfar, Al-'Azm, Al-Islah.</p>
              </div>
            </div>
          </div>

          {/* Bottom Switcher Callout */}
          <div className="pt-4 border-t border-white/15 relative z-10 flex items-center justify-between">
            <div className="text-xs text-white/80">
              {authMode === 'signup' ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'}
            </div>
            <button
              onClick={() => toggleAuthMode(authMode === 'signup' ? 'login' : 'signup')}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 text-xs font-black transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              {authMode === 'signup' ? (
                <>Masuk Akun <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>Daftar Baru <UserPlus className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </motion.div>

        {/* ======================= FRAME 2: INTERACTIVE FORM (Responsive on all screens) ======================= */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`w-full md:w-7/12 lg:w-7/12 p-4 sm:p-8 lg:p-12 flex flex-col justify-center items-center bg-white dark:bg-slate-900 md:border-l border-slate-200/60 dark:border-slate-800/60 ${
            authMode === 'signup' ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div className="max-w-md w-full py-4">
            {/* Mobile Mode Switcher Banner */}
            <div className="md:hidden flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-6 gap-1">
              <button
                onClick={() => toggleAuthMode('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Masuk Akun
              </button>
              <button
                onClick={() => toggleAuthMode('signup')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Daftar Baru
              </button>
            </div>

            <AnimatePresence mode="wait">
              {authMode === 'login' ? (
                /* ================= LOGIN FORM VIEW ================= */
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Masuk ke Akun Anda
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Gunakan 1-Click Demo untuk evaluasi instan atau masukkan email personal.
                  </p>
                </div>

                {/* Sub-tab: 1-Click Demo vs Email Login */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl gap-1">
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setLoginSubTab('demo');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      loginSubTab === 'demo'
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1-Click Akun Demo
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setLoginSubTab('email');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      loginSubTab === 'email'
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email & Password
                  </button>
                </div>

                {/* Status Messages */}
                {errorMessage && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    {successMessage}
                  </div>
                )}

                {/* SubTab 1: Demo Switcher Grid */}
                {loginSubTab === 'demo' && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Pilih Role untuk Masuk:
                    </span>
                    <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
                      {DEMO_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.id}
                          onClick={() => handleDemoSelect(acc.id)}
                          disabled={isLoading}
                          className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-left transition-all active:scale-98 flex items-center justify-between group cursor-pointer shadow-2xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={acc.avatar}
                              alt={acc.name}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                {acc.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 truncate">{acc.title || acc.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                              {acc.role === 'SUPER_ADMIN' ? 'Super Admin' : acc.role === 'CONTENT_ADMIN' ? 'Ustadz' : acc.plan !== 'FREE' ? 'PRO' : 'User'}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab 2: Custom Email Form */}
                {loginSubTab === 'email' && (
                  <form onSubmit={handleCustomLogin} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@example.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                        >
                          {showPassword ? 'Sembunyikan' : 'Lihat'}
                        </button>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-2xl bg-[#065F46] hover:bg-[#044c38] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Masuk Sekarang
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Belum punya akun?{' '}
                    <button
                      onClick={() => toggleAuthMode('signup')}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Daftar Akun Baru
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ================= SIGNUP FORM VIEW ================= */
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Daftar Akun Taubat
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Mulai perjalanan pemulihan spiritual dan jaga istiqomah harian.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Nama Lengkap / Panggilan
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Fulan bin Fulan"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="emailanda@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        Ulangi Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Fokus Perbaikan Utama
                    </label>
                    <select
                      value={initialSinGoal}
                      onChange={(e) => setInitialSinGoal(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    >
                      <option value="Pembersihan Hati & Lisan">Pembersihan Hati & Lisan (Ghibah, Riya', Dengki)</option>
                      <option value="Penjagaan Pandangan & Syahwat">Penjagaan Pandangan & Syahwat (Zina Mata, Pornografi)</option>
                      <option value="Disiplin Ibadah & Shalat">Disiplin Ibadah & Shalat Tepat Waktu</option>
                      <option value="Pembersihan Harta & Muamalah">Pembersihan Harta & Muamalah Halal</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-amber-600/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Buat Akun & Mulai Hijrah
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sudah memiliki akun?{' '}
                    <button
                      onClick={() => toggleAuthMode('login')}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Masuk di Sini
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer info */}
      <footer className="py-4 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/60">
        © {new Date().getFullYear()} Dosa & Tobat™. Privasi dan kerahasiaan data dijamin aman.
      </footer>
    </div>
  );
}
