import { LoadingScreen } from '../../../components/LoadingScreen';
import { ErrorScreen } from '../../../components/ErrorScreen';
import { GenericIndexLayout } from '../../../components/GenericIndexLayout';
import { useIndexNavigation } from '../../../hooks/useIndexNavigation';
import { TeamIndexRow } from '../components/TeamIndexRow'
import { useTeams } from "../hooks/useTeams";

export function TeamsIndex() {
  const { data, isLoading, error } = useTeams();
  const { searchParams, changePage, handleSearch } = useIndexNavigation('/equipos');

  if (isLoading) return <LoadingScreen wide={false} />;
  if (error) return <ErrorScreen wide={false} error="Error cargando equipos." />;

  return (
    <GenericIndexLayout title="Equipos" meta={data.meta} searchParams={searchParams} changePage={changePage} handleSearch={handleSearch}>
      {data.data.length > 0 ? (
        data.data.map(team => (
          <TeamIndexRow key={team.id} team={team} />
        ))
      ) : (<p>Ningún equipo coincide con el criterio de busqueda.</p>)}
    </GenericIndexLayout>
  );
}