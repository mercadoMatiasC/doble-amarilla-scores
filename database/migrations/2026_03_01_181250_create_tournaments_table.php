<?php

use App\Models\Tournament;
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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('winner_team_id')->nullable()->constrained('teams')->nullOnDelete(); 
            $table->string('name');
            $table->year('edition');
            $table->string('tournament_logo_route')->nullable();
            $table->integer('tournament_status_id')->default(Tournament::TBD_STATUS);
            $table->boolean('online_status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
