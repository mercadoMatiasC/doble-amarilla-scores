import { GameIndexRow } from '../components/GameIndexRow'
import { useGames } from "../hooks/useGames";
import { MagnifyingGlass } from "../../../components/svgs/MagnifyingGlass"
import { GameSkeletonLoading } from '../components/GameSkeletonLoading';

export function GamesIndex() {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) return <GameSkeletonLoading />;
  if (error) return <p className='text-white'>Error cargando partidos</p>;

  return (
    <>
      <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0'>
          <div className='space-y-3 2xl:w-3/4'>
            <div className='grid justify-between gap-4 items-center grid-cols-[20%_10%_60%] sm:grid-cols-[20%_20%_50%] md:grid-cols-[20%_20%_50%] lg:grid-cols-[11%_14%_70%] xl:grid-cols-[15%_15%_60%] 2xl:grid-cols-[13%_13%_65%]'>
              <p>Fecha</p>
              <p>Torneo</p>
              <p className='hidden lg:flex lg:justify-end'>Estado</p>
            </div>

            {games.map(game => (
              <GameIndexRow key={game.id} game={game} />
            ))}
          </div>

          <hr className='my-4 border-white/25 2xl:hidden' />
          <div className="hidden w-px mx-5 bg-white/25 h-25 self-stretch 2xl:block"></div>

          <div className='flex flex-row gap-3 items-center 2xl:items-baseline 2xl:w-1/5 2xl:flex-col'>
            <h2>
              Buscar
            </h2>
            <form action="#" className='flex flex-row w-full'>
              <input  className="w-full bg-white/10 rounded rounded-r-none border border-white/20" type="search" name="team_q" />
              <button className="bg-white/10 rounded rounded-l-none p-1" type="submit">
                <MagnifyingGlass />
              </button>
            </form>
          </div>
      </div>
    </>
  )
}