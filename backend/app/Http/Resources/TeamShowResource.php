<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class TeamShowResource extends JsonResource{ 
    protected $games;

    public function __construct($resource, $games){
        parent::__construct($resource);
        $this->games = $games;
    }

    public function toArray(Request $request): array { 
	$URL = 	env('APP_URL').'/storage/';

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
            'team_logo_route' => $URL.$this->team_logo_route, 

            'games' => GameIndexResource::collection($this->games),
        ]; 
    } 
}