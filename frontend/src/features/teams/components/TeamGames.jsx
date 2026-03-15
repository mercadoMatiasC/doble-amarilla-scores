import { GameIndexRow } from '../../games/components/GameIndexRow';

export function TeamGames({ team_data }) {
    const previous_games = team_data?.previous_games ?? [];
    const upcoming_games = team_data?.upcoming_games ?? [];

    return (
        <>
            <div className='w-full rounded flex flex-col text-white p-5 space-y-20 2xl:p-8 2xl:min-h-150'>
                <div className='space-y-3 h-1/2'>
                    <h2>Próximos partidos</h2>
                    {upcoming_games.length > 0 ? (                        
                        upcoming_games.map(game => (
                            <GameIndexRow key={game.id} game={game} />
                        ))
                    ):(
                        <p>Este equipo no tiene partidos próximos registrados.</p>
                    )}
                </div>

                <div className='space-y-3 h-1/2'>
                    <h2>Partidos previos</h2>
                    {previous_games.length > 0 ? (                        
                        previous_games.map(game => (
                            <GameIndexRow key={game.id} game={game} />
                        ))
                    ):(
                        <p>Este equipo no tiene partidos previos registrados.</p>
                    )}
                </div>
            </div>
        </>
    )
}