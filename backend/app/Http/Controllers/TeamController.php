<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Http\Resources\TeamIndexResource;
use App\Http\Resources\TeamShowResource;
use App\Http\Resources\TeamStoreResource;
use App\Models\Game;
use App\Models\Team;
use App\Services\TeamService;

class TeamController extends Controller
{
    public function index() {
        $teams = Team::paginate(10);
        
        return (TeamIndexResource::collection($teams));
    }

    public function create() {
        //
    }

    public function store(TeamRequest $request, TeamService $team_service) {
        $team = $team_service->storeTeam($request->validated());
        
        return (new TeamStoreResource($team))->response()->setStatusCode(201);
    }

    public function show(Team $team) {
        $games = Game::where('home_team_id', $team->id)->orWhere('away_team_id', $team->id)->with(['homeTeam', 'awayTeam', 'tournament'])->paginate(10);

        return new TeamShowResource($team, $games);
    }

    public function edit(Team $team) {
        //
    }

    public function update(TeamRequest $request, Team $team, TeamService $team_service) {
        $team = $team_service->updateTeam($request->validated(), $team);
        
        return (new TeamStoreResource($team))->response()->setStatusCode(200);
    }
}