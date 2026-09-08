import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, XCircle, ArrowLeft, Volume2, VolumeX, Sparkles, Music2, Square, Play, Pause, Loader2, SkipForward, Heart } from 'lucide-react';
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
      className="fixed inset-0 bg-gradient-to-b from-rose-900 via-slate-950 to-slate-950 text-white z-[100] flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto safe-area-top safe-area-bottom"
    >
      {/* Top Header Navbar - Generous & Balanced */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between gap-4 py-2 shrink-0">
        {/* Exit Button */}
        <button
          onClick={() => {
            soundFx.playTap();
            navigate(-1);
          }}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar</span>
        </button>

        {/* SOS Center Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/40 backdrop-blur-md shadow-lg shadow-rose-950/30">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase">
            Mode Darurat SOS
          </span>
        </div>

        {/* Sound FX Toggle */}
        <button
          onClick={() => {
            toggleSound();
            soundFx.playTap();
          }}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title={soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-white/50" />}
        </button>
      </header>

      {/* Floating Calming Arabic Audio Player Bar - Spacious & Premium */}
      <section className="max-w-xl mx-auto w-full mt-4 mb-6">
        <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl ${
          isAudioPlaying
            ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border-emerald-500/40 ring-1 ring-emerald-500/20'
            : 'bg-white/10 border-white/15 hover:bg-white/15'
        }`}>
          <div className="flex items-center justify-between gap-3 sm:gap-4 relative z-10">
            {/* Play/Pause Button */}
            <button
              onClick={toggleArabicAudio}
              disabled={isLoadingAudio}
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer ${
                isAudioPlaying
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
              }`}
              title={isAudioPlaying ? 'Jeda Audio' : 'Putar Audio Penenang'}
            >
              {isLoadingAudio ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isAudioPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Track Info */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center gap-2">
                <Music2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-extrabold text-white truncate tracking-tight">
                  {currentTrack.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/70">
                <span className="truncate">{currentTrack.reciter}</span>
                <span className="opacity-40">•</span>
                <span className="text-emerald-300 font-medium shrink-0">Penenang Jiwa</span>
              </div>
            </div>

            {/* Equalizer & Skip Button */}
            <div className="flex items-center gap-2.5 shrink-0">
              {isAudioPlaying && (
                <div className="hidden sm:flex items-end gap-1 h-3.5 px-2">
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3.5" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-4" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms' }} />
                </div>
              )}

              <button
                onClick={handleNextTrack}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                title="Ganti Ayat Penenang Berikutnya"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Integrated Slim Progress Bar */}
          {isAudioPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
              <div 
                className="bg-emerald-400 h-full transition-all duration-150 rounded-full shadow-sm shadow-emerald-400/80" 
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full text-center space-y-6 my-auto py-4">
        
        {/* Breathing Animation with Concentric Rings and Heart Icon */}
        {currentStepData.isInteractiveBreath ? (
          <div className="relative py-8 my-2 flex items-center justify-center">
            {/* Outer Concentric Ripple Ring 1 */}
            <motion.div
              animate={{
                scale: breathPhase === 'Tarik Napas' ? 1.25 : breathPhase === 'Tahan' ? 1.25 : 1,
                opacity: breathPhase === 'Tarik Napas' ? 0.9 : breathPhase === 'Tahan' ? 0.9 : 0.4
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-56 h-56 rounded-full border border-emerald-500/30 flex items-center justify-center absolute pointer-events-none"
            />

            {/* Outer Concentric Ripple Ring 2 */}
            <motion.div
              animate={{
                scale: breathPhase === 'Tarik Napas' ? 1.15 : breathPhase === 'Tahan' ? 1.15 : 1,
                opacity: breathPhase === 'Tarik Napas' ? 0.8 : breathPhase === 'Tahan' ? 0.8 : 0.5
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-44 h-44 rounded-full border border-emerald-400/40 bg-emerald-950/20 flex items-center justify-center absolute pointer-events-none"
            />

            {/* Central Solid Calming Circle with Heart Icon */}
            <motion.div 
              animate={{
                scale: breathPhase === 'Tarik Napas' ? 1.08 : breathPhase === 'Tahan' ? 1.08 : 1,
                boxShadow: breathPhase === 'Tahan' 
                  ? '0 0 50px rgba(16, 185, 129, 0.45)' 
                  : '0 0 25px rgba(16, 185, 129, 0.25)'
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-36 h-36 rounded-full bg-[#0d4a3e] border-2 border-emerald-400/60 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md relative z-10"
            >
              <Heart className="w-10 h-10 fill-white/80 text-white/80 mb-1 animate-pulse drop-shadow-md" />
              <span className="text-base font-extrabold text-white tracking-wide leading-tight">
                {breathPhase}
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="relative py-2">
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
