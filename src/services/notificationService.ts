export type NotificationFrequency = 'ringan' | 'normal' | 'personal';

export interface NotificationPreferences {
  enabled: boolean;
  frequency: NotificationFrequency;
  journalReminderTime?: string; // Format: "HH:mm"
}

class NotificationService {
  private activeIntervals: NodeJS.Timeout[] = [];
  private permissionGranted: boolean = false;

  /**
   * Request browser notification permission
   */
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Browser ini tidak mendukung notifikasi desktop/push.');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permissionGranted = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.permissionGranted = permission === 'granted';
      return this.permissionGranted;
    }

    return false;
  }

  /**
   * Send an actual or mocked notification
   */
  private sendNotification(title: string, body: string) {
    if (this.permissionGranted && 'Notification' in window) {
      new Notification(title, {
        body,
        icon: '/vite.svg', // Fallback icon
        badge: '/vite.svg',
      });
    } else {
      // Mock fallback in console if permission is denied or not requested yet
      console.log(`🔔 [Mock Notification] ${title}: ${body}`);
    }
  }

  /**
   * Schedule encouragement and recovery reminders based on selected frequency
   */
  scheduleEncouragement(prefs: NotificationPreferences) {
    this.clearAll();

    if (!prefs.enabled) {
      console.log('🔇 Notifikasi dinonaktifkan oleh pengguna.');
      return;
    }

    let intervalHours = 0;
    
    switch (prefs.frequency) {
      case 'ringan':
        // Ringan: 1x sehari (setiap 24 jam)
        intervalHours = 24;
        break;
      case 'normal':
        // Normal: 2x sehari (setiap 12 jam)
        intervalHours = 12;
        break;
      case 'personal':
        // Personal: Sedang masa krisis/pemulihan aktif (setiap 4 jam)
        intervalHours = 4;
        break;
    }

    const intervalMs = intervalHours * 60 * 60 * 1000;

    const messages = [
      "Setiap hari adalah kesempatan baru untuk kembali.",
      "Satu langkah kecil menjauhi kebiasaan buruk sangatlah berarti.",
      "Jangan putus asa, rahmat Allah lebih luas dari dosamu.",
      "Coba ingat prinsip 5R: Recognize, Remove, Repent, Replace, Repeat.",
      "Tetap kuat! Jika terjatuh, jangan ragu untuk segera bangkit dan bertaubat."
    ];

    // Simulasikan penjadwalan dengan setInterval
    const timerId = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      this.sendNotification("Pengingat Perjalananmu 🛡️", randomMsg);
    }, intervalMs);

    this.activeIntervals.push(timerId);
    console.log(`✅ [NotificationService] Penjadwalan '${prefs.frequency}' diaktifkan. Pengingat setiap ${intervalHours} jam.`);
  }

  /**
   * Mock scheduling a daily specific time reminder (e.g., Journaling at 20:00)
   */
  scheduleDailyJournal(time: string) {
    console.log(`📖 [NotificationService] Pengingat jurnal muhasabah dijadwalkan pada pukul ${time} setiap hari.`);
    // Di aplikasi produksi nyata, ini akan menggunakan Service Worker atau Push API dari Backend
    // beserta sinkronisasi waktu UTC/Lokal pengguna.
  }

  /**
   * Clear all active scheduled mock notifications
   */
  clearAll() {
    this.activeIntervals.forEach(clearInterval);
    this.activeIntervals = [];
  }
}

export const notificationService = new NotificationService();
