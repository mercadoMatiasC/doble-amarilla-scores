<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder {
    public function run(): void {
    	 $gamesArray = [
            // TOURNAMENT 1
            [
                'tournament_id' => 1,
                'home_team_id' => 1,
                'away_team_id' => 2,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 90,
                'match_day' => '2023-02-10',
                'match_time' => '18:00:00',
                'home_score' => 2,
                'away_score' => 1,
            ],
            [
                'tournament_id' => 1,
                'home_team_id' => 3,
                'away_team_id' => 4,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 94,
                'match_day' => '2023-02-12',
                'match_time' => '20:30:00',
                'home_score' => 1,
                'away_score' => 1,
            ],
            [
                'tournament_id' => 1,
                'home_team_id' => 5,
                'away_team_id' => 1,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 2,
                'minutes_played' => 91,
                'match_day' => '2023-03-02',
                'match_time' => '19:00:00',
                'home_score' => 0,
                'away_score' => 3,
            ],
            [
                'tournament_id' => 1,
                'home_team_id' => 2,
                'away_team_id' => 3,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 2,
                'minutes_played' => 96,
                'match_day' => '2023-03-05',
                'match_time' => '17:30:00',
                'home_score' => 2,
                'away_score' => 2,
            ],

            // TOURNAMENT 2
            [
                'tournament_id' => 2,
                'home_team_id' => 1,
                'away_team_id' => 3,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 90,
                'match_day' => '2024-01-15',
                'match_time' => '21:00:00',
                'home_score' => 1,
                'away_score' => 0,
            ],
            [
                'tournament_id' => 2,
                'home_team_id' => 2,
                'away_team_id' => 4,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 92,
                'match_day' => '2024-01-18',
                'match_time' => '19:30:00',
                'home_score' => 0,
                'away_score' => 2,
            ],
            [
                'tournament_id' => 2,
                'home_team_id' => 5,
                'away_team_id' => 1,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 2,
                'minutes_played' => 90,
                'match_day' => '2024-02-03',
                'match_time' => '18:00:00',
                'home_score' => 1,
                'away_score' => 1,
            ],
            [
                'tournament_id' => 2,
                'home_team_id' => 3,
                'away_team_id' => 2,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 2,
                'minutes_played' => 90,
                'match_day' => '2024-02-07',
                'match_time' => '20:00:00',
                'home_score' => 3,
                'away_score' => 2,
            ],

            // TOURNAMENT 3
            [
                'tournament_id' => 3,
                'home_team_id' => 1,
                'away_team_id' => 4,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 90,
                'match_day' => '2025-03-01',
                'match_time' => '17:00:00',
                'home_score' => 2,
                'away_score' => 0,
            ],
            [
                'tournament_id' => 3,
                'home_team_id' => 2,
                'away_team_id' => 5,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => 1,
                'minutes_played' => 91,
                'match_day' => '2025-03-02',
                'match_time' => '19:00:00',
                'home_score' => 0,
                'away_score' => 1,
            ],

            // PARTIDOS FUTUROS
            [
                'tournament_id' => 1,
                'home_team_id' => 4,
                'away_team_id' => 5,
                'match_status_id' => Game::TBP_STATUS,
                'round_id' => 5,
                'minutes_played' => 0,
                'match_day' => '2026-07-10',
                'match_time' => '20:00:00',
                'home_score' => 0,
                'away_score' => 0,
            ],
            [
                'tournament_id' => 2,
                'home_team_id' => 3,
                'away_team_id' => 1,
                'match_status_id' => Game::ONGOING_STATUS,
                'round_id' => 6,
                'minutes_played' => 63,
                'match_day' => '2026-06-01',
                'match_time' => '18:00:00',
                'home_score' => 1,
                'away_score' => 1,
            ],
            [
                'tournament_id' => 3,
                'home_team_id' => 5,
                'away_team_id' => 2,
                'match_status_id' => Game::HALFTIME_STATUS,
                'round_id' => 4,
                'minutes_played' => 45,
                'match_day' => '2026-05-12',
                'match_time' => '19:00:00',
                'home_score' => 2,
                'away_score' => 2,
            ],

            // CANCELADOS / DELAYED
            [
                'tournament_id' => 1,
                'home_team_id' => 2,
                'away_team_id' => 1,
                'match_status_id' => Game::CANCELLED_STATUS,
                'round_id' => 3,
                'minutes_played' => 0,
                'match_day' => '2026-04-01',
                'match_time' => '17:00:00',
                'home_score' => 0,
                'away_score' => 0,
            ],
            [
                'tournament_id' => 2,
                'home_team_id' => 4,
                'away_team_id' => 3,
                'match_status_id' => Game::DELAYED_STATUS,
                'round_id' => 7,
                'minutes_played' => 0,
                'match_day' => '2026-08-05',
                'match_time' => '18:00:00',
                'home_score' => 0,
                'away_score' => 0,
            ],

            // PENALES
            [
                'tournament_id' => 3,
                'home_team_id' => 1,
                'away_team_id' => 5,
                'match_status_id' => Game::PENALTY_STATUS,
                'round_id' => 8,
                'minutes_played' => 120,
                'match_day' => '2025-11-15',
                'match_time' => '21:00:00',
                'home_score' => 2,
                'away_score' => 2,
            ],
        ];

        // completar hasta 40 automáticamente
        while (count($gamesArray) < 40) {

            $home = rand(1,5);
            $away = rand(1,5);

            if ($home == $away) continue;

            $gamesArray[] = [
                'tournament_id' => rand(1,3),
                'home_team_id' => $home,
                'away_team_id' => $away,
                'match_status_id' => Game::FULLTIME_STATUS,
                'round_id' => rand(1,9),
                'minutes_played' => 90,
                'match_day' => now()->subDays(rand(1,900))->toDateString(),
                'match_time' => '18:00:00',
                'home_score' => rand(0,4),
                'away_score' => rand(0,4),
            ];
        }

        foreach ($gamesArray as $game)
            Game::create($game);
    }
}