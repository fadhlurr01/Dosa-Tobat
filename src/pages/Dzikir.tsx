import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Sparkles, CheckCircle2, Volume2, VolumeX, Square, Volume1 } from 'lucide-react';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { useStore } from '../store/useStore';

const DZIKIR_PRESETS = [
  {
    id: 'tasbih',
    title: 'Tasbih',
    arabic: 'سُبْحَانَ اللَّهِ',
    latin: 'Subhanallah',
    translation: 'Maha Suci Allah',
    target: 33,
    virtue: 'Menghapus kesalahan walau sebanyak buih di lautan.'
  },
  {
    id: 'tahmid',
    title: 'Tahmid',
    arabic: 'الْحَمْدُ لِلَّهِ',
    latin: 'Alhamdulillah',
    translation: 'Segala puji bagi Allah',
    target: 33,
    virtue: 'Memenuhi timbangan amal kebaikan di yaumul hisab.'
  },
  {
    id: 'takbir',
    title: 'Takbir',
    arabic: 'اللَّهُ أَكْبَرُ',
    latin: 'Allahu Akbar',
    translation: 'Allah Maha Besar',
    target: 33,
    virtue: 'Mengagungkan kebesaran Allah di atas segalanya.'
  },
  {
    id: 'istighfar',
    title: 'Istighfar Taubat',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ',
    latin: "Astaghfirullahal 'adzim wa atuubu ilaih",
    translation: 'Aku memohon ampun kepada Allah Yang Maha Agung dan aku bertaubat kepada-Nya.',
    target: 100,
    virtue: 'Dibaca Rasulullah ﷺ lebih dari 70 sampai 100 kali sehari.'
  },
  {
    id: 'hauqalah',
    title: 'Hauqalah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Laa haula wa laa quwwata illa billah',
    translation: 'Tiada daya dan upaya kecuali dengan pertolongan Allah.',
    target: 33,
    virtue: 'Salah satu simpanan perbendaharaan surga.'
  },
  {
    id: 'tahlil',
    title: 'Kalimat Tauhid',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: 'Laa ilaha illallah wahdahu laa syarika lah',
    translation: 'Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya.',
    target: 33,
    virtue: 'Dzikir paling utama yang diucapkan para Nabi.'
  }
];

export default function Dzikir() {
  const { soundEnabled, toggleSound } = useStore();
  const [selectedPreset, setSelectedPreset] = useState(DZIKIR_PRESETS[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<number>(33);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalSessionCount, setTotalSessionCount] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleDzikirAudio = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedPreset.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleBeadClick = () => {
    const nextCount = count + 1;
    const nextSessionCount = totalSessionCount + 1;

    setCount(nextCount);
    setTotalSessionCount(nextSessionCount);

    // Haptic vibration feedback for mobile smartphones
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }

    // Audio pitch variation for micro-interaction satisfaction
    const pitch = 1 + (nextCount % 10) * 0.03;
    soundFx.playBead(pitch);

    // Check if target reached
    if (target > 0 && nextCount === target) {
      setIsCompleted(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 40]);
      }
      setTimeout(() => {
        soundFx.playSuccess();
        triggerConfetti();
      }, 100);
    }
  };

  const handleReset = () => {
    soundFx.playTap();
    setCount(0);
    setIsCompleted(false);
  };

  const handleSelectPreset = (preset: typeof DZIKIR_PRESETS[0]) => {
    soundFx.playTap();
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setSelectedPreset(preset);
    setTarget(preset.target);
    setCount(0);
    setIsCompleted(false);
  };

  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-24 max-w-2xl mx-auto"
    >
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight">
            Tasbih & Dzikir Harian
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 font-serif italic">
            Basahi lisan dengan mengingat Allah, tenangkan hati yang gundah.
          </p>
        </div>
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm cursor-pointer"
          title={soundEnabled ? 'Matikan Suara Tasbih' : 'Nyalakan Suara Tasbih'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>
      </header>

      {/* Preset Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {DZIKIR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedPreset.id === preset.id
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400'
            }`}
          >
            <span>{preset.title}</span>
            <span className="text-[10px] opacity-75 font-normal">({preset.target}x)</span>
          </button>
        ))}
      </div>

      {/* Interactive Digital Tasbih Counter Card */}
      <div className="bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 rounded-3xl p-6 sm:p-8 border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl text-center relative overflow-hidden">
        
        {/* Arabic Display */}
        <div className="mb-6 relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 inline-block">
              {selectedPreset.title}
            </span>
            <button
              onClick={toggleDzikirAudio}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
              title="Dengarkan Lafaz Bahasa Arab"
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current text-rose-500 animate-pulse" />
                  <span>Hentikan</span>
                </>
              ) : (
                <>
                  <Volume1 className="w-3.5 h-3.5" />
                  <span>Dengar Lafaz</span>
                </>
              )}
            </button>
          </div>

          <p className="font-arabic text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 py-3 leading-relaxed">
            {selectedPreset.arabic}
          </p>
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 italic">
            "{selectedPreset.latin}"
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {selectedPreset.translation}
          </p>
        </div>

        {/* Big Interactive Counter Button */}
        <div className="my-8 relative flex flex-col items-center justify-center">
          <motion.button
            onClick={handleBeadClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-2xl flex flex-col items-center justify-center cursor-pointer group select-none ring-8 ring-emerald-500/20 active:ring-emerald-500/40 transition-shadow"
          >
            {/* Pulsing ring indicator */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse pointer-events-none" />

            <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold mb-1">
              Ketuk untuk Dzikir
            </span>

            <motion.span
              key={count}
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="text-5xl sm:text-6xl font-black tracking-tight"
            >
              {count}
            </motion.span>

            <span className="text-xs text-emerald-200 font-medium mt-1">
              Target: {target > 0 ? `${target}x` : 'Bebas'}
            </span>
          </motion.button>

          {/* Progress Indicator Arc */}
          <div className="w-full max-w-xs mt-6">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <span>Kemajuan</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
            </div>
          </div>
        </div>

        {/* Target Reached Banner */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Alhamdulillah, Target {target}x Tercapai!</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Semoga dzikirmu menjadi penerang hati dan penggugur dosa.</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shrink-0 cursor-pointer"
              >
                Ulangi
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control toolbar: Target Selection and Reset */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">Target:</span>
            {[33, 99, 100, 0].map((tVal) => (
              <button
                key={tVal}
                onClick={() => {
                  soundFx.playTap();
                  setTarget(tVal);
                  if (tVal > 0 && count >= tVal) setIsCompleted(true);
                  else setIsCompleted(false);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  target === tVal
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {tVal === 0 ? 'Bebas' : `${tVal}x`}
              </button>
            ))}
          </div>

          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Hitungan
          </motion.button>
        </div>
      </div>

      {/* Keutamaan Dzikir Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Keutamaan {selectedPreset.title}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {selectedPreset.virtue}
        </p>
      </div>
    </motion.div>
  );
}
