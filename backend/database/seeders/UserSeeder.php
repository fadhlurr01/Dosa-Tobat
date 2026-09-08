<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserJourney;
use App\Models\JournalEntry;
use App\Models\DailyIbadah;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Ahmad Fauzi (Pengguna)',
                'email' => 'ahmad.fauzi@example.com',
                'password' => Hash::make('password'),
                'role' => 'USER',
                'plan' => 'FREE',
                'status' => 'ACTIVE',
                'title' => 'Pengguna Istiqomah (Level 2)',
                'streak_days' => 14,
                'avatar' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
                'is_demo' => true,
            ],
            [
                'id' => 2,
                'name' => 'Fulan bin Abdullah (PRO)',
                'email' => 'fulan.pro@example.com',
                'password' => Hash::make('password'),
                'role' => 'USER',
                'plan' => 'PREMIUM_MONTHLY',
                'status' => 'ACTIVE',
                'title' => 'PRO Member - Pejuang Taubat',
                'streak_days' => 45,
                'avatar' => 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
                'is_demo' => true,
            ],
            [
                'id' => 3,
                'name' => 'Ust. Farhan Az-Zuhri, Lc.',
                'email' => 'ustadz.farhan@taubat.app',
                'password' => Hash::make('password'),
                'role' => 'CONTENT_ADMIN',
                'plan' => 'PREMIUM_YEARLY',
                'status' => 'ACTIVE',
                'title' => 'Dewan Syariah & Reviewer Konten',
                'streak_days' => 90,
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                'is_demo' => true,
            ],
            [
                'id' => 4,
                'name' => 'Siti Rahmah (Super Admin)',
                'email' => 'admin@taubat.app',
                'password' => Hash::make('password'),
                'role' => 'SUPER_ADMIN',
                'plan' => 'PREMIUM_YEARLY',
                'status' => 'ACTIVE',
                'title' => 'Platform Super Administrator',
                'streak_days' => 120,
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
                'is_demo' => true,
            ],
        ];

        foreach ($users as $u) {
            $user = User::updateOrCreate(['email' => $u['email']], $u);

            // Seed initial journeys for demo user
            if ($user->id === 1) {
                UserJourney::updateOrCreate(
                    ['user_id' => $user->id, 'sin_id' => 'marah'],
                    [
                        'start_date' => now()->subDays(14),
                        'status' => 'STABLE',
                        'notes' => 'Menjaga lisan dan menahan emosi di rumah.'
                    ]
                );

                UserJourney::updateOrCreate(
                    ['user_id' => $user->id, 'sin_id' => 'ghibah'],
                    [
                        'start_date' => now()->subDays(5),
                        'last_relapse' => now()->subDays(2),
                        'status' => 'RECOVERING',
                        'notes' => 'Menjauhi obrolan unfaedah saat jam istirahat.'
                    ]
                );

                // Seed initial journal entry
                JournalEntry::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'date' => now()->subDay()->format('Y-m-d')
                    ],
                    [
                        'mistake' => 'Terbawa suasana mengeluh berlebihan saat terjebak macet.',
                        'trigger' => 'Kelelahan setelah pulang kerja larut malam.',
                        'hurt' => 'Diri sendiri, hati jadi gelisah dan lalai mengingat nikmat.',
                        'fix' => 'Segera beristighfar dan menggantinya dengan menyetel murottal.',
                        'prevent' => 'Siapkan playlist dzikir petang di kendaraan.',
                        'mood' => 'LEGA'
                    ]
                );

                // Seed daily ibadah
                $today = now()->format('Y-m-d');
                DailyIbadah::updateOrCreate(
                    ['user_id' => $user->id, 'date' => $today, 'ibadah_id' => 'subuh'],
                    ['is_completed' => true]
                );
                DailyIbadah::updateOrCreate(
                    ['user_id' => $user->id, 'date' => $today, 'ibadah_id' => 'dzuhur'],
                    ['is_completed' => true]
                );
                DailyIbadah::updateOrCreate(
                    ['user_id' => $user->id, 'date' => $today, 'ibadah_id' => 'tilawah'],
                    ['is_completed' => true]
                );
            }
        }
    }
}
