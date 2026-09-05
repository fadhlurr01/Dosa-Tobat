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

  // Auto-detect Quran or authentic Hadith Dua audio URL from reference/title/arabic
  const detectedAudio = resolveIslamicAudio(reference, title, arabic);
  const finalAudioUrl = customAudioUrl || detectedAudio?.audioUrl;
  const reciterLabel = customReciter || detectedAudio?.reciterName || 'Lafaz Arab Asli';

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
      className={`relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs ${className}`}
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

        {/* Arabic Display with in-card audio button */}
        {arabic ? (
          <div className={`mb-6 p-6 sm:p-8 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm relative group transition-all`}>
            {/* Audio Playing Equalizer Header */}
            {isPlaying && (
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-400 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-1.5" style={{ animationDelay: '450ms' }} />
                  </div>
                  <span className="text-[11px] font-bold tracking-wide">Memutar Tilawah Syaikh Misyari Al-Afasy</span>
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
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-4">
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 ${currentTheme.textAccent} hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 cursor-pointer`}
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
        ) : finalAudioUrl && (
          /* Standalone Audio Bar when arabic text is not provided but audioUrl is resolved */
          <div className="mb-6 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={toggleAudio}
                disabled={isLoadingAudio}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                title={isPlaying ? "Hentikan" : "Putar Tilawah Syaikh Misyari Al-Afasy"}
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
                  {isPlaying ? "Sedang Memutar Tilawah..." : "Dengarkan Tilawah Ayat"}
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
                    Audio CDN Resmi: Syaikh Misyari Rasyid Al-Afasy
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
