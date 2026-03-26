<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Http\Resources\GameIndexResource;
use App\Http\Resources\TeamIndexResource;
use App\Http\Resources\TeamShowResource;
use App\Http\Resources\TeamStoreResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TournamentIndexResource;
use App\Models\Game;
use App\Models\Team;
use App\Services\ImageService;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TeamController extends Controller {
    
    public function index(Request $request) {
        $query = Team::query();

        if ($request->filled('search'))
            $query->where('name', 'LIKE', '%'.$request->search.'%');

        $teams = $query->orderBy('name')->paginate(8)->withQueryString();

        return (TeamIndexResource::collection($teams));
    }

    public function store(TeamRequest $request, TeamService $team_service) {
        $team = $team_service->storeTeam(Arr::except($request->validated(), ['logo_file']));

        if ($request->hasFile('logo_file')) {
            $newFilename = "{$team->id}.png";

            $path = ImageService::squareAndResize(
                file: $request->file('logo_file'),
                directory: 'team_logos',
                filename: $newFilename,
            );

            $team->update(['team_logo_route' => $path]);
        }
         
        return (new TeamStoreResource($team))->response()->setStatusCode(201);
    }

    public function getProvinces(){
        $provinces = [];

        foreach (config('provinces') as $index => $value){
            $province['id'] = $index;
            $province['name'] = $value;

            array_push($provinces, $province);
        }

        return response()->json([
            'provinces' => $provinces
        ]);
    }

    public function getLogos(){
        $files = Storage::disk('public')->files('team_logos');

        $logos = collect($files)->map(function ($path) {
            return [
                'id' => pathinfo($path, PATHINFO_FILENAME),
                'route' => str_replace('storage/', '', Storage::url($path)),
            ];
        });

        return response()->json([
            'team_logo_routes' => $logos
        ]);
    }

    public function show(Team $team) {
        $games = Game::where('home_team_id', $team->id)->orWhere('away_team_id', $team->id)->with(['homeTeam', 'awayTeam', 'tournament'])->paginate(10);

        return new TeamShowResource($team, $games);
    }

    public function getData(Team $team) {
        $previous_games = GameIndexResource::collection($team->games()->with(['homeTeam', 'awayTeam', 'tournament'])->where('match_day', '<', now())->orderBy('match_day', 'desc')->limit(3)->get());
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

    public function update(TeamRequest $request, Team $team, TeamService $team_service) {
        if ($request->hasFile('logo_file')) {
            $newFilename = "{$team->id}.png";
            
            $isOwnedImage = basename($team->team_logo_route) === $newFilename;

            $path = ImageService::squareAndResize(
                file: $request->file('logo_file'),
                directory: 'team_logos',
                filename: $newFilename,
                deletePath: $team->team_logo_route,
                toDelete: $isOwnedImage 
            );

            $team->update(['team_logo_route' => $path]);
        }    
    
        $team = $team_service->updateTeam(Arr::except($request->validated(), ['logo_file']), $team);
        
        return (new TeamStoreResource($team))->response()->setStatusCode(200);
    }
}