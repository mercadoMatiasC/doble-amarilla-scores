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
    public function run(): void
    {
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
        ];

        foreach ($gamesArray as $game)
            Game::create($game);
    }
}