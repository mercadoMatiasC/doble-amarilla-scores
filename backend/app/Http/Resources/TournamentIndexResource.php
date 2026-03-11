<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TournamentIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
	$URL = 	env('APP_URL').'/storage/';
        $winner_team  = $this->whenLoaded('winnerTeam');

        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'tournament_logo_route' => $URL.$this->tournament_logo_route, 
            'edition' => $this->edition,
            'tournament_status' => [ 
                'id' => $this->tournament_status_id, 
                'name' => config('tournament_statuses')[$this->tournament_status_id], 
            ],
            'winner_team' => $this->when($winner_team, function () use ($winner_team, $URL) {
                return [
                    'id' => $winner_team->id,
                    'name' => $winner_team->name,
                    'team_logo_route' => $URL.$winner_team->team_logo_route,
                ];
            }),
        ]; 
    } 
}