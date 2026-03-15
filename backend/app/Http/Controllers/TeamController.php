<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Http\Resources\GameIndexResource;
use App\Http\Resources\TeamIndexResource;
use App\Http\Resources\TeamShowResource;
use App\Http\Resources\TeamStoreResource;
use App\Http\Resources\TournamentIndexResource;
use App\Models\Game;
use App\Models\Team;
use App\Services\TeamService;
use Carbon\Carbon;

class TeamController extends Controller
{
    public function index() {
        $teams = Team::paginate(8);
        
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

    public function getData(Team $team) {
        $previous_games = GameIndexResource::collection($team->games()->with(['homeTeam', 'awayTeam', 'tournament'])->where('match_day',  '<', now())->orderBy('match_day', 'desc')->limit(3)->get());
        $upcoming_games = GameIndexResource::collection($team->games()->with(['homeTeam', 'awayTeam', 'tournament'])->where('match_day', '>=', now())->orderBy('match_day', 'desc')->limit(3)->get());
        $won_tournaments = TournamentIndexResource::collection($team->wonTournaments()->get());

        return response()->json([
            'data' => [
                'previous_games' => $previous_games,
                'upcoming_games' => $upcoming_games,
                'won_tournaments' => $won_tournaments,
            ],
        ]);
    }

    public function edit(Team $team) {
        //
    }

    public function update(TeamRequest $request, Team $team, TeamService $team_service) {
        $team = $team_service->updateTeam($request->validated(), $team);
        
        return (new TeamStoreResource($team))->response()->setStatusCode(200);
    }
}