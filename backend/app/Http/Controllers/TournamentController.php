<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentIndexResource;
use App\Http\Resources\TournamentShowResource;
use App\Models\Tournament;
use App\Services\ImageService;
use App\Services\TournamentService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class TournamentController extends Controller{

    public function index(Request $request) {
        $query = Tournament::query();

        if ($request->filled('search'))
            $query->where('name', 'LIKE', '%'.$request->search.'%');

        $tournaments = $query->orderBy('edition', 'desc')->orderBy('name')->paginate(8)->withQueryString();

        return (TournamentIndexResource::collection($tournaments));
    }

    public function getNames(){
        $tournament_query_names = Tournament::select('name')->distinct()->get();
        $tournament_names = [];

        foreach ($tournament_query_names as $index => $value){
            $tournament_name['id'] = $index;
            $tournament_name['name'] = $value->name;

            array_push($tournament_names, $tournament_name);
        }

        return response()->json([
            'tournament_names' => $tournament_names
        ]);
    }

    public function getStatuses(){
        $tournament_statuses = [];

        foreach (config('tournament_statuses') as $index => $value){
            $tournament_status['id'] = $index;
            $tournament_status['name'] = $value;

            array_push($tournament_statuses, $tournament_status);
        }

        return response()->json([
            'tournament_statuses' => $tournament_statuses
        ]);
    }

    public function getLogos(){
        $files = Storage::disk('public')->files('tournament_logos');

        $logos = collect($files)->map(function ($path) {
            return [
                'id' => pathinfo($path, PATHINFO_FILENAME),
                'route' => str_replace('storage/', '', Storage::url($path)),
            ];
        });

        return response()->json([
            'tournament_logo_routes' => $logos
        ]);
    }

    public function store(TournamentRequest $request, TournamentService $tournament_service) {
        $tournament = $tournament_service->storeTournament(Arr::except($request->validated(), ['logo_file']));
        $tournament->load(['winnerTeam']);

        if ($request->hasFile('logo_file')) {
            $newFilename = "{$tournament->id}.png";

            $path = ImageService::squareAndResize(
                file: $request->file('logo_file'),
                directory: 'tournament_logos',
                filename: $newFilename,
            );

            $tournament->update(['tournament_logo_route' => $path]);
        }
         
        return (new TournamentIndexResource($tournament))->response()->setStatusCode(201);
    }

    public function show(Tournament $tournament) {
        $tournament->load(['winnerTeam']);
        return (new TournamentShowResource($tournament));
    }

    public function update(TournamentRequest $request, Tournament $tournament, TournamentService $tournament_service) {
        if ($request->hasFile('logo_file')) {
            $newFilename = "{$tournament->id}.png";
            
            $isOwnedImage = basename($tournament->team_logo_route) === $newFilename;

            $path = ImageService::squareAndResize(
                file: $request->file('logo_file'),
                directory: 'tournament_logos',
                filename: $newFilename,
                deletePath: $tournament->team_logo_route,
                toDelete: $isOwnedImage 
            );

            $tournament->update(['tournament_logo_route' => $path]);
        }    
    
        $tournament = $tournament_service->updateTournament(Arr::except($request->validated(), ['logo_file']), $tournament);
        $tournament->load(['winnerTeam']);
        
        return (new TournamentShowResource($tournament))->response()->setStatusCode(200);
    }
}