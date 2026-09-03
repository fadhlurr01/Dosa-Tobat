import { Category, Sin } from '../types';
import { ALL_SINS } from './sins';

export const CATEGORIES: Category[] = [
  { id: 'akidah', name: 'Akidah', description: 'Kesalahan keyakinan yang menodai tauhid.' },
  { id: 'ibadah', name: 'Ibadah', description: 'Kelalaian atau kesalahan dalam pelaksanaan ibadah.' },
  { id: 'hati', name: 'Hati', description: 'Penyakit hati yang merusak keikhlasan dan ketenangan.' },
  { id: 'lisan', name: 'Lisan', description: 'Dosa dan kesalahan yang bersumber dari ucapan.' },
  { id: 'harta', name: 'Harta', description: 'Dosa yang berkaitan dengan pengelolaan harta dan keuangan.' },
  { id: 'keluarga', name: 'Keluarga', description: 'Pelanggaran hak dan kewajiban dalam rumah tangga.' },
  { id: 'syahwat', name: 'Syahwat & Kehormatan', description: 'Pelanggaran terkait syahwat dan menjaga pandangan.' },
  { id: 'kecanduan', name: 'Kecanduan', description: 'Perilaku kompulsif dan adiktif yang merusak diri.' },
  { id: 'sosial', name: 'Sosial', description: 'Kezaliman terhadap sesama manusia dalam bermasyarakat.' },
  { id: 'lingkungan', name: 'Lingkungan', description: 'Tindakan merusak alam dan menyia-nyiakan nikmat.' }
];

export const SINS: Sin[] = ALL_SINS;
