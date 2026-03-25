import { LoadingScreen } from "../../../components/LoadingScreen";
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { GameForm } from "../components/GameForm";
import { useGameRoundStages } from "../hooks/useGameRoundStages";
import { useGamesFilters } from "../hooks/useGamesFilters";
import { useGameStatuses } from "../hooks/useGameStatuses";

export function GameCreate() {
  const { data: filters, isLoading: fLoading, isError: fError } = useGamesFilters();
  const { data: statuses, isLoading: sLoading, isError: sError } = useGameStatuses();
  const { data: rounds, isLoading: rLoading, isError: rError } = useGameRoundStages();

  if (fLoading || fLoading || sLoading || rLoading) return <LoadingScreen />;
  if (fError || sError || rError) return <p>{(fError || sError || rError)?.message}</p>;

  const lookupData = {
    teams: filters.teams,
    tournaments: filters.tournaments,
    round_stages: rounds,
    game_statuses: statuses,
  };

  return (
    <PageAnimWrapper>
      <section className='flex flex-col text-white w-[90%] justify-center items-center lg:w-4/5 2xl:min-h-170 2xl:w-1/2'>
        <GameForm lookupData={lookupData} />
      </section>
    </PageAnimWrapper>
  );
}