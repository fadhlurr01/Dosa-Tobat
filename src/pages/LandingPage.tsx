import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  LifeBuoy,
  HeartHandshake,
  Sparkles,
  Flame,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Check,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Heart,
  HelpCircle,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  Smile,
  Compass,
  Star,
  Users,
  Award,
  BookMarked,
  ArrowUpRight
} from 'lucide-react';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import ReligiousCard from '../components/ui/ReligiousCard';

export default function LandingPage() {
  const { theme, setTheme, soundEnabled, toggleSound, isAuthenticated } = useStore();
  const [activeTab5R, setActiveTab5R] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [miniTasbihCount, setMiniTasbihCount] = useState(7);
  const [activeCategoryDemo, setActiveCategoryDemo] = useState<'mata' | 'lisan' | 'hati' | 'ibadah'>('mata');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTasbihTap = () => {
    const nextCount = miniTasbihCount + 1;
    setMiniTasbihCount(nextCount);
    soundFx.playBead(1 + (nextCount % 10) * 0.04);
    if (nextCount % 33 === 0) {
      soundFx.playSuccess();
      triggerConfetti();
    }
  };

  const steps5R = [
    {
      num: '01',
      tag: 'RECOGNIZE',
      title: 'Kenali Pola & Pemicu Dosa Secara Spesifik',
      desc: 'Bukan sekadar merasa bersalah secara abstrak. Kami membantumu membedah akar penyebab: jam berapa godaan memuncak, pemicu emosi (bosan, lelah, kesepian), dan pintu masuk syahwat.',
      example: 'Contoh: Tergoda scrolling konten pornografi saat sendirian larut malam dalam kondisi lelah mental.',
      color: 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30',
      badge: 'Tahap 1: Diagnosis Jiwa'
    },
    {
      num: '02',
      tag: 'REMOVE',
      title: 'Putus Akses Lingkungan & Pemicu Visual',
      desc: 'Niat baik tanpa pencegahan fisik akan runtuh. Aktifkan langkah pemutus: letakkan smartphone di luar kamar tidur, pasang filter DNS, dan jauhi majelis ghibah.',
      example: 'Contoh: Menghapus aplikasi pemicu, keluar dari grup obrolan unfaedah, dan menundukkan pandangan seketika.',
      color: 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/30',
      badge: 'Tahap 2: Proteksi Lingkungan'
    },
    {
      num: '03',
      tag: 'REPENT',
      title: 'Taubat Nasuha dengan 5 Rukun Sunnah',
      desc: 'Lakukan proses taubat tulus: Berhenti seketika (Al-Iqla\'), Menyesali sedalam hati (An-Nadam), Istighfar tulus, Bertekad tidak mengulangi (Al-\'Azm), dan Memperbaiki akibatnya (Al-Islah).',
      example: 'Contoh: Membaca Sayyidul Istighfar, shalat taubat 2 rakaat di sepertiga malam, dan memohon ridha-Nya.',
      color: 'border-rose-500 text-rose-700 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/30',
      badge: 'Tahap 3: Pembersihan Dosa'
    },
    {
      num: '04',
      tag: 'REPLACE',
      title: 'Ganti Kebiasaan Buruk dengan Kebaikan Positif',
      desc: 'Hati manusia tidak boleh dibiarkan hampa. Gantikan waktu maksiat dengan amalan pengganti aktif: tilawah Al-Qur\'an, sedekah rahasia, atau olahraga terarah.',
      example: 'Contoh: Saat nafsu amarah datang, segera berwudhu dan membaca dzikir penghapus dendam.',
      color: 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/30',
      badge: 'Tahap 4: Penggantian Kebiasaan'
    },
    {
      num: '05',
      tag: 'REPEAT / RECOVERY',
      title: 'Bangun Daya Tahan Spiritual Berkelanjutan',
      desc: 'Jatuh bukan akhir segalanya. Catat riwayat di Jurnal Hijrah, pantau streak hari bersih tanpa rasa malu, dan bangkit kembali dengan tekad yang lebih kokoh.',
      example: 'Contoh: Evaluasi mingguan terhadap pemicu yang berhasil dilewati dan penguatan benteng doa harian.',
      color: 'border-indigo-500 text-indigo-700 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30',
      badge: 'Tahap 5: Ketahanan Istiqomah'
    }
  ];

  const sinExamples = {
    mata: {
      title: 'Zina Mata & Konten Negatif',
      subtitle: 'Memandang yang diharamkan, ketergantungan visual maya',
      steps: ['Aktifkan Mode SOS 90 Detik saat dorongan muncul', 'Gunakan teknik pernapasan 4-4-4 dan basuh wajah dengan wudhu', 'Kafarat: Berdzikir istighfar 100x dan bersedekah'],
      dalil: 'Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandangannya... (QS. An-Nur: 30)'
    },
    lisan: {
      title: 'Ghibah, Fitnah & Dusta',
      subtitle: 'Membicarakan keburukan saudara tanpa hak syar\'i',
      steps: ['Tinggalkan seketika majelis yang mulai mengarah pada ghibah', 'Puji kebaikan orang yang dighibahi di hadapan orang lain', 'Doakan ampunan dan kebaikan untuk orang yang dizalimi'],
      dalil: 'Dan janganlah menggunjing satu sama lain. Adakah seorang diantara kamu yang suka memakan daging saudaranya yang sudah mati? (QS. Al-Hujurat: 12)'
    },
    hati: {
      title: 'Hasad (Dengki), Ujub & Riya\'',
      subtitle: 'Penyakit hati yang memakan amal kebaikan bagai api melahap kayu bakar',
      steps: ['Ucapkan doa keberkahan (Barakallahu fiik) untuk orang yang mendapat nikmat', 'Lakukan amalan tersembunyi yang hanya diketahui Allah SWT', 'Muhasabah bahwa seluruh nikmat dan takdir mutlak milik Allah semata'],
      dalil: 'Jauhilah hasad (dengki), karena hasad itu memakan kebaikan seperti api memakan kayu bakar. (HR. Abu Dawud)'
    },
    ibadah: {
      title: 'Meninggalkan Shalat & Lalai Waktu',
      subtitle: 'Menunda-nunda panggilan adzan hingga keluar batas waktu',
      steps: ['Segera qadha shalat yang terlewat dengan penuh penyesalan', 'Pasang alarm pengingat 15 menit sebelum waktu adzan masuk', 'Jadikan shalat sebagai tempat istirahat jiwa, bukan beban kewajiban semata'],
      dalil: 'Maka celakalah bagi orang-orang yang shalat, (yaitu) orang-orang yang lalai dari shalatnya. (QS. Al-Ma\'un: 4-5)'
    }
  };

  const faqs = [
    {
      q: 'Apakah data perjalanan dan pengakuan dosa saya aman dan privat?',
      a: 'Sangat aman. Privasi adalah prioritas mutlak kami. Data perjalanan, catatan jurnal muhasabah, dan pelacakan kebiasaan disimpan secara lokal di perangkat Anda (client-side encrypted state). Kami tidak pernah menjual, menyebarkan, atau memperlihatkan riwayat pemulihan Anda kepada pihak ketiga.'
    },
    {
      q: 'Bagaimana jika saya terjatuh kembali (relapse) saat sudah mencapai streak lama?',
      a: 'Jangan pernah berputus asa dari rahmat Allah SWT. Aplikasi ini dirancang tanpa penghakiman. Ketika Anda terjatuh, sistem menyediakan Panduan Taubat Nasuha 5 Rukun dan analisis pemicu agar Anda dapat langsung bangkit tanpa rasa putus asa. Rasulullah ﷺ bersabda: "Setiap anak Adam pasti sering berbuat salah, dan sebaik-baik orang yang bersalah adalah yang bertaubat."'
    },
    {
      q: 'Apakah aplikasi ini sesuai dengan tuntunan Al-Qur\'an dan As-Sunnah?',
      a: 'Seluruh materi rukun taubat, doa Sayyidul Istighfar, kaidah kafarat, serta adab penyucian jiwa (Tazkiyatun Nafs) disarikan dari dalil Al-Qur\'an, hadits-hadits shahih (Bukhari, Muslim, Tirmidzi), serta rujukan ulama ahlus sunnah terpercaya seperti Imam Ibnu Qayyim Al-Jauziyyah dan Imam An-Nawawi.'
    },
    {
      q: 'Apa itu Mode Darurat SOS 90 Detik?',
      a: 'Mode SOS adalah fitur intervensi krisis saat nafsu atau godaan maksiat sedang berada pada puncaknya. Secara ilmiah dan biologis, dorongan syahwat/amarah memuncak dalam 90 detik pertama. Mode ini menuntun Anda melalui 5 langkah pengalihan fisik, latihan pernapasan ketenangan 4-4-4, serta dzikir perlindungan hingga nafsu mereda.'
    },
    {
      q: 'Apakah saya bisa menggunakan aplikasi ini secara gratis?',
      a: 'Ya, 100% GRATIS! Seluruh fitur inti (Katalog Dosa, Mode Darurat SOS, Panduan Taubat Nasuha, Tasbih Dzikir, dan Pelacak Hari Bersih) dapat diakses bebas tanpa biaya untuk kemaslahatan umat. Paket Infaq/PRO bersifat sukarela untuk mendukung operasional dakwah digital.'
    }
  ];

  const testimonials = [
    {
      name: 'Rian Pratama',
      role: 'Software Engineer, Jakarta',
      streak: '48 Hari Bersih',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      story: 'Fitur Mode Darurat SOS benar-benar penyelamat. Saat larut malam dorongan browsing konten haram muncul, panduan pernapasan dan ta\'awudz 90 detik memotong siklus impulsif di otak saya. Alhamdulillah kini sudah 48 hari bersih.'
    },
    {
      name: 'Hafiz Az-Zubair',
      role: 'Mahasiswa, Bandung',
      streak: '92 Hari Istiqomah',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      story: 'Metode 5R membuat saya paham bahwa sekadar berniat tidak cukup jika pemicu tidak di-remove. Dosa & Tobat memberikan kerangka pemulihan yang sangat terstruktur, aplikatif, dan menyejukkan hati.'
    },
    {
      name: 'Nadia Salsabila',
      role: 'Guru Madrasah, Yogyakarta',
      streak: '30 Hari Terjaga',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      story: 'Tasbih interaktif dan catatan Jurnal Muhasabah membantu saya menjaga lisan dari ghibah di tempat kerja. Dzikir menjadi bagian tak terpisahkan dari hari-hari saya.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* 1. TOP ANNOUNCEMENT & NAVIGATION HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-emerald-500/15 shadow-md shadow-emerald-950/5 py-2.5' 
            : 'bg-[#FDFBF7]/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-transparent py-3.5'
        }`}
      >
        <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Sisi Kiri: Logo Brand & Menu Navigasi */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => soundFx.playTap()}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-base shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
                DT
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm sm:text-base tracking-tight text-[#065F46] dark:text-emerald-400">
                    DOSA & TOBAT™
                  </span>
                  <span className="hidden sm:inline text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    Platform
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-serif italic hidden sm:block">
                  Sistem Pemulihan & Taubat Berbasis Sunnah
                </p>
              </div>
            </Link>

            {/* Menu Navigasi di Sisi Kiri Bersebelahan dengan Logo */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              <a href="#metode-5r" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Metode 5R</span>
              </a>
              <a href="#fitur" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Fitur</span>
              </a>
              <a href="#katalog" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Katalog Dosa</span>
              </a>
              <a href="#testimoni" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Kisah Taubat</span>
              </a>
              <a href="#faq" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                <span>FAQ</span>
              </a>
              <a href="#infaq" onClick={() => soundFx.playTap()} className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Infaq</span>
              </a>
            </nav>
          </div>

          {/* Sisi Kanan: Action Toolbar, Switcher & Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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

            {/* Login / Demo Link */}
            <Link
              to="/login"
              onClick={() => soundFx.playTap()}
              className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 px-2.5 sm:px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Masuk / Demo
            </Link>

            {/* Direct App Entry Button */}
            <Link
              to={isAuthenticated ? "/app" : "/login"}
              onClick={() => soundFx.playSuccess()}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isAuthenticated ? 'Buka Dashboard' : 'Mulai Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Platform Pemulihan Jiwa & Panduan Taubat Nasuha Modern</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]">
              Kembali ke Jalan Fitrah.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:to-teal-300">
                Putus Lingkaran Dosa,
              </span>{' '}
              Bangkitkan Jiwa Bersih.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Ruang aman dan terstruktur tanpa penghakiman. Dilengkapi metodologi <strong>5R (Recognize, Remove, Repent, Replace, Repeat)</strong>, intervensi darurat 90-detik, katalog kafarat, dan pelacak hari bersih menuju ketenangan hakiki.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2"
          >
            <Link
              to="/app"
              onClick={() => {
                soundFx.playSuccess();
                triggerConfetti();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-xl shadow-emerald-700/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Mulai Perjalanan Pemulihan (Gratis)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/sos"
              onClick={() => soundFx.playTap()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900/60 hover:border-rose-400 text-rose-700 dark:text-rose-400 font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LifeBuoy className="w-4 h-4 text-rose-600 animate-spin-slow" />
              <span>Mode Darurat SOS (Krisis Godaan)</span>
            </Link>
          </motion.div>

          {/* Trust Value Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs text-slate-500 dark:text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Tanpa Penghakiman</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-500" />
              <span>Privasi Terenkripsi Lokal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Rujukan Al-Qur'an & Sunnah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Bebas Biaya untuk Umat</span>
            </div>
          </motion.div>

          {/* Interactive Hero Application Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="pt-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 text-left max-w-4xl mx-auto overflow-hidden relative">
              
              {/* Card Header Simulator */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2">dosa-dan-tobat.app/preview</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Streak Aktif: 14 Hari Bersih
                </span>
              </div>

              {/* Grid Content Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Checklist Ibadah Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ibadah Harian</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">4/4 Selesai</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {['Shalat 5 Waktu', 'Doa & Munajat', 'Dzikir Pagi & Petang', 'Tilawah Al-Qur\'an'].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{item}</span>
                        <div className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Interactive Mini Tasbih Demo */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-slate-800/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">Tasbih Interaktif</span>
                    <p className="font-arabic text-xl text-slate-800 dark:text-slate-100 my-1">سُبْحَانَ اللَّهِ</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Subhanallah (Maha Suci Allah)</p>
                  </div>

                  <div className="my-3">
                    <motion.button
                      onClick={handleTasbihTap}
                      whileTap={{ scale: 0.92 }}
                      className="w-20 h-20 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white mx-auto shadow-lg flex flex-col items-center justify-center font-black"
                    >
                      <span className="text-xl leading-none">{miniTasbihCount}</span>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-200 mt-0.5">Ketuk</span>
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    Coba ketuk tasbih di atas (Audio Aktif)
                  </p>
                </div>

                {/* 3. SOS Mode Trigger Preview */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white dark:from-rose-950/20 dark:to-slate-800/40 border border-rose-200/60 dark:border-rose-800/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wide">
                      <LifeBuoy className="w-4 h-4" />
                      <span>SOS Emergency</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">
                      Krisis Dorongan Maksiat?
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Panduan 5 tahap pengalihan napas 4-4-4 & pemutus visual saat dorongan sedang tinggi.
                    </p>
                  </div>

                  <Link
                    to="/sos"
                    onClick={() => soundFx.playTap()}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs text-center shadow-md transition-all active:scale-95 mt-3"
                  >
                    Buka Simulator SOS →
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. KEY METRICS & RECOVERY IMPACT */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">
                35+
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Katalog Dosa & Kafarat
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Lisan, Mata, Hati, & Syahwat</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-rose-600 dark:text-rose-400">
                90s
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Waktu Emas SOS
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Intervensi Puncak Dorongan</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
                5R
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sistem Pemulihan
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Recognize to Recovery</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                100%
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Privat & Non-Judgmental
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Ruang Aman Pengguna</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE 5R METHODOLOGY DEEP-DIVE */}
      <section id="metode-5r" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Metodologi Pemulihan Jiwa
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Sistem 5R: Transformasi Kebiasaan Berkelanjutan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Bertaubat bukan hanya berhenti sesaat lalu mengulanginya lagi. Diperlukan sistem pertahanan berlapis dari pengenalan pemicu hingga pembentukan karakter baru.
          </p>
        </div>

        {/* 5R Steps Interactive Navigator */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Steps List (Left) */}
          <div className="md:col-span-5 space-y-2">
            {steps5R.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playTap();
                  setActiveTab5R(idx);
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border ${
                  activeTab5R === idx
                    ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${activeTab5R === idx ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {step.num}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
                      {step.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {step.title.split(':')[0]}
                    </h4>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab5R === idx ? 'text-emerald-600 translate-x-1' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>

          {/* Active Step Detailed Card (Right) */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab5R}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {steps5R[activeTab5R].badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Langkah {steps5R[activeTab5R].num} / 05
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  {steps5R[activeTab5R].title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {steps5R[activeTab5R].desc}
                </p>

                <div className={`p-4 rounded-2xl border ${steps5R[activeTab5R].color} text-xs leading-relaxed space-y-1`}>
                  <strong className="block uppercase tracking-wider font-bold">Penerapan Praktis:</strong>
                  <p>{steps5R[activeTab5R].example}</p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    to="/taubat"
                    onClick={() => soundFx.playTap()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Buka Panduan Taubat Nasuha <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setActiveTab5R((activeTab5R + 1) % steps5R.length);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  >
                    Langkah Berikutnya →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE KATALOG DOSA & SOLUSI PREVIEW */}
      <section id="katalog" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Direktori Terstruktur
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Katalog Dosa, Dalil, & Kafarat Lengkap
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Setiap kebiasaan buruk memiliki diagnosis fiqih, pemicu psikologis, dan obat penawar yang jelas dalam syariat.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              { id: 'mata', label: 'Zina Mata / Visual', icon: LifeBuoy },
              { id: 'lisan', label: 'Lisan (Ghibah & Dusta)', icon: BookOpen },
              { id: 'hati', label: 'Hati (Hasad & Ujub)', icon: Heart },
              { id: 'ibadah', label: 'Kelalaian Shalat', icon: Moon }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playTap();
                  setActiveCategoryDemo(cat.id as any);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategoryDemo === cat.id
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Selected Category Detail Card */}
          <div className="bg-[#FDFBF7] dark:bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Pencegahan & Solusi Syar'i
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {sinExamples[activeCategoryDemo].title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {sinExamples[activeCategoryDemo].subtitle}
              </p>
            </div>

            {/* Dalil Quote */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span>Dalil Al-Qur'an & As-Sunnah</span>
              </div>
              <p className="text-xs italic text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                "{sinExamples[activeCategoryDemo].dalil}"
              </p>
            </div>

            {/* Prescribed Solution Steps */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Langkah Penawar & Kafarat:
              </h4>
              <div className="space-y-2">
                {sinExamples[activeCategoryDemo].steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/direktori"
                onClick={() => soundFx.playTap()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-700 text-white font-bold text-xs shadow-sm hover:bg-emerald-800 transition-all active:scale-95"
              >
                Lihat Seluruh 35+ Direktori Dosa & Solusi <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. COMPREHENSIVE FEATURES BENTO GRID */}
      <section id="fitur" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Fitur Utama Aplikasi
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Segala yang Kamu Butuhkan untuk Istiqomah
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Dirancang dengan prinsip empati, kesederhanaan, dan tanpa kebisingan notifikasi yang berlebihan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: SOS Mode */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white to-rose-50/40 dark:from-slate-900 dark:to-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Mode Darurat SOS 90-Detik
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Panduan intervensi darurat saat dorongan maksiat memuncak. Dilengkapi breathing guide ritmis 4-4-4 dan audio penenang.
              </p>
            </div>
            <Link to="/sos" onClick={() => soundFx.playTap()} className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 hover:underline pt-2">
              Jalankan Mode SOS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Tasbih & Dzikir */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Tasbih & Dzikir Digital Interaktif
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Penghitung tasbih haptic dengan synthesizer audio realistis. Pilihan dzikir istighfar, tahmid, tahlil, dan takbir target 33x/100x.
              </p>
            </div>
            <Link to="/dzikir" onClick={() => soundFx.playTap()} className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2">
              Buka Tasbih Digital <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Panduan Taubat Nasuha */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white to-amber-50/40 dark:from-slate-900 dark:to-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Panduan Taubat 5 Rukun
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tahapan sistematis bertaubat nasuha lengkap dengan lafaz Sayyidul Istighfar, shalat taubat, dan kafarat penghapus dosa.
              </p>
            </div>
            <Link to="/taubat" onClick={() => soundFx.playTap()} className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2">
              Buka Panduan Taubat <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Jurnal Muhasabah */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
              <BookMarked className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
              Jurnal Refleksi Jiwa
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Catat pemicu godaan, emosi yang menyertai, dan hikmah pemulihan untuk mengenali pola kerentanan diri secara jujur.
            </p>
          </div>

          {/* Card 5: Pelacak Streak Bersih */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
              Streak Hari Bersih
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Rayakan setiap hari kemenangan melawan hawa nafsu. Bila terjatuh, bangkit kembali tanpa kehilangan motivasi.
            </p>
          </div>

          {/* Card 6: Doa & Munajat */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
              Perisai Doa Perlindungan
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Koleksi doa perlindungan dari tipu daya setan, was-was hati, dan keburukan hawa nafsu dengan teks Arab dan latin.
            </p>
          </div>

        </div>
      </section>

      {/* 7. REAL STORIES / TESTIMONIALS */}
      <section id="testimoni" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Kisah Hijrah & Pemulihan
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Mereka yang Telah Menemukan Ketenangan
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Setiap langkah kecil menjauhi maksiat adalah kemenangan besar di hadapan Allah SWT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#FDFBF7] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                    "{t.story}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> {t.streak}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. INFAQ & MEMBER PACKAGES */}
      <section id="infaq" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Dukungan Dakwah
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Akses Penuh Gratis, Infaq Sukarela
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Aplikasi ini dibangun untuk kemaslahatan umat. Seluruh panduan esensial tersedia tanpa pungutan biaya selamanya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Paket Umat (Free)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 dark:text-slate-100">Rp 0</span>
                <span className="text-xs text-slate-400">/ selamanya</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Akses tanpa batas ke seluruh direktori dan panduan taubat.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                {[
                  'Akses 35+ Katalog Dosa & Kafarat',
                  'Mode Darurat SOS 90-Detik',
                  'Panduan Taubat Nasuha & Sayyidul Istighfar',
                  'Tasbih & Dzikir Digital Interaktif',
                  'Checklist Ibadah & Pelacak Streak',
                  'Privasi 100% Enkripsi Lokal'
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/app"
              onClick={() => soundFx.playTap()}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs text-center transition-all"
            >
              Gunakan Gratis Sekarang
            </Link>
          </div>

          {/* Infaq PRO Tier */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 border-2 border-emerald-500 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Infaq Dakwah
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Sahabat Hijrah (PRO)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 dark:text-slate-100">Rp 29.000</span>
                <span className="text-xs text-slate-400">/ bulan (infaq)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pahala jariyah operasional server dan pengembangan konten fiqih.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                {[
                  'Semua Fitur Paket Umat (Free)',
                  'Lencana Khusus Sahabat Hijrah PRO',
                  'Laporan Analisis Tren Pemulihan Jiwa',
                  'Mode Konsultasi Asatidz (Coming Soon)',
                  'Donasi Pengembangan Dakwah Digital',
                  'Dukungan Prioritas Pengembang'
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/premium"
              onClick={() => soundFx.playSuccess()}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs text-center shadow-lg shadow-emerald-700/25 transition-all active:scale-95"
            >
              Infaq & Upgrade PRO
            </Link>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Pertanyaan Umum
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Jawaban mengenai keamanan data, metode fiqih, dan cara terbaik menggunakan platform.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FDFBF7] dark:bg-slate-950 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 dark:text-slate-200"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. FINAL COMPASSIONATE CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto shadow-inner">
            <HeartHandshake className="w-8 h-8 text-emerald-200" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Pintu Taubat Masih Terbuka Seluas Langit dan Bumi.
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto font-serif italic">
            "Katakanlah: Hai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri, janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya." (QS. Az-Zumar: 53)
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/app"
              onClick={() => {
                soundFx.playSuccess();
                triggerConfetti();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-emerald-900 font-black text-sm shadow-2xl hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Buka Dashboard Aplikasi Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              onClick={() => soundFx.playTap()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-400/40 text-white font-bold text-sm transition-all active:scale-95"
            >
              Pilih Akun Demo & Eksplorasi
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-slate-500 dark:text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm">
              DT
            </div>
            <div>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">DOSA & TOBAT™</span>
              <p className="text-[11px] text-slate-400">© {new Date().getFullYear()} Yayasan Hijrah Sunnah. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-semibold flex-wrap">
            <Link to="/app" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400 text-emerald-700 dark:text-emerald-400 font-bold">Buka Dashboard</Link>
            <Link to="/direktori" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400">Direktori Dosa</Link>
            <Link to="/sos" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400">Mode SOS</Link>
            <Link to="/taubat" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400">Panduan Taubat</Link>
            <Link to="/dzikir" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400">Tasbih</Link>
            <Link to="/admin" onClick={() => soundFx.playTap()} className="hover:text-emerald-700 dark:hover:text-emerald-400 text-indigo-600">Admin Console</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
