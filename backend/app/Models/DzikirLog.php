<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DzikirLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'preset_id',
        'title',
        'count_reached',
        'session_date',
    ];

    protected function casts(): array
    {
        return [
            'session_date' => 'date',
            'count_reached' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
