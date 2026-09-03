<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'plan',
        'status',
        'streak_days',
        'avatar',
        'title',
        'is_demo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_demo' => 'boolean',
            'streak_days' => 'integer',
        ];
    }

    public function journeys(): HasMany
    {
        return $this->hasMany(UserJourney::class);
    }

    public function journals(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }

    public function dailyIbadahs(): HasMany
    {
        return $this->hasMany(DailyIbadah::class);
    }

    public function dzikirLogs(): HasMany
    {
        return $this->hasMany(DzikirLog::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }
}
