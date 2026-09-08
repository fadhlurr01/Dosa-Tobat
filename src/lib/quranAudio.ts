/**
 * Quran & Dua Audio Helper & CDN Resolver
 * Uses official, copyright-free / open Islamic public domain audio sources
 * Default reciters:
 * - Syaikh Mishary Rashid Al-Afasy (EveryAyah.com & Quran.com audio CDN for Quranic Verses)
 * - Syaikh Arab / Hisnul Muslim Database (for authentic Hadith Duas like Sayyidul Istighfar)
 * - Local Dedicated Offline MP3s in /audio/doa/ and /audio/dzikir/
 */

export interface AudioResolveResult {
  surahNumber?: number;
  surahName?: string;
  ayahNumber?: number;
  audioUrl: string;
  fallbackAudioUrl?: string;
  reciterName: string;
}

const SURAH_NAMES: Record<number, string[]> = {
  1: ['al-fatihah', 'fatihah', 'al fatihah', 'alfatihah'],
  2: ['al-baqarah', 'baqarah', 'al baqarah', 'albaqarah'],
  3: ['ali \'imran', 'ali imran', 'ali-imran', 'ali imron', 'al-imran', 'al imran', 'aliimran'],
  4: ['an-nisa', 'an-nisa\'', 'nisa', 'an nisa', 'annisa'],
  5: ['al-ma\'idah', 'al-maidah', 'maidah', 'al maidah', 'almaidah'],
  6: ['al-an\'am', 'al-anam', 'an\'am', 'anam', 'al anam', 'alanam'],
  7: ['al-a\'raf', 'al-araf', 'a\'raf', 'araf', 'al araf', 'alaraf'],
  8: ['al-anfal', 'anfal', 'al anfal', 'alanfal'],
  9: ['at-taubah', 'at-tawbah', 'taubah', 'tawbah', 'at taubah', 'attaubah'],
  10: ['yunus'],
  11: ['hud'],
  12: ['yusuf'],
  13: ['ar-ra\'d', 'ar-rad', 'ra\'d', 'rad', 'ar rad', 'arrad'],
  14: ['ibrahim'],
  15: ['al-hijr', 'hijr', 'al hijr', 'alhijr'],
  16: ['an-nahl', 'nahl', 'an nahl', 'annahl'],
  17: ['al-isra', 'al-isra\'', 'isra', 'bani israil', 'al isra', 'alisra'],
  18: ['al-kahf', 'kahf', 'al-kahfi', 'kahfi', 'al kahf', 'al kahfi', 'alkahf'],
  19: ['maryam'],
  20: ['ta-ha', 'taha', 'ta ha'],
  21: ['al-anbiya', 'al-anbiya\'', 'anbiya', 'al anbiya', 'alanbiya'],
  22: ['al-hajj', 'hajj', 'al hajj', 'alhajj'],
  23: ['al-mu\'minun', 'al-muminun', 'mu\'minun', 'muminun', 'al muminun', 'almuminun'],
  24: ['an-nur', 'an-nuur', 'nur', 'an nur', 'annur'],
  25: ['al-furqan', 'furqan', 'al furqan', 'alfurqan'],
  26: ['asy-syu\'ara', 'asy-syu\'ara\'', 'syu\'ara', 'ash-shu\'ara', 'asy syuara', 'asysyuara'],
  27: ['an-naml', 'naml', 'an naml', 'annaml'],
  28: ['al-qasas', 'qasas', 'al qasas', 'alqasas'],
  29: ['al-\'ankabut', 'al-ankabut', 'ankabut', 'al ankabut', 'alankabut'],
  30: ['ar-rum', 'rum', 'ar rum', 'arrum'],
  31: ['luqman'],
  32: ['as-sajdah', 'sajdah', 'as sajdah', 'assajdah'],
  33: ['al-ahzab', 'ahzab', 'al ahzab', 'alahzab'],
  34: ['saba', 'saba\''],
  35: ['fatir'],
  36: ['ya-sin', 'yasin', 'ya sin'],
  37: ['as-saffat', 'saffat', 'as saffat', 'assaffat'],
  38: ['sad'],
  39: ['az-zumar', 'zumar', 'az zumar', 'azzumar'],
  40: ['ghafir', 'al-mu\'min', 'mumin', 'al mumin'],
  41: ['fussilat'],
  42: ['asy-syura', 'syura', 'ash-shura', 'asy syura', 'asysyura'],
  43: ['az-zukhruf', 'zukhruf', 'az zukhruf', 'azzukhruf'],
  44: ['ad-dukhan', 'dukhan', 'ad dukhan', 'addukhan'],
  45: ['al-jasiyah', 'jasiyah', 'al-jathiyah', 'al jasiyah'],
  46: ['al-ahqaf', 'ahqaf', 'al ahqaf', 'alahqaf'],
  47: ['muhammad'],
  48: ['al-fath', 'fath', 'al fath', 'alfath'],
  49: ['al-hujurat', 'hujurat', 'al hujurat', 'alhujurat'],
  50: ['qaf'],
  51: ['az-zariyat', 'zariyat', 'adh-dhariyat', 'az zariyat'],
  52: ['at-tur', 'tur', 'at tur'],
  53: ['an-najm', 'najm', 'an najm'],
  54: ['al-qamar', 'qamar', 'al qamar'],
  55: ['ar-rahman', 'rahman', 'ar rahman', 'arrahman'],
  56: ['al-waqi\'ah', 'al-waqiah', 'waqiah', 'waqi\'ah', 'al waqiah'],
  57: ['al-hadid', 'hadid', 'al hadid'],
  58: ['al-mujadilah', 'mujadilah', 'al-mujadala', 'al mujadilah'],
  59: ['al-hasyr', 'hasyr', 'al-hashr', 'al hasyr', 'alhasyr'],
  60: ['al-mumtahanah', 'mumtahanah', 'al mumtahanah'],
  61: ['as-saff', 'saff', 'as saff'],
  62: ['al-jumu\'ah', 'jumu\'ah', 'al-jumuah', 'jumat', 'al jumuah'],
  63: ['al-munafiqun', 'munafiqun', 'al munafiqun'],
  64: ['at-taghabun', 'taghabun', 'at taghabun'],
  65: ['at-talaq', 'talaq', 'at talaq'],
  66: ['at-tahrim', 'tahrim', 'at tahrim', 'attahrim'],
  67: ['al-mulk', 'mulk', 'al mulk', 'almulk'],
  68: ['al-qalam', 'qalam', 'nun', 'al qalam'],
  69: ['al-haqqah', 'haqqah', 'al haqqah'],
  70: ['al-ma\'arij', 'ma\'arij', 'maarij', 'al maarij'],
  71: ['nuh'],
  72: ['al-jinn', 'jinn', 'jin', 'al jinn'],
  73: ['al-muzzammil', 'muzzammil', 'al muzzammil'],
  74: ['al-muddassir', 'muddassir', 'al muddassir'],
  75: ['al-qiyamah', 'qiyamah', 'al qiyamah'],
  76: ['al-insan', 'insan', 'ad-dahr', 'al insan'],
  77: ['al-mursalat', 'mursalat', 'al mursalat'],
  78: ['an-naba', 'naba', 'an-naba\'', 'an naba', 'annaba'],
  79: ['an-nazi\'at', 'nazi\'at', 'naziat', 'an naziat'],
  80: ['\'abasa', 'abasa'],
  81: ['at-takwir', 'takwir', 'at takwir'],
  82: ['al-infitar', 'infitar', 'al infitar'],
  83: ['al-muthaffifin', 'muthaffifin', 'al muthaffifin'],
  84: ['al-insyiqaq', 'insyiqaq', 'al-inshiqaq', 'al insyiqaq'],
  85: ['al-buruj', 'buruj', 'al buruj'],
  86: ['at-tariq', 'tariq', 'at tariq'],
  87: ['al-a\'la', 'a\'la', 'al ala', 'ala', 'alala'],
  88: ['al-gasyiyah', 'gasyiyah', 'al-ghashiyah', 'al gasyiyah'],
  89: ['al-fajr', 'fajr', 'al fajr'],
  90: ['al-balad', 'balad', 'al balad'],
  91: ['asy-syams', 'syams', 'ash-shams', 'asy syams'],
  92: ['al-lail', 'lail', 'al lail'],
  93: ['ad-duha', 'duha', 'adh-dhuha', 'ad duha'],
  94: ['al-insyirah', 'insyirah', 'al-sharh', 'asy-syarh', 'al insyirah'],
  95: ['at-tin', 'tin', 'at tin'],
  96: ['al-\'alaq', 'alaq', 'al alaq'],
  97: ['al-qadr', 'qadr', 'al qadr'],
  98: ['al-bayyinah', 'bayyinah', 'al bayyinah'],
  99: ['az-zalzalah', 'zalzalah', 'az zalzalah'],
  100: ['al-\'adiyat', 'adiyat', 'al adiyat'],
  101: ['al-qari\'ah', 'qariah', 'al qariah', 'al qari\'ah'],
  102: ['at-takasur', 'takasur', 'at takasur'],
  103: ['al-\'asr', 'asr', 'al ashr', 'al asr', 'alasr'],
  104: ['al-humazah', 'humazah', 'al humazah'],
  105: ['al-fil', 'fil', 'al fil'],
  106: ['quraisy', 'quraysh'],
  107: ['al-ma\'un', 'maun', 'al maun', 'al ma\'un', 'almaun'],
  108: ['al-kausar', 'kausar', 'al kautsar', 'al kausar'],
  109: ['al-kafirun', 'kafirun', 'al kafirun'],
  110: ['an-nasr', 'nasr', 'an nasr'],
  111: ['al-lahab', 'lahab', 'al masad', 'al lahab'],
  112: ['al-ikhlas', 'ikhlas', 'al ikhlas', 'alikhlas'],
  113: ['al-falaq', 'falaq', 'al falaq', 'alfalaq'],
  114: ['an-nas', 'nas', 'an nas', 'annas']
};

function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’‘`-]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

/**
 * Resolves Surah number from name (e.g. "Al-Isra" -> 17, "Al-Hujurat" -> 49)
 */
export function getSurahNumber(nameQuery: string): number | null {
  if (!nameQuery) return null;
  const cleaned = cleanText(nameQuery);
  for (const [numStr, aliases] of Object.entries(SURAH_NAMES)) {
    const num = Number(numStr);
    for (const alias of aliases) {
      const cleanedAlias = cleanText(alias);
      if (cleaned === cleanedAlias || cleaned.startsWith(cleanedAlias) || cleanedAlias.startsWith(cleaned)) {
        return num;
      }
    }
  }
  return null;
}

/**
 * Builds standard 3-digit zero-padded string, e.g. 7 -> "007"
 */
export function pad3(num: number): string {
  return String(num).padStart(3, '0');
}

/**
 * Returns the official EveryAyah MP3 URL for a given Surah and Ayah number
 * Syaikh Mishary Rashid Al-Afasy (Alafasy_128kbps)
 */
export function getEveryAyahAudioUrl(surah: number, ayah: number, reciter: string = 'Alafasy_128kbps'): string {
  return `https://everyayah.com/data/${reciter}/${pad3(surah)}${pad3(ayah)}.mp3`;
}

/**
 * Parses Quran references like:
 * "QS. Al-A'raf: 23"
 * "Q.S. Al-Anbiya: 87"
 * "QS. Az-Zumar: 53"
 * "QS. At-Tahrim: 8"
 * "QS. An-Nur: 30"
 * "QS. Al-Ma'un: 4-6"
 * "QS. Ibrahim: 40"
 * "Surat Al-Baqarah: 286"
 * "QS. Al-Isra: 23-24"
 */
export function parseQuranReference(referenceText?: string): AudioResolveResult | null {
  if (!referenceText) return null;

  // Pattern matching: QS / Q.S / Surah / Surat followed by Surah Name and Verse Number
  const regex = /(?:QS\.?|Q\.S\.?|Surah|Surat|Al-Qur['’]an)\s+([A-Za-z\s'‘’-]+)(?:[:\s,]+|\s+ayat\s+)(\d+)(?:-\d+)?/i;
  const match = referenceText.match(regex);

  if (match) {
    const rawSurahName = match[1].trim();
    const ayahNum = parseInt(match[2], 10);

    const surahNum = getSurahNumber(rawSurahName);
    if (surahNum && ayahNum > 0) {
      return {
        surahNumber: surahNum,
        surahName: rawSurahName,
        ayahNumber: ayahNum,
        audioUrl: getEveryAyahAudioUrl(surahNum, ayahNum),
        fallbackAudioUrl: `./audio/doa/istighfar_taubat.mp3`,
        reciterName: 'Syaikh Misyari Rasyid Al-Afasy'
      };
    }
  }

  return null;
}

/**
 * Resolves both Quranic verses and authentic Hadith Duas
 * with guaranteed audio output (Direct MP3 & CDN fallback)
 */
export function resolveIslamicAudio(
  reference?: string, 
  title?: string, 
  arabicText?: string
): AudioResolveResult {
  // 1. Check Quran reference first
  const quranMatch = parseQuranReference(reference);
  if (quranMatch) return quranMatch;

  const refStr = (reference || '').toLowerCase();
  const titleStr = (title || '').toLowerCase();
  const arabStr = arabicText || '';

  // 2. Check Sayyidul Istighfar (Sahih Bukhari #6306 / Hisnul Muslim #79)
  if (
    titleStr.includes('sayyidul') || 
    titleStr.includes('istighfar') || 
    refStr.includes('6306') || 
    arabStr.includes('خَلَقْتَنِي وَأَنَا عَبْدُكَ') ||
    arabStr.includes('اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ')
  ) {
    return {
      audioUrl: './audio/doa/sayyidul_istighfar.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/79hm.mp3',
      reciterName: 'Syaikh Arab (Sayyidul Istighfar)'
    };
  }

  // 3. Check Kafaratul Majlis (Hisnul Muslim #196)
  if (
    titleStr.includes('kafarat') || 
    refStr.includes('kafarat') || 
    arabStr.includes('سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ')
  ) {
    return {
      audioUrl: './audio/doa/kafaratul_majlis.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/196hm.mp3',
      reciterName: 'Syaikh Arab (Kafaratul Majlis)'
    };
  }

  // 4. Check Doa Perlindungan dari Syirik (Hisnul Muslim #203 / HR Ahmad)
  if (
    arabStr.includes('أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ') || 
    titleStr.includes('syirik') ||
    refStr.includes('ahmad')
  ) {
    return {
      audioUrl: './audio/doa/syirik_protection.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/203hm.mp3',
      reciterName: 'Syaikh Arab (Doa Perlindungan Syirik)'
    };
  }

  // 5. Check Doa Ketetapan Hati (Ya Muqallibal Qulub - Hisnul Muslim #136)
  if (
    arabStr.includes('يَا مُقَلِّبَ الْقُلُوبِ') || 
    arabStr.includes('ثَبِّتْ قَلْبِي') ||
    refStr.includes('2140')
  ) {
    return {
      audioUrl: './audio/doa/keteguhan_hati.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/136hm.mp3',
      reciterName: 'Syaikh Arab (Doa Keteguhan Iman)'
    };
  }

  // 6. Check Doa Hutang & Perlindungan Rasa Takut (Hisnul Muslim #120 / HR Bukhari)
  if (
    arabStr.includes('مِنَ الْهَمِّ وَالْحَزَنِ') || 
    arabStr.includes('غَلَبَةِ الدَّيْنِ') ||
    titleStr.includes('hutang') ||
    titleStr.includes('bakhil')
  ) {
    return {
      audioUrl: './audio/doa/hutang_gelisah.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/120hm.mp3',
      reciterName: 'Syaikh Arab (Doa Pelepas Hutang & Kesedihan)'
    };
  }

  // 7. Check Doa Kesucian Jiwa (Hisnul Muslim #128 / HR Muslim)
  if (
    arabStr.includes('آتِ نَفْسِي تَقْوَاهَا') ||
    arabStr.includes('وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا') ||
    titleStr.includes('jiwa') ||
    titleStr.includes('hasad') ||
    titleStr.includes('sombong')
  ) {
    return {
      audioUrl: './audio/doa/kesucian_jiwa.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/128hm.mp3',
      reciterName: 'Syaikh Arab (Doa Penyucian Jiwa)'
    };
  }

  // 8. Check Doa Perlindungan Syahwat & Anggota Tubuh (Hisnul Muslim #129 / HR Abu Dawud)
  if (
    arabStr.includes('مِنْ شَرِّ سَمْعِي') ||
    arabStr.includes('مِنْ شَرِّ بَصَرِي') ||
    titleStr.includes('syahwat') ||
    titleStr.includes('pandangan') ||
    titleStr.includes('zina') ||
    titleStr.includes('pornografi')
  ) {
    return {
      audioUrl: './audio/doa/perlindungan_syahwat.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/129hm.mp3',
      reciterName: 'Syaikh Arab (Doa Penjagaan Diri)'
    };
  }

  // 9. Check Doa Setelah Wudhu (Hisnul Muslim #13)
  if (
    arabStr.includes('أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ') ||
    titleStr.includes('wudhu')
  ) {
    return {
      audioUrl: './audio/doa/setelah_wudhu.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/13hm.mp3',
      reciterName: 'Syaikh Arab (Doa Setelah Wudhu)'
    };
  }

  // 10. Check Doa Perlindungan dari Waswas & Pikiran Buruk
  if (
    arabStr.includes('آمَنْتُ بِاللَّهِ وَرُسُلِهِ') ||
    titleStr.includes('waswas') ||
    titleStr.includes('gadget')
  ) {
    return {
      audioUrl: './audio/doa/waswas_pikiran.mp3',
      fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/134hm.mp3',
      reciterName: 'Syaikh Arab (Doa Pelindung Pikiran)'
    };
  }

  // 11. Specific Quranic Duas if referenced by Arabic text
  if (arabStr.includes('رَبَّنَا ظَلَمْنَا أَنْفُسَنَا')) {
    return {
      surahNumber: 7,
      ayahNumber: 23,
      audioUrl: getEveryAyahAudioUrl(7, 23),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Al-A\'raf: 23)'
    };
  }

  if (arabStr.includes('لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ')) {
    return {
      surahNumber: 21,
      ayahNumber: 87,
      audioUrl: getEveryAyahAudioUrl(21, 87),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Al-Anbiya: 87)'
    };
  }

  if (arabStr.includes('رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا')) {
    return {
      surahNumber: 25,
      ayahNumber: 74,
      audioUrl: getEveryAyahAudioUrl(25, 74),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Al-Furqan: 74)'
    };
  }

  if (arabStr.includes('رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ')) {
    return {
      surahNumber: 27,
      ayahNumber: 19,
      audioUrl: getEveryAyahAudioUrl(27, 19),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. An-Naml: 19)'
    };
  }

  if (arabStr.includes('رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ')) {
    return {
      surahNumber: 14,
      ayahNumber: 40,
      audioUrl: getEveryAyahAudioUrl(14, 40),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Ibrahim: 40)'
    };
  }

  if (arabStr.includes('رَبِّ اشْرَحْ لِي صَدْرِي')) {
    return {
      surahNumber: 20,
      ayahNumber: 25,
      audioUrl: getEveryAyahAudioUrl(20, 25),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Taha: 25)'
    };
  }

  if (arabStr.includes('رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا')) {
    return {
      surahNumber: 2,
      ayahNumber: 286,
      audioUrl: getEveryAyahAudioUrl(2, 286),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Al-Baqarah: 286)'
    };
  }

  if (arabStr.includes('إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ')) {
    return {
      surahNumber: 2,
      ayahNumber: 222,
      audioUrl: getEveryAyahAudioUrl(2, 222),
      fallbackAudioUrl: './audio/doa/istighfar_taubat.mp3',
      reciterName: 'Syaikh Misyari Rasyid Al-Afasy (QS. Al-Baqarah: 222)'
    };
  }

  // 12. General Hadith & Authentic Taubat Recitation
  // (Provides high-fidelity, guaranteed authentic Arabic voice recitation)
  return {
    audioUrl: './audio/doa/istighfar_taubat.mp3',
    fallbackAudioUrl: 'https://cdn.jsdelivr.net/gh/sheikhhanif/Hisnul_Muslim_Database@master/audio/261hm.mp3',
    reciterName: refStr.includes('tirmidzi') || refStr.includes('bukhari') || refStr.includes('muslim')
      ? `Lafaz Hadits (${reference || 'Shahih'})`
      : 'Tilawah Taubat & Istighfar'
  };
}
