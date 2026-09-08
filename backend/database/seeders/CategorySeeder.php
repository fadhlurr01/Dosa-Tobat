<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'id' => 'akidah',
                'name' => 'Akidah & Tauhid',
                'description' => 'Dosa terkait keyakinan, kemurnian tauhid, dan penyekutuan Allah SWT.',
                'icon' => 'Shield',
                'thumbnail' => 'https://images.unsplash.com/photo-1519817914152-2a220bf73408?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1
            ],
            [
                'id' => 'ibadah',
                'name' => 'Ibadah & Ritual',
                'description' => 'Kelalaian dalam shalat, puasa, zakat, dan ibadah fardhu lainnya.',
                'icon' => 'Moon',
                'thumbnail' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2
            ],
            [
                'id' => 'hati',
                'name' => 'Penyakit Hati',
                'description' => 'Sifat batin yang merusak seperti hasad (dengki), riya\', sombong, dan dendam.',
                'icon' => 'Heart',
                'thumbnail' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 3
            ],
            [
                'id' => 'lisan',
                'name' => 'Lisan & Ucapan',
                'description' => 'Dosa perkataan seperti ghibah, dusta, fitnah, dan mencela orang lain.',
                'icon' => 'MessageCircle',
                'thumbnail' => 'https://images.unsplash.com/photo-1478228186121-8255b4104bd1?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 4
            ],
            [
                'id' => 'harta',
                'name' => 'Harta & Muamalah',
                'description' => 'Kecurangan bisnis, riba, korupsi, judi, dan memakan hak anak yatim.',
                'icon' => 'Wallet',
                'thumbnail' => 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 5
            ],
            [
                'id' => 'keluarga',
                'name' => 'Keluarga & Silaturahmi',
                'description' => 'Durhaka kepada orang tua, menelantarkan nafkah, dan memutus hubungan kerabat.',
                'icon' => 'Users',
                'thumbnail' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 6
            ],
            [
                'id' => 'syahwat',
                'name' => 'Syahwat & Kehormatan',
                'description' => 'Zina, zina mata, pornografi, khalwat, dan pelanggaran batasan aurat.',
                'icon' => 'Flame',
                'thumbnail' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 7
            ],
            [
                'id' => 'kecanduan',
                'name' => 'Kecanduan Digital & Zat',
                'description' => 'Khamr, judi online, media sosial berlebihan, dan ketergantungan game.',
                'icon' => 'Smartphone',
                'thumbnail' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 8
            ],
            [
                'id' => 'sosial',
                'name' => 'Sosial & Hubungan Manusia',
                'description' => 'Kezaliman sosial, diskriminasi, menyebarkan hoaks, dan mengintimidasi.',
                'icon' => 'Globe',
                'thumbnail' => 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 9
            ],
            [
                'id' => 'lingkungan',
                'name' => 'Lingkungan & Makhluk Hidup',
                'description' => 'Perusakan alam, menyiksa hewan tanpa hak, dan membuang sampah sembarangan.',
                'icon' => 'Leaf',
                'thumbnail' => 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 10
            ]
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }
    }
}
