<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentIndexResource;
use App\Http\Resources\TournamentShowResource;
use App\Models\Tournament;
use App\Services\TournamentService;

class TournamentController extends Controller{
    public function index() {
        $tournaments = Tournament::paginate(8);
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
        $tournament_logos = Tournament::select('tournament_logo_route')->distinct()->get();
        $tournament_logo_routes = [];

        foreach ($tournament_logos as $index => $value){
            $tournament_logo['id'] = $index;
            $tournament_logo['route'] = $value->tournament_logo_route;

            array_push($tournament_logo_routes, $tournament_logo);
        }

        return response()->json([
            'tournament_logo_routes' => $tournament_logo_routes
        ]);
    }

    public function store(TournamentRequest $request, TournamentService $tournament_service) {
        $tournament = $tournament_service->storeTournament($request->validated());
        $tournament->load(['winnerTeam']);
        
        return (new TournamentIndexResource($tournament))->response()->setStatusCode(201);
    }

    public function show(Tournament $tournament) {
        $tournament->load(['winnerTeam']);
        return (new TournamentShowResource($tournament));
    }


    public function update(TournamentRequest $request, Tournament $tournament, TournamentService $tournament_service) {
        $tournament = $tournament_service->updateTournament($request->validated(), $tournament);
        $tournament->load(['winnerTeam']);
        
        return (new TournamentShowResource($tournament))->response()->setStatusCode(200);
    }
}