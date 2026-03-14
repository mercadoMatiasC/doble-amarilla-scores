<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TournamentIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
	$URL = 	env('APP_URL').'/storage/';
        return [
            'id' => $this->id, 
            'name' => $this->name, 
            'tournament_logo_route' => $URL.$this->tournament_logo_route, 
            'edition' => $this->edition,
            'tournament_status' => [ 
                'id' => $this->tournament_status_id, 
                'name' => config('tournament_statuses')[$this->tournament_status_id], 
            ]
        ];
    } 
}