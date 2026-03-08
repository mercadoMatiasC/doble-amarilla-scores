<?php

namespace Database\Seeders;

use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournamentsArray = [
        [
            'name' => 'Conmebol Libertadores',
            'edition' => Date::create(2023)->year,
            'tournament_status_id' => 3,
            'online_status' => true,
            'tournament_logo_route' => 'tournament_logos/conmebollib.png',
            'winner_team_id' => 1,
        ],
        [
            'name' => 'Conmebol Sudamericana',
            'edition' => Date::create(2024)->year,
            'tournament_status_id' => 1,
            'online_status' => true,
            'tournament_logo_route' => 'tournament_logos/conmebolsud.png'
        ],
        [
            'name' => 'Liga Profesional',
            'edition' => Date::create(2026)->year,
            'tournament_status_id' => 1,
            'online_status' => true,
            'tournament_logo_route' => 'tournament_logos/LPF.png'
        ],
    ];

    foreach ($tournamentsArray as $tournament)
        Tournament::create($tournament);
    }
}