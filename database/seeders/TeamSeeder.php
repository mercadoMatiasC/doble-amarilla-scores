<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teamsArray = [
            [
                'name' => 'Boca',
                'nickname' => 'El Xeneize',
                'province_id' => 1,
                'stadium' => 'La Bombonera',
                'team_logo_route' => 'team_logos/1.png'
            ],
            [
                'name' => 'River',
                'nickname' => 'El Millonario',
                'province_id' => 1,
                'stadium' => 'El Monumental',
                'team_logo_route' => 'team_logos/2.png'
            ],
            [
                'name' => 'Independiente',
                'nickname' => 'El Rojo',
                'province_id' => 1,
                'stadium' => 'El Libertadores de América - Ricardo Enrique Bochini',
                'team_logo_route' => 'team_logos/3.png'
            ],
            [
                'name' => 'Racing',
                'nickname' => 'La Academia',
                'province_id' => 1,
                'stadium' => 'Presidente Perón',
                'team_logo_route' => 'team_logos/4.png'
            ],
            [
                'name' => 'Aldosivi',
                'nickname' => 'El Tiburón',
                'province_id' => 1,
                'stadium' => 'José Maria Minella',
                'team_logo_route' => 'team_logos/5.png'
            ],
        ];

        foreach ($teamsArray as $team)
            Team::create($team);
    }
}