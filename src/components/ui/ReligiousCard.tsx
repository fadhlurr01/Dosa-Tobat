import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Sparkles, Heart, Quote, Volume2, Square, Loader2, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { parseQuranReference } from '../../lib/quranAudio';

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

  // Auto-detect Quran audio URL from reference if not explicitly supplied
  const detectedQuran = parseQuranReference(reference);
  const finalAudioUrl = customAudioUrl || detectedQuran?.audioUrl;
  const reciterLabel = customReciter || detectedQuran?.reciterName || 'Lafaz Arab Asli';

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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

    // 1. Play real MP3 Audio (EveryAyah / Quran.com CDN / Custom URL)
    if (finalAudioUrl) {
      stopAllAudio();
      setIsLoadingAudio(true);

      const audio = new Audio(finalAudioUrl);
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
          setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setAudioProgress(0);
      };

      audio.onerror = () => {
        // Fallback to SpeechSynthesis if MP3 fails to load
        setIsLoadingAudio(false);
        fallbackSpeechSynthesis();
      };

      audio.play().catch(() => {
        setIsLoadingAudio(false);
        fallbackSpeechSynthesis();
      });
      return;
    }

    // 2. Fallback to Web Speech Synthesis for Hadith / general Arabic without MP3
    fallbackSpeechSynthesis();
  };

  const fallbackSpeechSynthesis = () => {
    if (!arabic || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const theme = {
    AYAT: {
      border: 'border-emerald-200 dark:border-emerald-900/50',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      gradient: 'from-emerald-600 via-emerald-400 to-emerald-600',
      icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      textAccent: 'text-emerald-700 dark:text-emerald-400',
      bgAccent: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    HADIS: {
      border: 'border-amber-200 dark:border-amber-900/50',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      gradient: 'from-amber-600 via-amber-400 to-amber-600',
      icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      textAccent: 'text-amber-700 dark:text-amber-400',
      bgAccent: 'bg-amber-100 dark:bg-amber-900/30'
    },
    DOA: {
      border: 'border-indigo-200 dark:border-indigo-900/50',
      bg: 'bg-indigo-50/50 dark:bg-indigo-950/20',
      gradient: 'from-indigo-600 via-indigo-400 to-indigo-600',
      icon: <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      textAccent: 'text-indigo-700 dark:text-indigo-400',
      bgAccent: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    DEFAULT: {
      border: 'border-slate-200 dark:border-slate-800',
      bg: 'bg-slate-50/50 dark:bg-slate-950/20',
      gradient: 'from-slate-600 via-slate-400 to-slate-600',
      icon: <Quote className="w-5 h-5 text-slate-600 dark:text-slate-400" />,
      textAccent: 'text-slate-700 dark:text-slate-400',
      bgAccent: 'bg-slate-100 dark:bg-slate-900/30'
    }
  };

  const currentTheme = theme[type as keyof typeof theme] || theme.DEFAULT;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-3xl overflow-hidden border ${currentTheme.border} bg-white dark:bg-slate-900 shadow-sm ${className}`}
    >
      {/* Top Gradient Border */}
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${currentTheme.gradient}`}></div>
      
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
          {finalAudioUrl && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              <Music2 className="w-3 h-3 text-emerald-500" />
              <span>{reciterLabel}</span>
            </div>
          )}
        </div>

        {arabic && (
          <div className={`mb-6 p-6 sm:p-8 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} backdrop-blur-sm relative group transition-all`}>
            {/* Audio Playing Equalizer Header */}
            {isPlaying && (
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/50 dark:border-emerald-800/40 text-xs font-semibold text-emerald-700 dark:text-emerald-400 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms' }} />
                  </div>
                  <span className="text-[11px] font-bold tracking-wide">Memutar Murottal Resmi</span>
                </div>
                <span className="text-[10px] opacity-80">{reciterLabel}</span>
              </div>
            )}

            <p 
              dir="rtl" 
              className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-right leading-relaxed text-slate-800 dark:text-slate-100 drop-shadow-sm pb-10 sm:pb-2"
              style={{ lineHeight: '2.2' }}
            >
              {arabic}
            </p>

            {/* Audio Progress Line if playing */}
            {isPlaying && audioProgress > 0 && (
              <div className="w-full bg-emerald-200/50 dark:bg-emerald-950 h-1 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-emerald-600 dark:bg-emerald-400 h-full transition-all duration-200" 
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            )}

            {/* Interactive Audio Button */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 z-20">
              <button 
                onClick={toggleAudio}
                disabled={isLoadingAudio}
                className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-slate-800 shadow-md border ${currentTheme.border} ${currentTheme.textAccent} hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 cursor-pointer`}
                title={isPlaying ? "Berhenti" : "Dengarkan Audio Murottal Asli"}
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
        )}
        
        {(latin || translation || reference) && (
          <div className="px-2 space-y-4">
            {latin && (
              <p className="italic text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-l-2 border-emerald-200 dark:border-emerald-800/50 pl-3">
                {latin}
              </p>
            )}
            {translation && (
              <p className="text-slate-600 dark:text-slate-300 font-serif italic text-lg sm:text-xl leading-relaxed">
                "{translation}"
              </p>
            )}
            {reference && (
              <div className="flex items-center justify-between pt-1">
                <p className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textAccent}`}>
                  — {reference}
                </p>
                {finalAudioUrl && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    Audio CDN: Bebas Royalti / Resmi
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
