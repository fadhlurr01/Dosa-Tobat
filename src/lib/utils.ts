import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateStreak(startDate: string, lastRelapse?: string): number {
  const start = lastRelapse ? new Date(lastRelapse) : new Date(startDate);
  const now = new Date();
  return Math.max(0, differenceInDays(now, start));
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'd MMMM yyyy', { locale: id });
}
