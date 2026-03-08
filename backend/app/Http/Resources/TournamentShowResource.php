<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TournamentShowResource extends JsonResource{ 
    public function toArray(Request $request): array { 
       $winner_team  = $this->whenLoaded('winnerTeam');
       $games = $this->whenLoaded('games');

        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'tournament_logo_route' => $this->tournament_logo_route, 
            'edition' => $this->edition,
            'tournament_status' => [ 
                'id' => $this->tournament_status_id, 
                'name' => config('tournament_statuses')[$this->tournament_status_id], 
            ],
            'winner_team' => $this->when($winner_team, function () use ($winner_team) {
                return [
                    'id' => $winner_team->id,
                    'name' => $winner_team->name,
                    'team_logo_route' => $winner_team->team_logo_route,
                ];
            }),
            'games' => TournamentGameResource::collection($games),
        ];
    }
}