<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sin extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'category_id',
        'name',
        'definition',
        'source',
        'reason',
        'level',
        'signs',
        'consequences',
        'prevention',
        'fast_recovery_tips',
        'kafarat_instructions',
        'image_url',
        'bookmarks_count',
    ];

    protected function casts(): array
    {
        return [
            'signs' => 'array',
            'consequences' => 'array',
            'prevention' => 'array',
            'fast_recovery_tips' => 'array',
            'kafarat_instructions' => 'array',
            'bookmarks_count' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function journeys(): HasMany
    {
        return $this->hasMany(UserJourney::class, 'sin_id', 'id');
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class, 'sin_id', 'id');
    }
}
