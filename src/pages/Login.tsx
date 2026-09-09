import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  Mail, 
  Phone,
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
  ArrowUpRight,
  BookOpen,
  Check
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { LegalModal } from '../components/ui/LegalModal';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, registerUser, soundEnabled, toggleSound, theme, setTheme } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginSubTab, setLoginSubTab] = useState<'demo' | 'email'>('demo');
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'disclaimer' | 'terms' }>({
    isOpen: false,
    type: 'terms',
  });
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register Form States
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [initialSinGoal, setInitialSinGoal] = useState('Pembersihan Hati & Lisan');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  const redirectPath = redirectParam || (location.state as any)?.from?.pathname || '/app';

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
        if ((target?.role === 'ADMIN' || target?.role === 'SUPER_ADMIN' || target?.role === 'CONTENT_ADMIN') && !redirectParam) {
          navigate('/admin');
        } else {
          navigate(redirectPath);
        }
      }, 500);
    }, 300);
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Silakan masukkan alamat email Anda');
      return;
    }
    soundFx.playTap();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await login(email, password);
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.message || 'Email atau password salah.');
        return;
      }

      soundFx.playSuccess();
      triggerConfetti();
      setSuccessMessage('Login berhasil. Mengalihkan...');
      setTimeout(() => navigate(redirectPath), 600);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage('Gagal menghubungi server. Periksa koneksi backend.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Mohon lengkapi Nama, Email, dan Password.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password minimal 6 karakter.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      return;
    }

    soundFx.playTap();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await registerUser(name, regEmail, phone, regPassword, initialSinGoal);
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.message || 'Pendaftaran gagal. Email mungkin sudah terdaftar.');
        return;
      }

      soundFx.playSuccess();
      triggerConfetti();
      setSuccessMessage(res.message || `Selamat datang, ${name}!`);
      setTimeout(() => navigate(redirectPath), 600);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage('Terjadi kendala saat mendaftar. Silakan coba lagi.');
    }
  };

  const toggleAuthMode = (mode: 'login' | 'signup') => {
    soundFx.playTap();
    setErrorMessage('');
    setSuccessMessage('');
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row overflow-x-hidden transition-colors duration-300">
      
      {/* ======================= LEFT HERO SHOWCASE PANEL (Full Height 45% Edge-to-Edge) ======================= */}
      <div className="w-full md:w-5/12 lg:w-[45%] bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-emerald-500/20 shrink-0">
        
        {/* Ambient Glows & Islamic Pattern Mesh */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Top Branding Section */}
        <div className="relative z-10 space-y-6">
          <Link to="/" onClick={() => soundFx.playTap()} className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform border border-emerald-400/30">
              DT
            </div>
            <div>
              <span className="font-black text-lg text-emerald-300 tracking-tight leading-none block">
                DOSA & TOBAT™
              </span>
              <span className="text-[11px] text-emerald-400/80 tracking-widest uppercase font-semibold">Ruang Fitrah Jiwa</span>
            </div>
          </Link>

          {/* Dynamic Hero Heading based on Auth Mode */}
          <motion.div
            key={authMode + '-left-header'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 pt-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-emerald-300 border border-emerald-500/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              {authMode === 'signup' ? 'Daftar Perjalanan Hijrah' : 'Portal Muhasabah & Taubat'}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
              {authMode === 'signup' ? (
                <>Mulai Langkah Baru <br /><span className="text-emerald-400">Menuju Ridha-Nya.</span></>
              ) : (
                <>Pintu Taubat Terbuka, <br /><span className="text-emerald-400">Jangan Berputus Asa.</span></>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              {authMode === 'signup'
                ? 'Catat muhasabah harian, pelajari panduan taubat syar\'i shahih, dan bangun kebiasaan taat tanpa rasa malu.'
                : 'Akses intervensi darurat Mode SOS 90-detik, tasbih dzikir counter, dan katalog kafarat komprehensif.'}
            </p>
          </motion.div>
        </div>

        {/* Center Feature Badges */}
        <div className="relative z-10 space-y-3.5 my-8">
          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 flex items-center gap-3.5 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center shrink-0 text-amber-300">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Mode Darurat SOS 90-Detik</h4>
              <p className="text-[11px] text-slate-400">Intervensi cepat saat dorongan godaan memuncak.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 flex items-center gap-3.5 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-300/30 flex items-center justify-center shrink-0 text-emerald-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">5 Rukun Taubat Nasuha</h4>
              <p className="text-[11px] text-slate-400">Al-Iqla', An-Nadam, Al-Istighfar, Al-'Azm, Al-Islah.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 flex items-center gap-3.5 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/30 flex items-center justify-center shrink-0 text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">100% Bebas Penghakiman</h4>
              <p className="text-[11px] text-slate-400">Terenkripsi aman langsung di Database Server.</p>
            </div>
          </div>
        </div>

        {/* Bottom Quote & Trust Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Berlandaskan Al-Qur'an & As-Sunnah</span>
          </div>
          <span className="text-[11px] text-emerald-400/80 font-semibold">v1.0 Fullstack</span>
        </div>
      </div>

      {/* ======================= RIGHT INTERACTIVE FORM PANEL (55% Full Width/Height) ======================= */}
      <div className="flex-1 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white dark:bg-slate-950 relative overflow-y-auto">
        
        {/* Top Control Bar (Landing Page Link + Theme Toggle + Audio + Buka Aplikasi) */}
        <div className="w-full flex items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <Link
            to="/"
            onClick={() => soundFx.playTap()}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-full shadow-2xs transition-all inline-flex items-center gap-1.5 hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
              title="Ganti Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                toggleSound();
                soundFx.playTap();
              }}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
              title={soundEnabled ? 'Matikan Suara Audio' : 'Nyalakan Suara Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Direct Bypass Button "Buka Aplikasi" */}
            <Link
              to="/app"
              onClick={() => {
                soundFx.playSuccess();
                triggerConfetti();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all text-xs font-bold shadow-2xs group cursor-pointer hover:scale-105"
            >
              <span>Buka Aplikasi</span>
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>

        {/* Center Form Content Wrapper (Max width constraint for aesthetic reading experience) */}
        <div className="w-full max-w-xl mx-auto py-8">
          
          {/* Main Auth Switcher Tabs: [ Masuk Akun | Daftar Baru ] */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 mb-6">
            <button
              onClick={() => toggleAuthMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Masuk Akun
            </button>
            <button
              onClick={() => toggleAuthMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Daftar Baru
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2.5 mb-4"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2.5 mb-4"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Form Switcher Views */}
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              /* ================= LOGIN FORM VIEW ================= */
              <motion.div
                key="login-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    Selamat Datang Kembali
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Pilih akun demo instan atau masuk menggunakan email & password.
                  </p>
                </div>

                {/* Sub-tab: 1-Click Demo vs Email */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl gap-1">
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setLoginSubTab('demo');
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      loginSubTab === 'demo'
                        ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
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
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      loginSubTab === 'email'
                        ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email & Password
                  </button>
                </div>

                {/* SubTab 1: 1-Click Demo Account Grid */}
                {loginSubTab === 'demo' && (
                  <div className="space-y-3 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Pilih Akun Demo untuk Akses Instan:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DEMO_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleDemoSelect(acc.id)}
                          disabled={isLoading}
                          className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 bg-slate-50/70 dark:bg-slate-900/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between group text-left cursor-pointer disabled:opacity-50 shadow-2xs hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={acc.avatar}
                              alt={acc.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                  {acc.name}
                                </h4>
                                {acc.role === 'ADMIN' && (
                                  <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                )}
                              </div>
                              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors inline-block mt-0.5">
                                {acc.role}
                              </span>
                            </div>
                          </div>
                          
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 text-slate-400 group-hover:text-white group-hover:bg-emerald-600 flex items-center justify-center shrink-0 ml-2 transition-all shadow-2xs group-hover:scale-110">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab 2: Email & Password Form */}
                {loginSubTab === 'email' && (
                  <form onSubmit={handleCustomLogin} className="space-y-4 pt-1">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
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
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playTap();
                            setErrorMessage('Gunakan 1-Click Akun Demo untuk akses langsung tanpa password.');
                          }}
                          className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-medium"
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
                          className="w-full pl-10 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/40 hover:scale-[1.01] active:scale-98 transition-all group cursor-pointer disabled:opacity-50"
                      >
                        <span>Masuk Akun</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-800 transition-all shadow-xs">
                          {isLoading ? (
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              /* ================= SIGNUP / REGISTER FORM VIEW ================= */
              <motion.div
                key="signup-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    Daftar Akun Baru
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Mulai lembaran baru dengan pencatatan muhasabah & bimbingan taubat syar'i.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Row 1: Nama Lengkap & Email (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Nama Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Fulan bin Fulan"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Alamat Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: No. HP / WhatsApp & Fokus Utama Taubat (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        No. HP / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="081234567890"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Fokus Utama Taubat
                      </label>
                      <div className="relative">
                        <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={initialSinGoal}
                          onChange={(e) => setInitialSinGoal(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer truncate"
                        >
                          <option value="Pembersihan Hati & Lisan">Pembersihan Hati & Lisan (Ghibah, Riya', Dengki)</option>
                          <option value="Penjagaan Pandangan & Syahwat">Penjagaan Pandangan & Syahwat (Visual/Zina Mata)</option>
                          <option value="Disiplin Ibadah & Shalat">Disiplin Ibadah & Shalat Tepat Waktu</option>
                          <option value="Pembersihan Harta & Muamalah">Pembersihan Harta & Muamalah Halal</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Password & Konfirmasi Password (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Minimal 6 karakter"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Konfirmasi Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Ulangi password"
                          className="w-full pl-10 pr-11 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Disclaimer/Terms + Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Dengan mendaftar, Anda menyetujui{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
                        className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700"
                      >
                        Ketentuan Layanan
                      </button>{' '}
                      dan{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal({ isOpen: true, type: 'disclaimer' })}
                        className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700"
                      >
                        Disclaimer
                      </button>
                      .
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/40 hover:scale-[1.01] active:scale-98 transition-all group cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      <span>Daftar & Mulai Hijrah</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-800 transition-all shadow-xs">
                        {isLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Footer Section */}
        <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span>© {new Date().getFullYear()} Dosa & Tobat™ — Ruang Fitrah Jiwa</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: 'disclaimer' })}
              className="hover:underline text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Disclaimer
            </button>
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
              className="hover:underline text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Syarat & Ketentuan
            </button>
            <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Privasi Terenkripsi
            </span>
          </div>
        </div>

      </div>

      {/* Legal Modal Dialog */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        type={legalModal.type}
      />
    </div>
  );
}
