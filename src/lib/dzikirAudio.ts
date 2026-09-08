/**
 * Dzikir Audio Manager
 * Provides instant, zero-latency Arabic recitation playback for Dzikir & Tasbih
 * Preloads audio assets and manages playback pool for smooth multi-tap interaction
 */

const AUDIO_FILES: Record<string, string> = {
  tasbih: 'audio/dzikir/tasbih.mp3',
  tahmid: 'audio/dzikir/tahmid.mp3',
  takbir: 'audio/dzikir/takbir.mp3',
  istighfar: 'audio/dzikir/istighfar.mp3',
  hauqalah: 'audio/dzikir/hauqalah.mp3',
  tahlil: 'audio/dzikir/tahlil.mp3'
};

class DzikirAudioManager {
  private baseAudios: Map<string, HTMLAudioElement> = new Map();
  private currentActiveAudio: HTMLAudioElement | null = null;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private resolveUrl(id: string): string {
    const filename = AUDIO_FILES[id] || `audio/dzikir/${id}.mp3`;
    // Supports both GitHub Pages subpath and local development
    const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) 
      ? import.meta.env.BASE_URL 
      : './';
    
    // Normalize path
    if (base.endsWith('/')) {
      return `${base}${filename}`;
    }
    return `${base}/${filename}`;
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Preload all audio files
    Object.keys(AUDIO_FILES).forEach((id) => {
      try {
        const url = this.resolveUrl(id);
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.baseAudios.set(id, audio);
      } catch (e) {
        console.warn('Failed to preload dzikir audio:', id, e);
      }
    });
  }

  /**
   * Plays the calm Arabic audio for the given dzikir ID
   * Uses audio cloning for zero-lag instant playback on rapid taps
   */
  public playDzikir(id: string, arabicText?: string, onEnded?: () => void): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    this.init();

    // Stop currently playing instance if any
    if (this.currentActiveAudio) {
      try {
        this.currentActiveAudio.pause();
        this.currentActiveAudio.currentTime = 0;
      } catch {
        // ignore
      }
    }

    const baseAudio = this.baseAudios.get(id);
    let audio: HTMLAudioElement;

    if (baseAudio) {
      try {
        audio = baseAudio.cloneNode(true) as HTMLAudioElement;
      } catch {
        audio = new Audio(this.resolveUrl(id));
      }
    } else {
      audio = new Audio(this.resolveUrl(id));
    }

    this.currentActiveAudio = audio;
    audio.volume = 1.0;

    if (onEnded) {
      audio.onended = () => {
        if (this.currentActiveAudio === audio) {
          this.currentActiveAudio = null;
        }
        onEnded();
      };
      audio.onerror = () => {
        if (this.currentActiveAudio === audio) {
          this.currentActiveAudio = null;
        }
        if (arabicText) {
          this.fallbackSpeak(arabicText, onEnded);
        } else {
          onEnded();
        }
      };
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Direct MP3 play rejected, falling back to speech synthesis:', err);
        if (arabicText) {
          this.fallbackSpeak(arabicText, onEnded);
        }
      });
    }

    return audio;
  }

  /**
   * Stop any playing audio
   */
  public stopAll() {
    if (this.currentActiveAudio) {
      try {
        this.currentActiveAudio.pause();
        this.currentActiveAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentActiveAudio = null;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  /**
   * Fallback to Web Speech Synthesis if browser blocks audio element
   */
  private fallbackSpeak(text: string, onEnded?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnded) onEnded();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.90;
      utterance.pitch = 0.95;

      if (onEnded) {
        utterance.onend = onEnded;
        utterance.onerror = onEnded;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      if (onEnded) onEnded();
    }
  }
}

export const dzikirAudio = new DzikirAudioManager();
