SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table dosa&taubat.bookmarks
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `sin_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmarks_user_id_sin_id_unique` (`user_id`,`sin_id`),
  KEY `bookmarks_sin_id_foreign` (`sin_id`),
  CONSTRAINT `bookmarks_sin_id_foreign` FOREIGN KEY (`sin_id`) REFERENCES `sins` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.bookmarks: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.cache: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.cache_locks: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.categories: ~10 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `thumbnail`, `sort_order`, `created_at`, `updated_at`) VALUES
	('akidah', 'Akidah & Tauhid', 'Dosa terkait keyakinan, kemurnian tauhid, dan penyekutuan Allah SWT.', 'Shield', 'https://images.unsplash.com/photo-1519817914152-2a220bf73408?auto=format&fit=crop&w=600&q=80', 1, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('harta', 'Harta & Muamalah', 'Kecurangan bisnis, riba, korupsi, judi, dan memakan hak anak yatim.', 'Wallet', 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=600&q=80', 5, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('hati', 'Penyakit Hati', 'Sifat batin yang merusak seperti hasad (dengki), riya\', sombong, dan dendam.', 'Heart', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', 3, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('ibadah', 'Ibadah & Ritual', 'Kelalaian dalam shalat, puasa, zakat, dan ibadah fardhu lainnya.', 'Moon', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80', 2, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('kecanduan', 'Kecanduan Digital & Zat', 'Khamr, judi online, media sosial berlebihan, dan ketergantungan game.', 'Smartphone', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80', 8, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('keluarga', 'Keluarga & Silaturahmi', 'Durhaka kepada orang tua, menelantarkan nafkah, dan memutus hubungan kerabat.', 'Users', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80', 6, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('lingkungan', 'Lingkungan & Makhluk Hidup', 'Perusakan alam, menyiksa hewan tanpa hak, dan membuang sampah sembarangan.', 'Leaf', 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80', 10, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('lisan', 'Lisan & Ucapan', 'Dosa perkataan seperti ghibah, dusta, fitnah, dan mencela orang lain.', 'MessageCircle', 'https://images.unsplash.com/photo-1478228186121-8255b4104bd1?auto=format&fit=crop&w=600&q=80', 4, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('sosial', 'Sosial & Hubungan Manusia', 'Kezaliman sosial, diskriminasi, menyebarkan hoaks, dan mengintimidasi.', 'Globe', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80', 9, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('syahwat', 'Syahwat & Kehormatan', 'Zina, zina mata, pornografi, khalwat, dan pelanggaran batasan aurat.', 'Flame', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80', 7, '2026-09-03 01:08:13', '2026-09-03 01:08:13');

-- Dumping structure for table dosa&taubat.content_items
CREATE TABLE IF NOT EXISTS `content_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabic` text COLLATE utf8mb4_unicode_ci,
  `latin` text COLLATE utf8mb4_unicode_ci,
  `translation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.content_items: ~4 rows (approximately)
INSERT INTO `content_items` (`id`, `title`, `type`, `arabic`, `latin`, `translation`, `reference`, `status`, `author`, `reviewer`, `version`, `created_at`, `updated_at`) VALUES
	(1, 'Hadis tentang Hakikat Taubat', 'HADIS', 'كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ', 'Kullu bani Adama khaththa-un, wa khairul khaththa-inat tawwabun.', 'Setiap anak Adam pasti sering berbuat dosa, dan sebaik-baik orang yang berbuat dosa adalah yang bertaubat.', 'H.R. Tirmidzi no. 2499', 'PUBLISHED', 'Admin Taubat', 'Ust. Farhan Az-Zuhri, Lc.', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(2, 'Keluasan Ampunan Allah', 'AYAT', 'قُلْ يَاعِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ', 'Qul ya \'ibadiyal ladzina asrafu \'ala anfusihim la taqnathu mir rahmatillah, innallaha yaghfirudz dzunuba jami\'a, innahu huwal ghafurur rahim.', 'Katakanlah: "Hai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri, janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya. Sesungguhnya Dialah Yang Maha Pengampun lagi Maha Penyayang."', 'Q.S. Az-Zumar: 53', 'PUBLISHED', 'Content Team', 'Ust. Farhan Az-Zuhri, Lc.', 2, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(3, 'Sayyidul Istighfar', 'DOA', 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', 'Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa \'abduka wa anaa \'ala \'ahdika wa wa\'dika mastatho\'tu. A\'udzu bika min syarri maa shona\'tu, abuu-u laka bini\'matika \'alayya, wa abuu-u bi dzanbii, faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta.', 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau yang telah menciptakanku, dan aku adalah hamba-Mu. Aku berada dalam perjanjian-Mu sesuai kemampuanku. Aku berlindung dari keburukan perbuatanku, aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku. Sebab tiada yang mengampuni dosa selain Engkau.', 'H.R. Bukhari no. 6306', 'PUBLISHED', 'Dewan Dakwah', 'Ust. Farhan Az-Zuhri, Lc.', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(4, 'Doa Nabi Yunus AS di Dalam Perut Ikan', 'DOA', 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', 'Laa ilaha illa anta subhaanaka innii kuntu minadh dholimiin.', 'Tidak ada Tuhan selain Engkau, Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang berbuat zalim.', 'Q.S. Al-Anbiya: 87', 'PUBLISHED', 'Dewan Dakwah', 'Ust. Farhan Az-Zuhri, Lc.', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14');

-- Dumping structure for table dosa&taubat.daily_ibadahs
CREATE TABLE IF NOT EXISTS `daily_ibadahs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `date` date NOT NULL,
  `ibadah_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `daily_ibadahs_user_id_date_ibadah_id_unique` (`user_id`,`date`,`ibadah_id`),
  CONSTRAINT `daily_ibadahs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.daily_ibadahs: ~5 rows (approximately)
INSERT INTO `daily_ibadahs` (`id`, `user_id`, `date`, `ibadah_id`, `is_completed`, `created_at`, `updated_at`) VALUES
	(1, 1, '2026-09-03', 'subuh', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(2, 1, '2026-09-03', 'dzuhur', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(3, 1, '2026-09-03', 'tilawah', 1, '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(4, 1, '2026-09-09', 'subuh', 1, '2026-09-09 00:20:33', '2026-09-09 00:20:33'),
	(5, 1, '2026-09-09', 'dzuhur', 1, '2026-09-09 00:20:33', '2026-09-09 00:20:33'),
	(6, 1, '2026-09-09', 'tilawah', 1, '2026-09-09 00:20:33', '2026-09-09 00:20:33');

-- Dumping structure for table dosa&taubat.dzikir_logs
CREATE TABLE IF NOT EXISTS `dzikir_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `preset_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count_reached` int NOT NULL,
  `session_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dzikir_logs_user_id_foreign` (`user_id`),
  CONSTRAINT `dzikir_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.dzikir_logs: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.jobs: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.job_batches: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.journal_entries
CREATE TABLE IF NOT EXISTS `journal_entries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `sin_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `mistake` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trigger` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hurt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fix` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prevent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mood` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journal_entries_user_id_foreign` (`user_id`),
  CONSTRAINT `journal_entries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.journal_entries: ~0 rows (approximately)
INSERT INTO `journal_entries` (`id`, `user_id`, `sin_id`, `date`, `mistake`, `trigger`, `hurt`, `fix`, `prevent`, `mood`, `created_at`, `updated_at`) VALUES
	(1, 1, NULL, '2026-09-02', 'Terbawa suasana mengeluh berlebihan saat terjebak macet.', 'Kelelahan setelah pulang kerja larut malam.', 'Diri sendiri, hati jadi gelisah dan lalai mengingat nikmat.', 'Segera beristighfar dan menggantinya dengan menyetel murottal.', 'Siapkan playlist dzikir petang di kendaraan.', 'LEGA', '2026-09-03 01:08:14', '2026-09-03 01:08:14'),
	(2, 1, NULL, '2026-09-08', 'Terbawa suasana mengeluh berlebihan saat terjebak macet.', 'Kelelahan setelah pulang kerja larut malam.', 'Diri sendiri, hati jadi gelisah dan lalai mengingat nikmat.', 'Segera beristighfar dan menggantinya dengan menyetel murottal.', 'Siapkan playlist dzikir petang di kendaraan.', 'LEGA', '2026-09-09 00:20:33', '2026-09-09 00:20:33'),
	(3, 11, NULL, '2026-09-09', 'Terlambat sholat subuh berjamaah', 'Tidur larut malam', 'Diri sendiri merasa bersalah dan lesu', 'Sholat taubat dan sedekah pagi', 'Pasang alarm ganda dan tidur sebelum jam 10 malam', NULL, '2026-09-09 00:54:22', '2026-09-09 00:54:22');

-- Dumping structure for table dosa&taubat.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.migrations: ~0 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2026_09_03_074826_create_personal_access_tokens_table', 1),
	(5, '2026_09_03_100000_create_categories_table', 1),
	(6, '2026_09_03_100001_create_sins_table', 1),
	(7, '2026_09_03_100002_create_user_journeys_table', 1),
	(8, '2026_09_03_100003_create_journal_entries_table', 1),
	(9, '2026_09_03_100004_create_daily_ibadahs_table', 1),
	(10, '2026_09_03_100005_create_dzikir_logs_table', 1),
	(11, '2026_09_03_100006_create_content_items_table', 1),
	(12, '2026_09_03_100007_create_bookmarks_table', 1),
	(13, '2026_09_08_033057_add_phone_to_users_table', 2);

-- Dumping structure for table dosa&taubat.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table dosa&taubat.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.personal_access_tokens: ~10 rows (approximately)
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
	(7, 'App\\Models\\User', 4, 'demo_token', 'fdf82805860d5281206260f453a1e9d005effd93669cbcec1ec036f718fc04a3', '["*"]', NULL, NULL, '2026-09-07 01:45:26', '2026-09-07 01:45:26'),
	(9, 'App\\Models\\User', 4, 'demo_token', 'fc2d1db5838c6278f2f18672cbc40b69176cf2d143d6dd121f9ab53773283a88', '["*"]', NULL, NULL, '2026-09-07 01:46:00', '2026-09-07 01:46:00'),
	(11, 'App\\Models\\User', 4, 'demo_token', '0b5656f7baa9ee037bf316abc1e5de00194b39a572280d066c4b65a1bf0edf3e', '["*"]', NULL, NULL, '2026-09-07 01:54:02', '2026-09-07 01:54:02'),
	(12, 'App\\Models\\User', 1, 'demo_token', 'f125613646e571128692773ec22b3fce1418e045326d2fdf6ccdae68d1c481ff', '["*"]', NULL, NULL, '2026-09-07 02:08:48', '2026-09-07 02:08:48'),
	(13, 'App\\Models\\User', 4, 'demo_token', '8cb27166146c022872a2341ea1a8d1a5b989d13d3f93c57ef61e65290d2c4d67', '["*"]', NULL, NULL, '2026-09-07 02:08:51', '2026-09-07 02:08:51'),
	(15, 'App\\Models\\User', 4, 'demo_token', '01cf12015005f2600a2a44230ed22ec679a6274b55f056aef0aa23e7624dfe7b', '["*"]', NULL, NULL, '2026-09-07 02:23:10', '2026-09-07 02:23:10'),
	(16, 'App\\Models\\User', 4, 'demo_token', '58c759fdc18717274b138a064e763a3fbd929afa611334953d2450827c9c32ee', '["*"]', NULL, NULL, '2026-09-07 02:23:28', '2026-09-07 02:23:28'),
	(17, 'App\\Models\\User', 4, 'demo_token', '3e0357aa1cbe04dd8abd4b7a87d6e1f42d04a0fc244fae952aac4e600c379b71', '["*"]', NULL, NULL, '2026-09-07 16:26:47', '2026-09-07 16:26:47'),
	(18, 'App\\Models\\User', 9, 'auth_token', 'c2b71f7a9772a83e02678a8380585f176ead662773327ca6025e78ffdd93059b', '["*"]', NULL, NULL, '2026-09-07 16:28:40', '2026-09-07 16:28:40'),
	(19, 'App\\Models\\User', 9, 'auth_token', '43e7546287cd1e9c450cfdde14b418fd2b75378bc62259c9147979394f2c1f75', '["*"]', NULL, NULL, '2026-09-09 00:39:26', '2026-09-09 00:39:26'),
	(20, 'App\\Models\\User', 10, 'auth_token', '4a78b4fd02773aa462bab24d131f4e6011a15a6709a6d2b85f5ed5314b74b12d', '["*"]', NULL, NULL, '2026-09-09 00:39:52', '2026-09-09 00:39:52'),
	(21, 'App\\Models\\User', 11, 'auth_token', '851520465f7bc4a2bfa56bf6202e5adbca73f9722b02f90662c8a1a4783e57c8', '["*"]', NULL, NULL, '2026-09-09 00:54:15', '2026-09-09 00:54:15'),
	(22, 'App\\Models\\User', 11, 'auth_token', '183c5d1f81a67947f10844abfb858f0a9622b10d93e1d2181da6647c553cf8b7', '["*"]', '2026-09-09 00:54:25', NULL, '2026-09-09 00:54:18', '2026-09-09 00:54:25'),
	(23, 'App\\Models\\User', 10, 'auth_token', '223f91e8f0b67fed0f9549552fccd17530c5c92e11eb7f4bc263bae8ee6e063f', '["*"]', '2026-09-09 02:56:52', NULL, '2026-09-09 02:56:51', '2026-09-09 02:56:52'),
	(24, 'App\\Models\\User', 12, 'auth_token', '3c6708ff12ea4fa82554df8042f61b1fe73a35dff63af82bbdf5d314bdfc9172', '["*"]', NULL, NULL, '2026-09-09 16:56:15', '2026-09-09 16:56:15');

-- Dumping structure for table dosa&taubat.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.sessions: ~2 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('Cojk3JIb1BXaJsE3hZG5kRfa1tG8EcuRBpXG70D7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNzJEb0w2cHRGeVpMYWZOeGt3U080cXNxWTgwV3hhakpLSmpEd01zYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788946818),
	('qiVZmBc4x0NM6YlKuTwlyVqlh01jyb7qYXc4cIUr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVENOTVNSMTd6TnJGY0lTSk5rWHlwZTNRelhCNWJneDBSMUphR0F2eCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788940437),
	('w0zfMmuE66A7XksruJeJjIpU0hg69ENoBXG8v1m5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOU5BaGpLeDhIVU1OR1J1a0JiT0xQMWpxSVJQUTZpNzZHdDU4VUgwMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788841090),
	('zt2lHypzAbLwp8bAxyMDAVdDEWXbFRRslXKG0fmJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia05PT2tVV2FKOXpiYjhSSUgwTEhVZkYyMWMzd2Q4eGVWOGlmWGIwNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788754836);

-- Dumping structure for table dosa&taubat.sins
CREATE TABLE IF NOT EXISTS `sins` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `definition` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` text COLLATE utf8mb4_unicode_ci,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SEDANG',
  `signs` json DEFAULT NULL,
  `consequences` json DEFAULT NULL,
  `prevention` json DEFAULT NULL,
  `fast_recovery_tips` json DEFAULT NULL,
  `kafarat_instructions` json DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bookmarks_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sins_category_id_foreign` (`category_id`),
  CONSTRAINT `sins_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.sins: ~8 rows (approximately)
INSERT INTO `sins` (`id`, `category_id`, `name`, `definition`, `source`, `reason`, `level`, `signs`, `consequences`, `prevention`, `fast_recovery_tips`, `kafarat_instructions`, `image_url`, `bookmarks_count`, `created_at`, `updated_at`) VALUES
	('ghibah', 'lisan', 'Ghibah & Menggunjing', 'Membicarakan aib atau keburukan saudara sesama muslim yang ia benci jika mengetahuinya, meskipun yang dibicarakan benar adanya.', 'Q.S. Al-Hujurat: 12', 'Dan janganlah menggunjing satu sama lain. Adakah seorang diantara kamu yang suka memakan daging saudaranya yang sudah mati? Maka tentulah kamu merasa jijik kepadanya.', 'SEDANG', '["Merasa asyik saat obrolan mulai menjelekkan orang", "Menyindir aib seseorang di media sosial", "Bertanya kabar hanya untuk menggali kelemahan orang"]', '["Pahala kebaikan ditransfer kepada orang yang dighibahi di akhirat", "Mencemari hati dan menghilangkan nur ibadah", "Meruntuhkan tali ukhuwah"]', '["Alihkan topik obrolan saat ghibah dimulai", "Tinggalkan majelis obrolan yang unfaedah", "Tahan lisan dengan berdzikir saat ingin berkomentar"]', '["Membaca Doa Kafaratul Majlis", "Puji kebaikan orang yang dighibahi di hadapan orang lain"]', '["Memohon maaf langsung jika tidak menimbulkan mudharat yang lebih besar", "Mendoakan ampunan dan kebaikan untuk orang yang dighibahi", "Bersedekah atas nama orang tersebut"]', 'https://images.unsplash.com/photo-1478228186121-8255b4104bd1?auto=format&fit=crop&w=600&q=80', 312, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('hasad', 'hati', 'Hasad & Dengki', 'Merasa tidak senang atas nikmat yang diperoleh orang lain disertai keinginan agar nikmat tersebut hilang dari mereka.', 'H.R. Abu Dawud no. 4903', 'Jauhilah hasad (dengki), karena hasad itu memakan kebaikan sebagaimana api memakan kayu bakar.', 'SEDANG', '["Hati sesak saat melihat teman sukses", "Senang melihat orang lain ditimpa kesulitan", "Sering membandingkan nasib diri dengan orang lain"]', '["Menghabiskan energi batin dalam kepalsuan", "Merusak keikhlasan dan menghanguskan pahala", "Menimbulkan permusuhan"]', '["Mendoakan keberkahan bagi orang yang mendapat nikmat (Barakallahu lak)", "Membatasi konsumsi flexing di media sosial", "Fokus pada potensi diri sendiri"]', '["Ucapkan: Masya Allah Laa Quwwata Illa Billah", "Kirimkan hadiah atau sedekah atas nama orang yang dihasadi"]', '["Mendoakan kebaikan bagi orang yang kita dengki secara tulus", "Memperbanyak rasa syukur atas karunia yang ada"]', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', 195, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('judi-online', 'kecanduan', 'Judi Online & Slot Gacor', 'Mempertaruhkan harta dalam permainan untung-untungan digital yang menjanjikan kemenangan semu dan memicu kehancuran ekonomi.', 'Q.S. Al-Ma\'idah: 90', 'Sesungguhnya (meminum) khamr, berjudi, (berkorban untuk) berhala, mengundi nasib dengan panah, adalah termasuk perbuatan syaitan. Maka jauhilah perbuatan-perbuatan itu agar kamu mendapat keberuntungan.', 'BERAT', '["Terus ingin membalas kekalahan (chasing losses)", "Meminjam uang atau menjual barang berharga untuk deposit", "Emosi meledak-ledak saat kalah"]', '["Kehancuran finansial total dan hutang menumpuk", "Keretakan rumah tangga dan keluarga", "Gangguan mental dan kecemasan tinggi"]', '["Tutup akun dan hapus seluruh aplikasi perbankan digital pemicu", "Serahkan kendali keuangan sementara kepada pasangan / orang tua", "Blokir nomor kontak agen judi"]', '["Hapus nomor rekening penampung", "Buka Jurnal Taubat dan akui kerugian tanpa kompromi"]', '["Taubat nasuha dan berhenti total tanpa mencoba sekali lagi", "Bekerja halal dan menata kembali keuangan secara bertahap"]', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80', 389, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('marah', 'hati', 'Kemarahan Buta & Emosi Meledak', 'Ketidakmampuan mengendalikan amarah sehingga melontarkan kata-kata kasar, memaki, atau merusak.', 'H.R. Bukhari no. 6116', 'Janganlah kamu marah, niscaya bagimu surga.', 'SEDANG', '["Detak jantung berdegup kencang dan tangan gemetar saat tersinggung", "Membentak orang terdekat secara spontan", "Melempar atau membanting barang"]', '["Menimbulkan luka batin mendalam bagi orang tercinta", "Menyesal di kemudian hari", "Dikuasai oleh setan"]', '["Ubah posisi fisik: jika berdiri duduklah, jika duduk berbaringlah", "Diam dan jangan berbicara sepatah kata pun saat marah", "Segera berwudhu dengan air dingin"]', '["Membaca Ta\'awwudz: A\'udzu billahi minasy syaithanir rajim", "Minum air putih seteguk demi seteguk"]', '["Minta maaf secara tulus kepada pihak yang dibentak", "Bersedekah dan berdzikir penenang jiwa"]', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', 240, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('meninggalkan-shalat', 'ibadah', 'Meninggalkan Shalat Fardhu', 'Sengaja melalaikan atau meninggalkan shalat lima waktu hingga keluar dari batas waktu yang ditetapkan.', 'Q.S. Maryam: 59', 'Maka datanglah sesudah mereka, pengganti (yang jelek) yang menyia-nyiakan shalat dan memperturutkan hawa nafsunya, maka mereka kelak akan menemui kesesatan.', 'BERAT', '["Menunda shalat hingga menit-menit akhir", "Merasa berat saat adzan berkumandang", "Mengutamakan urusan duniawi tanpa jeda"]', '["Hilangnya keberkahan waktu dan rezeki", "Hati menjadi gelap dan mudah tergoda maksiat lain", "Ancaman siksa kubur yang pedih"]', '["Pasang pengingat adzan di gawai", "Wudhu 10 menit sebelum waktu shalat tiba", "Shalat berjamaah di masjid bagi laki-laki"]', '["Segera ambil air wudhu", "Lakukan shalat yang terlewat (qadha\') seketika", "Sujud taubat memohon ampunan"]', '["Meng-qadha shalat yang tertinggal", "Bertaubat nasuha dan bertekad menjaga shalat tepat waktu", "Menambah shalat sunnah rawatib"]', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80', 280, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('riba', 'harta', 'Transaksi Riba & Pinjol Ilegal', 'Pengambilan tambahan nilai pinjaman atau transaksi keuangan yang diharamkan syariat dan mengeksploitasi sesama.', 'Q.S. Al-Baqarah: 275', 'Allah telah menghalalkan jual beli dan mengharamkan riba.', 'BERAT', '["Terbiasa dengan sistem kredit berbunga tanpa rasa bersalah", "Gali lubang tutup lubang pinjaman konsumtif", "Menganggap bunga bank hal lumrah"]', '["Diumumkan perang oleh Allah dan Rasul-Nya", "Harta tidak membawa ketenangan jiwa", "Doa-doa tertolak"]', '["Hidup sesuai kemampuan (qana\'ah)", "Gunakan instrumen perbankan syariah murni", "Hindari gaya hidup konsumtif berlebihan"]', '["Hentikan akad baru pinjaman berbunga seketika", "Konsultasikan pelunasan pokok secara syar\'i"]', '["Bertaubat nasuha dan melunasi sisa hutang pokok secepatnya", "Menyalurkan kelebihan bunga ke fasilitas umum tanpa niat pahala sedekah"]', 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=600&q=80', 178, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('syirik-kecil', 'akidah', 'Syirik Kecil & Riya\'', 'Mengharapkan pujian makhluk dalam beribadah atau beramal sholeh, serta bersumpah dengan selain nama Allah.', 'Q.S. Al-Kahf: 110', 'Barangsiapa mengharap perjumpaan dengan Tuhannya, maka hendaklah ia mengerjakan amal yang saleh dan janganlah ia mempersekutukan seorangpun dalam beribadat kepada Tuhannya.', 'BERAT', '["Semangat beramal jika dilihat orang lain", "Malas jika sendirian", "Gelisah jika kebaikan tidak diakui"]', '["Gugurnya pahala amal", "Hati senantiasa bergantung pada sanjungan manusia", "Kekeringan spiritual"]', '["Menyembunyikan sedekah dan shalat sunnah", "Membaca doa penangkal riya\' setiap pagi", "Mengingat fana-nya pujian manusia"]', '["Segera beristighfar 3x saat terbersit ingin dipuji", "Lakukan satu amal rahasia yang tidak diketahui siapapun"]', '["Membaca doa: Allahumma inni a\'udzu bika an usyrika bika wa ana a\'lam...", "Memperbanyak sedekah secara sembunyi-sembunyi"]', 'https://images.unsplash.com/photo-1519817914152-2a220bf73408?auto=format&fit=crop&w=600&q=80', 142, '2026-09-03 01:08:13', '2026-09-03 01:08:13'),
	('zina-mata', 'syahwat', 'Zina Mata & Pornografi', 'Memandang aurat atau konten sensual yang diharamkan, memicu syahwat liar di dunia maya maupun nyata.', 'Q.S. An-Nur: 30', 'Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandangannya, dan memelihara kemaluannya; yang demikian itu adalah lebih suci bagi mereka.', 'BERAT', '["Scrolling feed sensual larut malam saat sendirian", "Membuka tab incognito untuk konten terlarang", "Mata liar melirik saat berada di tempat umum"]', '["Kerusakan reseptor dopamin otak (prefrontal cortex)", "Hilangnya kenikmatan dalam ibadah dan hubungan halal", "Kecanduan kronis"]', '["Aktifkan Mode Darurat SOS 90-Detik saat terpicu", "Letakkan gadget di luar kamar tidur pada malam hari", "Pasang filter DNS anti-konten dewasa"]', '["Segera basuh wajah dengan air wudhu dingin", "Tinggalkan ruangan isolasi dan temui orang lain seketika", "Lakukan teknik pernapasan 4-4-4"]', '["Shalat sunnah taubat 2 rakaat", "Istighfar 100x dan bersedekah sebagai bentuk denda atas diri sendiri"]', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80', 520, '2026-09-03 01:08:13', '2026-09-03 01:08:13');

-- Dumping structure for table dosa&taubat.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `plan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FREE',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `streak_days` int NOT NULL DEFAULT '0',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_demo` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.users: ~6 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `email_verified_at`, `password`, `role`, `plan`, `status`, `streak_days`, `avatar`, `title`, `is_demo`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Ahmad Fauzi (Pengguna)', 'ahmad.fauzi@example.com', NULL, NULL, '$2y$12$xuibzuV6Xjnet78jAs/CbOfbWq9eLWLzftS.BqDRUAGGjmQH2D2/2', 'USER', 'FREE', 'ACTIVE', 14, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', 'Pengguna Istiqomah (Level 2)', 1, NULL, '2026-09-03 01:08:14', '2026-09-09 01:47:23'),
	(2, 'Fulan bin Abdullah (PRO)', 'fulan.pro@example.com', NULL, NULL, '$2y$12$MZMXWvrhhbkFNzoGG846SOA2O8mUj0WEQE8FXoqmhuXI46PBZx.Ce', 'USER', 'PREMIUM_MONTHLY', 'ACTIVE', 45, 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80', 'PRO Member - Pejuang Taubat', 1, NULL, '2026-09-03 01:08:14', '2026-09-09 01:47:23'),
	(3, 'Ust. Farhan Az-Zuhri, Lc.', 'ustadz.farhan@taubat.app', NULL, NULL, '$2y$12$3bQkMnAhEOhTqTmnFOJmDeIa0ZfYKwmofKvWud2D4EDcNFwlSziTK', 'CONTENT_ADMIN', 'PREMIUM_YEARLY', 'ACTIVE', 90, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'Dewan Syariah & Reviewer Konten', 1, NULL, '2026-09-03 01:08:14', '2026-09-09 01:47:23'),
	(4, 'Siti Rahmah (Super Admin)', 'admin@taubat.app', NULL, NULL, '$2y$12$Z9iwtcF6U9qEYOBEJkatoep9cf01rooNgMSgHywMESLKTGUViwUTC', 'SUPER_ADMIN', 'PREMIUM_YEARLY', 'ACTIVE', 120, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'Platform Super Administrator', 1, NULL, '2026-09-03 01:08:14', '2026-09-09 01:47:23'),
	(9, 'fulan', 'abc@gmail.com', NULL, NULL, '$2y$12$SoL229xobW5x8Q4PfyVosuZfYArtJFhFE2EzNj5j83kq44mrbRMAS', 'USER', 'FREE', 'ACTIVE', 1, NULL, NULL, 0, NULL, '2026-09-07 16:28:40', '2026-09-07 16:28:40'),
	(10, 'Fulan', 'fulan@gmail.com', '08992233645', NULL, '$2y$12$dzaJbE5BUXZTeYNlInxh0eyECD/EW9dUzCGBwlkK5BvJvDkHbEwLq', 'USER', 'FREE', 'ACTIVE', 0, NULL, NULL, 0, NULL, '2026-09-09 00:39:52', '2026-09-09 00:39:52'),
	(11, 'User Baru', 'userbaru99@taubat.app', NULL, NULL, '$2y$12$sohY6PkR7UfL0cqsvxSCxOdBvbvgu.CV1DkUiW8zp88gSx2RaZCSq', 'USER', 'FREE', 'ACTIVE', 0, NULL, NULL, 0, NULL, '2026-09-09 00:54:15', '2026-09-09 00:54:15'),
	(12, 'fulan', 'fulanaa@gmail.com', '08129319238912', NULL, '$2y$12$5i28tMyPot8AwMqdzi2HQOvyr/mE/HN/92qwrxVM4QIL2j7p76lVe', 'USER', 'FREE', 'ACTIVE', 0, NULL, NULL, 0, NULL, '2026-09-09 16:56:15', '2026-09-09 16:56:15');

-- Dumping structure for table dosa&taubat.user_journeys
CREATE TABLE IF NOT EXISTS `user_journeys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `sin_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` timestamp NOT NULL,
  `last_relapse` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STABLE',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_journeys_user_id_sin_id_unique` (`user_id`,`sin_id`),
  KEY `user_journeys_sin_id_foreign` (`sin_id`),
  CONSTRAINT `user_journeys_sin_id_foreign` FOREIGN KEY (`sin_id`) REFERENCES `sins` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_journeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dosa&taubat.user_journeys: ~2 rows (approximately)
INSERT INTO `user_journeys` (`id`, `user_id`, `sin_id`, `start_date`, `last_relapse`, `status`, `notes`, `created_at`, `updated_at`) VALUES
	(1, 1, 'marah', '2026-08-26 01:47:23', NULL, 'STABLE', 'Menjaga lisan dan menahan emosi di rumah.', '2026-09-03 01:08:14', '2026-09-09 01:47:23'),
	(2, 1, 'ghibah', '2026-09-04 01:47:23', '2026-09-07 01:47:23', 'RECOVERING', 'Menjauhi obrolan unfaedah saat jam istirahat.', '2026-09-03 01:08:14', '2026-09-09 01:47:23');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

SET FOREIGN_KEY_CHECKS = 1;

