<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TeamIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'nickname' => $this->nickname, 
            'team_logo_route' => $this->team_logo_route, 
        ]; 
    } 
}