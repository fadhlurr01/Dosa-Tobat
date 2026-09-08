import { Sin } from '../types';

export const ALL_SINS: Sin[] = [
  // 1. Bohong (Dusta)
  {
    id: 'bohong', 
    categoryId: 'lisan', 
    name: 'Bohong (Dusta)',
    definition: 'Menyampaikan informasi palsu atau tidak sesuai dengan kenyataan untuk menipu atau mencari untung.',
    reason: 'Kebohongan mengantarkan kepada kejahatan, dan kejahatan mengantarkan ke neraka.',
    source: 'HR. Bukhari no. 6094',
    dalilArabic: 'وَإِيَّاكُمْ وَالْكَذِبَ فَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ',
    examples: ['Berbohong kepada atasan soal alasan telat', 'Menipu pembeli tentang kualitas barang', 'Berbohong dalam bercanda agar orang tertawa'],
    signs: ['Sering gelisah karena takut ketahuan', 'Membuat kebohongan baru untuk menutupi yang lama', 'Kehilangan kepercayaan dari orang terdekat'],
    triggers: ['Rasa takut dimarahi/dihukum', 'Keinginan mencari keuntungan materi (dalam bisnis)', 'Gengsi atau ingin terlihat hebat'],
    impacts: ['Dihilangkan rasa percaya oleh manusia', 'Dicatat sebagai pendusta di sisi Allah', 'Menghancurkan reputasi selamanya'],
    prevention: ['Jujur meski pahit dan ada risikonya', 'Hindari bercanda dengan bualan palsu', 'Sadari bahwa kejujuran membawa ketenangan batin'],
    doa: {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      latin: "Subhanakallahumma wa bihamdika, asyhadu alla ilaha illa anta, astaghfiruka wa atubu ilaik.",
      translation: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu. Aku bersaksi bahwa tiada tuhan selain Engkau. Aku mohon ampun dan bertaubat kepada-Mu.",
      source: "HR. Tirmidzi (Kafaratul Majlis)"
    }
  },

  // 2. Bullying (Mengolok-olok)
  {
    id: 'bullying', 
    categoryId: 'sosial', 
    name: 'Bullying (Mengolok-olok)',
    definition: 'Menyakiti orang lain secara verbal atau fisik untuk merendahkan, baik di dunia nyata maupun cyberbullying.',
    reason: 'Merendahkan orang lain dilarang keras, karena bisa jadi yang direndahkan lebih mulia di sisi Allah.',
    source: 'QS. Al-Hujurat: 11',
    dalilArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ وَلَا نِسَاءٌ مِّن نِّسَاءٍ عَسَىٰ أَن يَكُنَّ خَيْرًا مِّنْهُنَّ',
    examples: ['Memanggil teman dengan julukan buruk/menghina fisik', 'Menulis komentar jahat (hate speech) di akun orang lain', 'Mengintimidasi junior di sekolah'],
    signs: ['Merasa puas/hebat saat melihat orang lain tak berdaya', 'Terbiasa menggunakan kata-kata sarkas yang menyakiti', 'Tidak punya rasa empati'],
    triggers: ['Ikut-ikutan geng/teman', 'Pernah menjadi korban di masa lalu (balas dendam)', 'Ketidakstabilan emosi'],
    impacts: ['Trauma psikologis berat bagi korban', 'Dosa yang terus mengalir selama korban masih sakit hati', 'Potensi balas dendam'],
    prevention: ['Pikirkan dampak ucapan (empatik: "bagaimana jika saya digituin?")', 'Filter ketikan (jangan memposting jika isinya menyakiti)', 'Minta maaf langsung kepada korban'],
    doa: {
      arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      latin: "Rabbana dhalamna anfusana wa in lam taghfir lana watarhamna lanakunanna minal khasirin.",
      translation: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.",
      source: "QS. Al-A'raf: 23"
    }
  },

  // 3. Durhaka pada Orang Tua
  {
    id: 'durhaka-orangtua', 
    categoryId: 'keluarga', 
    name: 'Durhaka pada Orang Tua',
    definition: 'Menyakiti orang tua melalui ucapan, perbuatan, atau menelantarkan mereka di usia senja.',
    reason: 'Ridha Allah ada pada ridha orang tua. Durhaka adalah dosa besar yang hukumannya sering disegerakan di dunia.',
    source: 'QS. Al-Isra: 23-24',
    dalilArabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا ۝ وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    examples: ['Membentak atau berkata "Ah" kepada ibu', 'Mengabaikan telepon atau pesan dari ayah', 'Tidak menafkahi orang tua yang miskin padahal mampu'],
    signs: ['Berbicara dengan nada lebih tinggi dari orang tua', 'Merasa terbebani merawat mereka', 'Sering berkonflik keras dengan orang tua'],
    triggers: ['Sifat egois', 'Perbedaan pendapat/pola pikir beda generasi', 'Kesibukan kerja atau pasangan yang tidak mendukung'],
    impacts: ['Rezeki menjadi seret dan hidup tidak berkah', 'Mendapat balasan serupa dari anak di masa depan', 'Sulit di akhir sakaratul maut'],
    prevention: ['Belajar merendahkan suara dan mengalah', 'Jadwalkan kunjungan atau telepon rutin (Recognize & Replace)', 'Doakan mereka setiap selesai salat'],
    doa: {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      latin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yun waj'alna lilmuttaqina imama.",
      translation: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa.",
      source: "QS. Al-Furqan: 74"
    }
  },

  // 4. Ghibah (Menggunjing)
  {
    id: 'ghibah', 
    categoryId: 'lisan', 
    name: 'Ghibah (Menggunjing)',
    definition: 'Membicarakan aib atau keburukan orang lain (walaupun benar) yang ia tidak suka jika mendengarnya.',
    reason: 'Diibaratkan seperti memakan daging saudara sendiri yang sudah mati.',
    source: 'QS. Al-Hujurat: 12',
    dalilArabic: 'وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ',
    examples: ['Membicarakan kekurangan fisik orang', 'Bergosip di grup WA kantor tentang rekan kerja', 'Menjadikan aib orang sebagai bahan candaan'],
    signs: ['Asyik menimpali obrolan negatif tentang orang lain', 'Mencari kelemahan orang untuk dibahas', 'Merasa lebih baik saat merendahkan orang lain'],
    triggers: ['Rasa iri', 'Keinginan diterima di lingkungan pertemanan (ikut-ikutan)', 'Waktu luang yang tidak produktif'],
    impacts: ['Pahala ibadah ditransfer ke orang yang dighibah', 'Merusak persaudaraan', 'Menimbulkan permusuhan dan dendam'],
    prevention: ['Tinggalkan tongkrongan/grup WA yang toxic', 'Diam jika tidak bisa bicara baik', 'Ganti topik obrolan jika mulai mengarah ke gosip'],
    doa: {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      latin: "Subhanakallahumma wa bihamdika, asyhadu alla ilaha illa anta, astaghfiruka wa atubu ilaik.",
      translation: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu. Aku bersaksi bahwa tiada tuhan selain Engkau. Aku mohon ampun dan bertaubat kepada-Mu.",
      source: "HR. Tirmidzi (Kafaratul Majlis)"
    }
  },

  // 5. Hasad (Iri Dengki)
  {
    id: 'hasad', 
    categoryId: 'hati', 
    name: 'Hasad (Iri Dengki)',
    definition: 'Merasa tidak suka melihat orang lain mendapat nikmat, dan berharap nikmat tersebut hilang darinya.',
    reason: 'Hasad berarti memprotes takdir dan pembagian rezeki dari Allah, serta memakan amal kebaikan seperti api memakan kayu.',
    source: 'HR. Abu Dawud no. 4903',
    dalilArabic: 'إِيَّاكُمْ وَالْحَسَدَ فَإِنَّ الْحَسَدَ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ',
    examples: ['Kesal melihat teman promosi jabatan', 'Senang saat tetangga mengalami kebangkrutan', 'Mencari-cari kekurangan orang yang sukses'],
    signs: ['Dada terasa sesak saat mendengar kesuksesan orang lain', 'Suka membicarakan keburukan saingan', 'Susah mengucapkan selamat secara tulus'],
    triggers: ['Rasa tidak aman (insecure)', 'Persaingan di tempat kerja/sekolah', 'Terlalu sering membandingkan diri di media sosial'],
    impacts: ['Pahala amal kebaikan habis terkikis', 'Hati selalu gelisah dan tidak bahagia', 'Berpotensi memicu tindakan kriminal (sihir/fitnah)'],
    prevention: ['Kurangi melihat pencapaian orang di sosmed (puasa sosmed)', 'Doakan keberkahan untuk orang yang kita iri', 'Sadari bahwa setiap orang punya ujiannya masing-masing'],
    doa: {
      arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
      latin: "Allahumma ati nafsi taqwaha, wa zakkiha anta khairu man zakkaha, anta waliyyuha wa maulaha.",
      translation: "Ya Allah, berikanlah ketakwaan pada jiwaku, dan sucikanlah ia, Engkaulah sebaik-baik yang menyucikannya, Engkau Pencipta dan Pelindungnya.",
      source: "HR. Muslim"
    }
  },

  // 6. Judi Online (Maysir)
  {
    id: 'judi-online-v2', 
    categoryId: 'kecanduan', 
    name: 'Judi Online (Maysir)',
    definition: 'Mempertaruhkan uang dalam permainan (slot, tebak skor) dengan harapan untung cepat secara untung-untungan.',
    reason: 'Judi adalah perbuatan setan yang bertujuan merusak harta, pikiran, dan memicu permusuhan.',
    source: 'QS. Al-Ma\'idah: 90',
    dalilArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ لَعَلَّكُمْ تُفْلِحُونَ',
    examples: ['Bermain slot online ("gacor")', 'Taruhan bola', 'Trading binary option yang bersifat tebak-tebakan'],
    signs: ['Gelisah jika tidak membuka aplikasi', 'Berbohong soal uang kepada keluarga', 'Mulai meminjam uang (pinjol) untuk modal main'],
    triggers: ['Kebutuhan ekonomi mendesak', 'Melihat teman pamer kemenangan (FOMO)', 'Terpapar iklan dan streamer judi'],
    impacts: ['Hutang menumpuk tak terkendali', 'Keluarga hancur berantakan', 'Depresi parah hingga niat bunuh diri'],
    prevention: ['Blokir semua situs/aplikasi terkait di HP', 'Serahkan kendali ATM/M-Banking kepada pasangan/keluarga terpercaya', 'Cari bantuan profesional / support group jika sudah adiksi'],
    doa: {
      arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      latin: "Ya Muqallibal qulub, tsabbit qalbi 'ala diinik.",
      translation: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
      source: "HR. Tirmidzi"
    }
  },

  // 7. Kecanduan Sosmed/Gadget
  {
    id: 'kecanduan-gadget', 
    categoryId: 'kecanduan', 
    name: 'Kecanduan Sosmed/Gadget',
    definition: 'Menghabiskan waktu berlebihan untuk hal sia-sia di layar (scroll tanpa henti), hingga melalaikan kewajiban agama dan dunia.',
    reason: 'Waktu adalah modal utama manusia. Menyia-nyiakan waktu lebih buruk dari kematian karena memutus hubungan dengan Allah.',
    source: 'HR. Tirmidzi no. 2304',
    dalilArabic: 'مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ',
    examples: ['Scroll TikTok 4 jam nonstop setiap malam', 'Bermain game online sampai melupakan makan dan salat', 'Mengecek HP setiap 5 menit tanpa tujuan'],
    signs: ['Cemas berlebihan jika HP tertinggal', 'Pekerjaan atau studi berantakan', 'Durasi tidur sangat kurang'],
    triggers: ['Rasa bosan (dopamine hit seek)', 'Menghindar dari masalah dunia nyata', 'Notifikasi yang terus menyala'],
    impacts: ['Menurunnya kesehatan fisik (mata, postur)', 'Kehilangan waktu produktif yang tidak bisa diulang', 'Lalai dari dzikir dan interaksi sosial nyata'],
    prevention: ['Gunakan fitur Digital Wellbeing (Screen Time limit)', 'Matikan notifikasi yang tidak penting', 'Letakkan HP jauh dari jangkauan saat jam tidur atau bekerja'],
    doa: {
      arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      latin: "Ya Muqallibal qulub, tsabbit qalbi 'ala diinik.",
      translation: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
      source: "HR. Tirmidzi"
    }
  },

  // 8. Khamar & Narkoba
  {
    id: 'khamar', 
    categoryId: 'kecanduan', 
    name: 'Khamar & Narkoba',
    definition: 'Mengonsumsi minuman keras atau obat-obatan terlarang yang memabukkan dan menghilangkan akal.',
    reason: 'Khamar adalah "Ummul Khabaits" (induk segala keburukan) karena saat akal hilang, manusia bisa melakukan dosa apapun.',
    source: 'HR. Abu Dawud no. 3674',
    dalilArabic: 'الْخَمْرُ أُمُّ الْخَبَائِثِ وَمَنْ شَرِبَهَا لَمْ تُقْبَلْ صَلَاتُهُ أَرْبَعِينَ يَوْمًا',
    examples: ['Minum alkohol di pesta/club', 'Mengkonsumsi narkoba untuk pelarian stres', 'Mabuk-mabukan oplosan'],
    signs: ['Perubahan mood yang drastis', 'Menghindari interaksi sosial yang normal', 'Kesehatan fisik menurun drastis'],
    triggers: ['Tekanan lingkungan pergaulan (peer pressure)', 'Masalah hidup berat (pelarian)', 'Rasa penasaran tinggi'],
    impacts: ['Salat tidak diterima selama 40 hari', 'Kerusakan organ tubuh mematikan', 'Memicu kecelakaan atau tindak kriminal'],
    prevention: ['Ganti lingkaran pertemanan secara radikal', 'Mendekat pada komunitas agama yang positif', 'Konseling rehabilitasi'],
    doa: {
      arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      latin: "Ya Muqallibal qulub, tsabbit qalbi 'ala diinik.",
      translation: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
      source: "HR. Tirmidzi"
    }
  },

  // 9. Kikir (Bakhil) / Menahan Zakat
  {
    id: 'kikir', 
    categoryId: 'harta', 
    name: 'Kikir (Bakhil) / Menahan Zakat',
    definition: 'Enggan mengeluarkan harta untuk kewajiban (seperti zakat) atau kebaikan, padahal ia mampu.',
    reason: 'Sifat kikir menghancurkan umat terdahulu dan memutus rezeki dari Allah.',
    source: 'QS. Ali Imran: 180',
    dalilArabic: 'وَلَا يَحْسَبَنَّ الَّذِينَ يَبْخَلُونَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ هُوَ خَيْرًا لَّهُم ۖ بَلْ هُوَ شَرٌّ لَّهُمْ ۖ سَيُطَوَّقُونَ مَا بَخِلُوا بِهِ يَوْمَ الْقِيَامَةِ',
    examples: ['Tidak membayar zakat mal padahal sudah nishab', 'Pelit terhadap istri dan anak kandung', 'Enggan bersedekah walau sedikit'],
    signs: ['Sangat perhitungan untuk hal-hal sosial', 'Takut jatuh miskin jika memberi', 'Selalu menumpuk harta tanpa tujuan akhirat'],
    triggers: ['Cinta dunia berlebihan (Hubbud Dunya)', 'Ketakutan irasional akan kemiskinan', 'Lupa bahwa rezeki berasal dari Allah'],
    impacts: ['Harta justru sering habis untuk musibah/sakit', 'Hati menjadi keras dan mati rasa empati', 'Harta akan dikalungkan sebagai ular berbisa di hari kiamat'],
    prevention: ['Paksakan sedekah rutin harian/jumatan (sebagai terapi)', 'Hitung dan tunaikan zakat tepat waktu', 'Pelajari keutamaan sedekah'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      latin: "Allahumma inni a'udzubika minal hammi wal hazan, wa a'udzubika minal 'ajzi wal kasal, wa a'udzubika minal jubni wal bukhl, wa a'udzubika min ghalabatid-daini wa qahrir-rijal.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari kesusahan dan kesedihan, lemah dan malas, bakhil dan penakut, lilitan hutang dan penindasan orang.",
      source: "HR. Bukhari"
    }
  },

  // 10. Memutus Silaturahmi
  {
    id: 'mutus-silaturahmi', 
    categoryId: 'keluarga', 
    name: 'Memutus Silaturahmi',
    definition: 'Menjauhkan diri, bermusuhan, atau tidak mau bertegur sapa dengan kerabat dan keluarga lebih dari batas yang wajar (3 hari).',
    reason: 'Orang yang memutus silaturahmi tidak akan masuk surga dan amalnya tidak akan diangkat.',
    source: 'HR. Bukhari no. 5984',
    dalilArabic: 'لَا يَدْخُلُ الْجَنَّةَ قَاطِعُ رَحِمٍ',
    examples: ['Keluar dari grup WA keluarga karena ribut warisan', 'Memblokir kontak saudara kandung karena tersinggung', 'Tidak mau hadir di acara keluarga karena benci seseorang'],
    signs: ['Menghindari pertemuan keluarga', 'Masih menyimpan dendam lama terhadap kerabat', 'Merasa hidup mandiri dan tidak butuh keluarga'],
    triggers: ['Masalah pembagian warisan', 'Persaingan status sosial antar keluarga', 'Perbedaan pandangan politik atau ketersinggungan lisan'],
    impacts: ['Rezeki menjadi sempit dan umur tidak berkah', 'Doa tertahan tidak naik ke langit', 'Hati selalu dipenuhi energi negatif'],
    prevention: ['Berlapang dada memaafkan kesalahan saudara', 'Mulai hubungi kembali perlahan (kirim hadiah atau salam)', 'Jangan mencampurkan urusan uang dengan hubungan persaudaraan'],
    doa: {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      latin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yun waj'alna lilmuttaqina imama.",
      translation: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa.",
      source: "QS. Al-Furqan: 74"
    }
  },

  // 11. Mencuri & Korupsi
  {
    id: 'korupsi', 
    categoryId: 'harta', 
    name: 'Mencuri & Korupsi',
    definition: 'Mengambil harta orang lain atau negara secara sembunyi-sembunyi atau melalui penyalahgunaan wewenang.',
    reason: 'Harta haram akan menjadi bahan bakar api neraka dan membuat doa tidak dikabulkan.',
    source: 'QS. Al-Ma\'idah: 38',
    dalilArabic: 'وَالسَّارِقُ وَالسَّارِقَةُ فَاقْطَعُوا أَيْدِيَهُمَا جَزَاءً بِمَا كَسَبَا نَكَالًا مِّنَ اللَّهِ ۗ وَاللَّهُ عَزِيزٌ حَكِيمٌ',
    examples: ['Mark-up anggaran kantor', 'Mengambil barang milik teman tanpa izin', 'Menerima suap (gratifikasi) untuk memuluskan proyek'],
    signs: ['Kekayaan meningkat tidak wajar', 'Gelisah saat ada audit atau pemeriksaan', 'Suka mentraktir dengan uang yang tidak jelas asalnya'],
    triggers: ['Keserakahan (tamak)', 'Adanya kesempatan di tempat kerja', 'Tekanan biaya hidup tinggi'],
    impacts: ['Doa terhalang dan ibadah tertolak', 'Rasa malu jika tertangkap', 'Keluarga diberi makan dari barang haram yang merusak akhlak anak'],
    prevention: ['Tanamkan sifat qanaah (merasa cukup)', 'Tinggalkan lingkungan kerja yang memaklumi suap/korupsi', 'Ingat hisab yang berat di akhirat atas setiap sen harta'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      latin: "Allahumma inni a'udzubika minal hammi wal hazan, wa a'udzubika minal 'ajzi wal kasal, wa a'udzubika minal jubni wal bukhl, wa a'udzubika min ghalabatid-daini wa qahrir-rijal.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari kesusahan dan kesedihan, lemah dan malas, bakhil dan penakut, lilitan hutang dan penindasan orang.",
      source: "HR. Bukhari"
    }
  },

  // 12. Menelantarkan Keluarga
  {
    id: 'telantar-nafkah', 
    categoryId: 'keluarga', 
    name: 'Menelantarkan Keluarga',
    definition: 'Seorang suami/ayah yang sengaja tidak memberikan nafkah lahir dan batin kepada istri dan anak-anaknya.',
    reason: 'Cukuplah seseorang dikatakan berdosa jika ia menelantarkan orang yang menjadi tanggungannya.',
    source: 'HR. Abu Dawud no. 1692',
    dalilArabic: 'كَفَى بِالْمَرْءِ إِثْمًا أَنْ يُضَيِّعَ مَنْ يَقُوتُ',
    examples: ['Menghabiskan uang untuk hobi sementara anak kelaparan', 'Malas bekerja dan menggantungkan hidup pada istri', 'Tidak mempedulikan pendidikan agama anak'],
    signs: ['Cuek terhadap kebutuhan rumah tangga', 'Sering menghindar dari rumah', 'Lepas tangan dalam mendidik anak'],
    triggers: ['Ketidaksiapan memikul tanggung jawab (mental belum dewasa)', 'Kecanduan judi/game', 'Pengaruh pergaulan buruk di luar rumah'],
    impacts: ['Keluarga menjadi berantakan (broken home)', 'Anak kehilangan figur teladan', 'Dimintai pertanggungjawaban berat sebagai pemimpin keluarga di akhirat'],
    prevention: ['Pahami peran dan tanggung jawab pernikahan sebelum menikah', 'Buat perencanaan keuangan keluarga', 'Perbanyak komunikasi terbuka dengan pasangan'],
    doa: {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      latin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yun waj'alna lilmuttaqina imama.",
      translation: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa.",
      source: "QS. Al-Furqan: 74"
    }
  },

  // 13. Meninggalkan Puasa Ramadhan
  {
    id: 'batal-puasa', 
    categoryId: 'ibadah', 
    name: 'Meninggalkan Puasa Ramadhan',
    definition: 'Sengaja makan, minum, atau membatalkan puasa di siang hari bulan Ramadhan tanpa uzur (sakit/musafir/haid).',
    reason: 'Puasa Ramadhan adalah salah satu dari rukun Islam. Merusaknya tanpa alasan syar\'i adalah pelanggaran berat.',
    source: 'HR. Ibnu Khuzaimah no. 1986',
    dalilArabic: 'فَإِذَا أَنَا بِقَوْمٍ مُعَلَّقِينَ بِعَرَاقِيبِهِمْ مُشَقَّقَةٌ أَشْدَاقُهُمْ تَسِيلُ أَشْدَاقُهُمْ دَمًا، قُلْتُ: مَنْ هَؤُلَاءِ؟ قَالَ: هَؤُلَاءِ الَّذِينَ يُفْطِرُونَ قَبْلَ تَحِلَّةِ صَوْمِهِمْ',
    examples: ['Makan siang sembunyi-sembunyi karena tidak tahan lapar', 'Sengaja tidak puasa karena alasan kerja berat padahal mampu', 'Membatalkan puasa karena emosi/marah'],
    signs: ['Mencari-cari alasan untuk tidak puasa', 'Tidak merasa menyesal saat makan di depan orang berpuasa'],
    triggers: ['Lemahnya keimanan', 'Lingkungan yang tidak mendukung puasa', 'Ketidaksiapan fisik karena tidak sahur'],
    impacts: ['Satu hari puasa yang ditinggalkan sengaja tidak bisa diganti walau puasa setahun penuh', 'Mendapat azab yang pedih di akhirat'],
    prevention: ['Persiapkan fisik dan mental (sahur yang cukup)', 'Hindari aktivitas fisik ekstrem di siang hari', 'Pahami ancaman bagi yang sengaja membatalkan puasa'],
    doa: {
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      latin: "Rabbijalni muqimas salati wa min dzurriyyati rabbana wa taqabbal du'a.",
      translation: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat, ya Tuhan kami, perkenankanlah doaku.",
      source: "QS. Ibrahim: 40"
    }
  },

  // 14. Meninggalkan Salat 5 Waktu
  {
    id: 'tinggal-salat', 
    categoryId: 'ibadah', 
    name: 'Meninggalkan Salat 5 Waktu',
    definition: 'Sengaja tidak mengerjakan salat wajib pada waktunya tanpa uzur syar\'i.',
    reason: 'Salat adalah tiang agama dan pembeda antara seorang muslim dengan kekafiran.',
    source: 'HR. Muslim no. 82',
    dalilArabic: 'إِنَّ بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكَ الصَّلَاةِ',
    examples: ['Tidak salat Subuh karena bablas tidur', 'Meninggalkan salat ashar karena sibuk bekerja', 'Tidak salat Jumat 3x berturut-turut'],
    signs: ['Hati tidak merasa bersalah saat waktu salat habis', 'Menganggap enteng urusan agama', 'Jarang merasa tenang dalam hidup'],
    triggers: ['Kelelahan yang amat sangat', 'Lingkungan kerja/teman yang tidak salat', 'Kurang paham urgensi salat'],
    impacts: ['Dosa besar melebihi zina dan mencuri', 'Hidup menjadi sempit dan hilang keberkahan', 'Terancam kekufuran'],
    prevention: ['Paksakan diri untuk segera wudhu saat adzan berkumandang', 'Berteman dengan orang yang menjaga salat', 'Mengingat bahwa salat adalah amal pertama yang dihisab'],
    doa: {
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      latin: "Rabbijalni muqimas salati wa min dzurriyyati rabbana wa taqabbal du'a.",
      translation: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat, ya Tuhan kami, perkenankanlah doaku.",
      source: "QS. Ibrahim: 40"
    }
  },

  // 15. Menunda-nunda Salat
  {
    id: 'malas-salat', 
    categoryId: 'ibadah', 
    name: 'Menunda-nunda Salat',
    definition: 'Sengaja mengakhirkan salat dari awal waktunya tanpa alasan yang dibenarkan, hingga hampir habis waktu.',
    reason: 'Menunda salat adalah sifat orang munafik yang bermalas-malasan dalam beribadah kepada Allah.',
    source: 'QS. An-Nisa: 142',
    dalilArabic: 'إِنَّ الْمُنَافِقِينَ يُخَادِعُونَ اللَّهَ وَهُوَ خَادِعُهُمْ وَإِذَا قَامُوا إِلَى الصَّلَاةِ قَامُوا كُسَالَىٰ يُرَاءُونَ النَّاسَ وَلَا يَذْكُرُونَ اللَّهَ إِلَّا قَلِيلًا',
    examples: ['Main game terus saat adzan sampai hampir habis waktu', 'Menunda salat Isya sampai ketiduran', 'Sengaja menumpuk pekerjaan di waktu salat'],
    signs: ['Selalu salat di akhir waktu secara konsisten', 'Merasa salat adalah beban yang mengganggu aktivitas', 'Salat dilakukan dengan tergesa-gesa'],
    triggers: ['Kecanduan gadget/hiburan', 'Manajemen waktu yang buruk', 'Sikap meremehkan (menggampangkan) waktu'],
    impacts: ['Kehilangan keutamaan salat di awal waktu', 'Rawan terlewat dan menjadi dosa besar', 'Berkurangnya kekhusyukan karena terburu-buru'],
    prevention: ['Pasang alarm 5 menit sebelum adzan untuk bersiap', 'Jadikan salat sebagai jeda istirahat dari pekerjaan', 'Tanamkan prinsip: "Tinggalkan dunia saat Allah memanggil"'],
    doa: {
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      latin: "Rabbijalni muqimas salati wa min dzurriyyati rabbana wa taqabbal du'a.",
      translation: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat, ya Tuhan kami, perkenankanlah doaku.",
      source: "QS. Ibrahim: 40"
    }
  },

  // 16. Menyebarkan Hoax & Fitnah
  {
    id: 'hoax', 
    categoryId: 'sosial', 
    name: 'Menyebarkan Hoax & Fitnah',
    definition: 'Membagikan berita, foto, atau informasi yang belum jelas kebenarannya, yang dapat menimbulkan keresahan atau mencemarkan nama baik.',
    reason: 'Cukuplah seseorang dikatakan pendusta jika menceritakan setiap apa yang ia dengar tanpa tabayyun.',
    source: 'HR. Muslim no. 5',
    dalilArabic: 'كَفَى بِالْمَرْءِ كَذِبًا أَنْ يُحَدِّثَ بِكُلِّ مَا سَمِعَ',
    examples: ['Membagikan pesan berantai WhatsApp tanpa cek fakta', 'Membuat konten fitnah demi engagement/views', 'Menyebarkan gosip selebriti/politik palsu'],
    signs: ['Gatal tangan ingin selalu menjadi yang pertama share berita', 'Membaca judul saja tanpa membaca isi berita', 'Sering panik membaca pesan berantai'],
    triggers: ['Ingin terlihat up-to-date', 'Fanatisme terhadap kelompok tertentu', 'Ketidaktahuan/rendahnya literasi digital'],
    impacts: ['Berperan dalam menghancurkan reputasi pihak yang difitnah', 'Dosa Jariyah (terus mengalir jika hoax terus disebarkan)', 'Memicu kekacauan masyarakat'],
    prevention: ['Saring sebelum sharing (Tabayyun)', 'Jika ragu, jangan sebarkan', 'Hapus postingan yang terbukti salah dan buat klarifikasi'],
    doa: {
      arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      latin: "Rabbana dhalamna anfusana wa in lam taghfir lana watarhamna lanakunanna minal khasirin.",
      translation: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.",
      source: "QS. Al-A'raf: 23"
    }
  },

  // 17. Menyiksa Hewan
  {
    id: 'menyiksa-hewan', 
    categoryId: 'lingkungan', 
    name: 'Menyiksa Hewan',
    definition: 'Bersikap kejam terhadap hewan, menelantarkan hewan peliharaan, atau menyakiti mereka untuk kesenangan.',
    reason: 'Rasulullah melaknat orang yang menjadikan makhluk bernyawa sebagai sasaran tembak/mainan. Berbuat baik pada hewan mendatangkan ampunan.',
    source: 'HR. Bukhari no. 5515',
    dalilArabic: 'لَعَنَ اللَّهُ مَنِ اتَّخَذَ شَيْئًا فِيهِ الرُّوحُ غَرَضًا',
    examples: ['Mengadu ayam/anjing untuk judi', 'Menelantarkan kucing peliharaan tanpa makanan/minuman', 'Menembak burung hanya untuk hiburan/iseng'],
    signs: ['Tidak punya rasa belas kasih melihat makhluk lemah', 'Menjadikan penderitaan hewan sebagai tontonan', 'Merasa manusia bebas berbuat apa saja pada hewan'],
    triggers: ['Sikap sadis atau kurang empati', 'Mengikuti tren yang salah', 'Tidak paham bahwa hewan juga makhluk Allah yang bertasbih'],
    impacts: ['Pelakunya diancam masuk neraka', 'Hati menjadi keras dan bengis', 'Mendapat karma buruk'],
    prevention: ['Berikan makanan/minuman pada hewan liar (street feeding)', 'Jika tidak suka pada hewan tertentu, cukup jauhi tanpa menyakiti', 'Beri pendidikan empati kepada anak-anak tentang hewan'],
    doa: {
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
      latin: "Rabbi awzi'ni an asykura ni'matakal lati an'amta 'alayya wa 'ala walidayya wa an a'mala shalihan tardhahu.",
      translation: "Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada dua orang ibu bapakku dan untuk mengerjakan amal saleh yang Engkau ridhai.",
      source: "QS. An-Naml: 19"
    }
  },

  // 18. Merusak Alam & Lingkungan
  {
    id: 'merusak-alam', 
    categoryId: 'lingkungan', 
    name: 'Merusak Alam & Lingkungan',
    definition: 'Melakukan tindakan yang merusak ekosistem, seperti membuang sampah sembarangan, mencemari sungai, atau merusak pohon tanpa alasan.',
    reason: 'Islam mengajarkan kebersihan dan rahmat bagi seluruh alam. Membuat kerusakan di bumi setelah diperbaiki adalah terlarang.',
    source: 'QS. Al-A\'raf: 56',
    dalilArabic: 'وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا ۚ إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
    examples: ['Membuang sampah plastik ke sungai', 'Vandalisme di tempat wisata alam', 'Menebang pohon sembarangan'],
    signs: ['Sikap apatis "nanti juga ada tukang sapu"', 'Mengutamakan kepraktisan pribadi dibanding kebersihan umum', 'Merasa alam tidak punya hak'],
    triggers: ['Kemalasan membuang sampah pada tempatnya', 'Egoisme sempit', 'Kurangnya edukasi tentang ekosistem'],
    impacts: ['Memicu bencana banjir dan penyakit', 'Mengganggu kenyamanan publik (zalim sosial)', 'Dosa karena merusak ciptaan Allah'],
    prevention: ['Biasakan menyimpan sampah di kantong/tas sampai menemukan tong sampah', 'Kurangi penggunaan plastik sekali pakai', 'Ikut serta dalam kegiatan membersihkan lingkungan'],
    doa: {
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
      latin: "Rabbi awzi'ni an asykura ni'matakal lati an'amta 'alayya wa 'ala walidayya wa an a'mala shalihan tardhahu.",
      translation: "Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada dua orang ibu bapakku dan untuk mengerjakan amal saleh yang Engkau ridhai.",
      source: "QS. An-Naml: 19"
    }
  },

  // 19. Mubazir (Food & Wealth Waste)
  {
    id: 'mubazir', 
    categoryId: 'lingkungan', 
    name: 'Mubazir (Food & Wealth Waste)',
    definition: 'Membuang-buang makanan, air, atau harta secara berlebihan dan tidak bermanfaat.',
    reason: 'Orang yang mubazir adalah saudara setan karena menyia-nyiakan nikmat yang banyak orang lain butuhkan.',
    source: 'QS. Al-Isra: 27',
    dalilArabic: 'إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ ۖ وَكَانَ الشَّيْطَانُ لِرَبِّهِ كَفُورًا',
    examples: ['Mengambil makanan banyak di prasmanan lalu disisakan/dibuang', 'Membeli banyak skincare tapi kadaluwarsa karena tidak dipakai', 'Membuang air berlebihan saat wudhu/mandi'],
    signs: ['Tidak merasa bersalah membuang sisa makanan', 'Sering membeli barang yang sudah dimiliki hanya karena lucu', 'Kulkas penuh makanan yang berujung busuk'],
    triggers: ['Gengsi / gengsi menghabiskan makanan', 'Promo diskon besar-besaran', 'Ketidaksadaran akan orang-orang yang kelaparan'],
    impacts: ['Kehilangan keberkahan rezeki', 'Merusak keseimbangan sumber daya bumi', 'Dituntut pertanggungjawaban di akhirat'],
    prevention: ['Ambil porsi makanan secukupnya (tambah jika kurang)', 'Terapkan gaya hidup minimalis (beli yang butuh, bukan yang dimau)', 'Bagikan makanan berlebih ke tetangga sebelum basi'],
    doa: {
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
      latin: "Rabbi awzi'ni an asykura ni'matakal lati an'amta 'alayya wa 'ala walidayya wa an a'mala shalihan tardhahu.",
      translation: "Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada dua orang ibu bapakku dan untuk mengerjakan amal saleh yang Engkau ridhai.",
      source: "QS. An-Naml: 19"
    }
  },

  // 20. Namimah (Adu Domba)
  {
    id: 'namimah', 
    categoryId: 'lisan', 
    name: 'Namimah (Adu Domba)',
    definition: 'Menyebarkan perkataan dari satu orang ke orang lain dengan tujuan merusak hubungan dan memicu permusuhan.',
    reason: 'Pelaku adu domba diancam tidak akan masuk surga karena kerusakan besar yang ditimbulkannya.',
    source: 'HR. Bukhari no. 6056',
    dalilArabic: 'لَا يَدْخُلُ الْجَنَّةَ نَمَّامٌ (قَتَّاتٌ)',
    examples: ['Menceritakan omongan A kepada B agar mereka berkelahi', 'Memanipulasi cerita agar dua pihak saling benci', 'Screenshot chat untuk memprovokasi orang lain'],
    signs: ['Senang melihat orang lain berkonflik', 'Suka mencari muka di depan banyak pihak', 'Sering memelintir ucapan orang'],
    triggers: ['Rasa dengki melihat hubungan orang lain harmonis', 'Keinginan mencari posisi/keuntungan dari konflik', 'Sifat jahat (toxic)'],
    impacts: ['Menghancurkan komunitas dan keluarga', 'Mendapat azab kubur yang pedih', 'Pelakunya diasingkan oleh masyarakat'],
    prevention: ['Saring informasi sebelum menyampaikan', 'Berhenti menyebarkan aib', 'Jangan mudah percaya laporan dari orang yang suka bergosip'],
    doa: {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      latin: "Subhanakallahumma wa bihamdika, asyhadu alla ilaha illa anta, astaghfiruka wa atubu ilaik.",
      translation: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu. Aku bersaksi bahwa tiada tuhan selain Engkau. Aku mohon ampun dan bertaubat kepada-Mu.",
      source: "HR. Tirmidzi (Kafaratul Majlis)"
    }
  },

  // 21. Percaya Ramalan (Zodiak/Tarot)
  {
    id: 'ramalan', 
    categoryId: 'akidah', 
    name: 'Percaya Ramalan (Zodiak/Tarot)',
    definition: 'Mempercayai bahwa bintang, kartu, atau ramalan dapat mengetahui hal gaib di masa depan.',
    reason: 'Hanya Allah yang mengetahui hal gaib. Mempercayai peramal sama dengan mengkufuri apa yang diturunkan kepada Nabi Muhammad.',
    source: 'HR. Ahmad no. 9532',
    dalilArabic: 'مَنْ أَتَى كَاهِنًا أَوْ عَرَّافًا فَصَدَّقَهُ بِمَا يَقُولُ فَقَدْ كَفَرَ بِمَا أُنْزِلَ عَلَى مُحَمَّدٍ',
    examples: ['Membaca ramalan zodiak harian', 'Mendatangi peramal tarot untuk urusan jodoh', 'Mencocokkan nasib dengan weton'],
    signs: ['Gelisah jika ramalan zodiaknya buruk', 'Menjadikan ramalan sebagai dasar mengambil keputusan'],
    triggers: ['Rasa tidak aman (insecurity) tentang masa depan', 'Tren di media sosial', 'Penasaran semata'],
    impacts: ['Salat tidak diterima 40 hari (jika sekadar bertanya)', 'Jatuh pada kekufuran (jika membenarkan ramalannya)'],
    prevention: ['Unfollow akun ramalan/zodiak di medsos', 'Tawakkal dan serahkan masa depan pada Allah', 'Sibukkan diri dengan perencanaan rasional'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
      latin: "Allahumma inni a'udzu bika an usyrika bika wa ana a'lam, wa astaghfiruka lima la a'lam.",
      translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan menyekutukan-Mu di saat aku mengetahui, dan aku mohon ampunan dari sesuatu yang aku tidak mengetahui.",
      source: "HR. Ahmad"
    }
  },

  // 22. Pornografi
  {
    id: 'pornografi', 
    categoryId: 'syahwat', 
    name: 'Pornografi',
    definition: 'Melihat, menyimpan, atau menyebarkan gambar/video yang mempertontonkan aurat dan aktivitas seksual secara terbuka.',
    reason: 'Merusak fungsi otak, menghancurkan pernikahan, dan menjadi gerbang awal menuju perbuatan zina yang nyata.',
    source: 'QS. An-Nur: 30',
    dalilArabic: 'قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ ۗ إِنَّ اللَّهَ خَبِيرٌ بِمَا يَصْنَعُونَ',
    examples: ['Mengakses situs dewasa', 'Menyimpan video asusila di HP', 'Mengikuti akun sosmed yang mengumbar aurat ekstrim'],
    signs: ['Durasi di toilet/kamar sendirian sangat lama', 'Menghapus riwayat pencarian (history browser) setiap saat', 'Sulit berkonsentrasi (brain fog)'],
    triggers: ['Stres dan menjadikan pornografi sebagai pelarian', 'Tersedianya akses internet tanpa filter', 'Waktu luang sendirian (terutama malam hari)'],
    impacts: ['Kerusakan otak bagian prefrontal cortex (sama seperti narkoba)', 'Disfungsi ereksi / kerusakan orientasi seksual', 'Hilangnya kekhusyukan beribadah'],
    prevention: ['Pasang aplikasi pemblokir konten (Blocker)', 'Jangan membawa HP ke kamar tidur atau kamar mandi', 'Lakukan aktivitas fisik yang menguras energi'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي، وَمِنْ شَرِّ بَصَرِي، وَمِنْ شَرِّ لِسَانِي، وَمِنْ شَرِّ قَلْبِي، وَمِنْ شَرِّ مَنِيِّي",
      latin: "Allahumma inni a'udzu bika min syarri sam'i, wa min syarri bashari, wa min syarri lisani, wa min syarri qalbi, wa min syarri maniyyi.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari keburukan pendengaranku, penglihatanku, lisanku, hatiku, dan keburukan syahwatku.",
      source: "HR. Abu Dawud"
    }
  },

  // 23. Riba (Bunga/Renternir)
  {
    id: 'riba', 
    categoryId: 'harta', 
    name: 'Riba (Bunga/Renternir)',
    definition: 'Mengambil tambahan (bunga) yang diisyaratkan pada transaksi pinjam-meminjam uang atau penukaran barang ribawi.',
    reason: 'Riba adalah dosa besar yang diibaratkan seperti menantang perang dengan Allah dan Rasul-Nya.',
    source: 'QS. Al-Baqarah: 279',
    dalilArabic: 'فَإِن لَّمْ تَفْعَلُوا فَأْذَنُوا بِحَرْبٍ مِّنَ اللَّهِ وَرَسُولِهِ ۖ وَإِن تُبْتُمْ فَلَكُمْ رُءُوسُ أَمْوَالِكُمْ لَا تَظْلِمُونَ وَلَا تُظْلَمُونَ',
    examples: ['Meminjam uang di aplikasi pinjol berbunga', 'Mengambil KPR berbunga/konvensional', 'Membungakan uang pinjaman kepada teman'],
    signs: ['Keuangan selalu terasa kurang meski gaji besar', 'Merasa terjebak dalam siklus gali lubang tutup lubang', 'Stres dikejar tagihan berbunga'],
    triggers: ['Gaya hidup hedonis di luar kemampuan (ingin cepat punya barang)', 'Desakan ekonomi (tanpa mau mencari pinjaman tanpa bunga)', 'Ketidaktahuan hukum agama'],
    impacts: ['Harta tidak berkah dan membawa musibah', 'Pelakunya dilaknat (baik yang meminjam, mencatat, maupun pemberi)', 'Hidup penuh tekanan psikologis'],
    prevention: ['Turunkan gaya hidup (hidup sesuai kemampuan)', 'Pilih lembaga pembiayaan syariah yang murni', 'Kumpulkan dana darurat dan biasakan menabung'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      latin: "Allahumma inni a'udzubika minal hammi wal hazan, wa a'udzubika minal 'ajzi wal kasal, wa a'udzubika minal jubni wal bukhl, wa a'udzubika min ghalabatid-daini wa qahrir-rijal.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari kesusahan dan kesedihan, lemah dan malas, bakhil dan penakut, lilitan hutang dan penindasan orang.",
      source: "HR. Bukhari"
    }
  },

  // 24. Riya (Syirik Kecil)
  {
    id: 'riya-akidah', 
    categoryId: 'akidah', 
    name: 'Riya (Syirik Kecil)',
    definition: 'Melakukan ibadah atau amal saleh dengan niat untuk dilihat dan dipuji manusia, bukan karena Allah.',
    reason: 'Riya menghancurkan keikhlasan yang merupakan syarat mutlak diterimanya sebuah ibadah.',
    source: 'QS. Al-Ma\'un: 4-6',
    dalilArabic: 'فَوَيْلٌ لِّلْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ ۝ الَّذِينَ هُمْ يُرَاءُونَ',
    examples: ['Memperlama sujud ketika dilihat calon mertua', 'Upload bukti sedekah agar dipuji dermawan', 'Membaguskan bacaan Quran hanya saat direkam'],
    signs: ['Semangat beribadah saat ramai, malas saat sendirian', 'Marah/kecewa jika amalnya tidak diapresiasi orang'],
    triggers: ['Kebutuhan akan validasi (haus pujian)', 'Lingkungan yang suka pamer ibadah', 'Adanya kamera/sosmed'],
    impacts: ['Amal ibadah menjadi sia-sia tanpa pahala', 'Menjadi orang yang pertama kali dilempar ke neraka (hadis tentang orang riya)'],
    prevention: ['Sembunyikan amal kebaikan seperti menyembunyikan aib', 'Latih ibadah rahasia (seperti tahajud atau sedekah diam-diam)', 'Perbarui niat sebelum, saat, dan sesudah beramal'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
      latin: "Allahumma inni a'udzu bika an usyrika bika wa ana a'lam, wa astaghfiruka lima la a'lam.",
      translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan menyekutukan-Mu di saat aku mengetahui, dan aku mohon ampunan dari sesuatu yang aku tidak mengetahui.",
      source: "HR. Ahmad"
    }
  },

  // 25. Sombong (Kibr)
  {
    id: 'sombong', 
    categoryId: 'hati', 
    name: 'Sombong (Kibr)',
    definition: 'Menolak kebenaran dan merendahkan orang lain karena merasa diri lebih hebat (ilmu, harta, atau nasab).',
    reason: 'Sombong adalah pakaian kebesaran Allah, makhluk tidak berhak memakainya.',
    source: 'HR. Muslim no. 91',
    dalilArabic: 'الْكِبْرُ بَطَرُ الْحَقِّ وَغَمْطُ النَّاسِ',
    examples: ['Menolak nasehat dari orang yang lebih muda', 'Meremehkan pekerjaan orang lain', 'Berjalan dengan gaya angkuh dan pamer'],
    signs: ['Mudah tersinggung jika tidak dihormati', 'Suka memotong pembicaraan orang', 'Enggan meminta maaf lebih dulu'],
    triggers: ['Merasa memiliki kelebihan (sukses/kaya/pintar)', 'Mendapat pujian terus-menerus', 'Berada di posisi kekuasaan/jabatan tinggi'],
    impacts: ['Diharamkan masuk surga walau seberat biji sawi', 'Dibenci oleh manusia', 'Hati tertutup dari hidayah'],
    prevention: ['Ingat asal mula penciptaan (dari air hina)', 'Banyak bergaul dengan kaum dhuafa', 'Latih diri mendengarkan nasehat dari siapapun'],
    doa: {
      arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
      latin: "Allahumma ati nafsi taqwaha, wa zakkiha anta khairu man zakkaha, anta waliyyuha wa maulaha.",
      translation: "Ya Allah, berikanlah ketakwaan pada jiwaku, dan sucikanlah ia, Engkaulah sebaik-baik yang menyucikannya, Engkau Pencipta dan Pelindungnya.",
      source: "HR. Muslim"
    }
  },

  // 26. Su'udzon (Buruk Sangka)
  {
    id: 'suudzon', 
    categoryId: 'hati', 
    name: 'Su\'udzon (Buruk Sangka)',
    definition: 'Mudah mencurigai dan berprasangka buruk terhadap orang lain tanpa bukti yang nyata.',
    reason: 'Sebagian besar prasangka adalah dosa dan merupakan seburuk-buruk ucapan hati.',
    source: 'QS. Al-Hujurat: 12',
    dalilArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ',
    examples: ['Menuduh teman mencuri saat barang hilang tanpa bukti', 'Menganggap orang yang diam berarti membenci kita', 'Mencurigai niat baik seseorang sebagai pencitraan'],
    signs: ['Selalu berasumsi skenario terburuk', 'Sering menganalisa gerak-gerik orang lain secara negatif', 'Sulit mempercayai orang lain'],
    triggers: ['Pengalaman dikhianati di masa lalu', 'Kurangnya komunikasi atau tabayyun', 'Sifat pesimis dan insecure'],
    impacts: ['Menghancurkan silaturahmi dan persahabatan', 'Memicu fitnah dan ghibah', 'Membuat hidup selalu penuh kecemasan'],
    prevention: ['Biasakan mencari 70 alasan baik untuk saudaramu', 'Jika ragu, langsung tabayyun (klarifikasi)', 'Tolak bisikan curiga dari setan di awal kemunculannya'],
    doa: {
      arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
      latin: "Allahumma ati nafsi taqwaha, wa zakkiha anta khairu man zakkaha, anta waliyyuha wa maulaha.",
      translation: "Ya Allah, berikanlah ketakwaan pada jiwaku, dan sucikanlah ia, Engkaulah sebaik-baik yang menyucikannya, Engkau Pencipta dan Pelindungnya.",
      source: "HR. Muslim"
    }
  },

  // 27. Syirik (Menyekutukan Allah)
  {
    id: 'syirik', 
    categoryId: 'akidah', 
    name: 'Syirik (Menyekutukan Allah)',
    definition: 'Menjadikan sekutu bagi Allah dalam hal penciptaan, ibadah, atau sifat-sifat-Nya.',
    reason: 'Merupakan kezaliman yang paling besar dan dosa yang tidak akan diampuni jika pelakunya mati sebelum bertaubat.',
    source: 'QS. An-Nisa: 48',
    dalilArabic: 'إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ ۚ وَمَن يُشْرِكْ بِاللَّهِ فَقَدِ افْتَرَىٰ إِثْمًا عَظِيمًا',
    examples: ['Berdoa kepada selain Allah (kuburan/wali)', 'Memakai jimat penolak bala', 'Percaya dukun/paranormal'],
    signs: ['Merasa aman dari musibah karena benda tertentu', 'Hati lebih takut pada makhluk mistis daripada Allah'],
    triggers: ['Kepanikan saat sakit parah atau krisis keuangan', 'Lingkungan yang kental dengan kesyirikan'],
    impacts: ['Menghapus seluruh pahala amal ibadah', 'Menyebabkan pelakunya kekal di neraka jika tidak bertaubat'],
    prevention: ['Perdalam ilmu tauhid (Akidah)', 'Jauhi praktik perdukunan walau berkedok agama', 'Banyak berdoa hanya kepada Allah'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
      latin: "Allahumma inni a'udzu bika an usyrika bika wa ana a'lam, wa astaghfiruka lima la a'lam.",
      translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan menyekutukan-Mu di saat aku mengetahui, dan aku mohon ampunan dari sesuatu yang aku tidak mengetahui.",
      source: "HR. Ahmad"
    }
  },

  // 28. Tidak Menjaga Pandangan
  {
    id: 'tidak-jaga-pandangan', 
    categoryId: 'syahwat', 
    name: 'Tidak Menjaga Pandangan',
    definition: 'Melepas pandangan (mengamati) pada lawan jenis dengan syahwat, baik di dunia nyata maupun media sosial.',
    reason: 'Pandangan adalah panah beracun dari setan yang akan menancap di hati dan melahirkan keinginan berbuat maksiat.',
    source: 'HR. Muslim no. 2159',
    dalilArabic: 'اصْرِفْ بَصَرَكَ (فَإِنَّ لَكَ الْأُولَى وَلَيْسَتْ لَكَ الْآخِرَةُ)',
    examples: ['Melihat FYP TikTok/Instagram yang berisi aurat tanpa di-scroll cepat', 'Memandangi lawan jenis di jalan dengan durasi lama', 'Stalking foto-foto lawan jenis'],
    signs: ['Hati mudah gelisah', 'Sering berfantasi yang tidak-tidak', 'Menurunnya rasa cinta kepada pasangan sah (istri/suami)'],
    triggers: ['Algoritma media sosial', 'Berada di tempat umum yang banyak mengumbar aurat', 'Kurangnya zikir harian'],
    impacts: ['Hati menjadi keras dan kotor', 'Susah menghafal ilmu atau ayat Quran', 'Memicu dosa lisan (mengomentari fisik) dan dosa tangan'],
    prevention: ['Tundukkan pandangan saat bertemu di dunia nyata', 'Atur algoritma medsos (not interested) pada konten terbuka', 'Istighfar segera jika tidak sengaja melihat'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي، وَمِنْ شَرِّ بَصَرِي، وَمِنْ شَرِّ لِسَانِي، وَمِنْ شَرِّ قَلْبِي، وَمِنْ شَرِّ مَنِيِّي",
      latin: "Allahumma inni a'udzu bika min syarri sam'i, wa min syarri bashari, wa min syarri lisani, wa min syarri qalbi, wa min syarri maniyyi.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari keburukan pendengaranku, penglihatanku, lisanku, hatiku, dan keburukan syahwatku.",
      source: "HR. Abu Dawud"
    }
  },

  // 29. Zalim & Mengambil Hak Orang
  {
    id: 'zalim', 
    categoryId: 'sosial', 
    name: 'Zalim & Mengambil Hak Orang',
    definition: 'Berbuat aniaya kepada manusia lain, seperti menipu, merampas, memukul tanpa hak, atau tidak membayar hutang padahal mampu.',
    reason: 'Kezaliman adalah kegelapan di hari kiamat. Doa orang yang dizalimi tidak ada hijab dengan Allah.',
    source: 'HR. Muslim no. 2578',
    dalilArabic: 'اتَّقُوا الظُّلْمَ فَإِنَّ الظُّلْمَ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ',
    examples: ['Menunda bayar hutang padahal punya uang', 'Bos yang tidak membayar gaji karyawan sesuai hak', 'Memarkir kendaraan yang menghalangi jalan tetangga'],
    signs: ['Menggampangkan hak orang lain', 'Sering berjanji tapi tidak pernah ditepati', 'Bersikap semena-mena karena punya kuasa'],
    triggers: ['Sifat serakah', 'Merasa tidak akan dihukum', 'Egoisme (hanya memikirkan keuntungan sendiri)'],
    impacts: ['Ditagih di akhirat dengan transfer pahala (menjadi muflis/bangkrut)', 'Doa keburukan dari korban yang cepat dikabulkan', 'Bencana dalam kehidupan dunia'],
    prevention: ['Segera lunasi hutang dan tunaikan janji', 'Minta maaf jika melakukan kesalahan', 'Takutlah akan doa orang yang terzalimi'],
    doa: {
      arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
      latin: "Rabbana dhalamna anfusana wa in lam taghfir lana watarhamna lanakunanna minal khasirin.",
      translation: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.",
      source: "QS. Al-A'raf: 23"
    }
  },

  // 30. Zina & Mendekati Zina
  {
    id: 'zina', 
    categoryId: 'syahwat', 
    name: 'Zina & Mendekati Zina',
    definition: 'Melakukan hubungan seksual di luar ikatan pernikahan yang sah, atau melakukan hal-hal yang mendekatinya (khalwat, pacaran fisik).',
    reason: 'Zina adalah perbuatan keji dan seburuk-buruk jalan yang menghancurkan nasab dan kehormatan.',
    source: 'QS. Al-Isra: 32',
    dalilArabic: 'وَلَا تَقْرَبُوا الزِّنَىٰ ۖ إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا',
    examples: ['Berduaan di tempat sepi dengan non-mahram (khalwat)', 'Melakukan kontak fisik intim di luar nikah', 'Menggoda dan melakukan sexting via DM'],
    signs: ['Hilangnya rasa malu (haya)', 'Gelisah dan selalu memikirkan lawan jenis secara berlebihan', 'Mengabaikan batasan agama atas nama "cinta"'],
    triggers: ['Pergaulan bebas', 'Lemahnya iman dan kekosongan spiritual', 'Terlalu banyak konsumsi konten romantis/dewasa'],
    impacts: ['Terhapusnya cahaya keimanan dari wajah', 'Penyakit menular seksual (duniawi)', 'Hukuman berat di dunia dan azab di akhirat'],
    prevention: ['Jauhi pacaran dan aktivitas mendekati zina', 'Menikah jika sudah mampu', 'Perbanyak puasa sunnah bagi yang belum mampu menikah'],
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي، وَمِنْ شَرِّ بَصَرِي، وَمِنْ شَرِّ لِسَانِي، وَمِنْ شَرِّ قَلْبِي، وَمِنْ شَرِّ مَنِيِّي",
      latin: "Allahumma inni a'udzu bika min syarri sam'i, wa min syarri bashari, wa min syarri lisani, wa min syarri qalbi, wa min syarri maniyyi.",
      translation: "Ya Allah, aku berlindung kepada-Mu dari keburukan pendengaranku, penglihatanku, lisanku, hatiku, dan keburukan syahwatku.",
      source: "HR. Abu Dawud"
    }
  }
];
