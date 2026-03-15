import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGames } from '../hooks/useGames';
import { useGamesFilters } from '../hooks/useGamesFilters';

import { DropdownSelect } from '../../../components/forms/DropdownSelect';
import { DefaultButton } from '../../../components/forms/DefaultButton';
import { GamesList } from '../components/GamesList';
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';
import { LoadingScreen } from '../../../components/LoadingScreen';

export function GamesIndex() {
  const { data, isLoading: gamesLoading, error: gamesError } = useGames();
  const { data: filters, isLoading: filtersLoading, error: filtersError } = useGamesFilters();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const games = data?.data ?? [];
  const meta = data?.meta;

  //FORM SUBMIT HANDLER
  const selected_team = searchParams.get("team_id") || "";
  const selected_tournament = searchParams.get("tournament_id") || "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const params = new URLSearchParams();
    const team_id = formData.get("team_id");
    const tournament_id = formData.get("tournament_id");

    if (team_id) 
      params.set("team_id", team_id);

    if (tournament_id) 
      params.set("tournament_id", tournament_id);

    const query = params.toString();

    navigate(query ? `/partidos?${query}` : "/partidos");
  };

  //PAGINATION HANDLER
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);

    navigate(`/partidos?${params}`);
  };

  if (gamesLoading || filtersLoading) return <LoadingScreen wide={true} />;
  if (gamesError   || filtersError) return <p className='text-white'>Error cargando partidos</p>;

  return (
    <>
        <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-166'>
          <PageAnimWrapper key={meta.current_page} >
            <GamesList games={games} />
          </PageAnimWrapper>

          <hr className='my-4 border-white/25 2xl:hidden' />
          <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

          <div className='flex flex-col gap-3 items-baseline 2xl:w-1/5 2xl:flex-col'>
            <h2>
              Filtros
            </h2>

            {/* -- FORM -- */}
            <form className='flex flex-col w-full space-y-5' onSubmit={handleSubmit}>
              <label htmlFor="team_id">Por equipo:</label>
              <DropdownSelect options={filters.teams} name="team_id" defaultValue={selected_team}/>

              <label htmlFor="team_id">Por Torneo:</label>
              <DropdownSelect options={filters.tournaments} name="tournament_id" defaultValue={selected_tournament}/>

              <div className='flex justify-end mt-3'>
                <DefaultButton type="submit" name="filter_button" value="Filtrar"/>
              </div>
            </form>

            {/* -- PAGINATION -- */}
            <div className='flex flex-row w-full justify-between mt-5 gap-10'>
              <DefaultButton disabled={meta.current_page === 1}              onClick={() => changePage(meta.current_page - 1)} type="submit" name="filter_button" value="Anterior"/>
              <DefaultButton disabled={meta.current_page === meta.last_page} onClick={() => changePage(meta.current_page + 1)} type="submit" name="filter_button" value="Siguiente"/>
            </div>
          </div>
        </div>
    </>
  )
}