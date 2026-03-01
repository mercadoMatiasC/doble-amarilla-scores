<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    public const TBD_STATUS = 0;
    public const ONGOING_STATUS = 0;
    public const CANCELLED_STATUS = 0;
    public const FINISHED_STATUS = 0;

    //-- RELATIONSHIPS --
    public function games(){
        return $this->hasMany(Game::class);
    }
}