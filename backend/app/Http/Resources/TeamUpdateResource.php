<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TeamUpdateResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [ 
            'id' => $this->id, 
            'name' => $this->name, 
            'nickname' => $this->nickname, 
            'province' => [ 
                'id' => $this->province_id, 
                'name' => config('provinces')[$this->province_id] ?? NULL 
            ],
            'founded_date' => $this->founded_date,
            'stadium' => $this->stadium, 
            'team_logo_route' => $this->team_logo_route, 
        ]; 
    } 
}