<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop existing columns
            $table->dropColumn([
                'stack',
                'email',
                'discord',
                'website',
                'github'
            ]);

            // Add new contact column as JSON array
            $table->json('contact')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Recreate original columns
            $table->string('stack')->nullable();
            $table->string('email')->nullable();
            $table->string('discord')->nullable();
            $table->string('website')->nullable();
            $table->string('github')->nullable();

            // Remove the contact column
            $table->dropColumn('contact');
        });
    }
};
