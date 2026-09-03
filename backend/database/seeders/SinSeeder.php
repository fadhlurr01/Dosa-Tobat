<?php

namespace Database\Seeders;

use App\Models\Sin;
use Illuminate\Database\Seeder;

class SinSeeder extends Seeder
{
    public function run(): void
    {
        $sins = [
            [
                'id' => 'syirik-kecil',
                'category_id' => 'akidah',
                'name' => 'Syirik Kecil & Riya\'',
                'definition' => 'Mengharapkan pujian makhluk dalam beribadah atau beramal sholeh, serta bersumpah dengan selain nama Allah.',
                'source' => 'Q.S. Al-Kahf: 110',
                'reason' => 'Barangsiapa mengharap perjumpaan dengan Tuhannya, maka hendaklah ia mengerjakan amal yang saleh dan janganlah ia mempersekutukan seorangpun dalam beribadat kepada Tuhannya.',
                'level' => 'BERAT',
                'signs' => ['Semangat beramal jika dilihat orang lain', 'Malas jika sendirian', 'Gelisah jika kebaikan tidak diakui'],
                'consequences' => ['Gugurnya pahala amal', 'Hati senantiasa bergantung pada sanjungan manusia', 'Kekeringan spiritual'],
                'prevention' => ['Menyembunyikan sedekah dan shalat sunnah', 'Membaca doa penangkal riya\' setiap pagi', 'Mengingat fana-nya pujian manusia'],
                'fast_recovery_tips' => ['Segera beristighfar 3x saat terbersit ingin dipuji', 'Lakukan satu amal rahasia yang tidak diketahui siapapun'],
                'kafarat_instructions' => ['Membaca doa: Allahumma inni a\'udzu bika an usyrika bika wa ana a\'lam...', 'Memperbanyak sedekah secara sembunyi-sembunyi'],
                'image_url' => 'https://images.unsplash.com/photo-1519817914152-2a220bf73408?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 142
            ],
            [
                'id' => 'meninggalkan-shalat',
                'category_id' => 'ibadah',
                'name' => 'Meninggalkan Shalat Fardhu',
                'definition' => 'Sengaja melalaikan atau meninggalkan shalat lima waktu hingga keluar dari batas waktu yang ditetapkan.',
                'source' => 'Q.S. Maryam: 59',
                'reason' => 'Maka datanglah sesudah mereka, pengganti (yang jelek) yang menyia-nyiakan shalat dan memperturutkan hawa nafsunya, maka mereka kelak akan menemui kesesatan.',
                'level' => 'BERAT',
                'signs' => ['Menunda shalat hingga menit-menit akhir', 'Merasa berat saat adzan berkumandang', 'Mengutamakan urusan duniawi tanpa jeda'],
                'consequences' => ['Hilangnya keberkahan waktu dan rezeki', 'Hati menjadi gelap dan mudah tergoda maksiat lain', 'Ancaman siksa kubur yang pedih'],
                'prevention' => ['Pasang pengingat adzan di gawai', 'Wudhu 10 menit sebelum waktu shalat tiba', 'Shalat berjamaah di masjid bagi laki-laki'],
                'fast_recovery_tips' => ['Segera ambil air wudhu', 'Lakukan shalat yang terlewat (qadha\') seketika', 'Sujud taubat memohon ampunan'],
                'kafarat_instructions' => ['Meng-qadha shalat yang tertinggal', 'Bertaubat nasuha dan bertekad menjaga shalat tepat waktu', 'Menambah shalat sunnah rawatib'],
                'image_url' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 280
            ],
            [
                'id' => 'hasad',
                'category_id' => 'hati',
                'name' => 'Hasad & Dengki',
                'definition' => 'Merasa tidak senang atas nikmat yang diperoleh orang lain disertai keinginan agar nikmat tersebut hilang dari mereka.',
                'source' => 'H.R. Abu Dawud no. 4903',
                'reason' => 'Jauhilah hasad (dengki), karena hasad itu memakan kebaikan sebagaimana api memakan kayu bakar.',
                'level' => 'SEDANG',
                'signs' => ['Hati sesak saat melihat teman sukses', 'Senang melihat orang lain ditimpa kesulitan', 'Sering membandingkan nasib diri dengan orang lain'],
                'consequences' => ['Menghabiskan energi batin dalam kepalsuan', 'Merusak keikhlasan dan menghanguskan pahala', 'Menimbulkan permusuhan'],
                'prevention' => ['Mendoakan keberkahan bagi orang yang mendapat nikmat (Barakallahu lak)', 'Membatasi konsumsi flexing di media sosial', 'Fokus pada potensi diri sendiri'],
                'fast_recovery_tips' => ['Ucapkan: Masya Allah Laa Quwwata Illa Billah', 'Kirimkan hadiah atau sedekah atas nama orang yang dihasadi'],
                'kafarat_instructions' => ['Mendoakan kebaikan bagi orang yang kita dengki secara tulus', 'Memperbanyak rasa syukur atas karunia yang ada'],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 195
            ],
            [
                'id' => 'ghibah',
                'category_id' => 'lisan',
                'name' => 'Ghibah & Menggunjing',
                'definition' => 'Membicarakan aib atau keburukan saudara sesama muslim yang ia benci jika mengetahuinya, meskipun yang dibicarakan benar adanya.',
                'source' => 'Q.S. Al-Hujurat: 12',
                'reason' => 'Dan janganlah menggunjing satu sama lain. Adakah seorang diantara kamu yang suka memakan daging saudaranya yang sudah mati? Maka tentulah kamu merasa jijik kepadanya.',
                'level' => 'SEDANG',
                'signs' => ['Merasa asyik saat obrolan mulai menjelekkan orang', 'Menyindir aib seseorang di media sosial', 'Bertanya kabar hanya untuk menggali kelemahan orang'],
                'consequences' => ['Pahala kebaikan ditransfer kepada orang yang dighibahi di akhirat', 'Mencemari hati dan menghilangkan nur ibadah', 'Meruntuhkan tali ukhuwah'],
                'prevention' => ['Alihkan topik obrolan saat ghibah dimulai', 'Tinggalkan majelis obrolan yang unfaedah', 'Tahan lisan dengan berdzikir saat ingin berkomentar'],
                'fast_recovery_tips' => ['Membaca Doa Kafaratul Majlis', 'Puji kebaikan orang yang dighibahi di hadapan orang lain'],
                'kafarat_instructions' => ['Memohon maaf langsung jika tidak menimbulkan mudharat yang lebih besar', 'Mendoakan ampunan dan kebaikan untuk orang yang dighibahi', 'Bersedekah atas nama orang tersebut'],
                'image_url' => 'https://images.unsplash.com/photo-1478228186121-8255b4104bd1?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 312
            ],
            [
                'id' => 'riba',
                'category_id' => 'harta',
                'name' => 'Transaksi Riba & Pinjol Ilegal',
                'definition' => 'Pengambilan tambahan nilai pinjaman atau transaksi keuangan yang diharamkan syariat dan mengeksploitasi sesama.',
                'source' => 'Q.S. Al-Baqarah: 275',
                'reason' => 'Allah telah menghalalkan jual beli dan mengharamkan riba.',
                'level' => 'BERAT',
                'signs' => ['Terbiasa dengan sistem kredit berbunga tanpa rasa bersalah', 'Gali lubang tutup lubang pinjaman konsumtif', 'Menganggap bunga bank hal lumrah'],
                'consequences' => ['Diumumkan perang oleh Allah dan Rasul-Nya', 'Harta tidak membawa ketenangan jiwa', 'Doa-doa tertolak'],
                'prevention' => ['Hidup sesuai kemampuan (qana\'ah)', 'Gunakan instrumen perbankan syariah murni', 'Hindari gaya hidup konsumtif berlebihan'],
                'fast_recovery_tips' => ['Hentikan akad baru pinjaman berbunga seketika', 'Konsultasikan pelunasan pokok secara syar\'i'],
                'kafarat_instructions' => ['Bertaubat nasuha dan melunasi sisa hutang pokok secepatnya', 'Menyalurkan kelebihan bunga ke fasilitas umum tanpa niat pahala sedekah'],
                'image_url' => 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 178
            ],
            [
                'id' => 'zina-mata',
                'category_id' => 'syahwat',
                'name' => 'Zina Mata & Pornografi',
                'definition' => 'Memandang aurat atau konten sensual yang diharamkan, memicu syahwat liar di dunia maya maupun nyata.',
                'source' => 'Q.S. An-Nur: 30',
                'reason' => 'Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandangannya, dan memelihara kemaluannya; yang demikian itu adalah lebih suci bagi mereka.',
                'level' => 'BERAT',
                'signs' => ['Scrolling feed sensual larut malam saat sendirian', 'Membuka tab incognito untuk konten terlarang', 'Mata liar melirik saat berada di tempat umum'],
                'consequences' => ['Kerusakan reseptor dopamin otak (prefrontal cortex)', 'Hilangnya kenikmatan dalam ibadah dan hubungan halal', 'Kecanduan kronis'],
                'prevention' => ['Aktifkan Mode Darurat SOS 90-Detik saat terpicu', 'Letakkan gadget di luar kamar tidur pada malam hari', 'Pasang filter DNS anti-konten dewasa'],
                'fast_recovery_tips' => ['Segera basuh wajah dengan air wudhu dingin', 'Tinggalkan ruangan isolasi dan temui orang lain seketika', 'Lakukan teknik pernapasan 4-4-4'],
                'kafarat_instructions' => ['Shalat sunnah taubat 2 rakaat', 'Istighfar 100x dan bersedekah sebagai bentuk denda atas diri sendiri'],
                'image_url' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 520
            ],
            [
                'id' => 'judi-online',
                'category_id' => 'kecanduan',
                'name' => 'Judi Online & Slot Gacor',
                'definition' => 'Mempertaruhkan harta dalam permainan untung-untungan digital yang menjanjikan kemenangan semu dan memicu kehancuran ekonomi.',
                'source' => 'Q.S. Al-Ma\'idah: 90',
                'reason' => 'Sesungguhnya (meminum) khamr, berjudi, (berkorban untuk) berhala, mengundi nasib dengan panah, adalah termasuk perbuatan syaitan. Maka jauhilah perbuatan-perbuatan itu agar kamu mendapat keberuntungan.',
                'level' => 'BERAT',
                'signs' => ['Terus ingin membalas kekalahan (chasing losses)', 'Meminjam uang atau menjual barang berharga untuk deposit', 'Emosi meledak-ledak saat kalah'],
                'consequences' => ['Kehancuran finansial total dan hutang menumpuk', 'Keretakan rumah tangga dan keluarga', 'Gangguan mental dan kecemasan tinggi'],
                'prevention' => ['Tutup akun dan hapus seluruh aplikasi perbankan digital pemicu', 'Serahkan kendali keuangan sementara kepada pasangan / orang tua', 'Blokir nomor kontak agen judi'],
                'fast_recovery_tips' => ['Hapus nomor rekening penampung', 'Buka Jurnal Taubat dan akui kerugian tanpa kompromi'],
                'kafarat_instructions' => ['Taubat nasuha dan berhenti total tanpa mencoba sekali lagi', 'Bekerja halal dan menata kembali keuangan secara bertahap'],
                'image_url' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 389
            ],
            [
                'id' => 'marah',
                'category_id' => 'hati',
                'name' => 'Kemarahan Buta & Emosi Meledak',
                'definition' => 'Ketidakmampuan mengendalikan amarah sehingga melontarkan kata-kata kasar, memaki, atau merusak.',
                'source' => 'H.R. Bukhari no. 6116',
                'reason' => 'Janganlah kamu marah, niscaya bagimu surga.',
                'level' => 'SEDANG',
                'signs' => ['Detak jantung berdegup kencang dan tangan gemetar saat tersinggung', 'Membentak orang terdekat secara spontan', 'Melempar atau membanting barang'],
                'consequences' => ['Menimbulkan luka batin mendalam bagi orang tercinta', 'Menyesal di kemudian hari', 'Dikuasai oleh setan'],
                'prevention' => ['Ubah posisi fisik: jika berdiri duduklah, jika duduk berbaringlah', 'Diam dan jangan berbicara sepatah kata pun saat marah', 'Segera berwudhu dengan air dingin'],
                'fast_recovery_tips' => ['Membaca Ta\'awwudz: A\'udzu billahi minasy syaithanir rajim', 'Minum air putih seteguk demi seteguk'],
                'kafarat_instructions' => ['Minta maaf secara tulus kepada pihak yang dibentak', 'Bersedekah dan berdzikir penenang jiwa'],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                'bookmarks_count' => 240
            ]
        ];

        foreach ($sins as $sin) {
            Sin::updateOrCreate(['id' => $sin['id']], $sin);
        }
    }
}
