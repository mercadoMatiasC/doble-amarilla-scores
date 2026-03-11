<?php

namespace App\Http\Controllers;

use App\Filters\GameFilter;
use App\Http\Requests\GameRequest;
use App\Http\Resources\GameIndexResource;
use App\Http\Resources\GameShowResource;
use App\Models\Game;
use App\Services\GameService;
use Illuminate\Http\Request;

class GameController extends Controller {
    public function index(Request $request, GameFilter $filters) {
        $games = $filters->apply(Game::query()->with(['homeTeam','awayTeam','tournament']))->paginate(8);

        return GameIndexResource::collection($games);
    }

    public function create() {
        //
    }

    public function store(GameRequest $request, GameService $gameService) {
        $game = $gameService->storeGame($request->validated());
        $game->load(['homeTeam', 'awayTeam', 'tournament']);
        
        return (new GameShowResource($game))->response()->setStatusCode(201);
    }

    public function show(Game $game) {
        $game->load(['homeTeam', 'awayTeam', 'tournament']);

        return (new GameShowResource($game));
    }

    public function edit(Game $game) {
        //
    }

    public function update(GameRequest $request, Game $game, GameService $gameService) {
        $game = $gameService->updateGame($request->validated(), $game);
        $game->load(['homeTeam', 'awayTeam', 'tournament']);
        
        return (new GameShowResource($game))->response()->setStatusCode(200);
    }
}