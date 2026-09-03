import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Copy, Check, Sparkles, BookOpen, Heart } from 'lucide-react';
import ReligiousCard from '../components/ui/ReligiousCard';
import { soundFx } from '../lib/soundFx';

const DOAS = [
  {
    id: 'sayyidul-istighfar',
    title: 'Sayyidul Istighfar (Penghulu Istighfar)',
    category: 'Taubat Utama',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: 'Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa \'abduka wa anaa \'ala \'ahdika wa wa\'dika mastatho\'tu. A\'udzu bika min syarri maa shona\'tu, abuu-u laka bini\'matika \'alayya, wa abuu-u bi dzanbii, faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta.',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau yang telah menciptakanku, dan aku adalah hamba-Mu. Aku berada dalam perjanjian-Mu sesuai kemampuanku. Aku berlindung dari keburukan perbuatanku, aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku.',
    reference: 'H.R. Bukhari no. 6306'
  },
  {
    id: 'doa-nabi-adam',
    title: 'Doa Taubat Nabi Adam AS & Siti Hawa',
    category: 'Penyesalan Dosa',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    latin: 'Robbana dholamna anfusana wa inlam taghfirlana watarhamna lanakuunanna minal khosiriin.',
    translation: 'Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.',
    reference: 'Q.S. Al-A\'raf: 23'
  },
  {
    id: 'doa-nabi-yunus',
    title: 'Doa Nabi Yunus AS (Dzun Nun di Dalam Kegelapan)',
    category: 'Pelepas Kesulitan & Dosa',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    latin: 'Laa ilaha illa anta subhaanaka innii kuntu minadh dholimiin.',
    translation: 'Tidak ada Tuhan selain Engkau, Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang berbuat zalim.',
    reference: 'Q.S. Al-Anbiya: 87'
  },
  {
    id: 'doa-keteguhan-hati',
    title: 'Doa Keteguhan Iman & Perlindungan Hati',
    category: 'Pencegahan Maksiat',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    latin: 'Yaa muqollibal quluub, tsabbit qolbii \'ala diinik.',
    translation: 'Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.',
    reference: 'H.R. Tirmidzi no. 2140'
  },
  {
    id: 'kafaratul-majlis',
    title: 'Doa Kafaratul Majelis (Pembersih Dosa Lisan)',
    category: 'Pembersih Lisan',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    latin: 'Subhanakallahumma wa bihamdika asyhadu an laa ilaha illa anta astaghfiruka wa atuubu ilaik.',
    translation: 'Maha Suci Engkau ya Allah, dengan memuji-Mu aku bersaksi bahwa tidak ada Tuhan selain Engkau, aku memohon ampunan dan bertaubat kepada-Mu.',
    reference: 'H.R. Abu Dawud & Tirmidzi'
  }
];

export default function Doa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDoas = useMemo(() => {
    if (!searchQuery.trim()) return DOAS;
    const q = searchQuery.toLowerCase();
    return DOAS.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.translation.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.latin.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCopy = (id: string, text: string) => {
    soundFx.playCheck();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12 max-w-2xl mx-auto"
    >
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight">
          Kumpulan Doa & Munajat
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-serif italic">
          Lantunkan doa tulus untuk memohon ampunan, keteguhan hati, dan pembersihan jiwa.
        </p>
      </header>

      {/* Search Input */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Cari nama doa, dalil, atau terjemahan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-900 rounded-2xl text-xs sm:text-sm border border-slate-200/80 dark:border-slate-800 focus:ring-2 focus:ring-[#065F46] dark:focus:ring-emerald-500 outline-none transition-all dark:text-slate-200 shadow-xs"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
          <Search className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredDoas.map((doa, idx) => (
          <motion.div
            key={doa.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.05, duration: 0.35 }}
            className="relative"
          >
            <ReligiousCard
              type="DOA"
              title={doa.title}
              arabic={doa.arabic}
              latin={doa.latin}
              translation={doa.translation}
              reference={doa.reference}
            />

            {/* Quick Copy Button */}
            <button
              onClick={() => handleCopy(doa.id, `${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"\n(${doa.reference})`)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all active:scale-95 shadow-2xs z-20 cursor-pointer"
              title="Salin Teks Doa Lengkap"
            >
              {copiedId === doa.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salin</span>
                </>
              )}
            </button>
          </motion.div>
        ))}

        {filteredDoas.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada doa yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
