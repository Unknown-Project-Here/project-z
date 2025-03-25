<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('issue_id');
            $table->string('title');
            $table->foreignId('user_id')->constrained();
            $table->string('state');
            $table->string('url');

            $table->unique(['project_id', 'issue_id']);
        });

        Schema::create('project_issue_assignees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_issue_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained();

            $table->unique(['project_issue_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_issue_assignees');
        Schema::dropIfExists('project_issues');
    }
};
