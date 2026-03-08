<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TournamentGameResource extends JsonResource{

    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'round' => [ 
                'id' => $this->round_id, 
                'name' => config('match_round_stages')[$this->round_id] ?? NULL
            ],
            'home_team' => $this->whenLoaded('homeTeam', function () {
                return [
                    'id' => $this->homeTeam->id,
                    'name' => $this->homeTeam->name,
                    'team_logo_route' => $this->homeTeam->team_logo_route,
                ];
            }),
            'away_team' => $this->whenLoaded('awayTeam', function () {
                return [
                    'id' => $this->awayTeam->id,
                    'name' => $this->awayTeam->name,
                    'team_logo_route' => $this->awayTeam->team_logo_route,
                ];
            }),
            'match_day'  => $this->match_day,
            'home_score' => $this->home_score,
            'away_score' => $this->away_score,
        ];
    }
}
