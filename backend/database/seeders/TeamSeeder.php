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
            ['name' => 'Boca Juniors', 'nickname' => 'El Xeneize', 'province_id' => 0, 'founded_date' => '1905-04-03', 'stadium' => 'La Bombonera', 'team_logo_route' => 'team_logos/1.png'],
            ['name' => 'River Plate', 'nickname' => 'El Millonario', 'province_id' => 0, 'founded_date' => '1901-05-25', 'stadium' => 'Mâs Monumental', 'team_logo_route' => 'team_logos/2.png'],
            ['name' => 'Independiente', 'nickname' => 'El Rojo', 'province_id' => 1, 'founded_date' => '1905-01-01', 'stadium' => 'Libertadores de América', 'team_logo_route' => 'team_logos/3.png'],
            ['name' => 'Racing Club', 'nickname' => 'La Academia', 'province_id' => 1, 'founded_date' => '1903-03-25', 'stadium' => 'Presidente Perón', 'team_logo_route' => 'team_logos/4.png'],
            ['name' => 'Aldosivi', 'nickname' => 'El Tiburón', 'province_id' => 1, 'founded_date' => '1913-03-29', 'stadium' => 'José María Minella', 'team_logo_route' => 'team_logos/5.png'],
            ['name' => 'Vélez Sarsfield', 'nickname' => 'El Fortín', 'province_id' => 0, 'founded_date' => '1910-01-01', 'stadium' => 'José Amalfitani', 'team_logo_route' => 'team_logos/6.png'],
            ['name' => 'Unión (Santa Fe)', 'nickname' => 'El Tatengue', 'province_id' => 20, 'founded_date' => '1907-04-15', 'stadium' => '15 de Abril', 'team_logo_route' => 'team_logos/7.png'],
            ['name' => 'Estudiantes de La Plata', 'nickname' => 'El Pincha', 'province_id' => 1, 'founded_date' => '1905-08-04', 'stadium' => 'Jorge Luis Hirschi', 'team_logo_route' => 'team_logos/8.png'],
            ['name' => 'Platense', 'nickname' => 'El Calamar', 'province_id' => 1, 'founded_date' => '1905-05-25', 'stadium' => 'Ciudad de Vicente López', 'team_logo_route' => 'team_logos/9.png'],
            ['name' => 'San Lorenzo', 'nickname' => 'El Ciclón', 'province_id' => 0, 'founded_date' => '1908-04-01', 'stadium' => 'Pedro Bidegain', 'team_logo_route' => 'team_logos/10.png'],
            ['name' => 'Central Córdoba (SdE)', 'nickname' => 'El Ferroviario', 'province_id' => 21, 'founded_date' => '1919-06-03', 'stadium' => 'Único Madre de Ciudades', 'team_logo_route' => 'team_logos/11.png'],
            ['name' => 'Instituto (Córdoba)', 'nickname' => 'La Gloria', 'province_id' => 5, 'founded_date' => '1918-08-08', 'stadium' => 'Juan Domingo Perón', 'team_logo_route' => 'team_logos/12.png'],
            ['name' => 'Gimnasia (Mendoza)', 'nickname' => 'El Lobo Mendocino', 'province_id' => 12, 'founded_date' => '1908-08-30', 'stadium' => 'Víctor Antonio Legrotaglie', 'team_logo_route' => 'team_logos/13.png'],
            ['name' => 'Deportivo Riestra', 'nickname' => 'Los Malevos', 'province_id' => 0, 'founded_date' => '1931-02-22', 'stadium' => 'Guillermo Laza', 'team_logo_route' => 'team_logos/14.png'],
            ['name' => 'Newell\'s Old Boys', 'nickname' => 'La Lepra', 'province_id' => 20, 'founded_date' => '1903-11-03', 'stadium' => 'Coloso Marcelo Bielsa', 'team_logo_route' => 'team_logos/15.png'],
            ['name' => 'Independiente Rivadavia', 'nickname' => 'La Lepra Mendocina', 'province_id' => 12, 'founded_date' => '1913-01-24', 'stadium' => 'Bautista Gargantini', 'team_logo_route' => 'team_logos/16.png'],
            ['name' => 'Defensa y Justicia', 'nickname' => 'El Halcón', 'province_id' => 1, 'founded_date' => '1935-03-20', 'stadium' => 'Norberto Tomaghello', 'team_logo_route' => 'team_logos/17.png'],
            ['name' => 'Belgrano (Córdoba)', 'nickname' => 'El Pirata', 'province_id' => 5, 'founded_date' => '1905-03-19', 'stadium' => 'Julio César Villagra', 'team_logo_route' => 'team_logos/18.png'],
            ['name' => 'Talleres (Córdoba)', 'nickname' => 'La T', 'province_id' => 5, 'founded_date' => '1913-10-12', 'stadium' => 'Mario Alberto Kempes', 'team_logo_route' => 'team_logos/19.png'],
            ['name' => 'Rosario Central', 'nickname' => 'El Canalla', 'province_id' => 20, 'founded_date' => '1889-12-24', 'stadium' => 'Gigante de Arroyito', 'team_logo_route' => 'team_logos/20.png'],
            ['name' => 'Tigre', 'nickname' => 'El Matador', 'province_id' => 1, 'founded_date' => '1902-08-03', 'stadium' => 'José Dellagiovanna', 'team_logo_route' => 'team_logos/21.png'],
            ['name' => 'Barracas Central', 'nickname' => 'El Guapo', 'province_id' => 0, 'founded_date' => '1904-04-05', 'stadium' => 'Claudio Chiqui Tapia', 'team_logo_route' => 'team_logos/22.png'],
            ['name' => 'Argentinos Juniors', 'nickname' => 'El Bicho', 'province_id' => 0, 'founded_date' => '1904-08-14', 'stadium' => 'Diego Armando Maradona', 'team_logo_route' => 'team_logos/23.png'],
            ['name' => 'Huracán', 'nickname' => 'El Globo', 'province_id' => 0, 'founded_date' => '1908-11-01', 'stadium' => 'Tomás Adolfo Ducó', 'team_logo_route' => 'team_logos/24.png'],
            ['name' => 'Gimnasia La Plata', 'nickname' => 'El Lobo', 'province_id' => 1, 'founded_date' => '1887-06-03', 'stadium' => 'Juan Carmelo Zerillo', 'team_logo_route' => 'team_logos/25.png'],
            ['name' => 'Banfield', 'nickname' => 'El Taladro', 'province_id' => 1, 'founded_date' => '1896-01-21', 'stadium' => 'Florencio Sola', 'team_logo_route' => 'team_logos/26.png'],
            ['name' => 'Sarmiento (Junín)', 'nickname' => 'El Verde', 'province_id' => 1, 'founded_date' => '1911-04-01', 'stadium' => 'Eva Perón', 'team_logo_route' => 'team_logos/27.png'],
            ['name' => 'Atlético Tucumán', 'nickname' => 'El Decano', 'province_id' => 23, 'founded_date' => '1902-09-27', 'stadium' => 'Monumental José Fierro', 'team_logo_route' => 'team_logos/28.png'],
            ['name' => 'Lanús', 'nickname' => 'El Granate', 'province_id' => 1, 'founded_date' => '1915-01-03', 'stadium' => 'Ciudad de Lanús', 'team_logo_route' => 'team_logos/29.png'],
            ['name' => 'Estudiantes de Río Cuarto', 'nickname' => 'El León del Imperio', 'province_id' => 5, 'founded_date' => '1912-09-21', 'stadium' => 'Antonio Candini', 'team_logo_route' => 'team_logos/30.png'],
        ];

        foreach ($teamsArray as $team)
            Team::create($team);
    }
}