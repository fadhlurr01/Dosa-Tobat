<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserJourney extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sin_id',
        'start_date',
        'last_relapse',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'last_relapse' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sin(): BelongsTo
    {
        return $this->belongsTo(Sin::class, 'sin_id', 'id');
    }
}
