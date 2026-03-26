<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TournamentRequest extends FormRequest{
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
            'name'    => ['required', 'string'],
            'tournament_logo_route' => ['string'],
            'logo_file'    => ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'edition' => ['required', 'string'],
            'tournament_status_id' => ['required', 'numeric', 'integer'],
            'online_status' => ['required', 'boolean'],
            'winner_team_id' => ['nullable', 'integer', 'exists:teams,id'],
        ];
    }
}