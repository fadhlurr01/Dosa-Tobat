import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SINS } from '../data/mockData';
import { useStore } from '../store/useStore';
import { 
  ShieldAlert, 
  HeartHandshake, 
  ArrowLeft, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  PenSquare,
  ChevronLeft,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReligiousCard from '../components/ui/ReligiousCard';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

export default function SinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startJourney, journeys, bookmarks, toggleBookmark } = useStore();
  const [copied, setCopied] = useState(false);
  
  const currentIndex = SINS.findIndex(s => s.id === id);
  const sin = currentIndex !== -1 ? SINS[currentIndex] : undefined;
  const prevSin = currentIndex > 0 ? SINS[currentIndex - 1] : null;
  const nextSin = currentIndex !== -1 && currentIndex < SINS.length - 1 ? SINS[currentIndex + 1] : null;

  const isActive = sin ? journeys[sin.id] : false;
  const isBookmarked = sin ? (bookmarks || []).includes(sin.id) : false;

  // Scroll to top when topic changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft' && prevSin) {
        soundFx.playTap();
        navigate(`/dosa/${prevSin.id}`);
      } else if (e.key === 'ArrowRight' && nextSin) {
        soundFx.playTap();
        navigate(`/dosa/${nextSin.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSin, nextSin, navigate]);

  if (!sin) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-slate-600 dark:text-slate-400 font-medium">Topik direktori tidak ditemukan.</p>
        <Link 
          to="/direktori"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Direktori
        </Link>
      </div>
    );
  }

  const handleStart = () => {
    soundFx.playSuccess();
    triggerConfetti();
    startJourney(sin.id);
    navigate('/perjalanan');
  };

  const handleShare = () => {
    soundFx.playCheck();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      key={sin.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12 max-w-3xl mx-auto"
    >
      {/* Top Navigation Bar: Previous (Kiri), Direktori (Tengah), Next (Kanan) */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2">
        {/* Tombol Kiri (Preview / Sebelumnya) */}
        {prevSin ? (
          <button
            onClick={() => {
              soundFx.playTap();
              navigate(`/dosa/${prevSin.id}`);
            }}
            className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer min-w-0 max-w-[130px] sm:max-w-[200px]"
            title={`Sebelumnya: ${prevSin.name}`}
          >
            <ChevronLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <div className="flex flex-col items-start min-w-0 text-left">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 leading-tight">Sebelumnya</span>
              <span className="truncate text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 w-full block">
                {prevSin.name}
              </span>
            </div>
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed text-[11px] font-semibold"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Awal Daftar</span>
          </button>
        )}

        {/* Tombol Tengah (Direct Direktori & Posisi Index) */}
        <Link
          to="/direktori"
          onClick={() => soundFx.playTap()}
          className="flex flex-col items-center justify-center px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-center shrink-0 cursor-pointer"
          title="Buka Semua Direktori"
        >
          <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <LayoutGrid className="w-3.5 h-3.5" /> Direktori
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
            {currentIndex + 1} dari {SINS.length}
          </span>
        </Link>

        {/* Tombol Kanan (Direct Selanjutnya) */}
        {nextSin ? (
          <button
            onClick={() => {
              soundFx.playTap();
              navigate(`/dosa/${nextSin.id}`);
            }}
            className="group flex items-center justify-end gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer min-w-0 max-w-[130px] sm:max-w-[200px]"
            title={`Selanjutnya: ${nextSin.name}`}
          >
            <div className="flex flex-col items-end min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 leading-tight">Selanjutnya</span>
              <span className="truncate text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 w-full block">
                {nextSin.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed text-[11px] font-semibold"
          >
            <span className="hidden sm:inline">Akhir Daftar</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>

      {/* Sub Header Bar: Status Badge, Bookmark & Share */}
      <div className="flex items-center justify-between">
        <Link 
          to="/direktori" 
          className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Kembali ke Daftar Direktori
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playTap();
              toggleBookmark(sin.id);
            }}
            className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600'
            }`}
            title="Simpan ke Favorit"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Salin Tautan"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {sin.category}
          </span>
          {isActive && (
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Perjalanan Aktif
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#065F46] dark:text-emerald-400 tracking-tight leading-tight">
          {sin.name}
        </h1>

        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/40">
          <p className="text-slate-700 dark:text-emerald-200 leading-relaxed text-xs sm:text-sm">{sin.definition}</p>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        <Link 
          to={`/sos?sin=${sin.id}`}
          onClick={() => soundFx.playTap()}
          className="flex flex-col items-center justify-center p-3.5 sm:p-4 bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all active:scale-98 text-center shadow-xs"
        >
          <ShieldAlert className="w-5 h-5 mb-1 text-rose-600 dark:text-rose-400" />
          <span className="text-xs font-bold uppercase tracking-wider">Sedang Tergoda</span>
          <span className="text-[10px] text-rose-500/80 dark:text-rose-400/70">SOS 90-Detik</span>
        </Link>

        <Link 
          to={`/taubat-guide/${sin.id}`}
          onClick={() => soundFx.playTap()}
          className="flex flex-col items-center justify-center p-3.5 sm:p-4 bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all active:scale-98 text-center shadow-xs"
        >
          <HeartHandshake className="w-5 h-5 mb-1 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider">Baru Terjatuh</span>
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/70">Panduan Taubat</span>
        </Link>

        <Link 
          to="/jurnal"
          onClick={() => soundFx.playTap()}
          className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-98 text-center shadow-xs"
        >
          <PenSquare className="w-5 h-5 mb-1 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Catat Jurnal</span>
          <span className="text-[10px] text-slate-400">Evaluasi Diri</span>
        </Link>
      </div>

      {!isActive && (
        <button 
          onClick={handleStart} 
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-700/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white" />
          Mulai Perjalanan Istiqomah Topik Ini
        </button>
      )}

      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-lg">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2>Dasar Agama</h2>
          </div>
          <ReligiousCard 
            type={sin.source.toLowerCase().startsWith('qs') || sin.source.toLowerCase().startsWith('q.s') ? 'AYAT' : 'HADIS'}
            title="Dalil & Landasan Syar'i"
            translation={sin.reason}
            reference={sin.source}
          />
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2>Tanda & Pemicu</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-medium text-slate-800 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">Tanda Awal</h3>
              <ul className="space-y-2">
                {sin.signs.map((sign, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-2 flex-shrink-0" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-medium text-slate-800 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">Pemicu Umum</h3>
              <ul className="space-y-2">
                {sin.triggers.map((trigger, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 mr-2 flex-shrink-0" />
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2>Cara Mencegah</h2>
          </div>
          <div className="bg-emerald-700 dark:bg-emerald-900/40 dark:border dark:border-emerald-500/20 text-white p-5 rounded-2xl shadow-sm">
            <ul className="space-y-3">
              {sin.prevention.map((prev, i) => (
                <li key={i} className="flex items-start text-sm md:text-base leading-relaxed dark:text-emerald-100">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500/30 text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {prev}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {sin.doa && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-lg">
              <Heart className="w-5 h-5 text-rose-500" />
              <h2>Panduan Doa</h2>
            </div>
            <ReligiousCard 
              type="DOA"
              arabic={sin.doa.arabic}
              latin={sin.doa.latin}
              translation={sin.doa.translation}
              reference={sin.doa.source}
            />
          </section>
        )}

        {/* Bottom Fast Navigation (Sebelumnya & Selanjutnya) */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {prevSin ? (
            <button
              onClick={() => {
                soundFx.playTap();
                navigate(`/dosa/${prevSin.id}`);
              }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:-translate-x-1 transition-transform shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Topik Sebelumnya</span>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">{prevSin.name}</p>
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-3 opacity-60">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Awal Direktori</span>
                <p className="text-xs text-slate-500">Ini adalah topik pertama</p>
              </div>
            </div>
          )}

          {nextSin ? (
            <button
              onClick={() => {
                soundFx.playTap();
                navigate(`/dosa/${nextSin.id}`);
              }}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all text-right cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Topik Selanjutnya</span>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">{nextSin.name}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 opacity-60">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Akhir Direktori</span>
                <p className="text-xs text-slate-500">Ini adalah topik terakhir</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
