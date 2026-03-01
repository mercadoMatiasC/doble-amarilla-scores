<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public const TBP_STATUS = 0;
    public const ONGOING_STATUS = 0;
    public const HALFTIME_STATUS = 0;
    public const FULLTIME_STATUS = 0;
    public const CANCELLED_STATUS = 0;
    public const DELAYED_STATUS = 0;
    public const PENALTY_STATUS = 0;


    //-- RELATIONSHIPS --
    public function tournament(){
        return $this->belongsTo(Tournament::class);
    }

    public function homeTeam(){
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam(){
        return $this->belongsTo(Team::class, 'away_team_id');
    }

}
