<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TournamentShowResource extends JsonResource{ 
    public function toArray(Request $request): array { 
       	$winner_team  = $this->whenLoaded('winnerTeam');
	    $URL = 	env('APP_URL').'/storage/';

        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'tournament_logo_route' => $URL.$this->tournament_logo_route, 
            'edition' => $this->edition,
            'tournament_status' => [ 
                'id' => $this->tournament_status_id, 
                'name' => config('tournament_statuses')[$this->tournament_status_id], 
            ],
            'winner_team' => $this->when($this->winnerTeam, function () use ($URL) {
                return [
                    'id' => $this->winnerTeam->id,
                    'name' => $this->winnerTeam->name,
                    'team_logo_route' => $URL . $this->winnerTeam->team_logo_route,
                ];
            }),
        ];
    }
}