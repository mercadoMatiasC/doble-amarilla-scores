<?php

namespace App\Models;

use App\Exceptions\BusinessException;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public const TBP_STATUS = 0;
    public const ONGOING_STATUS = 1;
    public const HALFTIME_STATUS = 2;
    public const FULLTIME_STATUS = 3;
    public const CANCELLED_STATUS = 4;
    public const DELAYED_STATUS = 5;
    public const PENALTY_STATUS = 6;

    private static array $allowedTransitions = [
        self::TBP_STATUS => [
            self::ONGOING_STATUS,
            self::CANCELLED_STATUS,
            self::DELAYED_STATUS,
        ],
        self::ONGOING_STATUS => [
            self::HALFTIME_STATUS,
            self::FULLTIME_STATUS,
            self::PENALTY_STATUS,
            self::DELAYED_STATUS,
            self::CANCELLED_STATUS,
        ],
        self::HALFTIME_STATUS => [
            self::ONGOING_STATUS,
            self::PENALTY_STATUS,
            self::CANCELLED_STATUS,
            self::DELAYED_STATUS,
        ],
        self::PENALTY_STATUS => [
            self::FULLTIME_STATUS,
            self::CANCELLED_STATUS,
        ],
        self::DELAYED_STATUS => [
            self::ONGOING_STATUS,
            self::CANCELLED_STATUS,
        ],

        //NOT ALLOWED
        self::FULLTIME_STATUS => [],
        self::CANCELLED_STATUS => [],
    ];

    public function displayScore(){
        return $this->match_status_id != self::TBP_STATUS;
    }

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


    //-- SETTINGS --
    public function changeStatus(int $newStatus){
        $current = $this->match_status_id;
        $allowed = self::$allowedTransitions[$current] ?? [];

        if (!in_array($newStatus, $allowed))
            throw new BusinessException("Invalid match status transition.");

        $this->match_status_id = $newStatus;
    }
}