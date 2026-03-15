import { GameIndexRow } from '../../games/components/GameIndexRow';

export function TournamentGames({ tournament_games }) {
    return (
        <>
            <div className='w-full rounded flex flex-col text-white p-5 space-y-20 2xl:p-8 2xl:min-h-150'>
                <div className='space-y-3 h-1/2'>
                    {tournament_games.length > 0 ? (                        
                        tournament_games.map(game => (
                            <GameIndexRow key={game.id} game={game} />
                        ))
                    ):(
                        <p>Este torneo aun no tiene partidos registrados.</p>
                    )}
                </div>
            </div>
        </>
    )
}