import React, { useMemo } from 'react';
import { Award, Shield, Heart, Star, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { calculateStreak } from '../../lib/utils';

export default function BadgeSystem() {
  const { journeys } = useStore();
  
  const stats = useMemo(() => {
    const active = Object.values(journeys);
    let maxDays = 0;
    
    active.forEach(j => {
      const days = calculateStreak(j.startDate, j.lastRelapse);
      if (days > maxDays) maxDays = days;
    });

    return {
      total: active.length,
      maxDays
    };
  }, [journeys]);

  const BADGES = [
    {
      id: 'first_step',
      title: 'Langkah Awal',
      desc: 'Memulai perjalanan',
      icon: Zap,
      unlocked: stats.total >= 1,
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      border: 'border-amber-200 dark:border-amber-800'
    },
    {
      id: 'week_streak',
      title: '1 Minggu Istiqamah',
      desc: 'Bertahan 7 hari',
      icon: Shield,
      unlocked: stats.maxDays >= 7,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      border: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'savior',
      title: 'Penyelamat Diri',
      desc: 'Memperbaiki 3 dosa',
      icon: Heart,
      unlocked: stats.total >= 3,
      color: 'text-rose-500',
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      border: 'border-rose-200 dark:border-rose-800'
    },
    {
      id: 'month_streak',
      title: 'Sebulan Penuh',
      desc: '30 hari bertahan',
      icon: Star,
      unlocked: stats.maxDays >= 30,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      border: 'border-indigo-200 dark:border-indigo-800'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-500" />
        Pencapaian Perjalanan
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {BADGES.map(badge => {
          const Icon = badge.icon;
          return (
            <div 
              key={badge.id}
              className={`flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${
                badge.unlocked 
                  ? `${badge.bg} ${badge.border}` 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60 grayscale'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                badge.unlocked ? 'bg-white dark:bg-slate-800 shadow-sm' : 'bg-slate-200 dark:bg-slate-700'
              }`}>
                <Icon className={`w-6 h-6 ${badge.unlocked ? badge.color : 'text-slate-400 dark:text-slate-500'}`} />
              </div>
              <h4 className={`text-xs font-bold mb-1 ${badge.unlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'}`}>
                {badge.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
