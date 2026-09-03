<?php

namespace Database\Seeders;

use App\Models\ContentItem;
use Illuminate\Database\Seeder;

class ContentItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Hadis tentang Hakikat Taubat',
                'type' => 'HADIS',
                'arabic' => 'كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
                'latin' => 'Kullu bani Adama khaththa-un, wa khairul khaththa-inat tawwabun.',
                'translation' => 'Setiap anak Adam pasti sering berbuat dosa, dan sebaik-baik orang yang berbuat dosa adalah yang bertaubat.',
                'reference' => 'H.R. Tirmidzi no. 2499',
                'status' => 'PUBLISHED',
                'author' => 'Admin Taubat',
                'reviewer' => 'Ust. Farhan Az-Zuhri, Lc.',
                'version' => 1
            ],
            [
                'title' => 'Keluasan Ampunan Allah',
                'type' => 'AYAT',
                'arabic' => 'قُلْ يَاعِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
                'latin' => 'Qul ya \'ibadiyal ladzina asrafu \'ala anfusihim la taqnathu mir rahmatillah, innallaha yaghfirudz dzunuba jami\'a, innahu huwal ghafurur rahim.',
                'translation' => 'Katakanlah: "Hai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri, janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya. Sesungguhnya Dialah Yang Maha Pengampun lagi Maha Penyayang."',
                'reference' => 'Q.S. Az-Zumar: 53',
                'status' => 'PUBLISHED',
                'author' => 'Content Team',
                'reviewer' => 'Ust. Farhan Az-Zuhri, Lc.',
                'version' => 2
            ],
            [
                'title' => 'Sayyidul Istighfar',
                'type' => 'DOA',
                'arabic' => 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
                'latin' => 'Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa \'abduka wa anaa \'ala \'ahdika wa wa\'dika mastatho\'tu. A\'udzu bika min syarri maa shona\'tu, abuu-u laka bini\'matika \'alayya, wa abuu-u bi dzanbii, faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta.',
                'translation' => 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau yang telah menciptakanku, dan aku adalah hamba-Mu. Aku berada dalam perjanjian-Mu sesuai kemampuanku. Aku berlindung dari keburukan perbuatanku, aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku. Sebab tiada yang mengampuni dosa selain Engkau.',
                'reference' => 'H.R. Bukhari no. 6306',
                'status' => 'PUBLISHED',
                'author' => 'Dewan Dakwah',
                'reviewer' => 'Ust. Farhan Az-Zuhri, Lc.',
                'version' => 1
            ],
            [
                'title' => 'Doa Nabi Yunus AS di Dalam Perut Ikan',
                'type' => 'DOA',
                'arabic' => 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
                'latin' => 'Laa ilaha illa anta subhaanaka innii kuntu minadh dholimiin.',
                'translation' => 'Tidak ada Tuhan selain Engkau, Maha Suci Engkau, sesungguhnya aku termasuk orang-orang yang berbuat zalim.',
                'reference' => 'Q.S. Al-Anbiya: 87',
                'status' => 'PUBLISHED',
                'author' => 'Dewan Dakwah',
                'reviewer' => 'Ust. Farhan Az-Zuhri, Lc.',
                'version' => 1
            ]
        ];

        foreach ($items as $item) {
            ContentItem::updateOrCreate(['title' => $item['title']], $item);
        }
    }
}
