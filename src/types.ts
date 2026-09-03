export type CategoryId = 'akidah' | 'ibadah' | 'hati' | 'lisan' | 'harta' | 'keluarga' | 'syahwat' | 'sosial' | 'kecanduan' | 'lingkungan';

export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'CONTENT_ADMIN';
export type SubscriptionPlan = 'FREE' | 'PREMIUM_MONTHLY' | 'PREMIUM_3_MONTHS' | 'PREMIUM_YEARLY';
export type ContentStatus = 'DRAFT' | 'IN_REVIEW' | 'VERIFIED' | 'PUBLISHED' | 'ARCHIVED';
export type AccountStatus = 'ACTIVE' | 'SUSPENDED';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan: SubscriptionPlan;
  status: AccountStatus;
  avatar?: string;
  title?: string;
  streakDays?: number;
  lastActive: string;
  registrationDate: string;
  isDemo?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'DOSA' | 'DOA' | 'AYAT' | 'HADIS' | 'PROGRAM';
  status: ContentStatus;
  author: string;
  reviewer?: string;
  version: number;
  lastUpdated: string;
  arabic?: string;
  translation?: string;
  reference?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Sin {
  id: string;
  categoryId: CategoryId;
  name: string;
  definition: string;
  reason: string;
  source: string;
  examples: string[];
  signs: string[];
  triggers: string[];
  impacts: string[];
  prevention: string[];
  doa?: {
    arabic: string;
    latin: string;
    translation: string;
    source: string;
  };
}

export interface UserJourney {
  sinId: string;
  startDate: string;
  lastRelapse?: string;
  status: 'STABLE' | 'TEMPTED' | 'FALLEN' | 'REPENTING' | 'REPAIRING' | 'RECOVERING';
}

export interface JournalEntry {
  id: string;
  date: string;
  mistake: string;
  trigger: string;
  hurt: string;
  fix: string;
  prevent: string;
}
