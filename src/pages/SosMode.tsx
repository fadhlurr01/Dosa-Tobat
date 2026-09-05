import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, XCircle, ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { useStore } from '../store/useStore';
import ReligiousCard from '../components/ui/ReligiousCard';

export default function SosMode() {
  const navigate = useNavigate();
  const { soundEnabled, toggleSound } = useStore();
  const [step, setStep] = useState(1);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Tarik Napas' | 'Tahan' | 'Hembuskan'>('Tarik Napas');

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
      <div className="max-w-lg mx-auto w-full flex items-center justify-between text-white/80 pb-4">
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

        <span className="text-xs font-bold uppercase tracking-widest bg-rose-900/60 px-3 py-1 rounded-full border border-rose-500/30">
          Mode Darurat SOS
        </span>

        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-white/50" />}
        </button>
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
