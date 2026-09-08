<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_journeys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('sin_id');
            $table->foreign('sin_id')->references('id')->on('sins')->onDelete('cascade');
            $table->timestamp('start_date');
            $table->timestamp('last_relapse')->nullable();
            $table->string('status')->default('STABLE'); // STABLE, RECOVERING, FALLEN
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'sin_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_journeys');
    }
};
