<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained('tournaments'); 
            $table->foreignId('home_team_id')->constrained('teams'); 
            $table->foreignId('away_team_id')->constrained('teams'); 
            $table->integer('match_status_id');
            $table->integer('round_id');
            $table->integer('minutes_played')->unsigned();
            $table->date('match_day');
            $table->time('match_time');
            $table->integer('home_score')->unsigned();
            $table->integer('away_score')->unsigned();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE games ADD CONSTRAINT chk_home_away CHECK (home_team_id <> away_team_id)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};