<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameIndexResource extends JsonResource{

    public function toArray(Request $request): array {
        $home_team  = $this->whenLoaded('homeTeam');
        $away_team  = $this->whenLoaded('awayTeam');
        $tournament = $this->whenLoaded('tournament');

        return [
            'id' => $this->id,
            'tournament' => [
                'id'   => $tournament->id,
                'name' => $tournament->name,
                'edition' => $tournament->edition,
                'tournament_logo_route' => $tournament->tournament_logo_route,
            ],
            'round' => [ 
                'id' => $this->round_id, 
                'name' => config('match_round_stages')[$this->round_id] ?? NULL
            ],
            'home_team' => [
                'id'   => $home_team->id,
                'name' => $home_team->name,
                'team_logo_route' => $home_team->team_logo_route,
            ],
            'away_team' => [
                'id'   => $away_team->id,
                'name' => $away_team->name,
                'team_logo_route' => $away_team->team_logo_route,
            ],
            'match_day'  => $this->match_day,
            'home_score' => $this->home_score,
            'away_score' => $this->away_score,
        ];
    }
}
