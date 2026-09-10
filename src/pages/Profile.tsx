import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, DEMO_ACCOUNTS } from '../store/useStore';
import { motion } from 'motion/react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  User, 
  Zap, 
  Crown, 
  ShieldAlert, 
  Globe, 
  Volume2, 
  VolumeX, 
  LogOut, 
  Check, 
  Sparkles, 
  Flame, 
  CheckCircle2,
  Lock,
  Mail,
  Image as ImageIcon,
  Download,
  Upload,
  RotateCcw,
  MessageSquare,
  FileText,
  Save,
  Phone,
  Camera,
  X,
  UploadCloud
} from 'lucide-react';
import { notificationService, NotificationFrequency } from '../services/notificationService';
import { soundFx } from '../lib/soundFx';
import { triggerConfetti } from '../components/ui/Confetti';
import { FeedbackModal } from '../components/ui/FeedbackModal';
import { LegalModal } from '../components/ui/LegalModal';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
];

export default function Profile() {
  const { 
    theme, 
    setTheme, 
    notificationFrequency, 
    setNotificationFrequency, 
    language, 
    setLanguage,
    currentUser,
    soundEnabled,
    toggleSound,
    loginDemo,
    logout,
    seedDemoData,
    updateCurrentUserProfile,
    updateCurrentUserPassword,
    backupData,
    restoreData,
    resetData
  } = useStore();

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deviceAvatarInputRef = useRef<HTMLInputElement>(null);

  // Profile Edit States
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editPhone, setEditPhone] = useState(currentUser.phone || '');
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar || AVATAR_PRESETS[0]);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Edit States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDeviceAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProfileMessage({ type: 'error', text: 'File harus berupa gambar (JPG, PNG, WebP).' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage({ type: 'error', text: 'Ukuran foto maksimal 5MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 256;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        setEditAvatar(compressedBase64);
        soundFx.playTap();
        setProfileMessage({ type: 'success', text: 'Foto berhasil dimuat dari perangkat! Klik Simpan Perubahan di bawah.' });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCancelProfile = () => {
    soundFx.playTap();
    setEditName(currentUser.name);
    setEditEmail(currentUser.email);
    setEditPhone(currentUser.phone || '');
    setEditAvatar(currentUser.avatar || AVATAR_PRESETS[0]);
    setProfileMessage(null);
  };

  const handleCancelPassword = () => {
    soundFx.playTap();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage(null);
  };

  // Backup / Restore / Reset States
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  // Modals
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'disclaimer' | 'terms' }>({
    isOpen: false,
    type: 'terms',
  });

  const handleFrequencyChange = (freq: NotificationFrequency) => {
    soundFx.playTap();
    setNotificationFrequency(freq);
    notificationService.scheduleEncouragement({
      enabled: true,
      frequency: freq,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      setProfileMessage({ type: 'error', text: 'Nama dan email tidak boleh kosong.' });
      return;
    }

    setIsSavingProfile(true);
    setProfileMessage(null);
    soundFx.playTap();

    try {
      const res = await updateCurrentUserProfile({
        name: editName,
        email: editEmail,
        phone: editPhone,
        avatar: editAvatar,
      });

      setIsSavingProfile(false);
      if (res.success) {
        soundFx.playSuccess();
        triggerConfetti();
        setProfileMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
      } else {
        setProfileMessage({ type: 'error', text: res.message || 'Gagal memperbarui profil.' });
      }
    } catch (err: any) {
      setIsSavingProfile(false);
      setProfileMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password baru minimal 6 karakter.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Konfirmasi password baru tidak cocok.' });
      return;
    }

    setIsChangingPassword(true);
    setPasswordMessage(null);
    soundFx.playTap();

    try {
      const res = await updateCurrentUserPassword(currentPassword, newPassword);
      setIsChangingPassword(false);
      if (res.success) {
        soundFx.playSuccess();
        triggerConfetti();
        setPasswordMessage({ type: 'success', text: 'Password berhasil diubah!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage({ type: 'error', text: res.message || 'Gagal mengubah password.' });
      }
    } catch (err: any) {
      setIsChangingPassword(false);
      setPasswordMessage({ type: 'error', text: 'Terjadi kendala saat mengubah password.' });
    }
  };

  const handleBackup = async () => {
    soundFx.playTap();
    setBackupStatus('Membuat cadangan data...');
    try {
      const jsonStr = await backupData();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dosa-tobat-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupStatus('Cadangan data berhasil diunduh (JSON)!');
      soundFx.playSuccess();
      setTimeout(() => setBackupStatus(null), 4000);
    } catch (err) {
      setBackupStatus('Gagal membuat cadangan data.');
    }
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundFx.playTap();
    setBackupStatus('Memulihkan data...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = await restoreData(content);
        if (res.success) {
          soundFx.playSuccess();
          triggerConfetti();
          setBackupStatus('Data berhasil dipulihkan dari file backup!');
        } else {
          setBackupStatus(res.message || 'Gagal memulihkan data.');
        }
        setTimeout(() => setBackupStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const handleResetSystem = async () => {
    if (window.confirm('Apakah Anda yakin ingin mereset data dan pengaturan ke setelan bawaan?')) {
      soundFx.playTap();
      setBackupStatus('Mereset sistem...');
      const res = await resetData();
      if (res.success) {
        soundFx.playSuccess();
        triggerConfetti();
        setBackupStatus('Sistem berhasil direset ke status awal.');
      } else {
        setBackupStatus(res.message || 'Gagal mereset sistem.');
      }
      setTimeout(() => setBackupStatus(null), 4000);
    }
  };

  const handleSeedData = () => {
    soundFx.playSuccess();
    seedDemoData();
    triggerConfetti();
    setSeedSuccess(true);
    setTimeout(() => setSeedSuccess(false), 4000);
  };

  const handleSwitchDemo = (demoId: string) => {
    soundFx.playTap();
    loginDemo(demoId);
    triggerConfetti();
  };

  const handleLogout = () => {
    soundFx.playTap();
    logout();
    navigate('/login');
  };

  const isPremium = currentUser.plan !== 'FREE';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-8 pb-24"
    >
      {/* Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.avatar || AVATAR_PRESETS[0]}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
            />
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-md">
                <Crown className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight truncate">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : currentUser.role === 'CONTENT_ADMIN' ? 'Ustadz / Content Admin' : isPremium ? 'PRO Member' : 'Basic Member'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentUser.email || 'Belum ada email'} {currentUser.phone ? `• ${currentUser.phone}` : ''}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Streak: {currentUser.streakDays || 0} Hari
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </button>
        </div>
      </div>

      {/* 1. Form Edit Profil: Ganti Nama, Foto, Email, No. HP */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-500" /> Pengaturan Data Diri (Profil)
        </h2>
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          {profileMessage && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              profileMessage.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-500/30'
            }`}>
              {profileMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
              <span>{profileMessage.text}</span>
            </div>
          )}

          {/* Ganti Foto Profil (Pilihan Avatar & Upload Perangkat) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Foto Profil (Avatar)
              </label>
              <button
                type="button"
                onClick={() => {
                  soundFx.playTap();
                  deviceAvatarInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all cursor-pointer shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Pilih dari Perangkat / Galeri</span>
              </button>
            </div>

            <input
              ref={deviceAvatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleDeviceAvatarUpload}
              className="hidden"
            />

            {/* Avatar Selection Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar pt-1">
              {/* Custom Device Upload Preview if selected */}
              {!AVATAR_PRESETS.includes(editAvatar) && (
                <button
                  type="button"
                  onClick={() => {}}
                  className="relative p-0.5 rounded-2xl ring-2 ring-emerald-500 scale-105 shadow-md shrink-0 cursor-default"
                >
                  <img src={editAvatar} alt="Foto Perangkat" className="w-12 h-12 rounded-2xl object-cover" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap shadow-xs">
                    Perangkat
                  </span>
                </button>
              )}

              {/* Website Built-in Preset Avatars */}
              {AVATAR_PRESETS.map((avatarUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundFx.playTap();
                    setEditAvatar(avatarUrl);
                  }}
                  className={`relative p-0.5 rounded-2xl transition-all shrink-0 cursor-pointer ${
                    editAvatar === avatarUrl 
                      ? 'ring-2 ring-emerald-500 scale-105 shadow-md' 
                      : 'opacity-70 hover:opacity-100 hover:scale-100'
                  }`}
                >
                  <img src={avatarUrl} alt={`Avatar ${idx + 1}`} className="w-12 h-12 rounded-2xl object-cover" />
                  {editAvatar === avatarUrl && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Nama lengkap Anda..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                No. HP / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="tel" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="081234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kustom URL Foto
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="url" 
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons: Save & Cancel for Profile Form */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCancelProfile}
              disabled={isSavingProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal</span>
            </button>

            <button
              type="submit"
              disabled={isSavingProfile}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 disabled:opacity-50 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 2. Form Ganti Password */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-500" /> Keamanan & Ganti Password
        </h2>
        <form onSubmit={handleChangePassword} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          {passwordMessage && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              passwordMessage.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-500/30'
            }`}>
              {passwordMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
              <span>{passwordMessage.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password Saat Ini
              </label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password Baru
              </label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Minimal 6 karakter"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Konfirmasi Password
              </label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Ulangi password baru"
                required
              />
            </div>
          </div>

          {/* Action Buttons: Save & Cancel for Password Form */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCancelPassword}
              disabled={isChangingPassword}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal</span>
            </button>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-bold shadow-sm disabled:opacity-50 transition-all cursor-pointer active:scale-95"
            >
              <Lock className="w-4 h-4" />
              <span>{isChangingPassword ? 'Memperbarui...' : 'Simpan Password Baru'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Fitur Backup, Restore, dan Reset Data */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-emerald-500" /> Cadangan & Pemulihan Data (Backup / Restore)
        </h2>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simpan salinan cadangan data perjalanan taubat, jurnal muhasabah, dan pengaturan Anda dalam bentuk file JSON. Anda dapat memulihkannya sewaktu-waktu.
          </p>

          {backupStatus && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{backupStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Download Backup */}
            <button
              type="button"
              onClick={handleBackup}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500/40 text-left transition-all group"
            >
              <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Unduh Backup</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Ekspor data ke file JSON</p>
            </button>

            {/* Restore Backup */}
            <label className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-500/40 text-left transition-all cursor-pointer group">
              <Upload className="w-5 h-5 text-teal-600 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Pulihkan Backup</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Impor data dari JSON</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleRestoreFile}
                className="hidden"
              />
            </label>

            {/* Reset All */}
            <button
              type="button"
              onClick={handleResetSystem}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-500/40 text-left transition-all group"
            >
              <RotateCcw className="w-5 h-5 text-rose-600 dark:text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Reset Data</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Kembalikan ke awal</p>
            </button>
          </div>
        </div>
      </section>



      {/* 5. Theme & Appearance */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Settings className="w-4 h-4" /> Tampilan & Tema
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('light');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'light' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Sun className="w-6 h-6 mb-2" />
              <span className="text-xs">Terang</span>
            </button>
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('dark');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'dark' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Moon className="w-6 h-6 mb-2" />
              <span className="text-xs">Gelap</span>
            </button>
            <button
              onClick={() => {
                soundFx.playTap();
                setTheme('system');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${theme === 'system' ? 'bg-[#E7F5EF] dark:bg-emerald-500/20 border-[#065F46]/30 dark:border-emerald-500/30 text-[#065F46] dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <Monitor className="w-6 h-6 mb-2" />
              <span className="text-xs">Sistem</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Language */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-4 h-4" /> Bahasa / Language
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Pilih Bahasa Aplikasi</label>
          <select 
            value={language}
            onChange={(e) => {
              soundFx.playTap();
              setLanguage(e.target.value);
            }}
            className="w-full bg-[#FDFBF7] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 text-sm"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="tr">Türkçe (Turkish)</option>
          </select>
        </div>
      </section>

      {/* 7. Sound Effects */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-500" /> Audio & Efek Suara
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Efek Suara Mikro & Audio Tilawah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Audio murottal Alafasy & Hisnul Muslim bersuara jernih.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled;
                toggleSound();
                if (nextState) {
                  soundFx.setEnabled(true);
                  soundFx.playSuccess();
                } else {
                  soundFx.setEnabled(false);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                soundEnabled
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>
        </div>
      </section>

      {/* 8. Feedback & Legal Support */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-500" /> Masukan & Ketentuan Hukum
        </h2>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Beri Masukan / Feedback
            </button>
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: 'disclaimer' })}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Disclaimer (Penyangkalan)
            </button>
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileText className="w-4 h-4 text-teal-600" />
              Syarat & Ketentuan
            </button>
          </div>
        </div>
      </section>

      {/* 9. Admin Console Access (Hanya untuk Admin / Asatidz) */}
      {(currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN' || currentUser.role === 'CONTENT_ADMIN') && (
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-500" /> Konsol Administrator & Manajemen
          </h2>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <Link 
              to="/admin"
              onClick={() => soundFx.playTap()}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all block text-center"
            >
              <ShieldAlert className="w-4 h-4 inline-block" />
              Buka Admin Console (CMS & Users)
            </Link>
          </div>
        </section>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        toolName="Pengaturan Profil"
      />

      {/* Legal Modal Dialog */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        type={legalModal.type}
      />
    </motion.div>
  );
}
