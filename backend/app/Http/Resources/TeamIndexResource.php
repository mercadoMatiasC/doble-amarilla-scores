<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TeamIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
	$URL = 	env('APP_URL').'/storage/';

        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'nickname' => $this->nickname, 
            'team_logo_route' => $URL.$this->team_logo_route, 
        ]; 
    } 
}