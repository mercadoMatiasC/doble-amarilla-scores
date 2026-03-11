<?php

namespace Database\Seeders;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
    	$gamesArray = [
        [
            'tournament_id' => 1,
            'home_team_id' => 5,
            'away_team_id' => 1,
            'match_status_id' => Game::FULLTIME_STATUS,
            'round_id' => 9,
            'minutes_played' => 93,
            'match_day'  => Carbon::create(2023, 12, 4)->toDateString(),
            'match_time' => Carbon::create(2023, 12, 4, 17, 0)->toTimeString(),
            'home_score' => 2,
            'away_score' => 1,
        ],
        [
            'tournament_id' => 1,
            'home_team_id' => 1,
            'away_team_id' => 5,
            'match_status_id' => Game::FULLTIME_STATUS,
            'round_id' => 9,
            'minutes_played' => 101,
            'match_day'  => Carbon::create(2023, 11, 27)->toDateString(),
            'match_time' => Carbon::create(2023, 11, 27, 14, 30)->toTimeString(),
            'home_score' => 1,
            'away_score' => 0,
        ],
        [
            'tournament_id' => 3,
            'home_team_id' => 1,
            'away_team_id' => 3,
            'match_status_id' => Game::FULLTIME_STATUS,
            'round_id' => 9,
            'minutes_played' => 98,
            'match_day'  => Carbon::create(2026, 2, 3)->toDateString(),
            'match_time' => Carbon::create(2026, 2, 3, 21, 15)->toTimeString(),
            'home_score' => 3,
            'away_score' => 0,
        ],

        // NUEVOS

        [
            'tournament_id' => 2,
            'home_team_id' => 2,
            'away_team_id' => 4,
            'match_status_id' => 0, // TBP
            'round_id' => 1,
            'minutes_played' => 0,
            'match_day'  => Carbon::create(2026, 7, 20)->toDateString(),
            'match_time' => Carbon::create(2026, 7, 20, 18, 0)->toTimeString(),
            'home_score' => 0,
            'away_score' => 0,
        ],
        [
            'tournament_id' => 1,
            'home_team_id' => 3,
            'away_team_id' => 2,
            'match_status_id' => 1, // En curso
            'round_id' => 7,
            'minutes_played' => 67,
            'match_day'  => Carbon::create(2026, 6, 10)->toDateString(),
            'match_time' => Carbon::create(2026, 6, 10, 19, 30)->toTimeString(),
            'home_score' => 1,
            'away_score' => 1,
        ],
        [
            'tournament_id' => 3,
            'home_team_id' => 4,
            'away_team_id' => 1,
            'match_status_id' => 2, // Medio tiempo
            'round_id' => 6,
            'minutes_played' => 45,
            'match_day'  => Carbon::create(2026, 5, 2)->toDateString(),
            'match_time' => Carbon::create(2026, 5, 2, 16, 45)->toTimeString(),
            'home_score' => 2,
            'away_score' => 2,
        ],
        [
            'tournament_id' => 2,
            'home_team_id' => 5,
            'away_team_id' => 3,
            'match_status_id' => 6, // Penales
            'round_id' => 8,
            'minutes_played' => 120,
            'match_day'  => Carbon::create(2026, 4, 12)->toDateString(),
            'match_time' => Carbon::create(2026, 4, 12, 20, 0)->toTimeString(),
            'home_score' => 1,
            'away_score' => 1,
        ],
        [
            'tournament_id' => 1,
            'home_team_id' => 2,
            'away_team_id' => 5,
            'match_status_id' => 5, // Retrasado
            'round_id' => 3,
            'minutes_played' => 0,
            'match_day'  => Carbon::create(2026, 8, 1)->toDateString(),
            'match_time' => Carbon::create(2026, 8, 1, 15, 0)->toTimeString(),
            'home_score' => 0,
            'away_score' => 0,
        ],
        [
            'tournament_id' => 3,
            'home_team_id' => 3,
            'away_team_id' => 4,
            'match_status_id' => 4, // Cancelado
            'round_id' => 4,
            'minutes_played' => 0,
            'match_day'  => Carbon::create(2026, 3, 5)->toDateString(),
            'match_time' => Carbon::create(2026, 3, 5, 13, 0)->toTimeString(),
            'home_score' => 0,
            'away_score' => 0,
        ],
        [
            'tournament_id' => 2,
            'home_team_id' => 1,
            'away_team_id' => 2,
            'match_status_id' => 3, // Finalizado
            'round_id' => 0,
            'minutes_played' => 90,
            'match_day'  => Carbon::create(2026, 1, 15)->toDateString(),
            'match_time' => Carbon::create(2026, 1, 15, 17, 30)->toTimeString(),
            'home_score' => 4,
            'away_score' => 2,
        ],
    	];

    	foreach ($gamesArray as $game)
        	Game::create($game);
    }
}