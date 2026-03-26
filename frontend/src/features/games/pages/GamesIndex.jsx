import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGames } from '../hooks/useGames';
import { useGamesFilters } from '../hooks/useGamesFilters';
import { GamesList } from '../components/GamesList';
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { useLiveSync } from '../hooks/useLiveSync';
import { GamesFilterSidebar } from '../components/GamesFilterSidebar';
import { ErrorScreen } from '../../../components/ErrorScreen';

export function GamesIndex() {
  const { data, isLoading: gamesLoading, error: gamesError } = useGames();
  const { data: filters, isLoading: filtersLoading, error: filtersError } = useGamesFilters();
  const { mergedGames: games } = useLiveSync(data?.data, 'games');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const meta = data?.meta;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = new URLSearchParams();
    const team_id = formData.get("team_id");
    const tournament_id = formData.get("tournament_id");

    if (team_id) params.set("team_id", team_id);
    if (tournament_id) params.set("tournament_id", tournament_id);

    const query = params.toString();
    navigate(query ? `/partidos?${query}` : "/partidos");
  };

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    navigate(`/partidos?${params}`);
  };

  if (gamesLoading || filtersLoading) return <LoadingScreen wide={true} />;
  if (gamesError   || filtersError) return <ErrorScreen wide={true} error="Error cargando partidos." />;

  return (
    <>
      <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-170'>
        <PageAnimWrapper key={meta.current_page}>
          <GamesList games={games} />
        </PageAnimWrapper>

        <hr className='my-4 border-white/25 2xl:hidden' />
        <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

        <GamesFilterSidebar filters={filters} meta={data.meta} onSubmit={handleSubmit} onChangePage={changePage} selectedTeam={searchParams.get("team_id") || ""} selectedTournament={searchParams.get("tournament_id") || ""} />
      </div>
    </>
  );
}