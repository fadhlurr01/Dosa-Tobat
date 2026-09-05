import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, XCircle, ArrowLeft, Volume2, VolumeX, Sparkles, Music2, Square, Play, Pause, Loader2, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { useStore } from '../store/useStore';
import ReligiousCard from '../components/ui/ReligiousCard';

const SOS_CALMING_PLAYLIST = [
  {
    id: 'rad-28',
    title: 'QS. Ar-Ra\'d: 28 (Penenang Jiwa)',
    arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/013028.mp3',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  {
    id: 'araf-200',
    title: 'QS. Al-A\'raf: 200 (Perlindungan dari Syaitan)',
    arabic: 'وَإِمَّا يَنْزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ ۚ إِنَّهُ سَمِيعٌ عَلِيمٌ',
    translation: 'Dan jika syaitan mengganggumu dengan suatu godaan, maka mohonlah perlindungan kepada Allah.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/007200.mp3',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  {
    id: 'kursi',
    title: 'QS. Al-Baqarah: 255 (Ayat Kursi)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    translation: 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya.',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  {
    id: 'sayyidul-istighfar',
    title: 'Sayyidul Istighfar (Penghulu Istighfar)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau...',
    audioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/79hm.mp3',
    reciter: 'Syaikh Arab (Hisnul Muslim)'
  }
];

export default function SosMode() {
  const navigate = useNavigate();
  const { soundEnabled, toggleSound } = useStore();
  const [step, setStep] = useState(1);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Tarik Napas' | 'Tahan' | 'Hembuskan'>('Tarik Napas');
  
  // Calming Arabic Audio Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = SOS_CALMING_PLAYLIST[currentTrackIndex];

  // Stop all audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsLoadingAudio(true);
    const track = SOS_CALMING_PLAYLIST[index];
    const audio = new Audio(track.audioUrl);
    audioRef.current = audio;

    audio.oncanplay = () => {
      setIsLoadingAudio(false);
    };

    audio.onplay = () => {
      setIsAudioPlaying(true);
      setIsLoadingAudio(false);
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      // Auto play next track in loop
      const nextIndex = (index + 1) % SOS_CALMING_PLAYLIST.length;
      setCurrentTrackIndex(nextIndex);
      playTrack(nextIndex);
    };

    audio.onerror = () => {
      setIsLoadingAudio(false);
      setIsAudioPlaying(false);
    };

    audio.play().catch(() => {
      setIsLoadingAudio(false);
      setIsAudioPlaying(false);
    });
  };

  const toggleArabicAudio = () => {
    soundFx.playTap();
    if (isAudioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsAudioPlaying(false);
      setIsLoadingAudio(false);
    } else {
      playTrack(currentTrackIndex);
    }
  };

  const handleNextTrack = () => {
    soundFx.playTap();
    const nextIndex = (currentTrackIndex + 1) % SOS_CALMING_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    if (isAudioPlaying) {
      playTrack(nextIndex);
    }
  };

  const steps = [
    {
      title: "Berhenti Sejenak.",
      desc: "Jangan turuti dorongan sesaat ini. Beri jeda pikiranmu selama 10 detik.",
      tip: "Godaan syahwat atau emosi memuncak dalam 90 detik pertama lalu akan mereda jika tidak disuapi."
    },
    {
      title: "Jauhkan Diri dari Pemicu.",
      desc: "Tutup layar, letakkan ponsel, kunci pintu, atau segera tinggalkan ruangan ini.",
      tip: "Memutus akses fisik adalah 80% kemenangan pencegahan maksiat."
    },
    {
      title: "Latihan Pernapasan Ketenangan (4-4-4).",
      desc: "Tarik napas dalam 4 detik, tahan 4 detik, dan hembuskan perlahan 4 detik.",
      isInteractiveBreath: true,
      tip: "Oksigen mengalirkan ketenangan ke otak prefrontal untuk mengembalikan kendali akal sehat."
    },
    {
      title: "Membaca Doa Perlindungan & Ayat Penenang Jiwa",
      desc: "Lantunkan ayat perlindungan dari godaan syaitan berikut ini:",
      tip: "Memohon perlindungan dari tipu daya setan yang membisikkan kepalsuan kenikmatan.",
      verse: {
        type: 'AYAT' as const,
        title: 'Perlindungan dari Godaan Syaitan',
        arabic: 'وَإِمَّا يَنْزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ إِنَّهُ سَمِيعٌ عَلِيمٌ',
        latin: 'Wa immaa yanzaghonnaka minasy syaithooni nazghun fasta\'idz billaah, innahuu samii\'un \'aliim.',
        translation: 'Dan jika syaitan mengganggumu dengan suatu godaan, maka mohonlah perlindungan kepada Allah. Sesungguhnya Dialah yang Maha Mendengar lagi Maha Mengetahui.',
        reference: 'QS. Al-A\'raf: 200'
      }
    },
    {
      title: "Ambil Wudhu atau Minum Air Putih.",
      desc: "Segera bangkit, berwudhu dengan air dingin, atau minum segelas air hangat.",
      tip: "Rasulullah ﷺ bersabda: Sesungguhnya amarah/hawa nafsu berasal dari setan, dan setan diciptakan dari api, padamkanlah dengan air wudhu."
    }
  ];

  // Breathing loop effect
  useEffect(() => {
    if (step === 3) {
      setIsBreathing(true);
      const interval = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === 'Tarik Napas') {
            soundFx.playCalm();
            return 'Tahan';
          }
          if (prev === 'Tahan') return 'Hembuskan';
          soundFx.playCalm();
          return 'Tarik Napas';
        });
      }, 4000);

      return () => clearInterval(interval);
    } else {
      setIsBreathing(false);
    }
  }, [step]);

  const handleNext = () => {
    soundFx.playTap();
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => {
    soundFx.playTap();
    if (step > 1) setStep(step - 1);
  };

  const handleSuccess = () => {
    soundFx.playSuccess();
    triggerConfetti();
    navigate('/app');
  };

  const handleFail = () => {
    soundFx.playTap();
    navigate('/taubat');
  };

  const currentStepData = steps[step - 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-b from-rose-700 via-rose-800 to-rose-950 dark:from-slate-950 dark:via-rose-950 dark:to-slate-950 z-[100] flex flex-col p-4 sm:p-6 overflow-y-auto safe-area-top safe-area-bottom"
    >
      {/* Top Bar */}
      <div className="max-w-lg mx-auto w-full flex items-center justify-between text-white/80 pb-3">
        <button
          onClick={() => {
            soundFx.playTap();
            navigate(-1);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Keluar
        </button>

        <span className="text-xs font-bold uppercase tracking-widest bg-rose-900/60 px-3 py-1 rounded-full border border-white/20">
          Mode Darurat SOS
        </span>

        {/* Right Audio Button (Toggles Calming Arabic Tilawah / Murottal) */}
        <button
          onClick={toggleArabicAudio}
          className={`p-2 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md ${
            isAudioPlaying
              ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-400/30'
              : 'bg-white/15 text-white hover:bg-white/25 hover:scale-105'
          }`}
          title={isAudioPlaying ? 'Hentikan Audio Arab Penenang' : 'Putar Audio Arab Penenang Jiwa (Syaikh Misyari Al-Afasy)'}
        >
          {isLoadingAudio ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : isAudioPlaying ? (
            <div className="flex items-center gap-0.5 px-0.5">
              <span className="w-1 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
              <span className="w-1 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
              <span className="w-1 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-300" />
          )}
        </button>
      </div>

      {/* Soothing Arabic Audio Banner Player Bar */}
      <div className="max-w-lg mx-auto w-full mb-2">
        <div className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-md ${
          isAudioPlaying
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100 backdrop-blur-md'
            : 'bg-black/30 border-white/15 text-white/90 backdrop-blur-sm'
        }`}>
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              onClick={toggleArabicAudio}
              disabled={isLoadingAudio}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
              title={isAudioPlaying ? 'Jeda Audio' : 'Putar Audio'}
            >
              {isLoadingAudio ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isAudioPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold truncate text-white">
                  {currentTrack.title}
                </h4>
              </div>
              <p className="text-[10px] text-white/70 truncate">
                {currentTrack.reciter}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAudioPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <button
              onClick={handleNextTrack}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Ganti Ayat Penenang Berikutnya"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Audio Progress Bar */}
        {isAudioPlaying && audioProgress > 0 && (
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1.5">
            <div 
              className="bg-emerald-400 h-full transition-all duration-200" 
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full text-center space-y-6 my-auto py-4">
        
        {/* Breathing Animation or Emergency Icon */}
        {currentStepData.isInteractiveBreath ? (
          <div className="relative py-4">
            <motion.div 
              animate={{
                scale: breathPhase === 'Tarik Napas' ? 1.4 : breathPhase === 'Tahan' ? 1.4 : 1,
                opacity: breathPhase === 'Tarik Napas' ? 1 : 0.85
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center shadow-2xl backdrop-blur-md mx-auto"
            >
              <div className="text-center text-white">
                <span className="text-xs uppercase tracking-widest block opacity-80">Napas</span>
                <span className="text-sm font-bold">{breathPhase}</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-12 h-12 text-rose-200 animate-pulse" />
            </div>
          </div>
        )}

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === step ? 'w-8 bg-white' : i + 1 < step ? 'w-3 bg-white/60' : 'w-3 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-xl w-full text-left"
          >
            <p className="text-rose-200 font-bold uppercase tracking-widest text-xs">
              Langkah {step} dari {steps.length}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {currentStepData.title}
            </h2>
            <p className="text-sm sm:text-base text-rose-100 whitespace-pre-line leading-relaxed font-medium">
              {currentStepData.desc}
            </p>

            {/* Religious card with audio in SOS */}
            {currentStepData.verse && (
              <div className="mt-4">
                <ReligiousCard
                  type={currentStepData.verse.type}
                  title={currentStepData.verse.title}
                  arabic={currentStepData.verse.arabic}
                  latin={currentStepData.verse.latin}
                  translation={currentStepData.verse.translation}
                  reference={currentStepData.verse.reference}
                />
              </div>
            )}

            {currentStepData.tip && (
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-rose-200/90 text-left flex items-start gap-2 italic">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{currentStepData.tip}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-2">
          {step < steps.length ? (
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button 
                  onClick={handlePrev}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all active:scale-95 text-sm cursor-pointer"
                >
                  Kembali
                </button>
              )}
              <button 
                onClick={handleNext}
                className="flex-1 py-3.5 bg-white text-rose-900 font-extrabold rounded-2xl shadow-xl hover:bg-rose-50 transition-all active:scale-95 text-sm cursor-pointer"
              >
                Langkah Berikutnya →
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-3"
            >
              <button 
                onClick={handleSuccess}
                className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-base cursor-pointer"
              >
                <CheckCircle className="w-5 h-5" />
                Alhamdulillah, Saya Berhasil Bertahan!
              </button>
              <button 
                onClick={handleFail}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 rounded-2xl transition-all active:scale-95 text-xs cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                Saya Baru Saja Terjatuh (Buka Panduan Taubat)
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
