import { TeamIndexRow } from '../components/TeamIndexRow'
import { useTeams } from "../hooks/useTeams";
import { MagnifyingGlass } from "../../../components/svgs/MagnifyingGlass"
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DefaultButton } from '../../../components/forms/DefaultButton';
import { ErrorScreen } from '../../../components/ErrorScreen';

export function TeamsIndex() {
  const { data, isLoading, error } = useTeams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const meta = data?.meta;

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    navigate(`/equipos?${params}`);
  };

  if (isLoading) return <LoadingScreen wide={false} />;
  if (error) return <ErrorScreen wide={false} error="Error cargando equipos." />;

  return (
    <>
      <PageAnimWrapper>
        <div className='rounded flex flex-col text-white bg-black/50 p-8 lg:justify-between w-[80%] space-y-3 lg:flex-row lg:w-1/2 lg:space-y-0 2xl:min-h-170'>
            <PageAnimWrapper key={meta.current_page} centered={false}>
              <div className='flex flex-col space-y-4 w-full min-h-120 2xl:min-h-0'>
                {data.data.map(team => (
                  <TeamIndexRow key={team.id} team={team} />
                ))}
              </div>
            </PageAnimWrapper>

            <hr className='my-4 border-white/25 lg:hidden' />
            <div className="hidden w-px mx-5 bg-white/25 h-25 self-stretch lg:block"></div>

            <div className='flex flex-col gap-3 items-center justify-between lg:items-baseline lg:w-1/2 lg:flex-col'>
              <form action="#" className='flex flex-col w-full gap-3'>
                <h2>Buscar</h2>
                <div className='flex flex-row'>
                  <input  className="w-full bg-white/10 rounded rounded-r-none border border-white/20 p-2" placeholder="Buscar..." type="search" name="team_q" />
                  <button className="bg-white/10 rounded rounded-l-none p-1" type="submit">
                    <MagnifyingGlass />
                  </button>
                </div>
              </form>

              {/* -- PAGINATION -- */}
              <div className='flex flex-row w-full justify-between mt-5 gap-10'>
                <DefaultButton disabled={meta.current_page === 1} onClick={() => changePage(meta.current_page - 1)} type="button" value="Anterior" />
                <DefaultButton disabled={meta.current_page === meta.last_page} onClick={() => changePage(meta.current_page + 1)} type="button" value="Siguiente" />
              </div>
            </div>
        </div>
      </PageAnimWrapper>
    </>
  )
}