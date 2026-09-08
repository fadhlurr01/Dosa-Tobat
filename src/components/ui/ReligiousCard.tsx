import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Sparkles, Heart, Quote, Volume2, Square, Loader2, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { resolveIslamicAudio } from '../../lib/quranAudio';

export interface ReligiousCardProps {
  key?: React.Key;
  type: 'AYAT' | 'HADIS' | 'DOA' | 'NASEHAT' | string;
  title?: string;
  arabic?: string;
  latin?: string;
  translation?: string;
  reference?: string;
  audioUrl?: string;
  reciter?: string;
  className?: string;
}

export default function ReligiousCard({ 
  type, 
  title, 
  arabic, 
  latin, 
  translation, 
  reference, 
  audioUrl: customAudioUrl,
  reciter: customReciter,
  className = '' 
}: ReligiousCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<any>(null);

  // Auto-detect Quran or authentic Hadith Dua audio URL from reference/title/arabic
  const detectedAudio = resolveIslamicAudio(reference, title, arabic);
  const finalAudioUrl = customAudioUrl || detectedAudio?.audioUrl;
  const reciterLabel = customReciter || detectedAudio?.reciterName || 'Lafaz Arab (Murottal)';

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const clearTimer = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const stopAllAudio = () => {
    clearTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setAudioProgress(0);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAllAudio();
      return;
    }

    const primaryUrl = finalAudioUrl;
    const fallbackUrl = detectedAudio?.fallbackAudioUrl || './audio/doa/istighfar_taubat.mp3';

    const playAudioFile = (urlToPlay: string, isRetry: boolean = false) => {
      stopAllAudio();
      setIsLoadingAudio(true);

      const audio = new Audio(urlToPlay);
      audioRef.current = audio;

      audio.oncanplay = () => {
        setIsLoadingAudio(false);
      };

      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoadingAudio(false);
      };

      audio.ontimeupdate = () => {
        if (audio.duration) {
          const prog = (audio.currentTime / audio.duration) * 100;
          setAudioProgress(prog);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setAudioProgress(0);
      };

      audio.onerror = () => {
        if (!isRetry && fallbackUrl && fallbackUrl !== urlToPlay) {
          console.log('[ReligiousCard] Switching to fallback audio:', fallbackUrl);
          playAudioFile(fallbackUrl, true);
        } else {
          setIsLoadingAudio(false);
          fallbackSpeechSynthesis();
        }
      };

      audio.play().catch((err) => {
        console.log('[ReligiousCard] Play promise caught:', err?.message);
        if (!isRetry && fallbackUrl && fallbackUrl !== urlToPlay) {
          playAudioFile(fallbackUrl, true);
        } else {
          setIsLoadingAudio(false);
          fallbackSpeechSynthesis();
        }
      });
    };

    if (primaryUrl) {
      playAudioFile(primaryUrl);
    } else {
      fallbackSpeechSynthesis();
    }
  };

  const fallbackSpeechSynthesis = () => {
    if (!arabic || typeof window === 'undefined') return;

    if (window.speechSynthesis) {
      // Check if browser has Arabic voices installed
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('Arabic'));

      if (arabicVoice || voices.length > 0) {
        stopAllAudio();
        setIsPlaying(true);
        setAudioProgress(0);

        const utterance = new SpeechSynthesisUtterance(arabic);
        if (arabicVoice) utterance.voice = arabicVoice;
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;

        const estimatedDurationMs = Math.max(2500, arabic.length * 110);
        const startTime = Date.now();

        progressIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(99, (elapsed / estimatedDurationMs) * 100);
          setAudioProgress(progress);
        }, 50);

        utterance.onend = () => {
          clearTimer();
          setAudioProgress(100);
          setTimeout(() => {
            setIsPlaying(false);
            setAudioProgress(0);
          }, 300);
        };

        utterance.onerror = () => {
          clearTimer();
          playUniversalTaubatAudio();
        };

        window.speechSynthesis.speak(utterance);
        return;
      }
    }

    // If SpeechSynthesis is unavailable or missing Arabic voice, play the authentic Taubat audio
    playUniversalTaubatAudio();
  };

  const playUniversalTaubatAudio = () => {
    stopAllAudio();
    setIsLoadingAudio(true);
    const audio = new Audio('./audio/doa/istighfar_taubat.mp3');
    audioRef.current = audio;
    audio.onplay = () => {
      setIsPlaying(true);
      setIsLoadingAudio(false);
    };
    audio.ontimeupdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.onended = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };
    audio.play().catch(() => {
      setIsPlaying(false);
      setIsLoadingAudio(false);
    });
  };

  const theme = {
    AYAT: {
      border: 'border-slate-200/80 dark:border-slate-800',
      bg: 'bg-slate-50/60 dark:bg-slate-950/40',
      icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      textAccent: 'text-emerald-700 dark:text-emerald-400',
      bgAccent: 'bg-slate-100 dark:bg-slate-800'
    },
    HADIS: {
      border: 'border-slate-200/80 dark:border-slate-800',
      bg: 'bg-slate-50/60 dark:bg-slate-950/40',
      icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      textAccent: 'text-amber-700 dark:text-amber-400',
      bgAccent: 'bg-slate-100 dark:bg-slate-800'
    },
    DOA: {
      border: 'border-slate-200/80 dark:border-slate-800',
      bg: 'bg-slate-50/60 dark:bg-slate-950/40',
      icon: <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      textAccent: 'text-indigo-700 dark:text-indigo-400',
      bgAccent: 'bg-slate-100 dark:bg-slate-800'
    },
    DEFAULT: {
      border: 'border-slate-200/80 dark:border-slate-800',
      bg: 'bg-slate-50/60 dark:bg-slate-950/40',
      icon: <Quote className="w-5 h-5 text-slate-600 dark:text-slate-400" />,
      textAccent: 'text-slate-700 dark:text-slate-400',
      bgAccent: 'bg-slate-100 dark:bg-slate-800'
    }
  };

  const currentTheme = theme[type as keyof typeof theme] || theme.DEFAULT;
  const hasAudioSupport = Boolean(finalAudioUrl || arabic);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Watermark Icon */}
      <div className={`absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.03] dark:opacity-[0.02] rotate-12 pointer-events-none`}>
        <Quote className="w-48 h-48" />
      </div>

      <div className="p-6 sm:p-8 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTheme.bgAccent}`}>
              {currentTheme.icon}
            </span>
            <div>
              {title && (
                <h3 className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {title}
                </h3>
              )}
              <span className={`text-[10px] font-bold uppercase tracking-widest ${currentTheme.textAccent}`}>
                {type}
              </span>
            </div>
          </div>

          {/* Audio Reciter Tag */}
          {hasAudioSupport && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
              <Music2 className="w-3 h-3 text-emerald-500" />
              <span className="hidden sm:inline">{reciterLabel}</span>
              <span className="sm:hidden">Audio Murottal</span>
            </div>
          )}
        </div>

        {/* Clean Arabic Display without any gradient bug */}
        {arabic ? (
          <div className={`mb-6 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border transition-all duration-300 relative group shadow-sm ${
            isPlaying 
              ? 'border-emerald-500/50 dark:border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-md' 
              : 'border-slate-200/90 dark:border-slate-800/90'
          }`}>
            {/* Audio Playing Equalizer Header */}
            {isPlaying && (
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms' }} />
                  </div>
                  <span className="text-[11px] font-bold tracking-wide">
                    Tilawah Sedang Berjalan ({Math.round(audioProgress)}%)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                  {reciterLabel}
                </span>
              </div>
            )}

            {/* Clear Arabic Text */}
            <p 
              dir="rtl" 
              className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-right font-normal tracking-wide text-slate-800 dark:text-slate-100 pb-12 sm:pb-4 leading-loose select-text drop-shadow-2xs"
            >
              {arabic}
            </p>

            {/* Audio Progress Line (Green Glowing Progress Bar) */}
            {isPlaying && (
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-emerald-500 dark:bg-emerald-400 h-full transition-all duration-150 rounded-full shadow-sm shadow-emerald-500/50" 
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            )}

            {/* Interactive Audio Button */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 z-20">
              <button 
                onClick={toggleAudio}
                disabled={isLoadingAudio}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 ${currentTheme.textAccent} hover:shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 cursor-pointer`}
                title={isPlaying ? "Berhenti" : "Dengarkan Audio Murottal"}
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
                ) : isPlaying ? (
                  <Square className="w-4 h-4 fill-current animate-pulse text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span className="text-xs font-bold pr-1">
                  {isLoadingAudio ? "Memuat..." : isPlaying ? "Hentikan" : "Putar Audio"}
                </span>
              </button>
            </div>
          </div>
        ) : finalAudioUrl && (
          /* Standalone Audio Bar when arabic text is not provided but audioUrl is resolved */
          <div className="mb-6 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={toggleAudio}
                disabled={isLoadingAudio}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                title={isPlaying ? "Hentikan" : "Putar Audio"}
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Square className="w-4 h-4 fill-current animate-pulse text-rose-200" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {isPlaying ? `Sedang Memutar Tilawah (${Math.round(audioProgress)}%)` : "Dengarkan Tilawah Ayat / Doa"}
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {reciterLabel}
                </span>
              </div>
            </div>

            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3 pr-2">
                <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms' }} />
              </div>
            )}
          </div>
        )}
        
        {(latin || translation || reference) && (
          <div className="space-y-3 pt-1">
            {latin && (
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
                {latin}
              </p>
            )}
            {translation && (
              <p className="text-slate-800 dark:text-slate-200 font-serif italic text-lg sm:text-xl leading-relaxed">
                "{translation}"
              </p>
            )}
            {reference && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textAccent}`}>
                  — {reference}
                </p>
                {finalAudioUrl && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    Audio CDN Resmi: {reciterLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
