<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_ibadahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->string('ibadah_id'); // subuh, dzuhur, ashar, maghrib, isya, dhuha, tahajjud, tilawah, sedekah, istighfar
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'date', 'ibadah_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_ibadahs');
    }
};
