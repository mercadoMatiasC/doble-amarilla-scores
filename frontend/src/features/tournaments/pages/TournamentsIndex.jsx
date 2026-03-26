import { LoadingScreen } from '../../../components/LoadingScreen';
import { ErrorScreen } from '../../../components/ErrorScreen';
import { GenericIndexLayout } from '../../../components/GenericIndexLayout';
import { useIndexNavigation } from '../../../hooks/useIndexNavigation';
import { TournamentIndexRow } from '../components/TournamentIndexRow'
import { useTournaments } from "../hooks/useTournaments";

export function TournamentsIndex() {
  const { data, isLoading, error } = useTournaments();
  const { searchParams, changePage, handleSearch } = useIndexNavigation('/torneos');

  if (isLoading) return <LoadingScreen wide={false} />;
  if (error) return <ErrorScreen wide={false} error="Error cargando torneos." />;

  return (
    <GenericIndexLayout title="Torneos" meta={data.meta} searchParams={searchParams} changePage={changePage} handleSearch={handleSearch}>
      {data.data.length > 0 ? (
        data.data.map(tournament => (
          <TournamentIndexRow key={tournament.id} tournament={tournament} />
        ))
      ) : (<p>Ningún torneo coincide con el criterio de busqueda.</p>)}
    </GenericIndexLayout>
  );
}