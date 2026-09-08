import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  type?: 'danger' | 'warning';
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  confirmLabel = 'Hapus Permanen',
  cancelLabel = 'Batal',
  isProcessing = false,
  type = 'danger',
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleCancel = () => {
    soundFx.playTap();
    onClose();
  };

  const handleConfirm = async () => {
    soundFx.playTap();
    await onConfirm();
  };

  const isDanger = type === 'danger';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-7 z-10 overflow-hidden text-center space-y-5"
          >
            {/* Top Close Icon */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Icon Badge */}
            <div className="flex justify-center pt-1">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative shadow-lg ${
                isDanger 
                  ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 shadow-rose-500/10' 
                  : 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 shadow-amber-500/10'
              }`}>
                {isDanger ? (
                  <Trash2 className="w-8 h-8 animate-bounce-slow" />
                ) : (
                  <AlertTriangle className="w-8 h-8 animate-pulse" />
                )}
                <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                  isDanger ? 'bg-rose-500' : 'bg-amber-500'
                }`} />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Target Item Card (if provided) */}
            {itemName && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">Data Sasaran:</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate block">
                    {itemName}
                  </span>
                </div>
              </div>
            )}

            {/* Warning Note */}
            <div className="text-[11px] text-rose-600 dark:text-rose-400/90 font-medium bg-rose-50/70 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40">
              ⚠️ <b>Peringatan:</b> Tindakan ini akan menghapus data permanen dari database. Data tidak dapat dipulihkan kembali.
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isProcessing}
                className="flex-1 py-2.5 px-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isProcessing}
                className={`flex-1 py-2.5 px-4 rounded-full text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                  isDanger
                    ? 'bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 shadow-rose-600/25'
                    : 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 shadow-amber-600/25'
                }`}
              >
                {isProcessing ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{confirmLabel}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
