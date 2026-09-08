const fs = require('fs');
let content = fs.readFileSync('src/data/sins.ts', 'utf-8');

const doas = {
  akidah: {
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    latin: "Allahumma inni a'udzu bika an usyrika bika wa ana a'lam, wa astaghfiruka lima la a'lam.",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan menyekutukan-Mu di saat aku mengetahui, dan aku mohon ampunan dari sesuatu yang aku tidak mengetahui.",
    source: "HR. Ahmad"
  },
  ibadah: {
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    latin: "Rabbijalni muqimas salati wa min dzurriyyati rabbana wa taqabbal du'a.",
    translation: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat, ya Tuhan kami, perkenankanlah doaku.",
    source: "QS. Ibrahim: 40"
  },
  hati: {
    arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
    latin: "Allahumma ati nafsi taqwaha, wa zakkiha anta khairu man zakkaha, anta waliyyuha wa maulaha.",
    translation: "Ya Allah, berikanlah ketakwaan pada jiwaku, dan sucikanlah ia, Engkaulah sebaik-baik yang menyucikannya, Engkau Pencipta dan Pelindungnya.",
    source: "HR. Muslim"
  },
  lisan: {
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    latin: "Subhanakallahumma wa bihamdika, asyhadu alla ilaha illa anta, astaghfiruka wa atubu ilaik.",
    translation: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu. Aku bersaksi bahwa tiada tuhan selain Engkau. Aku mohon ampun dan bertaubat kepada-Mu.",
    source: "HR. Tirmidzi (Kafaratul Majlis)"
  },
  harta: {
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    latin: "Allahumma inni a'udzubika minal hammi wal hazan, wa a'udzubika minal 'ajzi wal kasal, wa a'udzubika minal jubni wal bukhl, wa a'udzubika min ghalabatid-daini wa qahrir-rijal.",
    translation: "Ya Allah, aku berlindung kepada-Mu dari kesusahan dan kesedihan, lemah dan malas, bakhil dan penakut, lilitan hutang dan penindasan orang.",
    source: "HR. Bukhari"
  },
  keluarga: {
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    latin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yun waj'alna lilmuttaqina imama.",
    translation: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa.",
    source: "QS. Al-Furqan: 74"
  },
  syahwat: {
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي، وَمِنْ شَرِّ بَصَرِي، وَمِنْ شَرِّ لِسَانِي، وَمِنْ شَرِّ قَلْبِي، وَمِنْ شَرِّ مَنِيِّي",
    latin: "Allahumma inni a'udzu bika min syarri sam'i, wa min syarri bashari, wa min syarri lisani, wa min syarri qalbi, wa min syarri maniyyi.",
    translation: "Ya Allah, aku berlindung kepada-Mu dari keburukan pendengaranku, penglihatanku, lisanku, hatiku, dan keburukan syahwatku.",
    source: "HR. Abu Dawud"
  },
  kecanduan: {
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    latin: "Ya Muqallibal qulub, tsabbit qalbi 'ala diinik.",
    translation: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
    source: "HR. Tirmidzi"
  },
  sosial: {
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    latin: "Rabbana dhalamna anfusana wa in lam taghfir lana watarhamna lanakunanna minal khasirin.",
    translation: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.",
    source: "QS. Al-A'raf: 23"
  },
  lingkungan: {
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
    latin: "Rabbi awzi'ni an asykura ni'matakal lati an'amta 'alayya wa 'ala walidayya wa an a'mala shalihan tardhahu.",
    translation: "Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada dua orang ibu bapakku dan untuk mengerjakan amal saleh yang Engkau ridhai.",
    source: "QS. An-Naml: 19"
  }
};

// Regex to find each object and add the doa property based on categoryId
const updatedContent = content.replace(/(categoryId:\s*'([^']+)',[\s\S]*?prevention:\s*\[[^\]]+\])(\s*)\}/g, (match, p1, p2, p3) => {
  const categoryId = p2;
  const doa = doas[categoryId];
  if (doa) {
    const doaString = `,
    doa: {
      arabic: "${doa.arabic}",
      latin: "${doa.latin}",
      translation: "${doa.translation}",
      source: "${doa.source}"
    }`;
    return p1 + doaString + p3 + "}";
  }
  return match;
});

fs.writeFileSync('src/data/sins.ts', updatedContent);
console.log('Successfully added doas to sins.ts');
