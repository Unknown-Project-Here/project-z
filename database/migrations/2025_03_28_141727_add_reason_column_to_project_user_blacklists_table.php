<?php

use App\Enums\ProjectUserBlacklistEnum;
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

        Schema::table('project_user_blacklists', function (Blueprint $table) {
            $table->enum('reason', [ProjectUserBlacklistEnum::REMOVED->value, ProjectUserBlacklistEnum::LEFT->value]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_user_blacklists', function (Blueprint $table) {
            $table->dropColumn('reason');
        });
    }
};
