<?php

namespace App\Http\Requests;

use App\Models\Game;
use App\Models\Tournament;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function after(): array
    {
        return [
            function ($validator) {
                //-- TOURNAMENT VALIDATION --
                $tournament = Tournament::find($this->tournament_id);

                if ($tournament && in_array($tournament->tournament_status_id, [Tournament::CANCELLED_STATUS, Tournament::FINISHED_STATUS]))
                    $validator->errors()->add('tournament_id', 'No pueden agregarse partidos a un torneo Terminado o Cancelado.');

                //-- GAME VALIDATION --
                $matchDay = $this->match_day;

                $team_already_has_match = Game::where('match_day', $matchDay)->where(function ($query) {
                    $query->whereIn  ('home_team_id', [$this->home_team_id, $this->away_team_id])
                          ->orWhereIn('away_team_id', [$this->home_team_id, $this->away_team_id]);
                })
                ->exists();

                if ($team_already_has_match)
                    $validator->errors()->add('home_team_id', 'Uno de los equipos ya tiene un partido programado para ese dia.');

            }
        ];
    }     

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tournament_id'   => ['required', 'integer', 'exists:tournaments,id'],
            'home_team_id'    => ['required', 'integer', 'exists:teams,id'],
            'away_team_id'    => ['required', 'integer', 'exists:teams,id', 'different:home_team_id'],
            'match_status_id' => ['required', 'integer', Rule::in(array_keys(config('game_statuses')))],
            'round_id'        => ['required', 'integer', Rule::in(array_keys(config('game_round_stages')))],
            'minutes_played'  => ['required', 'numeric', 'min:0'],
            'match_day'       => ['required', 'date'],
            'match_time'      => ['required', 'date_format:H:i:s'],
            'home_score'      => ['numeric', 'min:0'],
            'away_score'      => ['numeric', 'min:0'],
        ];
    }
}