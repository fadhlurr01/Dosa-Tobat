/**
 * Quran Audio Helper & CDN Resolver
 * Uses official, copyright-free / open Islamic public domain audio sources
 * Default reciter: Syaikh Mishary Rashid Al-Afasy (EveryAyah.com & Quran.com audio CDN)
 */

export interface QuranReferenceResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  audioUrl: string;
  reciterName: string;
}

const SURAH_NAMES: Record<number, string[]> = {
  1: ['al-fatihah', 'fatihah', 'al fatihah'],
  2: ['al-baqarah', 'baqarah', 'al baqarah', 'albaqarah'],
  3: ['ali \'imran', 'ali imran', 'ali-imran', 'ali imron', 'al-imran', 'al imran'],
  4: ['an-nisa', 'an-nisa\'', 'nisa', 'an nisa'],
  5: ['al-ma\'idah', 'al-maidah', 'maidah', 'al maidah'],
  6: ['al-an\'am', 'al-anam', 'an\'am', 'anam', 'al anam'],
  7: ['al-a\'raf', 'al-araf', 'a\'raf', 'araf', 'al araf'],
  8: ['al-anfal', 'anfal', 'al anfal'],
  9: ['at-taubah', 'at-tawbah', 'taubah', 'tawbah', 'at taubah'],
  10: ['yunus'],
  11: ['hud'],
  12: ['yusuf'],
  13: ['ar-ra\'d', 'ar-rad', 'ra\'d', 'rad', 'ar rad'],
  14: ['ibrahim'],
  15: ['al-hijr', 'hijr', 'al hijr'],
  16: ['an-nahl', 'nahl', 'an nahl'],
  17: ['al-isra', 'al-isra\'', 'isra', 'bani israil', 'al isra'],
  18: ['al-kahf', 'kahf', 'al-kahfi', 'kahfi', 'al kahf', 'al kahfi'],
  19: ['maryam'],
  20: ['ta-ha', 'taha', 'ta ha'],
  21: ['al-anbiya', 'al-anbiya\'', 'anbiya', 'al anbiya'],
  22: ['al-hajj', 'hajj', 'al hajj'],
  23: ['al-mu\'minun', 'al-muminun', 'mu\'minun', 'muminun', 'al muminun'],
  24: ['an-nur', 'an-nuur', 'nur', 'an nur'],
  25: ['al-furqan', 'furqan', 'al furqan'],
  26: ['asy-syu\'ara', 'asy-syu\'ara\'', 'syu\'ara', 'ash-shu\'ara', 'asy syuara'],
  27: ['an-naml', 'naml', 'an naml'],
  28: ['al-qasas', 'qasas', 'al qasas'],
  29: ['al-\'ankabut', 'al-ankabut', 'ankabut', 'al ankabut'],
  30: ['ar-rum', 'rum', 'ar rum'],
  31: ['luqman'],
  32: ['as-sajdah', 'sajdah', 'as sajdah'],
  33: ['al-ahzab', 'ahzab', 'al ahzab'],
  34: ['saba', 'saba\''],
  35: ['fatir'],
  36: ['ya-sin', 'yasin', 'ya sin'],
  37: ['as-saffat', 'saffat', 'as saffat'],
  38: ['sad'],
  39: ['az-zumar', 'zumar', 'az zumar'],
  40: ['ghafir', 'al-mu\'min', 'mumin', 'al mumin'],
  41: ['fussilat'],
  42: ['asy-syura', 'syura', 'ash-shura', 'asy syura'],
  43: ['az-zukhruf', 'zukhruf', 'az zukhruf'],
  44: ['ad-dukhan', 'dukhan', 'ad dukhan'],
  45: ['al-jasiyah', 'jasiyah', 'al-jathiyah', 'al jasiyah'],
  46: ['al-ahqaf', 'ahqaf', 'al ahqaf'],
  47: ['muhammad'],
  48: ['al-fath', 'fath', 'al fath'],
  49: ['al-hujurat', 'hujurat', 'al hujurat'],
  50: ['qaf'],
  51: ['az-zariyat', 'zariyat', 'adh-dhariyat', 'az zariyat'],
  52: ['at-tur', 'tur', 'at tur'],
  53: ['an-najm', 'najm', 'an najm'],
  54: ['al-qamar', 'qamar', 'al qamar'],
  55: ['ar-rahman', 'rahman', 'ar rahman'],
  56: ['al-waqi\'ah', 'al-waqiah', 'waqiah', 'waqi\'ah', 'al waqiah'],
  57: ['al-hadid', 'hadid', 'al hadid'],
  58: ['al-mujadilah', 'mujadilah', 'al-mujadala', 'al mujadilah'],
  59: ['al-hasyr', 'hasyr', 'al-hashr', 'al hasyr'],
  60: ['al-mumtahanah', 'mumtahanah', 'al mumtahanah'],
  61: ['as-saff', 'saff', 'as saff'],
  62: ['al-jumu\'ah', 'jumu\'ah', 'al-jumuah', 'jumat', 'al jumuah'],
  63: ['al-munafiqun', 'munafiqun', 'al munafiqun'],
  64: ['at-taghabun', 'taghabun', 'at taghabun'],
  65: ['at-talaq', 'talaq', 'at talaq'],
  66: ['at-tahrim', 'tahrim', 'at tahrim'],
  67: ['al-mulk', 'mulk', 'al mulk'],
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
  78: ['an-naba', 'naba', 'an-naba\'', 'an naba'],
  79: ['an-nazi\'at', 'nazi\'at', 'naziat', 'an naziat'],
  80: ['\'abasa', 'abasa'],
  81: ['at-takwir', 'takwir', 'at takwir'],
  82: ['al-infitar', 'infitar', 'al infitar'],
  83: ['al-muthaffifin', 'muthaffifin', 'al muthaffifin'],
  84: ['al-insyiqaq', 'insyiqaq', 'al insyiqaq'],
  85: ['al-buruj', 'buruj', 'al buruj'],
  86: ['at-tariq', 'tariq', 'at tariq'],
  87: ['al-a\'la', 'ala', 'al-ala', 'al ala'],
  88: ['al-ghasyiyah', 'ghasyiyah', 'al ghasyiyah'],
  89: ['al-fajr', 'fajr', 'al fajr'],
  90: ['al-balad', 'balad', 'al balad'],
  91: ['asy-syams', 'syams', 'ash-shams', 'asy syams'],
  92: ['al-lail', 'lail', 'al lail'],
  93: ['ad-duha', 'duha', 'ad-dhuha', 'ad duha'],
  94: ['asy-syarh', 'al-insyirah', 'insyirah', 'syarh', 'alam nasyrah', 'al insyirah'],
  95: ['at-tin', 'tin', 'at tin'],
  96: ['al-\'alaq', 'al-alaq', 'alaq', 'iqra', 'al alaq'],
  97: ['al-qadr', 'qadr', 'al qadr'],
  98: ['al-bayyinah', 'bayyinah', 'al bayyinah'],
  99: ['az-zalzalah', 'zalzalah', 'az zalzalah'],
  100: ['al-\'adiyat', 'al-adiyat', 'adiyat', 'al adiyat'],
  101: ['al-qari\'ah', 'qariah', 'al-qariah', 'al qariah'],
  102: ['at-takatsur', 'takatsur', 'at takatsur'],
  103: ['al-\'asr', 'al-asr', 'asr', 'al asr'],
  104: ['al-humazah', 'humazah', 'al humazah'],
  105: ['al-fil', 'fil', 'al fil'],
  106: ['quraisy', 'quraish'],
  107: ['al-ma\'un', 'ma\'un', 'maun', 'al maun'],
  108: ['al-kautsar', 'kautsar', 'al kautsar'],
  109: ['al-kafirun', 'kafirun', 'al kafirun'],
  110: ['an-nasr', 'nasr', 'an nasr'],
  111: ['al-lahab', 'lahab', 'al-masad', 'masad', 'al lahab'],
  112: ['al-ikhlas', 'ikhlas', 'al ikhlas'],
  113: ['al-falaq', 'falaq', 'al falaq'],
  114: ['an-nas', 'nas', 'an-naas', 'an nas']
};

/**
 * Normalizes text for matching
 */
function cleanText(txt: string): string {
  return txt
    .toLowerCase()
    .replace(/[‘'’`]/g, "'")
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves a surah name or alias to its 1-114 number
 */
export function getSurahNumber(nameQuery: string): number | null {
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
 */
export function parseQuranReference(referenceText?: string): QuranReferenceResult | null {
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
        reciterName: 'Syaikh Misyari Rasyid Al-Afasy'
      };
    }
  }

  return null;
}
