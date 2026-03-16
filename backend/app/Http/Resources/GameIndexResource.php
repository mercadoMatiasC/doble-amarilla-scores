<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameIndexResource extends JsonResource{

    public function toArray(Request $request): array {
        $URL = config('app.url') . '/storage/'; // Better than env() in resources

        return [
            'id' => $this->id,
            // Only show tournament if it was loaded
            'tournament' => $this->whenLoaded('tournament', function() use ($URL) {
                return [
                    'id'   => $this->tournament->id,
                    'name' => $this->tournament->name,
                    'edition' => $this->tournament->edition,
                    'tournament_logo_route' => $URL . $this->tournament->tournament_logo_route,
                ];
            }),
            'round' => [ 
                'id' => $this->round_id, 
                'name' => config('match_round_stages')[$this->round_id] ?? null
            ],
            'home_team' => $this->whenLoaded('homeTeam', function() use ($URL) {
                return [
                    'id'   => $this->homeTeam->id,
                    'name' => $this->homeTeam->name,
                    'team_logo_route' => $URL . $this->homeTeam->team_logo_route,
                ];
            }),
            'away_team' => $this->whenLoaded('awayTeam', function() use ($URL) {
                return [
                    'id'   => $this->awayTeam->id,
                    'name' => $this->awayTeam->name,
                    'team_logo_route' => $URL . $this->awayTeam->team_logo_route,
                ];
            }),
            'match_day'    => $this->match_day,
            'match_time'   => $this->match_time,
            'home_score'   => $this->home_score,
            'away_score'   => $this->away_score,
            'minutes_played' => $this->minutes_played,
            'match_status' => [
                'id' => $this->match_status_id, 
                'name' => config('match_statuses')[$this->match_status_id] ?? null                
            ],
            'display_score' => $this->displayScore(),
        ];
    }
}
