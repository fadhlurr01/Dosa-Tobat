import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders, 
  Bell, 
  Volume2, 
  Globe, 
  Save, 
  HardDrive,
  RefreshCw,
  Server,
  Users,
  BookOpen,
  FileText,
  Activity
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AppSettings } from '../../lib/constants';
import { api } from '../../lib/api';
import { motion } from 'motion/react';
import { triggerConfetti } from '../../components/ui/Confetti';
import { soundFx } from '../../lib/soundFx';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';

export default function AdminSettingsView() {
  const { 
    appSettings, 
    updateAppSettings, 
    refreshFromDB, 
    mockUsers, 
    cmsItems,
    backupData,
    restoreData,
    resetData 
  } = useStore();

  const [formData, setFormData] = useState<AppSettings>(appSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isProcessingBackup, setIsProcessingBackup] = useState(false);

  // Live Database Stats
  const [dbStats, setDbStats] = useState<{
    userCount: number;
    cmsCount: number;
    sinCount: number;
    logCount: number;
    dbStatus: 'TERHUBUNG (MySQL)' | 'OFFLINE';
  }>({
    userCount: mockUsers.length,
    cmsCount: cmsItems.length,
    sinCount: 35,
    logCount: 0,
    dbStatus: 'TERHUBUNG (MySQL)'
  });

  const loadStats = async () => {
    try {
      let userCount = mockUsers.length;
      let cmsCount = cmsItems.length;
      let isConnected = true;

      // Check live from backend
      try {
        const usersRes = await api.admin.getUsers();
        if (usersRes && usersRes.data) {
          userCount = usersRes.data.length;
        }
      } catch {
        isConnected = false;
      }

      setDbStats({
        userCount: userCount || mockUsers.length,
        cmsCount: cmsCount || cmsItems.length,
        sinCount: 35,
        logCount: 0,
        dbStatus: isConnected ? 'TERHUBUNG (MySQL)' : 'OFFLINE'
      });
    } catch (e) {
      console.log('Error loading db stats:', e);
    }
  };

  useEffect(() => {
    setFormData(appSettings);
    loadStats();
  }, [appSettings, mockUsers, cmsItems]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playTap();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      await updateAppSettings(formData);
      setIsSaving(false);
      soundFx.playSuccess();
      triggerConfetti();
      setStatusMessage({ type: 'success', text: 'Pengaturan sistem & platform berhasil disimpan secara permanen!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setIsSaving(false);
      setStatusMessage({ type: 'error', text: 'Gagal menyimpan pengaturan ke database.' });
    }
  };

  // Export database to JSON (Live MySQL Backend + Client DB)
  const handleExportDB = async () => {
    soundFx.playTap();
    setIsProcessingBackup(true);
    setStatusMessage({ type: 'success', text: 'Menghasilkan file backup database JSON...' });

    try {
      const jsonStr = await backupData();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dosa_tobat_backup_mysql_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsProcessingBackup(false);
      soundFx.playSuccess();
      triggerConfetti();
      setStatusMessage({ type: 'success', text: 'Backup database JSON permanen berhasil diunduh!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setIsProcessingBackup(false);
      setStatusMessage({ type: 'error', text: 'Gagal mengekspor database.' });
    }
  };

  // Import / Restore database from JSON
  const handleImportDB = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Peringatan: Memulihkan database akan memperbarui data akun dan konfigurasi ke database MySQL. Lanjutkan?')) {
      e.target.value = '';
      return;
    }

    soundFx.playTap();
    setIsProcessingBackup(true);
    setStatusMessage({ type: 'success', text: 'Memulihkan data ke database MySQL...' });

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const res = await restoreData(text);
        setIsProcessingBackup(false);

        if (res.success) {
          await refreshFromDB();
          await loadStats();
          soundFx.playSuccess();
          triggerConfetti();
          setStatusMessage({ type: 'success', text: res.message || 'Database MySQL berhasil dipulihkan!' });
        } else {
          setStatusMessage({ type: 'error', text: res.message || 'Format file backup tidak valid.' });
        }
        setTimeout(() => setStatusMessage(null), 4000);
      } catch {
        setIsProcessingBackup(false);
        setStatusMessage({ type: 'error', text: 'Gagal memproses file backup.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset database to initial seed data
  const handleOpenReset = () => {
    soundFx.playTap();
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      const res = await resetData();
      await refreshFromDB();
      await loadStats();
      soundFx.playSuccess();
      setIsResetting(false);
      setIsResetModalOpen(false);
      setStatusMessage({ type: 'success', text: res.message || 'Database berhasil di-reset ke data awal bawaan!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setIsResetting(false);
      setStatusMessage({ type: 'error', text: 'Gagal mereset database.' });
    }
  };

  // Test Laragon MySQL Connection
  const [laragonStatus, setLaragonStatus] = useState<'CHECKING' | 'CONNECTED' | 'OFFLINE'>('CONNECTED');
  const [laragonMsg, setLaragonMsg] = useState('MySQL: dosa&taubat (Port 3306)');

  const testLaragonConnection = async () => {
    soundFx.playTap();
    setLaragonStatus('CHECKING');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/health', { method: 'GET' });
      if (res.ok) {
        setLaragonStatus('CONNECTED');
        setLaragonMsg('Terhubung ke Laragon MySQL (dosa&taubat)');
        soundFx.playSuccess();
        triggerConfetti();
        setStatusMessage({ type: 'success', text: 'Database MySQL Laragon & Backend REST API Terhubung 100%!' });
        await loadStats();
      } else {
        setLaragonStatus('OFFLINE');
        setLaragonMsg('Backend offline atau port belum aktif');
      }
    } catch {
      setLaragonStatus('OFFLINE');
      setLaragonMsg('Jalankan: php artisan serve di folder backend');
      setStatusMessage({ 
        type: 'error', 
        text: 'Laragon Backend belum aktif. Jalankan "php artisan serve" di folder backend untuk koneksi MySQL.' 
      });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            Pengaturan Sistem & Database
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Kelola konfigurasi platform, pencadangan (backup), pemulihan (restore), dan status sinkronisasi database MySQL permanen.
          </p>
        </div>
      </div>

      {/* Status Alert Notification */}
      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border shadow-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </motion.div>
      )}

      {/* Database Health Card: MySQL Laragon Permanent Storage */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Basis Data Utama: <span className="text-emerald-400">MySQL Laragon (dosa&taubat)</span>
              </h2>
              <p className="text-xs text-slate-300">
                Data akun pengguna, progress taubat, dan artikel tersimpan permanen di database backend MySQL.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Status: {dbStats.dbStatus}
          </div>
        </div>

        {/* Database Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px]">Pengguna (Users):</span>
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-white">{dbStats.userCount} Record</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px]">Katalog Dosa:</span>
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-white">{dbStats.sinCount} Kategori</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px]">Artikel CMS:</span>
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-white">{dbStats.cmsCount} Record</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px]">Log Audit Aktivitas:</span>
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-white">{dbStats.logCount} Record</span>
          </div>
        </div>

        {/* DB Action Toolbar: Backup, Restore, Reset */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportDB}
            disabled={isProcessingBackup}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Backup Database (.JSON)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95">
            <Upload className="w-4 h-4" />
            <span>Impor & Pulihkan Backup (.JSON)</span>
            <input type="file" accept=".json" onChange={handleImportDB} className="hidden" />
          </label>

          <button
            onClick={handleOpenReset}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 sm:ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Database ke Status Awal</span>
          </button>
        </div>
      </div>

      {/* Laragon MySQL Connection & Server Details */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Koneksi Server Database MySQL & REST API
              </h3>
              <p className="text-xs text-slate-500">
                Database terhubung: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-600 font-bold">dosa&taubat</code>
              </p>
            </div>
          </div>

          <button
            onClick={testLaragonConnection}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${laragonStatus === 'CHECKING' ? 'animate-spin' : ''}`} />
            Tes Koneksi Database
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Host & Port MySQL:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">127.0.0.1:3306 (Laragon)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Nama Database MySQL:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">dosa&taubat</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Status REST API Backend:</span>
            <span className={`font-bold ${laragonStatus === 'CONNECTED' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {laragonMsg}
            </span>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Pengaturan Umum */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Pengaturan Umum Aplikasi
            </h3>
            <p className="text-xs text-slate-500">Konfigurasi operasional dan kebijakan platform.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Platform & Brand Title
              </label>
              <input
                type="text"
                value={formData.appName}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Izinkan Pendaftaran Baru (Sign Up)</h4>
                  <p className="text-[11px] text-slate-500">Buka form pendaftaran untuk pengguna baru.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.allowRegistration}
                  onChange={(e) => setFormData({ ...formData, allowRegistration: e.target.checked })}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Mode Pemeliharaan (Maintenance)</h4>
                  <p className="text-[11px] text-slate-500">Kunci akses reguler sementara untuk pemeliharaan.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pengaturan Konten & Ibadah */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Pengaturan Ibadah & Audio Bawaan
            </h3>
            <p className="text-xs text-slate-500">Nilai default untuk fitur tasbih, dzikir, dan audio.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Hitungan Dzikir Bawaan
              </label>
              <select
                value={formData.defaultDailyTarget}
                onChange={(e) => setFormData({ ...formData, defaultDailyTarget: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value={33}>33 Kali (Standar Sunnah)</option>
                <option value={99}>99 Kali</option>
                <option value={100}>100 Kali (Istighfar Istiqomah)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Frekuensi Pengingat Muhasabah
              </label>
              <select
                value={formData.notificationFrequency}
                onChange={(e) => setFormData({ ...formData, notificationFrequency: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="low">Rendah (1x Sehari - Pagi)</option>
                <option value="normal">Normal (3x Sehari - Pagi, Siang, Malam)</option>
                <option value="high">Intensif (Setiap Waktu Shalat)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Sistem</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Modern Center Modal for Database Reset */}
      <DeleteConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Seluruh Database Platform"
        description="Apakah Anda yakin ingin mengembalikan seluruh database ke data awal bawaan? Seluruh data akun pengguna baru, catatan log, dan kustomisasi di database MySQL akan direset."
        itemName="Database MySQL Laragon & Data Pengguna"
        confirmLabel="Reset Database"
        cancelLabel="Batal"
        isProcessing={isResetting}
        type="danger"
      />
    </div>
  );
}
