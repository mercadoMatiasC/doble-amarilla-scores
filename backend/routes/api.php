<?php
    use App\Http\Controllers\GameController;
    use App\Http\Controllers\TeamController;
    use App\Http\Controllers\TournamentController;
    use Illuminate\Support\Facades\Route;

    //-- TEAMS --
    Route::get   ('equipos/', [TeamController::class, 'index']);
    Route::post  ('equipos/', [TeamController::class, 'store']);
    Route::get   ('equipos/escudos', [TeamController::class, 'getLogos']);
    Route::get   ('equipos/provincias', [TeamController::class, 'getProvinces']);
    Route::get   ('equipos/{team}', [TeamController::class, 'show']);
    Route::patch ('equipos/{team}', [TeamController::class, 'update']);
    Route::get   ('equipos/{team}/informacion', [TeamController::class, 'getData']);

    //-- TOURNAMENT --
    Route::get   ('torneos/', [TournamentController::class, 'index']);
    Route::post  ('torneos/', [TournamentController::class, 'store']);
    Route::get   ('torneos/logos', [TournamentController::class, 'getLogos']);
    Route::get   ('torneos/nombres', [TournamentController::class, 'getNames']);
    Route::get   ('torneos/estados', [TournamentController::class, 'getStatuses']);
    Route::get   ('torneos/{tournament}', [TournamentController::class, 'show']);
    Route::patch ('torneos/{tournament}', [TournamentController::class, 'update']);

    //-- GAMES --
    Route::get   ('partidos/', [GameController::class, 'index']);
    Route::post  ('partidos/', [GameController::class, 'store']);
    Route::get   ('partidos/vivo', [GameController::class, 'getLiveData']);
    Route::get   ('partidos/filtros', [GameController::class, 'filters']);
    Route::get   ('partidos/estados', [GameController::class, 'getMatchStatuses']);
    Route::get   ('partidos/fases', [GameController::class, 'getMatchRoundStages']);
    Route::get   ('partidos/{game}',  [GameController::class, 'show']);
    Route::patch ('partidos/{game}',  [GameController::class, 'update']);

    Route::post('/test', function () {
        dd('API funcionando');
    });