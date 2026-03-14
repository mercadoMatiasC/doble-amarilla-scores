import { TeamIndexRow } from '../components/TeamIndexRow'
import { useTeams } from "../hooks/useTeams";
import { MagnifyingGlass } from "../../../components/svgs/MagnifyingGlass"
import { TeamSkeletonLoading } from '../components/TeamSkeletonLoading';
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';

export function TeamsIndex() {
  const { data: teams, isLoading, error } = useTeams();

  if (isLoading) return <TeamSkeletonLoading />;
  if (error) return <p className='text-white'>Error cargando equipos</p>;

  return (
    <>
      <PageAnimWrapper>
        <div className='rounded flex flex-col text-white bg-black/50 p-5 lg:justify-between w-[80%] space-y-3 lg:flex-row lg:w-1/2 lg:space-y-0 2xl:min-h-165'>
            <div className='flex flex-col lg:w-2/3 space-y-4'>
              {teams.map(team => (
                <TeamIndexRow key={team.id} team={team} />
              ))}
            </div>

            <hr className='my-4 border-white/25 lg:hidden' />
            <div className="hidden w-px mx-5 bg-white/25 h-25 self-stretch lg:block"></div>

            <div className='flex flex-row gap-3 items-center lg:items-baseline lg:w-1/3 lg:flex-col'>
              <h2>
                Buscar
              </h2>
              <form action="#" className='flex flex-col w-full'>
                <div className='flex flex-row'>
                  <input  className="w-full bg-white/10 rounded rounded-r-none border border-white/20" placeholder="Buscar..." type="search" name="team_q" />
                  <button className="bg-white/10 rounded rounded-l-none p-1" type="submit">
                    <MagnifyingGlass />
                  </button>
                </div>

              </form>
            </div>
        </div>
      </PageAnimWrapper>
    </>
  )
}