<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LiveDataResource extends JsonResource{

    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'home_score'   => $this->home_score,
            'away_score'   => $this->away_score,
            'minutes_played' => $this->minutes_played,
            'match_status' => [
                'id' => $this->match_status_id, 
                'name' => config('match_statuses')[$this->match_status_id] ?? null                
            ],
        ];
    }
}
