import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, SINS } from '../data/mockData';
import { useStore } from '../store/useStore';
import { soundFx } from '../lib/soundFx';
import { 
  ChevronRight, 
  Search, 
  Shield, 
  Moon, 
  Heart, 
  MessageCircle, 
  Wallet, 
  Users, 
  Flame, 
  Smartphone, 
  Globe, 
  Leaf, 
  HelpCircle, 
  LayoutGrid, 
  List,
  Bookmark,
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  akidah: Shield,
  ibadah: Moon,
  hati: Heart,
  lisan: MessageCircle,
  harta: Wallet,
  keluarga: Users,
  syahwat: Flame,
  kecanduan: Smartphone,
  sosial: Globe,
  lingkungan: Leaf,
};

const getThumbnailUrl = (categoryId: string) => {
  const urls: Record<string, string> = {
    akidah: 'https://images.unsplash.com/photo-1519817914152-2a220bf73408?auto=format&fit=crop&w=600&q=80',
    ibadah: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
    hati: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    lisan: 'https://images.unsplash.com/photo-1478228186121-8255b4104bd1?auto=format&fit=crop&w=600&q=80',
    harta: 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=600&q=80',
    keluarga: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    syahwat: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    kecanduan: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
    sosial: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
    lingkungan: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80',
  };
  return urls[categoryId] || 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80';
};

export default function Directory() {
  const { bookmarks, toggleBookmark } = useStore();
  const [activeTab, setActiveTab] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<string>('az');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSins = useMemo(() => {
    let result = SINS.filter(sin => {
      const matchesSearch = sin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            sin.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (activeTab === 'bookmarks') {
        matchesCategory = (bookmarks || []).includes(sin.id);
      } else if (activeTab !== 'semua') {
        matchesCategory = sin.categoryId === activeTab;
      }

      return matchesSearch && matchesCategory;
    });

    if (sortOption === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [activeTab, searchQuery, sortOption, bookmarks]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-2xl font-bold text-[#065F46] dark:text-emerald-400">Direktori Dosa & Kebiasaan</h1>
        <p className="text-[#065F46] dark:text-emerald-500 opacity-80 italic font-serif mt-1">Kenali apa yang ingin kamu tinggalkan.</p>
      </header>

      {/* Baris Kontrol Utama: Cari (Icon Kanan), Urutkan, & Grid/List View (Sejajar Sempurna Sesuai Desain) */}
      <div className="flex items-center gap-2 sm:gap-3 w-full">
        {/* 1. Input Pencarian (Flex-1 dengan Ikon Kaca Pembesar di Sisi Kanan & Placeholder 'Cari...') */}
        <div className="relative flex-1 min-w-0">
          <input 
            type="text" 
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-4 pr-10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                soundFx.playTap();
                setSearchQuery('');
              }}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* 2. Dropdown Urutkan (Tinggi Seragam, Border Rounded-XL, Panah Bawah) */}
        <div className="relative shrink-0">
          <select
            value={sortOption}
            onChange={(e) => {
              soundFx.playTap();
              setSortOption(e.target.value);
            }}
            className="h-11 pl-3.5 pr-8 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer appearance-none shadow-xs"
          >
            <option value="az">Urutkan: A - Z</option>
            <option value="za">Urutkan: Z - A</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* 3. Tombol Segmented Grid View & List View (Tinggi Seragam, Desain Modern Card) */}
        <div className="h-11 flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1 shrink-0 shadow-xs">
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setViewMode('grid');
            }}
            className={`h-full px-2.5 sm:px-3 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === 'grid' 
                ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/40 shadow-xs' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
            title="Tampilan Grid (Kotak)"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setViewMode('list');
            }}
            className={`h-full px-2.5 sm:px-3 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/40 shadow-xs' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
            title="Tampilan List (Daftar Baris)"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Kategori Filter Tabs (Huruf Kapital Semua & Bold Modern) */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar scroll-smooth">
        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setActiveTab('semua');
          }}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-xs shrink-0 cursor-pointer ${
            activeTab === 'semua' 
              ? 'bg-[#065F46] dark:bg-emerald-600 text-white shadow-md' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          SEMUA ({SINS.length})
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setActiveTab('bookmarks');
          }}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'bookmarks' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/40'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          TERSIMPAN ({(bookmarks || []).length})
        </button>

        {CATEGORIES.map(cat => {
          const count = SINS.filter(s => s.categoryId === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundFx.playTap();
                setActiveTab(cat.id);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-xs shrink-0 cursor-pointer ${
                activeTab === cat.id 
                  ? 'bg-[#065F46] dark:bg-emerald-600 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.name.toUpperCase()} {count > 0 ? `(${count})` : ''}
            </button>
          );
        })}
      </div>

      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
        : "flex flex-col gap-3"}>
        {filteredSins.length > 0 ? (
          filteredSins.map(sin => {
            const IconComponent = CATEGORY_ICONS[sin.categoryId] || HelpCircle;
            const thumbUrl = (sin as any).imageUrl || getThumbnailUrl(sin.categoryId);
            
            return (
            <Link key={sin.id} to={`/dosa/${sin.id}`} className={`relative overflow-hidden bg-gradient-to-br from-white to-[#FDFBF7] dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-[#065F46]/10 dark:border-emerald-500/20 hover:shadow-md hover:border-[#065F46]/30 dark:hover:border-emerald-500/50 transition-all group flex ${viewMode === 'list' ? 'flex-row items-center h-32 sm:h-40' : 'flex-col'}`}>
              <div className={`${viewMode === 'list' ? 'w-1/3 sm:w-48 h-full shrink-0' : 'w-full h-32 sm:h-40'} bg-slate-200 dark:bg-slate-800 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={thumbUrl} 
                  alt={sin.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(sin.name)}`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-emerald-600 dark:text-emerald-400">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              
              <div className={`p-4 sm:p-5 flex flex-col flex-1 relative z-10 ${viewMode === 'list' ? 'justify-center h-full' : ''}`}>
                <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                  <IconComponent className="w-24 h-24 text-emerald-500" />
                </div>
                
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#065F46] dark:text-emerald-400 bg-[#E7F5EF] dark:bg-emerald-500/10 px-3 py-1 rounded-full mb-3 inline-flex w-fit items-center gap-1 border border-[#065F46]/5 dark:border-emerald-500/20">
                  {CATEGORIES.find(c => c.id === sin.categoryId)?.name}
                </span>
                
                <h3 className="font-bold text-[#1F2937] dark:text-slate-200 text-base sm:text-lg group-hover:text-[#065F46] dark:group-hover:text-emerald-400 transition-colors leading-tight mb-2">{sin.name}</h3>
                
                <p className={`text-xs sm:text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1 ${viewMode === 'list' ? 'line-clamp-1 sm:line-clamp-2' : 'line-clamp-2'}`}>{sin.definition}</p>
                
                {viewMode === 'grid' && (
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Lihat Detail</span>
                    <ChevronRight className="w-4 h-4 text-emerald-600/50 dark:text-emerald-400/50 group-hover:text-[#065F46] dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                )}
              </div>
            </Link>
          )})
        ) : (
          <div className="text-center py-12 md:col-span-2 lg:col-span-3">
            <p className="text-slate-500 dark:text-slate-400">Tidak ada hasil ditemukan.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
