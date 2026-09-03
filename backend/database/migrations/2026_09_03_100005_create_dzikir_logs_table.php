<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dzikir_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('preset_id');
            $table->string('title');
            $table->integer('count_reached');
            $table->date('session_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dzikir_logs');
    }
};
