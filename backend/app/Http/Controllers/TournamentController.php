<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentIndexResource;
use App\Http\Resources\TournamentShowResource;
use App\Models\Tournament;
use App\Services\TournamentService;

class TournamentController extends Controller{
    public function index() {
        $tournaments = Tournament::with('winnerTeam')->paginate(10);
        
        return (TournamentIndexResource::collection($tournaments));
    }

    public function create() {
        //
    }

    public function store(TournamentRequest $request, TournamentService $tournament_service) {
        $tournament = $tournament_service->storeTournament($request->validated());
        $tournament->load(['winnerTeam']);
        
        return (new TournamentIndexResource($tournament))->response()->setStatusCode(201);
    }

    public function show(Tournament $tournament) {
        $tournament->load(['winnerTeam', 'games', 'games.homeTeam', 'games.awayTeam']);

        return (new TournamentShowResource($tournament));
    }

    public function edit(Tournament $tournament) {
        //
    }

    public function update(TournamentRequest $request, Tournament $tournament, TournamentService $tournament_service) {
        $tournament = $tournament_service->updateTournament($request->validated(), $tournament);
        $tournament->load(['winnerTeam']);
        
        return (new TournamentShowResource($tournament))->response()->setStatusCode(200);
    }
}
