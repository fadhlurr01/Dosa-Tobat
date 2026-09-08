import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function DailyReflection() {
  const { addJournal } = useStore();
  const [reflection, setReflection] = useState('');
  const [isSavingReflection, setIsSavingReflection] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const handleSaveReflection = () => {
    if (!reflection.trim()) return;
    setIsSavingReflection(true);
    
    // Simulate network delay for UX
    setTimeout(() => {
      addJournal({
        mistake: '(Refleksi Harian)',
        trigger: '-',
        hurt: '-',
        fix: '-',
        prevent: reflection,
      });
      setReflection('');
      setIsSavingReflection(false);
      setReflectionSaved(true);
      setTimeout(() => setReflectionSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Refleksi Harian</h2>
      <div className="bg-[#FFFBEB] dark:bg-amber-500/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-500/20">
        <label htmlFor="daily-reflection" className="block font-bold text-amber-800 dark:text-amber-500 mb-2 text-sm">
          Apa satu hal yang akan saya cegah besok?
        </label>
        <div className="flex gap-2">
          <input 
            id="daily-reflection"
            type="text" 
            placeholder="Tulis komitmenmu..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveReflection();
            }}
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-900 rounded-xl text-sm border border-amber-200 dark:border-amber-500/30 focus:ring-2 focus:ring-amber-500 outline-none transition-all dark:text-slate-200 placeholder-amber-800/40 dark:placeholder-amber-500/50"
          />
          <button 
            onClick={handleSaveReflection}
            disabled={!reflection.trim() || isSavingReflection}
            className="px-4 py-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-xl shadow-sm hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[3rem]"
          >
            {isSavingReflection ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Check className="w-5 h-5" />
            )}
          </button>
        </div>
        {reflectionSaved && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-3 flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Komitmen tersimpan di jurnal.
          </motion.p>
        )}
      </div>
    </div>
  );
}
