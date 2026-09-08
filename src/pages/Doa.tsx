import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Copy, Check, Sparkles, Heart, BookOpen, Volume2 } from 'lucide-react';
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
    arabic: 'قَالَا رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    latin: 'Qoolaa Robbanaa dholamnaa anfusanaa wa illam taghfir lanaa wa tarhamnaa lanakuunanna minal khoosiriin.',
    translation: 'Keduanya berkata: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi."',
    reference: 'QS. Al-A\'raf: 23'
  },
  {
    id: 'doa-nabi-yunus',
    title: 'Doa Nabi Yunus AS (Pelepas Kesulitan & Taubat)',
    category: 'Pelepas Kesulitan & Dosa',
    arabic: 'وَذَا النُّونِ إِذْ ذَهَبَ مُغَاضِبًا فَظَنَّ أَنْ لَنْ نَقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    latin: 'Wa dzan-nuuni idz dzahaba mughoodhiban fazhonna al lan naqdira \'alaihi fa naadaa fizh-zhulumaati al laa ilaaha illaa anta subhaanaka innii kuntu minazh-zhaalimiin.',
    translation: 'Dan (ingatlah kisah) Dzun Nun (Yunus), ketika dia pergi dalam keadaan marah, lalu dia menyangka bahwa Kami tidak akan menyulitkannya, maka dia berdoa dalam kegelapan: "Tidak ada Tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang-orang yang berbuat zalim."',
    reference: 'QS. Al-Anbiya: 87'
  },
  {
    id: 'doa-ali-imran-8',
    title: 'Doa Keteguhan Iman Setelah Hidayah',
    category: 'Pencegahan Maksiat',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً ۚ إِنَّكَ أَنْتَ الْوَهَّابُ',
    latin: 'Robbanaa laa tuzigh quluubanaa ba\'da idz hadaitanaa wa hab lanaa mil ladunka rohmah, innaka antal wahhaab.',
    translation: '(Mereka berdoa): "Ya Tuhan kami, janganlah Engkau condongkan hati kami kepada kesesatan setelah Engkau berikan petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi-Mu. Sesungguhnya Engkau Maha Pemberi."',
    reference: 'QS. Ali \'Imran: 8'
  },
  {
    id: 'doa-ali-imran-16',
    title: 'Doa Pengakuan Iman & Permohonan Ampun',
    category: 'Penghapus Dosa',
    arabic: 'الَّذِينَ يَقُولُونَ رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Alladziina yaquuluuna Robbanaa innanaa aamannaa faghfir lanaa dzunuubanaa waqinaa \'adzaaban naar.',
    translation: '(Yaitu) orang-orang yang berdoa: "Ya Tuhan kami, sesungguhnya kami telah beriman, maka ampunilah dosa-dosa kami dan selamatkanlah kami dari siksa neraka."',
    reference: 'QS. Ali \'Imran: 16'
  },
  {
    id: 'doa-sapu-jagad',
    title: 'Doa Sapu Jagad (Kebaikan Dunia & Akhirat)',
    category: 'Kebaikan Menyeluruh',
    arabic: 'وَمِنْهُمْ مَنْ يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Wa minhum may yaquulu Robbanaa aatinaa fid dunyaa hasanatan wa fil aakhiroti hasanatan wa qinaa \'adzaaban naar.',
    translation: 'Dan di antara mereka ada yang berdoa: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."',
    reference: 'QS. Al-Baqarah: 201'
  },
  {
    id: 'doa-hasyr-10',
    title: 'Doa Pembersih Hati dari Kedengkian',
    category: 'Pembersih Hati',
    arabic: 'وَالَّذِينَ جَاءُوا مِنْ بَعْدِهِمْ يَقُولُونَ رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ',
    latin: 'Walladziina jaa-uu mim ba\'dihim yaquuluuna Robbanaghfir lanaa wa li-ikhwaaninal ladziina sabaquunaa bil iimaan, wa laa taj\'al fii quluubinaa ghillal lilladziina aamanuu Robbanaa innaka Ro-uufur Rohiim.',
    translation: 'Dan orang-orang yang datang sesudah mereka berdoa: "Ya Tuhan kami, ampunilah kami dan saudara-saudara kami yang telah beriman lebih dahulu dari kami, dan janganlah Engkau tanamkan kedengkian dalam hati kami terhadap orang-orang yang beriman. Ya Tuhan kami, sungguh Engkau Maha Penyantun lagi Maha Penyayang."',
    reference: 'QS. Al-Hasyr: 10'
  },
  {
    id: 'doa-ibrahim-40',
    title: 'Doa Menjaga Shalat Diri & Keturunan',
    category: 'Kekuatan Ibadah',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    latin: 'Robbij\'alnii muqiimash sholaati wa min dzurriyyatii, Robbanaa wa taqobbal du\'aa\'.',
    translation: '"Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan shalat, ya Tuhan kami, perkenankanlah doaku."',
    reference: 'QS. Ibrahim: 40'
  },
  {
    id: 'doa-musa-25',
    title: 'Doa Kelapangan Hati & Kemudahan Urusan',
    category: 'Penenang Jiwa',
    arabic: 'قَالَ رَبِّ اشْرَحْ لِي صَدْرِي',
    latin: 'Qoola Robbisroh lii shodrii.',
    translation: 'Dia (Musa) berkata: "Ya Tuhanku, lapangkanlah dadaku."',
    reference: 'QS. Taha: 25'
  },
  {
    id: 'doa-muminun-118',
    title: 'Doa Permohonan Ampunan & Rahmat',
    category: 'Penghapus Dosa',
    arabic: 'وَقُلْ رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    latin: 'Wa qur robbighfir warham wa anta khoirur roohimiin.',
    translation: 'Dan katakanlah: "Ya Tuhanku, berilah ampunan dan berilah rahmat, dan Engkau adalah sebaik-baik Pemberi rahmat."',
    reference: 'QS. Al-Mu\'minun: 118'
  },
  {
    id: 'doa-baqarah-286',
    title: 'Doa Perlindungan dari Kesalahan & Beban Berat',
    category: 'Perlindungan Total',
    arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    latin: 'Robbanaa laa tu-aakhidznaa in nasiinaa aw akhtho\'naa, Robbanaa wa laa tahmil \'alainaa ishron kamaa hamaltahuu \'alal ladziina min qoblinaa, Robbanaa wa laa tuhammilnaa maa laa thooqata lanaa bih, wa\'fu \'annaa waghfir lanaa warhamnaa, Anta mawlaanaa fanshurnaa \'alal qawmil kaafiriin.',
    translation: '"Ya Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau kami melakukan kesalahan. Ya Tuhan kami, janganlah Engkau bebankan kepada kami beban yang berat sebagaimana Engkau bebankan kepada orang-orang sebelum kami. Ya Tuhan kami, janganlah Engkau pikulkan kepada kami apa yang tak sanggup kami memikulnya. Maafkanlah kami; ampunilah kami; dan rahmatilah kami. Engkaulah penolong kami."',
    reference: 'QS. Al-Baqarah: 286'
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
      <header className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1">
          <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Audio Murottal Syaikh Misyari Al-Afasy (Bebas Hak Cipta / Resmi)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#065F46] dark:text-emerald-400 tracking-tight">
          Kumpulan Doa & Munajat
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-serif italic">
          Lantunkan doa tulus untuk memohon ampunan, keteguhan hati, dan pembersihan jiwa dengan teks dan audio tilawah resmi yang tersinkronisasi.
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
