import { TournamentIndexRow } from '../components/TournamentIndexRow'
import { useTournaments } from "../hooks/useTournaments";
import { MagnifyingGlass } from "../../../components/svgs/MagnifyingGlass"
import { LoadingScreen } from '../../../components/LoadingScreen';
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';

export function TournamentsIndex() {
  const { data: tournaments, isLoading, error } = useTournaments();

  if (isLoading) return <LoadingScreen />;
  if (error) return <p className='text-white'>Error cargando torneos</p>;

  return (
    <>
      <PageAnimWrapper>
        <div className='rounded flex flex-col text-white bg-black/50 p-5 lg:justify-between w-[80%] space-y-3 lg:flex-row lg:w-1/2 lg:space-y-0 2xl:min-h-166'>
            <div className='space-y-3 lg:w-2/3'>
              {tournaments.map(tournament => (
                <TournamentIndexRow key={tournament.id} tournament={tournament} />
              ))}
            </div>

            <hr className='my-4 border-white/25 lg:hidden' />
            <div className="hidden w-px mx-5 bg-white/25 h-25 self-stretch lg:block"></div>

            <div className='flex flex-row gap-3 items-center lg:items-baseline lg:w-1/3 lg:flex-col'>
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
      </PageAnimWrapper>
    </>
  )
}