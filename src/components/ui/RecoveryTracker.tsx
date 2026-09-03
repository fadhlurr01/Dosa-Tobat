import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, HeartHandshake, Zap, RefreshCw } from 'lucide-react';

interface RecoveryTrackerProps {
  daysInRecovery: number;
}

const STAGES = [
  {
    id: 'recognize',
    title: 'Recognize',
    subtitle: 'Menyadari',
    minDays: 0,
    icon: Target,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    stroke: 'stroke-amber-500',
  },
  {
    id: 'remove',
    title: 'Remove',
    subtitle: 'Menjauhi',
    minDays: 2,
    icon: Shield,
    color: 'text-rose-500',
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    stroke: 'stroke-rose-500',
  },
  {
    id: 'repent',
    title: 'Repent',
    subtitle: 'Bertaubat',
    minDays: 5,
    icon: HeartHandshake,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    stroke: 'stroke-indigo-500',
  },
  {
    id: 'replace',
    title: 'Replace',
    subtitle: 'Mengganti',
    minDays: 10,
    icon: Zap,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    stroke: 'stroke-emerald-500',
  },
  {
    id: 'repeat',
    title: 'Repeat',
    subtitle: 'Istiqomah',
    minDays: 21,
    icon: RefreshCw,
    color: 'text-teal-500',
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    stroke: 'stroke-teal-500',
  },
];

export default function RecoveryTracker({ daysInRecovery }: RecoveryTrackerProps) {
  // Determine current stage index based on days
  let currentStageIndex = 0;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (daysInRecovery >= STAGES[i].minDays) {
      currentStageIndex = i;
      break;
    }
  }

  const currentStage = STAGES[currentStageIndex];
  const nextStage = STAGES[currentStageIndex + 1];

  // Calculate progress within the current stage or overall
  let progressPercent = 0;
  if (!nextStage) {
    progressPercent = 100; // Max stage reached
  } else {
    const daysInCurrentStage = daysInRecovery - currentStage.minDays;
    const stageDuration = nextStage.minDays - currentStage.minDays;
    // Calculate how far along they are to the NEXT stage, overall percentage maps to standard 5 steps
    const stageBaseProgress = (currentStageIndex / STAGES.length) * 100;
    const stageFraction = (daysInCurrentStage / stageDuration) * (100 / STAGES.length);
    progressPercent = Math.min(100, stageBaseProgress + stageFraction);
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;
  
  const Icon = currentStage.icon;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 mb-2">
      <div className="relative flex items-center justify-center">
        {/* Background Track */}
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
          {/* Progress Indicator */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={currentStage.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className={`absolute w-14 h-14 rounded-full flex items-center justify-center ${currentStage.bg}`}>
          <Icon className={`w-6 h-6 ${currentStage.color}`} />
        </div>
      </div>
      
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">
          Fase Pemulihan (5R)
        </h4>
        <div className="flex items-end justify-center sm:justify-start gap-3">
          <span className={`text-xl sm:text-2xl font-extrabold ${currentStage.color}`}>
            {currentStage.title}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            ({currentStage.subtitle})
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {nextStage ? (
            <p>Hari ke-{daysInRecovery} • Butuh {nextStage.minDays - daysInRecovery} hari lagi untuk fase <strong>{nextStage.title}</strong>.</p>
          ) : (
            <p>Hari ke-{daysInRecovery} • Anda telah mencapai tahap Istiqomah.</p>
          )}
        </div>
      </div>
    </div>
  );
}
