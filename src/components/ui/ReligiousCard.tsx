import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Heart, Quote, Volume2, Square } from 'lucide-react';
import { motion } from 'motion/react';

export interface ReligiousCardProps {
  key?: React.Key;
  type: 'AYAT' | 'HADIS' | 'DOA' | 'NASEHAT' | string;
  title?: string;
  arabic?: string;
  latin?: string;
  translation?: string;
  reference?: string;
  className?: string;
}

export default function ReligiousCard({ type, title, arabic, latin, translation, reference, className = '' }: ReligiousCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (!arabic) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // Slightly slower for better Arabic pronunciation
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
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
        <div className="flex items-center gap-3 mb-6">
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

        {arabic && (
          <div className={`mb-6 p-6 sm:p-8 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} backdrop-blur-sm relative group`}>
            <p 
              dir="rtl" 
              className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-right leading-relaxed text-slate-800 dark:text-slate-100 drop-shadow-sm pb-8 sm:pb-0"
              style={{ lineHeight: '2.2' }}
            >
              {arabic}
            </p>
            <button 
              onClick={toggleAudio}
              className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border ${currentTheme.border} ${currentTheme.textAccent} hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 z-20`}
              title={isPlaying ? "Berhenti" : "Dengarkan"}
            >
              {isPlaying ? <Square className="w-4 h-4 fill-current animate-pulse" /> : <Volume2 className="w-5 h-5" />}
            </button>
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
              <p className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textAccent}`}>
                — {reference}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
