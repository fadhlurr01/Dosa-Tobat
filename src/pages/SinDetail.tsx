import { useState } from 'react';
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
  PenSquare 
} from 'lucide-react';
import { motion } from 'motion/react';
import ReligiousCard from '../components/ui/ReligiousCard';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

export default function SinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startJourney, journeys, bookmarks, toggleBookmark } = useStore();
  const [copied, setCopied] = useState(false);
  
  const sin = SINS.find(s => s.id === id);
  const isActive = journeys[id || ''];
  const isBookmarked = (bookmarks || []).includes(id || '');

  if (!sin) {
    return <div className="p-8 text-center dark:text-slate-400">Topik tidak ditemukan.</div>;
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Direktori
        </button>

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
            type="AYAT"
            translation={sin.source}
            reference={sin.reason}
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
      </div>
    </motion.div>
  );
}
