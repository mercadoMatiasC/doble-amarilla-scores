<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Game;
use App\Models\Tournament;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class GameService {
    public function validateGame(array $data, Tournament $tournament, ?Game $game = null){
        if (in_array($tournament->tournament_status_id, [Tournament::CANCELLED_STATUS, Tournament::FINISHED_STATUS]) && ($tournament->online_status === true))
            throw new BusinessException("A Finished/Cancelled tournament cannot feature new matches or be modified while online.");

        //GAME VALIDATION
        $game_query = $tournament->games()->where('match_day', $data['match_day'])->where(function ($query) use ($data) {
            $query->whereIn  ('home_team_id', [$data['home_team_id'], $data['away_team_id']]) 
                    ->orWhereIn('away_team_id', [$data['home_team_id'], $data['away_team_id']]); 
        }); 

        //IF IT'S AN UPDATE
        if ($game)
            $game_query->where('id', '!=', $game->id);

        $conflict = $game_query->exists();

        if ($conflict)
            throw new BusinessException("One of these teams have a match scheduled for that date.");
    }

    public function storeGame(array $data){
        return DB::transaction(function () use ($data) {
            $tournament = Tournament::where('id', $data['tournament_id'])->lockForUpdate()->firstOrFail();
            $this->validateGame($data, $tournament);

            $game = $tournament->games()->create($data);
            
            return $game;
        });
    }

    public function updateGameStatus(Game $game, $status){
        $game->changeStatus($status);
    }

    public function updateGame(array $data, Game $game){
         return DB::transaction(function () use ($data, $game) {
            $tournament = $game->tournament()->lockForUpdate()->first();
            $this->validateGame($data, $tournament, $game);

            if (isset($data['match_status_id'])) 
                $this->updateGameStatus($game, $data['match_status_id']);
        
            $game->fill(Arr::except($data, ['match_status_id']));
            $game->save();

            return $game;
        });
    }
}