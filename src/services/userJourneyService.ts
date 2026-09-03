export type Framework5R = 'recognize' | 'remove' | 'repent' | 'replace' | 'repeat';

export interface FiveRProgress {
  recognize: boolean; // Langkah 1: Kenali dosa dan polanya
  remove: boolean;    // Langkah 2: Hilangkan pemicu dan akses
  repent: boolean;    // Langkah 3: Berhenti, menyesal, minta ampun
  replace: boolean;   // Langkah 4: Ganti dengan kebiasaan baik
  repeat: boolean;    // Langkah 5: Konsisten dan bangkit saat jatuh
}

export interface UserJourney {
  id: string;
  sinId: string;
  startDate: string; // Waktu mulai (ISO String)
  relapseDates: string[]; // Mencatat tanggal jatuh tanpa mereset perhitungan hari
  progress5R: FiveRProgress;
  isActive: boolean;
}

class UserJourneyService {
  /**
   * Menghitung "Hari Perjuangan" (Days of Struggle).
   * Alih-alih menggunakan "Streak" yang rentan membuat putus asa ketika direset ke 0,
   * metrik ini menghitung total waktu yang didedikasikan untuk melawan kebiasaan buruk.
   */
  calculateHariPerjuangan(startDate: string): number {
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    
    // Perbedaan dalam milidetik diubah ke hari
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    
    // Minimal 1 hari jika baru mulai hari ini
    return Math.max(1, diffDays); 
  }

  /**
   * Menentukan fokus tahap 5R saat ini berdasarkan progres pengguna.
   */
  getCurrentStage(progress: FiveRProgress): Framework5R | 'completed' {
    if (!progress.recognize) return 'recognize';
    if (!progress.remove) return 'remove';
    if (!progress.repent) return 'repent';
    if (!progress.replace) return 'replace';
    if (!progress.repeat) return 'repeat';
    return 'completed';
  }

  /**
   * Mengembalikan deskripsi langkah 5R saat ini.
   */
  getStageDescription(stage: Framework5R | 'completed'): string {
    const descriptions: Record<string, string> = {
      recognize: 'Identifikasi dosa spesifik, pola, dan dampaknya.',
      remove: 'Putus akses, jauhi pemicu, dan blokir godaan.',
      repent: 'Minta ampun dengan tulus dan perbaiki akibatnya.',
      replace: 'Isi ruang kosong dengan kebiasaan baru yang positif.',
      repeat: 'Pertahankan sistem. Jika jatuh, bangkit dan ulangi.',
      completed: 'Perjuangan telah menjadi karakter kuat.'
    };
    return descriptions[stage];
  }

  /**
   * Mencatat "jatuh" (relapse) tanpa menghancurkan progres Hari Perjuangan.
   * Filosofi: Jatuh adalah bagian dari proses belajar, bukan kembali ke titik nol.
   */
  recordStumble(journey: UserJourney): UserJourney {
    return {
      ...journey,
      relapseDates: [...journey.relapseDates, new Date().toISOString()]
    };
  }

  /**
   * Menghitung Skor Ketahanan (Resilience Score).
   * Mengevaluasi kekuatan perjuangan berdasarkan seberapa jarang jatuh
   * dibandingkan dengan total durasi perjuangan.
   */
  calculateResilienceScore(journey: UserJourney): number {
    const totalDays = this.calculateHariPerjuangan(journey.startDate);
    const stumbleCount = journey.relapseDates.length;
    
    if (stumbleCount === 0) return 100;
    
    // Penalti dihitung proporsional. Jatuh 1 kali dalam 30 hari = nilai tetap tinggi.
    const penaltyRate = stumbleCount / Math.max(1, totalDays);
    const resilience = Math.max(0, 100 - (penaltyRate * 100));
    
    return Math.round(resilience);
  }
}

export const userJourneyService = new UserJourneyService();
