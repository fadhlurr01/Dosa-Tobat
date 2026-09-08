import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Journal() {
  const { journals, addJournal } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    mistake: '',
    trigger: '',
    hurt: '',
    fix: '',
    prevent: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addJournal(formData);
      setFormData({ mistake: '', trigger: '', hurt: '', fix: '', prevent: '' });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight leading-none mb-2">Jurnal Muhasabah</h1>
        <p className="text-[#065F46] dark:text-emerald-500 opacity-80 italic font-serif">Sistem evaluasi 5 menit untuk perubahan nyata.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-[#065F46]/10 dark:border-emerald-500/20">
        <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Evaluasi Hari Ini
        </h2>

        {showSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#065F46] dark:text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-[#1F2937] dark:text-slate-200">Evaluasi Tersimpan</h3>
            <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm">Semoga esok hari menjadi lebih baik.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="mistake" className="block text-xs sm:text-sm font-bold text-[#1F2937] dark:text-slate-200">1. Apa kesalahan / kekhilafan hari ini?</label>
              <textarea
                id="mistake"
                name="mistake"
                required
                value={formData.mistake}
                onChange={handleChange}
                placeholder="Jujur pada diri sendiri di hadapan Allah..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all resize-none h-20 sm:h-24 dark:text-slate-200 shadow-2xs"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="trigger" className="block text-xs sm:text-sm font-bold text-[#1F2937] dark:text-slate-200">2. Apa pemicu utamanya?</label>
              <p className="text-[10px] text-gray-500 dark:text-slate-400">Lingkungan, ponsel/medsos, kelelahan, atau emosi tertentu.</p>
              <textarea
                id="trigger"
                name="trigger"
                required
                value={formData.trigger}
                onChange={handleChange}
                placeholder="Tuliskan pemicunya secara spesifik..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all resize-none h-20 sm:h-24 dark:text-slate-200 shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="hurt" className="block text-xs sm:text-sm font-bold text-[#1F2937] dark:text-slate-200">3. Siapa yang dirugikan atau disakiti?</label>
              <p className="text-[10px] text-gray-500 dark:text-slate-400">Orang tua, pasangan, sahabat, atau diri sendiri.</p>
              <textarea
                id="hurt"
                name="hurt"
                required
                value={formData.hurt}
                onChange={handleChange}
                placeholder="Orang lain atau diri sendiri..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all resize-none h-20 sm:h-24 dark:text-slate-200 shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="fix" className="block text-xs sm:text-sm font-bold text-[#1F2937] dark:text-slate-200">4. Tindakan perbaikan nyata (Taubat & Islah)</label>
              <p className="text-[10px] text-gray-500 dark:text-slate-400">Minta maaf, bersedekah, shalat taubat, istighfar tulus.</p>
              <textarea
                id="fix"
                name="fix"
                required
                value={formData.fix}
                onChange={handleChange}
                placeholder="Langkah nyata yang saya lakukan..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all resize-none h-20 sm:h-24 dark:text-slate-200 shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="prevent" className="block text-xs sm:text-sm font-bold text-[#1F2937] dark:text-slate-200">5. Komitmen pencegahan esok hari</label>
              <textarea
                id="prevent"
                name="prevent"
                required
                value={formData.prevent}
                onChange={handleChange}
                placeholder="Satu hal konkret yang akan saya hindari besok..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all resize-none h-20 sm:h-24 dark:text-slate-200 shadow-2xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 bg-[#065F46] dark:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-2xl shadow-md hover:bg-[#044c38] dark:hover:bg-emerald-700 transition-all active:scale-98 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Simpan Jurnal Muhasabah'
              )}
            </button>
          </form>
        )}
      </div>

      {journals.length > 0 && (
        <div className="space-y-4 mt-12">
          <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Catatan Sebelumnya</h2>
          <div className="grid gap-4">
            {journals.map((journal) => (
              <div key={journal.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {new Date(journal.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#065F46] dark:text-emerald-400 uppercase mb-1">Kesalahan & Pemicu</h4>
                  <p className="text-sm text-gray-600 dark:text-slate-300">"{journal.mistake}" — Dipicu oleh: {journal.trigger}</p>
                </div>
                <div className="bg-[#E7F5EF] dark:bg-emerald-500/10 p-3 rounded-xl mt-2">
                  <h4 className="text-xs font-bold text-[#065F46] dark:text-emerald-400 uppercase mb-1">Tindakan Perbaikan</h4>
                  <p className="text-sm text-[#065F46] dark:text-emerald-300 opacity-90">{journal.fix}</p>
                </div>
                {journal.prevent && (
                  <div className="bg-[#FFFBEB] dark:bg-amber-500/10 p-3 rounded-xl mt-2">
                    <h4 className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase mb-1">Komitmen Esok Hari</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 opacity-90">{journal.prevent}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
