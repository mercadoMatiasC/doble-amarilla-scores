import { GameIndexRow } from "./GameIndexRow";

export function GamesList({ games }){

    return (
        games.length > 0 ? (
            <div className='space-y-3 w-full'>
                <div className='grid justify-between gap-4 items-center grid-cols-[20%_10%_50%] sm:grid-cols-[30%_25%_40%] md:grid-cols-[18%_20%_45%] lg:grid-cols-[16%_13%_60%] xl:grid-cols-[16%_15%_50%] 2xl:grid-cols-[18%_15%_60%]'>
                    <p>Fecha</p>
                    <p>Torneo</p>
                    <p className='hidden lg:flex lg:justify-end'>Estado</p>
                </div>

                {games.map(game => (
                    <GameIndexRow key={game.id} game={game} />
                ))}
            </div>
        ) : (
            <p>Ningún partido coincide con el criterio de busqueda.</p>
        )
        
);}