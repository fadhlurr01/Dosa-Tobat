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
    <div className="min-h-screen md:h-screen w-full bg-[#FDFBF7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col overflow-y-auto md:overflow-hidden transition-colors duration-300 relative">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Header Full Screen */}
      <header className="w-full px-4 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shrink-0 z-30">
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
      <div className="flex-1 h-auto md:h-[calc(100vh-3.5rem)] sm:md:h-[calc(100vh-4rem)] w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* ======================= FRAME 1: WEBSITE COVER HERO (Desktop Left Side) ======================= */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`hidden md:flex md:w-5/12 lg:w-5/12 h-full p-6 lg:p-10 text-white relative overflow-hidden flex-col justify-between shrink-0 transition-colors duration-500 ${
            authMode === 'signup' 
              ? 'bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950' 
              : 'bg-gradient-to-br from-[#065F46] via-emerald-800 to-teal-950'
          }`}
        >
          {/* Subtle Ambient Graphic Layer */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute right-[-20%] bottom-[-10%] opacity-15 pointer-events-none">
            <Sparkles className="w-80 h-80" />
          </div>

          {/* Top Brand Tag & Heading */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white mb-3.5 border border-white/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              {authMode === 'signup' ? 'Daftar Perjalanan Hijrah' : 'Portal Muhasabah & Taubat'}
            </div>

            <h2 className="text-xl lg:text-3xl font-black tracking-tight leading-tight mb-2.5">
              {authMode === 'signup' ? (
                <>Mulai Langkah Baru <br /><span className="text-emerald-300">Menuju Ridha-Nya.</span></>
              ) : (
                <>Pintu Taubat Selalu Terbuka, <br /><span className="text-emerald-300">Jangan Berputus Asa.</span></>
              )}
            </h2>

            <p className="text-xs lg:text-sm text-white/85 leading-relaxed font-normal">
              {authMode === 'signup' ? (
                'Bergabunglah bersama ribuan pejuang istiqomah. Catat muhasabah harian, pelajari panduan taubat syar\'i, dan bangun kebiasaan taat tanpa rasa malu.'
              ) : (
                'Kembali kepada Allah dengan hati yang tulus. Akses fitur Mode Darurat SOS 90-detik, tasbih dzikir counter, dan katalog pencegahan maksiat.'
              )}
            </p>
          </div>

          {/* Middle Highlight Badges */}
          <div className="my-auto py-4 relative z-10 space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-4 h-4 text-amber-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">Mode Darurat SOS 90-Detik</h4>
                <p className="text-[11px] text-white/70 truncate">Meredakan dorongan syahwat saat godaan memuncak.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">5 Rukun Taubat Nasuha</h4>
                <p className="text-[11px] text-white/70 truncate">Al-Iqla', An-Nadam, Al-Istighfar, Al-'Azm, Al-Islah.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">100% Bebas Penghakiman</h4>
                <p className="text-[11px] text-white/70 truncate">Privasi terenkripsi aman secara lokal di perangkat Anda.</p>
              </div>
            </div>
          </div>

          {/* Bottom Switcher Callout */}
          <div className="pt-3.5 border-t border-white/15 relative z-10 flex items-center justify-between">
            <div className="text-xs text-white/80 font-medium">
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

        {/* ======================= FRAME 2: INTERACTIVE FORM (Right Side) ======================= */}
        <div className="w-full md:w-7/12 lg:w-7/12 h-full p-4 sm:p-6 lg:p-10 flex flex-col justify-between items-center bg-[#FDFBF7] dark:bg-slate-950 md:border-l border-slate-200/60 dark:border-slate-800/60 overflow-y-auto">
          
          {/* 2D Modern Card Box */}
          <div className="w-full max-w-lg my-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-950/5 dark:shadow-black/20 relative">
            
            {/* Mobile Mode Switcher Banner */}
            <div className="md:hidden flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-4 gap-1">
              <button
                onClick={() => toggleAuthMode('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Masuk Akun
              </button>
              <button
                onClick={() => toggleAuthMode('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Masuk ke Akun Anda
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    {successMessage}
                  </div>
                )}

                {/* SubTab 1: Demo Switcher Grid */}
                {loginSubTab === 'demo' && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Pilih Role untuk Masuk:
                    </span>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                      {DEMO_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleDemoSelect(acc.id)}
                          disabled={isLoading}
                          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/50 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between group text-left cursor-pointer disabled:opacity-50"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={acc.avatar}
                              alt={acc.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                  {acc.name}
                                </h4>
                                {acc.role === 'ADMIN' && (
                                  <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                {acc.title}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                              {acc.role}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab 2: Standard Email / Password Form */}
                {loginSubTab === 'email' && (
                  <form onSubmit={handleCustomLogin} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Alamat Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playTap();
                            setErrorMessage('Untuk demo, Anda dapat menggunakan 1-Click Akun Demo tanpa password.');
                          }}
                          className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                          Lupa password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Masuk ke Aplikasi
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="text-center pt-2">
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
              /* ================= SIGNUP / REGISTER FORM VIEW ================= */
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Daftar Akun Baru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Mulai perjalanan pemulihan spiritual dan raih istiqomah harian.
                  </p>
                </div>

                {/* Status Messages */}
                {errorMessage && (
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nama Lengkap / Panggilan
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Fulan bin Fulan"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="emailanda@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Konfirmasi Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Fokus Pemulihan Utama
                    </label>
                    <select
                      value={initialSinGoal}
                      onChange={(e) => setInitialSinGoal(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
                    >
                      <option value="Pembersihan Hati & Lisan">Pembersihan Hati & Lisan (Ghibah, Riya', Dengki)</option>
                      <option value="Penjagaan Pandangan & Syahwat">Penjagaan Pandangan & Syahwat (Zina Mata, Visual)</option>
                      <option value="Disiplin Ibadah & Shalat">Disiplin Ibadah & Shalat Tepat Waktu</option>
                      <option value="Pembersihan Harta & Muamalah">Pembersihan Harta & Muamalah Halal</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Daftar Akun Baru Sekarang
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sudah memiliki akun?{' '}
                    <button
                      onClick={() => toggleAuthMode('login')}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Masuk ke Akun Anda
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Integrated Footer Inside Frame 2 at the bottom */}
          <footer className="w-full text-center text-[10px] text-slate-400 dark:text-slate-500 py-2 shrink-0">
            © {new Date().getFullYear()} Dosa & Tobat™. Privasi dan kerahasiaan data dijamin aman.
          </footer>
        </div>
      </div>
    </div>
  );
}
