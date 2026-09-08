import React from 'react';
import { X, ShieldAlert, FileText, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'disclaimer' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const isDisclaimer = type === 'disclaimer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDisclaimer 
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400' 
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            }`}>
              {isDisclaimer ? <ShieldAlert className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isDisclaimer ? 'Pernyataan Penyangkalan (Disclaimer)' : 'Syarat & Ketentuan Layanan (Terms & Conditions)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terakhir Diperbarui: September 2026 • Dosa & Tobat Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="py-6 overflow-y-auto space-y-4 text-sm text-slate-600 dark:text-slate-300 pr-2 leading-relaxed">
          {isDisclaimer ? (
            <>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                <p className="font-semibold text-xs uppercase tracking-wider mb-1">Penting untuk Dipahami</p>
                Platform Dosa & Tobat dibangun semata-mata sebagai sarana edukasi spiritual, muhasabah pribadi, dan panduan ibadah sesuai Al-Qur'an dan As-Sunnah.
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">1. Bukan Pengganti Bantuan Medis / Psikologis Klinis</h4>
              <p>
                Fitur evaluasi diri, audio dzikir, dan jurnal muhasabah dalam aplikasi ini ditujukan untuk pemulihan spiritual dan disiplin diri. Jika Anda mengalami gangguan kejiwaan berat, kecenderungan menyakiti diri, atau depresi klinis akut, Anda sangat disarankan untuk segera berkonsultasi dengan dokter jiwa (psikiater) atau psikolog profesional berlisensi.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">2. Rujukan Fiqih dan Fatwa</h4>
              <p>
                Materi dalil hadits dan ayat Al-Qur'an dirujuk dari kitab mu'tabar (Shahih Bukhari, Muslim, Riyadus Shalihin, Hisnul Muslim). Aplikasi ini bukan lembaga fatwa independen. Untuk kasus persengketaan hukum keluarga, perdata, atau muamalah yang rumit, silakan rujuk ke ulama atau majelis fatwa setempat.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">3. Kerahasiaan Jurnal Muhasabah</h4>
              <p>
                Catatan refleksi dan jurnal taubat pengguna dienkripsi dan diproteksi. Pengguna bertanggung jawab secara mandiri atas keamanan akun dan kerahasiaan kata sandi pada perangkat masing-masing.
              </p>
            </>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                <p className="font-semibold text-xs uppercase tracking-wider mb-1">Ketentuan Penggunaan Platform</p>
                Dengan mengakses atau mendaftar di Platform Dosa & Tobat, Anda menyetujui seluruh ketentuan di bawah ini.
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">1. Akun & Hak Pengguna</h4>
              <p>
                Setiap pengguna berhak menggunakan fitur taubat, audio panduan, dan materi edukasi secara adil. Pengguna dilarang melakukan aktivitas penyalahgunaan API, peretasan, scraping data massal, atau membagikan konten yang bertentangan dengan syariat Islam.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">2. Paket Langganan & Infaq Sukarela</h4>
              <p>
                Seluruh fitur esensial taubat dapat diakses secara gratis. Fitur PRO/Infaq merupakan bentuk donasi sukarela operasional dakwah digital. Paket langganan bersifat non-refundable kecuali terjadi kendala teknis pada sistem verifikasi.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">3. Pemisahan Hak Akses & Privasi</h4>
              <p>
                Pengguna biasa tidak memiliki akses ke database admin maupun data privasi pengguna lain. Hak akses Super Admin dipisahkan secara ketat dengan otentikasi role-based access control (RBAC).
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white pt-2">4. Hak Cipta & Kepemilikan</h4>
              <p>
                Aplikasi Dosa & Tobat dikembangkan dan dipelihara oleh Contech ID (<a href="https://contech.id" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline">contech.id</a>). Konten audio qari' dan dalil bersumber dari domain publik Islami (EveryAyah & Hisnul Muslim Database).
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Check className="w-4 h-4" />
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
