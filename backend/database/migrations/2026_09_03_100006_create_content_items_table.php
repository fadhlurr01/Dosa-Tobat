<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type'); // AYAT, HADIS, DOA
            $table->text('arabic')->nullable();
            $table->text('latin')->nullable();
            $table->text('translation');
            $table->string('reference')->nullable();
            $table->string('status')->default('DRAFT'); // DRAFT, REVIEW, VERIFIED, PUBLISHED
            $table->string('author')->nullable();
            $table->string('reviewer')->nullable();
            $table->integer('version')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_items');
    }
};
