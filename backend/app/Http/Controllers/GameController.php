<?php

namespace App\Http\Controllers;

use App\Filters\GameFilter;
use App\Http\Requests\GameRequest;
use App\Http\Resources\GameIndexResource;
use App\Http\Resources\LiveDataResource;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Services\GameService;
use Illuminate\Http\Request;

class GameController extends Controller {
    public function index(Request $request, GameFilter $filters) {
        $games = $filters->apply(Game::query()->with(['homeTeam', 'awayTeam', 'tournament']))->paginate(8);

        return GameIndexResource::collection($games);
    }

    public function filters(){
        $teams = Team::get();
        $tournaments = Tournament::orderBy('edition', 'desc')->orderBy('name')->get();
        
        return response()->json([
            'teams' => $teams,
            'tournaments' => $tournaments,
        ]);
    }

    public function getMatchStatuses(){
        $matchstatuses = [];

        foreach (config('match_statuses') as $index => $value){
            $match_status['id'] = $index;
            $match_status['name'] = $value;

            array_push($matchstatuses, $match_status);
        }

        return response()->json([
            'match_statuses' => $matchstatuses
        ]);
    }

    public function getMatchRoundStages(){
        $matchroundstages = [];

        foreach (config('match_round_stages') as $index => $value){
            $match_round_stage['id'] = $index;
            $match_round_stage['name'] = $value;

            array_push($matchroundstages, $match_round_stage);
        }

        return response()->json([
            'match_round_stages' => $matchroundstages
        ]);
    }

    public function getLiveData() {
        $liveMatches = Game::whereIn('match_status_id', [1, 2, 6])->select(['id', 'home_score', 'away_score', 'minutes_played', 'match_status_id'])->get();

        return LiveDataResource::collection($liveMatches);
    }

    public function store(GameRequest $request, GameService $gameService) {
        $game = $gameService->storeGame($request->validated());
        $game->load(['homeTeam', 'awayTeam', 'tournament']);
        
        return (new GameIndexResource($game))->response()->setStatusCode(201);
    }

    public function show(Game $game) {
        $game->load(['homeTeam', 'awayTeam', 'tournament']);

        return (new GameIndexResource($game));
    }

    public function update(GameRequest $request, Game $game, GameService $gameService) {
        $game = $gameService->updateGame($request->validated(), $game);
        $game->load(['homeTeam', 'awayTeam', 'tournament']);
        
        return (new GameIndexResource($game))->response()->setStatusCode(200);
    }
}