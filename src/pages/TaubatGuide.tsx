import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HeartHandshake, ArrowRight, Check, ArrowLeft, Copy, CheckCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import ReligiousCard from '../components/ui/ReligiousCard';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';

export default function TaubatGuide() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sinId = searchParams.get('sin');
  const { recordRelapse, soundEnabled, toggleSound } = useStore();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      title: "1. Al-Iqla' (Berhenti Total)",
      desc: "Hentikan perbuatan maksiat seketika ini juga tanpa menunda. Jangan buat kompromi 'sekali lagi'.",
      advice: "Berhenti sekarang menyelamatkanmu dari terpatri dan mengerasnya hati."
    },
    {
      title: "2. An-Nadam (Menyesal Sungguh-sungguh)",
      desc: "Akui kelemahan dan dosa di hadapan Allah SWT. Rasulullah ﷺ bersabda: 'Penyesalan adalah hakikat taubat.'",
      advice: "Air mata penyesalan di hadapan Allah mampu memadamkan api neraka."
    },
    {
      title: "3. Al-Istighfar (Memohon Ampunan)",
      desc: "Ucapkan Sayyidul Istighfar atau Astaghfirullahal 'adzim wa atuubu ilaih dengan penuh kerendahan hati.",
      hasDoa: true,
      advice: "Allah Maha Pengampun lagi Maha Penerima Taubat hamba-Nya yang bersujud."
    },
    {
      title: "4. Al-'Azm (Bertekad Kuat Tidak Mengulangi)",
      desc: "Tancapkan tekad bulat di dalam sanubari untuk tidak kembali lagi pada lubang maksiat tersebut selamanya.",
      advice: "Buat batasan pencegahan dan tutup seluruh pintu akses menuju godaan tersebut."
    },
    {
      title: "5. Al-Islah (Perbaiki dengan Amal Kebaikan)",
      desc: "Ikuti keburukan dengan amal sholeh yang menghapusnya (sedekah, shalat taubat 2 rakaat, dzikir, dan minta maaf jika ada hak orang lain).",
      advice: "'Sesungguhnya perbuatan-perbuatan yang baik itu menghapuskan perbuatan-perbuatan yang buruk.' (QS. Hud: 114)"
    }
  ];

  const handleNext = () => {
    soundFx.playTap();
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      soundFx.playSuccess();
      triggerConfetti();
      if (sinId) recordRelapse(sinId);
      setTimeout(() => {
        navigate('/perjalanan');
      }, 500);
    }
  };

  const handlePrev = () => {
    soundFx.playTap();
    if (step > 1) setStep(step - 1);
  };

  const handleCopyDoa = () => {
    soundFx.playCheck();
    navigator.clipboard.writeText(
      "Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa 'abduka wa anaa 'ala 'ahdika wa wa'dika mastatho'tu. A'udzu bika min syarri maa shona'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi dzanbii, faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta."
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 dark:from-slate-950 dark:via-amber-950 dark:to-slate-950 z-[100] flex flex-col p-4 sm:p-6 overflow-y-auto safe-area-top safe-area-bottom"
    >
      {/* Top Header */}
      <div className="max-w-lg mx-auto w-full flex items-center justify-between text-white/80 pb-4">
        <button
          onClick={() => {
            soundFx.playTap();
            navigate(-1);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <span className="text-xs font-bold uppercase tracking-widest bg-amber-900/60 px-3 py-1 rounded-full border border-amber-500/30">
          Panduan Taubat Nasuha
        </span>

        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4 text-white/50" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full space-y-6 my-auto py-4">
        
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto shadow-inner">
              <HeartHandshake className="w-10 h-10 text-amber-100" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Jangan berputus asa. Pintu ampunan selalu terbuka.
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm font-serif italic">
              "Dan Dialah yang menerima taubat dari hamba-hamba-Nya dan memaafkan kesalahan-kesalahan." (QS. Asy-Syura: 25)
            </p>
          </motion.div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-lg shadow-xs">
                  {step}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Rukun Taubat Nasuha
                  </p>
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                    {steps[step - 1].title}
                  </h2>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {steps[step - 1].desc}
              </p>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{steps[step - 1].advice}</span>
              </div>
              
              {steps[step - 1].hasDoa && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Doa Sayyidul Istighfar
                    </span>
                    <button
                      onClick={handleCopyDoa}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Tersalin' : 'Salin Teks Doa'}
                    </button>
                  </div>
                  <ReligiousCard
                    type="DOA"
                    title="Sayyidul Istighfar (Raja Istighfar)"
                    arabic="اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ"
                    latin="Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa 'abduka wa anaa 'ala 'ahdika wa wa'dika mastatho'tu. A'udzu bika min syarri maa shona'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi dzanbii, faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta."
                    translation="Ya Allah, Engkau adalah Tuhanku, tiada Tuhan selain Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu... ampunilah aku karena tiada yang mengampuni dosa selain Engkau."
                    reference="H.R. Bukhari"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 pt-2">
            {step > 1 && (
              <button 
                onClick={handlePrev}
                className="px-4 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all active:scale-95 text-xs"
              >
                Sebelumnya
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-amber-600 dark:bg-amber-600 text-white font-black rounded-2xl shadow-md hover:bg-amber-700 transition-all active:scale-95 text-sm"
            >
              {step < steps.length ? (
                <>Langkah Berikutnya <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Alhamdulillah, Saya Telah Bertaubat <Check className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === step ? 'w-8 bg-white' : i + 1 < step ? 'w-3 bg-white/60' : 'w-3 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
