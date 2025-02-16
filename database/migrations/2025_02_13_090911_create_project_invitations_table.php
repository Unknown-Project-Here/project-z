<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('inviter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('invitee_id')->constrained('users')->cascadeOnDelete();
            $table->enum('role', ['creator', 'admin', 'contributor'])->default('contributor');
            $table->string('token')->unique();
            $table->timestamp('expires_at');
            $table->timestamps();

            $table->unique(['project_id', 'invitee_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_invitations');
    }
};
