import { GameIndexRow } from '../../games/components/GameIndexRow';

export function TournamentGames({ tournament_games }) {
    return (
        <div className='w-full rounded flex flex-col text-white p-5 space-y-4 2xl:p-8 2xl:min-h-150'>
            {tournament_games.length > 0 ? (                        
                tournament_games.map(game => (
                    <GameIndexRow key={game.id} game={game} />
                ))
            ) : (
                <p className="opacity-50 italic">Este torneo aún no tiene partidos registrados.</p>
            )}
        </div>
    );
}