<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Tournament;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class TournamentService {
    public function validateTournament(array $data, ?Tournament $tournament = null){
        //INTEGRITY VALIDATION
        $tournament_query = Tournament::where('name', $data['name'])->where('edition', $data['edition']); 
        
        if ($tournament)
            $tournament_query->where('id', '!=', $tournament->id);

        $conflict = $tournament_query->exists();

        if ($conflict)
            throw new BusinessException("This tournament has already an edition registered that year.");
    }

    public function storeTournament(array $data){
        $this->validateTournament($data);

        $data['tournament_status_id'] = Tournament::TBD_STATUS;
        $tournament = Tournament::create($data);
        
        return $tournament;
    }

    public function updateTournamentStatus(Tournament $tournament, $status){
        $tournament->changeStatus($status);
    }

    public function updateTournament(array $data, Tournament $tournament){
         return DB::transaction(function () use ($data, $tournament) {
            $tournament = Tournament::where('id', $tournament->id)->lockForUpdate()->first();
            $this->validateTournament($data, $tournament);

            if (isset($data['tournament_status_id'])) 
                $this->updateTournamentStatus($tournament, $data['tournament_status_id']);
        
            $tournament->fill(Arr::except($data, ['tournament_status_id']));
            $tournament->save();

            return $tournament;
        });
    }
}