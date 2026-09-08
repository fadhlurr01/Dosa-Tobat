# 🕌 Dosa & Tobat - Platform Panduan & Perjalanan Taubat Nasuha Fullstack

> **Aplikasi Web Fullstack Interaktif & Modern untuk Membimbing Muhasabah, Katalog Dosa Shahih Berdasarkan Al-Qur'an dan As-Sunnah, Pelacak Istiqomah (Journey Tracking), Jurnal 5 Langkah, dan Checklist Ibadah Terpadu.**

---

## 🌟 Fitur Utama

- **📖 Ensiklopedia 10 Kategori Dosa Shahih**: Pembagian sistematis mulai dari Akidah, Ibadah, Hati, Lisan, Harta, Keluarga, Syahwat, Kecanduan Digital/Zat, Sosial, hingga Lingkungan lengkap dengan dalil, tanda pemicu, konsekuensi, dan langkah kafarat.
- **🛡️ Mode Darurat SOS 90-Detik**: Tombol intervensi cepat saat godaan maksiat memuncak, panduan bernafas 4-4-4, visualisasi hisab, dan doa perlindungan instan.
- **📈 Pelacak Perjalanan Taubat (Journey Tracking)**: Menghitung streak hari bersih (*clean streak*), status istiqomah (*Stable, Recovering, Fallen*), dan pencatatan kejadian relapse dengan navigasi langsung ke panduan pemulihan 5R.
- **✍️ Jurnal Muhasabah 5 Langkah**: Evaluasi harian terstruktur:
  1. *Apa kesalahan yang terjadi?*
  2. *Apa pemicu utamanya?*
  3. *Siapa pihak yang tersakiti?*
  4. *Langkah perbaikan / kafarat yang diambil*
  5. *Rencana pencegahan esok hari*
- **📿 Tasbih & Dzikir Digital Interaktif**: Counter dzikir dengan getaran haptic mobile, variasi pitch audio, preset doa, dan selebrasi confetti target tercapai.
- **🤲 Kumpulan Doa & Munajat Shahih**: Doa taubat nasuha, sayyidul istighfar, doa Nabi Yunus AS lengkap dengan audio TTS dan tombol salin.
- **🔐 Split-Screen Login & 1-Click Demo Accounts**: Tampilan otentikasi dual-frame modern dengan transisi smooth Framer Motion dan switcher akun demo instan.
- **🌓 Modern Glassmorphic UI & Dark/Light Mode**: Desain responsif mobile-first, sidebar dengan efek *active green glow*, dan sound FX toggle.

---

## 🛠️ Arsitektur Teknologi (Fullstack)

### Frontend (Client-Side)
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism, Dark/Light Mode, Emerald Spiritual Palette)
- **State Management**: Zustand (dengan sinkronisasi otomatis ke REST API)
- **Icons & Animasi**: Lucide React + Framer Motion + Canvas Confetti
- **PWA Ready**: Dukungan Progressive Web App & Service Worker

### Backend (Server-Side)
- **Framework**: Laravel 12 (PHP 8.2+)
- **API Architecture**: RESTful API v1 (`/api/v1/...`)
- **Authentication**: Laravel Sanctum (Bearer Token Authorization)
- **Database Support**:
  - **MySQL Laragon** (Lokal): Database `dosa&taubat`
  - **Database Cloud Aiven**: Siap dihubungkan melalui `backend/.env.aiven.example`

---

## 📋 Skema Basis Data Relasional (ERD)

1. `users` — Manajemen pengguna, role (`USER`, `SUPER_ADMIN`, `CONTENT_ADMIN`), plan (`FREE`, `PREMIUM`), streak hari bersih.
2. `categories` — 10 kategori dosa induk.
3. `sins` — Katalog topik dosa, definisi, dalil, tips pencegahan, dan kafarat.
4. `user_journeys` — Target tobat aktif per pengguna.
5. `journal_entries` — Jurnal muhasabah 5 langkah per pengguna.
6. `daily_ibadahs` — Checklist amalan shalat dan sunnah harian.
7. `dzikir_logs` — Catatan riwayat pencapaian dzikir per sesi.
8. `content_items` — CMS asatidz untuk verifikasi ayat, hadis, dan doa.
9. `bookmarks` — Topik dosa favorit pengguna.
10. `personal_access_tokens` — Laravel Sanctum token auth.

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### 1. Prasyarat Sistem
- **Node.js**: v18+ & npm
- **PHP**: 8.2+
- **Composer**: 2.x
- **Laragon / XAMPP**: MySQL Server aktif

---

### 2. Menjalankan Backend Laravel
```bash
# Masuk ke direktori backend
cd backend

# Salin konfigurasi environment
cp .env.example .env

# Pastikan MySQL Laragon aktif dan database `dosa&taubat` sudah dibuat
# Jalankan migrasi dan seeder awal
php artisan migrate --seed

# Jalankan server backend API (Port 8000)
php artisan serve --port=8000
```
> Server API akan berjalan di: `http://127.0.0.1:8000`

---

### 3. Menjalankan Frontend React
Buka terminal baru di root folder:
```bash
# Install dependensi frontend
npm install

# Jalankan server frontend Vite (Port 3000)
npm run dev
```
> Aplikasi web akan berjalan di: `http://localhost:3000`

---

## 👥 Akun Demo Pengujian

| Nama Akun | Email | Role | Paket |
| :--- | :--- | :--- | :--- |
| **Ahmad Fauzi** | `ahmad.fauzi@example.com` | `USER` | Free |
| **Citra Kirana** | `citra@example.com` | `USER` | Premium PRO |
| **Ust. Farhan Az-Zuhri, Lc.** | `farhan@taubat.app` | `CONTENT_ADMIN` | Dewan Syariah |
| **Siti Rahmah** | `admin@taubat.app` | `SUPER_ADMIN` | Super Administrator |

*(Untuk akun baru yang didaftarkan lewat form Signup, sistem otomatis memulai data dari **kondisi awal yang bersih/kosong**).*

---

## 📡 Daftar Endpoint REST API v1

- `GET  /api/health` — Status kesehatan API
- `POST /api/v1/auth/register` — Registrasi user baru
- `POST /api/v1/auth/login` — Login user
- `GET  /api/v1/auth/demo/{id}` — Login instan akun demo
- `GET  /api/v1/auth/me` — Profil user aktif
- `GET  /api/v1/categories` — List 10 kategori dosa
- `GET  /api/v1/sins` — List katalog dosa + filter & pencarian
- `GET  /api/v1/sins/{id}` — Detail panduan dosa & dalil
- `POST /api/v1/sins/{id}/bookmark` — Toggle simpan bookmark
- `GET  /api/v1/journeys` — Perjalanan taubat aktif user
- `POST /api/v1/journeys` — Mulai target perjalanan baru (Create)
- `POST /api/v1/journeys/{sinId}/relapse` — Catat relapse (Update)
- `DELETE /api/v1/journeys/{sinId}` — Hapus perjalanan (Delete)
- `GET  /api/v1/journals` — Riwayat jurnal muhasabah (Read)
- `POST /api/v1/journals` — Simpan jurnal muhasabah 5 langkah (Create)
- `DELETE /api/v1/journals/{id}` — Hapus jurnal muhasabah (Delete)
- `POST /api/v1/ibadah/toggle` — Toggle checklist ibadah harian

---

## 📄 Lisensi
Hak Cipta © 2026 Platform Dosa & Tobat. Dibuat untuk tujuan dakwah, edukasi, dan muhasabah spiritual.
