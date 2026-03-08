<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class TeamService {
    public function validateTeam(array $data, ?Team $team = null){
        //INTEGRITY VALIDATION
        $team_query = Team::where('name', $data['name'])->where('province_id', $data['province_id']); 
        
        if ($team)
            $team_query->where('id', '!=', $team->id);

        $conflict = $team_query->exists();

        if ($conflict)
            throw new BusinessException("There's a team already registered under that name in that region.");
    }

    public function storeTeam(array $data){
        $this->validateTeam($data);
        $team = Team::create($data);
        
        return $team;
    }

    public function updateTeam(array $data, Team $team){
         return DB::transaction(function () use ($data, $team) {
            $team = Team::where('id', $team->id)->lockForUpdate()->first();

            $this->validateTeam($data, $team);
        
            $team->fill($data);
            $team->save();

            return $team;
        });
    }
}