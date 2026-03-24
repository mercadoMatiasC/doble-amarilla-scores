<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TeamRequest extends FormRequest{
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
            'name'         => ['required', 'string'],
            'nickname'     => ['nullable', 'string'],
            'province_id'  => ['required', 'integer', Rule::in(array_keys(config('provinces')))],
            'founded_date' => ['required', 'date'],
            'stadium'      => ['nullable', 'string'],
            'team_logo_route' => ['nullable', 'string'],
            'team_logo'    => ['nullable', 'image', 'max:1024'],
        ];
    }
}