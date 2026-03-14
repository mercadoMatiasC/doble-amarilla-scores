<?php

namespace App\Filters;

class GameFilter extends QueryFilter {
    public function team_id($team_id) {
        $this->builder->where(function ($query) use ($team_id) {
            $query->where('home_team_id', $team_id)->orWhere('away_team_id', $team_id);
        });
    }

    public function tournament_id($tournament_id){
        $this->builder->where('tournament_id', $tournament_id);
    }

    public function sort($value){
        $direction = str_starts_with($value, '-') ? 'desc' : 'asc';
        $column = ltrim($value, '-');

        $this->builder->orderBy($column, $direction);
    }
}