<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sins', function (Blueprint $table) {
            $table->string('id')->primary(); // slug: ghibah, zina-mata, dll
            $table->string('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->string('name');
            $table->text('definition');
            $table->text('source')->nullable();
            $table->text('reason')->nullable();
            $table->string('level')->default('SEDANG'); // RINGAN, SEDANG, BERAT
            $table->json('signs')->nullable();
            $table->json('consequences')->nullable();
            $table->json('prevention')->nullable();
            $table->json('fast_recovery_tips')->nullable();
            $table->json('kafarat_instructions')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('bookmarks_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sins');
    }
};
