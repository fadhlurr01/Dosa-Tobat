<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('sin_id')->nullable();
            $table->date('date');
            $table->text('mistake'); // 1. Apa kesalahan yang terjadi
            $table->text('trigger'); // 2. Pemicu utama
            $table->text('hurt');    // 3. Pihak yang tersakiti / dampak
            $table->text('fix');     // 4. Langkah perbaikan / kafarat
            $table->text('prevent'); // 5. Rencana pencegahan esok hari
            $table->string('mood')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
