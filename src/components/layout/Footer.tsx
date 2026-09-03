import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-12 py-8 px-4 border-t border-slate-100 dark:border-slate-800/50 bg-transparent transition-colors">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="flex items-center justify-center gap-2 text-[#065F46] dark:text-emerald-500 opacity-80">
          <Shield className="w-5 h-5" />
          <span className="font-extrabold tracking-tight">DOSA & TOBAT™</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Aplikasi pendamping perjalanan hijrah Anda. Membantu menyadari, memperbaiki, dan menjaga diri dengan konsisten.
        </p>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Landing Page</Link>
          <Link to="/app" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Beranda</Link>
          <Link to="/direktori" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Direktori</Link>
          <Link to="/profil" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Profil</Link>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-4">
          <span>&copy; {currentYear} Dosa & Tobat. Dibuat dengan</span>
          <Heart className="w-3 h-3 text-rose-500 inline-block mx-0.5" />
          <span>untuk kebaikan.</span>
        </div>
      </div>
    </footer>
  );
}
