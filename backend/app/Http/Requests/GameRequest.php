<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class GameRequest extends FormRequest{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Errores de validación',
            'errors' => $validator->errors()
        ], 422));
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
            'match_status_id' => ['required', 'integer', Rule::in(array_keys(config('match_statuses')))],
            'round_id'        => ['required', 'integer', Rule::in(array_keys(config('match_round_stages')))],
            'minutes_played'  => ['required', 'numeric', 'min:0'],
            'match_day'       => ['required', 'date'],
            'match_time'      => ['required', 'date_format:H:i:s'],
            'home_score'      => ['nullable', 'numeric', 'min:0'],
            'away_score'      => ['nullable', 'numeric', 'min:0'],
        ];
    }
}