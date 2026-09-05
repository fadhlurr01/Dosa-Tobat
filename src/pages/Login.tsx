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
  ArrowLeft,
  Sun,
  Moon,
  HeartHandshake,
  LifeBuoy,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

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
      setSuccessMessage('Berhasil masuk!');
      setTimeout(() => {
        const target = DEMO_ACCOUNTS.find(a => a.id === demoId);
        if (target?.role === 'ADMIN' || target?.role === 'SUPER_ADMIN' || target?.role === 'CONTENT_ADMIN') {
          navigate('/admin');
        } else {
          navigate(redirectPath);
        }
      }, 500);
    }, 300);
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
      setTimeout(() => navigate(redirectPath), 500);
    }, 400);
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
      setSuccessMessage(`Selamat datang, ${name}!`);
      setTimeout(() => navigate(redirectPath), 600);
    }, 500);
  };

  const toggleAuthMode = (mode: 'login' | 'signup') => {
    soundFx.playTap();
    setErrorMessage('');
    setSuccessMessage('');
    setAuthMode(mode);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#FDFBF7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden select-none transition-colors duration-300 relative">
      
      {/* Ambient Smooth Light Meshes */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Slim Modern Top Navbar (Fixed 56px, No Scroll) */}
      <header className="w-full px-4 sm:px-8 h-14 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shrink-0 z-30">
        <Link to="/" onClick={() => soundFx.playTap()} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            DT
          </div>
          <div>
            <span className="font-black text-sm text-[#065F46] dark:text-emerald-400 tracking-tight leading-none block">
              DOSA & TOBAT™
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 tracking-wider uppercase font-semibold">Ruang Fitrah Jiwa</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => soundFx.playTap()}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shadow-2xs transition-all inline-flex items-center gap-1.5 hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
            <span className="sm:hidden">Landing</span>
          </Link>
          
          {/* Circle Theme Toggle */}
          <button
            onClick={() => {
              soundFx.playTap();
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
            title="Ganti Tema"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Circle Audio Toggle */}
          <button
            onClick={() => {
              toggleSound();
              soundFx.playTap();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
            title={soundEnabled ? 'Matikan Suara Audio' : 'Nyalakan Suara Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Main Screen (Fits 100% in viewport without any outer scrollbar) */}
      <main className="flex-1 h-[calc(100dvh-3.5rem)] w-full flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
        
        {/* Unified Modern Glassmorphic Container */}
        <div className="w-full max-w-5xl h-full max-h-[calc(100dvh-4.5rem)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-emerald-950/5 dark:shadow-black/40 flex overflow-hidden">
          
          {/* ======================= LEFT HERO SIDE (Desktop Only) ======================= */}
          <motion.div 
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className={`hidden md:flex md:w-5/12 h-full p-6 lg:p-8 text-white relative overflow-hidden flex-col justify-between shrink-0 transition-colors duration-500 ${
              authMode === 'signup' 
                ? 'bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950' 
                : 'bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950'
            }`}
          >
            {/* Ambient Graphic Mesh */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
            <div className="absolute right-[-15%] bottom-[-15%] opacity-20 pointer-events-none">
              <Sparkles className="w-64 h-64 text-emerald-300" />
            </div>

            {/* Top Brand Tag & Heading */}
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                {authMode === 'signup' ? 'Daftar Perjalanan Hijrah' : 'Portal Muhasabah & Taubat'}
              </div>

              <h2 className="text-xl lg:text-2xl font-black tracking-tight leading-tight">
                {authMode === 'signup' ? (
                  <>Mulai Langkah Baru <br /><span className="text-emerald-300">Menuju Ridha-Nya.</span></>
                ) : (
                  <>Pintu Taubat Terbuka, <br /><span className="text-emerald-300">Jangan Berputus Asa.</span></>
                )}
              </h2>

              <p className="text-xs text-white/80 leading-relaxed font-normal">
                {authMode === 'signup' 
                  ? 'Catat muhasabah harian, pelajari panduan taubat syar\'i, dan bangun kebiasaan taat tanpa rasa malu.'
                  : 'Akses intervensi darurat Mode SOS 90-detik, tasbih dzikir counter, dan katalog kafarat komprehensif.'}
              </p>
            </div>

            {/* Middle Feature Highlights (Compact with Circle Icons) */}
            <div className="relative z-10 space-y-2.5 my-auto py-2">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/30 flex items-center justify-center shrink-0 text-amber-300">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white leading-tight">Mode Darurat SOS 90-Detik</h4>
                  <p className="text-[10px] text-white/70 truncate">Meredakan dorongan syahwat saat godaan memuncak.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-300/30 flex items-center justify-center shrink-0 text-emerald-300">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white leading-tight">5 Rukun Taubat Nasuha</h4>
                  <p className="text-[10px] text-white/70 truncate">Al-Iqla', An-Nadam, Al-Istighfar, Al-'Azm, Al-Islah.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-xs hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-teal-400/20 border border-teal-300/30 flex items-center justify-center shrink-0 text-teal-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white leading-tight">100% Bebas Penghakiman</h4>
                  <p className="text-[10px] text-white/70 truncate">Terenkripsi aman secara privat di perangkat Anda.</p>
                </div>
              </div>
            </div>

            {/* Bottom Direct Circle Action */}
            <div className="pt-3 border-t border-white/15 relative z-10 flex items-center justify-between">
              <div className="text-[11px] text-white/80 font-medium">
                {authMode === 'signup' ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'}
              </div>
              <button
                onClick={() => toggleAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 hover:bg-emerald-50 text-xs font-black transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                {authMode === 'signup' ? 'Masuk Akun' : 'Daftar Baru'}
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* ======================= RIGHT INTERACTIVE FORM (Fits Vertically) ======================= */}
          <div className="w-full md:w-7/12 h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative">
            
            {/* Top Smooth Pill Switcher (Masuk vs Daftar) */}
            <div className="w-full flex items-center justify-between gap-3 shrink-0 mb-2">
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/90 rounded-full border border-slate-200/80 dark:border-slate-700/80 w-full max-w-[280px]">
                <button
                  onClick={() => toggleAuthMode('login')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk Akun
                </button>
                <button
                  onClick={() => toggleAuthMode('signup')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Daftar Baru
                </button>
              </div>

              {/* Instant Circle Fast-Entry "Buka Aplikasi Langsung" */}
              <Link
                to="/app"
                onClick={() => {
                  soundFx.playSuccess();
                  triggerConfetti();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all text-xs font-bold shadow-2xs group cursor-pointer"
                title="Akses langsung tanpa login"
              >
                <span className="text-[11px]">Buka Aplikasi</span>
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            </div>

            {/* Status Messages */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2 shrink-0 mb-1"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="truncate">{errorMessage}</span>
              </motion.div>
            )}
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 shrink-0 mb-1"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="truncate">{successMessage}</span>
              </motion.div>
            )}

            {/* Form Content Area */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <AnimatePresence mode="wait">
                {authMode === 'login' ? (
                  /* ================= LOGIN FORM VIEW ================= */
                  <motion.div
                    key="login-view"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 flex flex-col justify-center h-full"
                  >
                    {/* Sub-tab: 1-Click Demo vs Email */}
                    <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800/70 rounded-xl gap-1 shrink-0">
                      <button
                        onClick={() => {
                          soundFx.playTap();
                          setLoginSubTab('demo');
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          loginSubTab === 'email'
                            ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email & Password
                      </button>
                    </div>

                    {/* SubTab 1: Demo 2x2 Modern Grid with Circle Action Buttons */}
                    {loginSubTab === 'demo' && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          Pilih Akun Demo untuk Langsung Buka Aplikasi:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-0.5 hide-scrollbar">
                          {DEMO_ACCOUNTS.map((acc) => (
                            <button
                              key={acc.id}
                              type="button"
                              onClick={() => handleDemoSelect(acc.id)}
                              disabled={isLoading}
                              className="p-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 bg-slate-50/70 dark:bg-slate-950/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between group text-left cursor-pointer disabled:opacity-50 shadow-2xs hover:shadow-sm"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={acc.avatar}
                                  alt={acc.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1">
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                      {acc.name}
                                    </h4>
                                    {acc.role === 'ADMIN' && (
                                      <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                                    )}
                                  </div>
                                  <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors inline-block mt-0.5">
                                    {acc.role}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Circle Launch Button for Each Demo Account */}
                              <div className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 text-slate-400 group-hover:text-white group-hover:bg-emerald-600 flex items-center justify-center shrink-0 ml-1.5 transition-all shadow-2xs group-hover:scale-110">
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SubTab 2: Email & Password Form */}
                    {loginSubTab === 'email' && (
                      <form onSubmit={handleCustomLogin} className="space-y-2.5">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            Alamat Email
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="nama@example.com"
                              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                              Password
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                soundFx.playTap();
                                setErrorMessage('Gunakan 1-Click Akun Demo untuk akses langsung tanpa password.');
                              }}
                              className="text-[9px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                            >
                              Lupa password?
                            </button>
                          </div>
                          <div className="relative">
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Modern Circle Action Button: Buka Aplikasi */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-between group cursor-pointer disabled:opacity-50 mt-1"
                        >
                          <span className="pl-3">Buka Aplikasi</span>
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-800 transition-all">
                            {isLoading ? (
                              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5" />
                            )}
                          </div>
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  /* ================= SIGNUP / REGISTER FORM VIEW ================= */
                  <motion.div
                    key="signup-view"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 flex flex-col justify-center h-full"
                  >
                    <form onSubmit={handleRegister} className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                            Nama Lengkap
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Fulan bin Fulan"
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              required
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                            Konfirmasi Password
                          </label>
                          <div className="relative">
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={regConfirmPassword}
                              onChange={(e) => setRegConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-8 pr-8 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                          Fokus Utama Taubat
                        </label>
                        <select
                          value={initialSinGoal}
                          onChange={(e) => setInitialSinGoal(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
                        >
                          <option value="Pembersihan Hati & Lisan">Pembersihan Hati & Lisan (Ghibah, Riya', Dengki)</option>
                          <option value="Penjagaan Pandangan & Syahwat">Penjagaan Pandangan & Syahwat (Visual/Zina Mata)</option>
                          <option value="Disiplin Ibadah & Shalat">Disiplin Ibadah & Shalat Tepat Waktu</option>
                          <option value="Pembersihan Harta & Muamalah">Pembersihan Harta & Muamalah Halal</option>
                        </select>
                      </div>

                      {/* Modern Circle Action Button: Daftar & Buka Aplikasi */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-between group cursor-pointer disabled:opacity-50 mt-1"
                      >
                        <span className="pl-3">Buka Aplikasi & Mulai Hijrah</span>
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-800 transition-all">
                          {isLoading ? (
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Micro Footer (No extra height, pinned inside frame) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
              <span>© {new Date().getFullYear()} Dosa & Tobat™</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> Privasi Terenkripsi
              </span>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
