<?php

namespace App\Models;

use App\Exceptions\BusinessException;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    public const TBD_STATUS = 0;
    public const ONGOING_STATUS = 1;
    public const CANCELLED_STATUS = 2;
    public const FINISHED_STATUS = 3;

    private static array $allowedTransitions = [
        self::TBD_STATUS => [
            self::ONGOING_STATUS,
            self::CANCELLED_STATUS,
        ],
        self::ONGOING_STATUS => [
            self::CANCELLED_STATUS,
            self::FINISHED_STATUS,
        ],

        //NOT ALLOWED
        self::FINISHED_STATUS => [],
        self::CANCELLED_STATUS => [],
    ];

    //-- RELATIONSHIPS --
    public function games(){
        return $this->hasMany(Game::class);
    }

    public function winnerTeam(){
        return $this->hasOne(Team::class, 'id', 'winner_team_id');
    }

    //-- SETTINGS --
    public function changeStatus(int $newStatus){
        $current = $this->tournament_status_id;
        $allowed = self::$allowedTransitions[$current] ?? [];

        if (!in_array($newStatus, $allowed))
            throw new BusinessException("Invalid tournament status transition.");

        $this->match_stournament_status_idtatus_id = $newStatus;
    }
}