import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { GameIndexRow } from "../components/GameIndexRow";
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { useGameStatuses } from "../hooks/useGameStatuses";
import { useGameRoundStages } from "../hooks/useGameRoundStages";
import { useGamesFilters } from "../../games/hooks/useGamesFilters"
import { GameForm } from "../components/GameForm";
import { ErrorScreen } from "../../../components/ErrorScreen"

export function GameEdit() {
  const { id } = useParams();
  const { data: game, isLoading, error } = useGame(id);
  const { data: filters, isLoading: fLoading, isError: fError} = useGamesFilters();
  const { data: statuses, isLoading: sLoading, isError: sError } = useGameStatuses();
  const { data: rounds, isLoading: rLoading, isError: rError } = useGameRoundStages();

  if (isLoading || fLoading || sLoading || rLoading) return <LoadingScreen />;
  if (error || fError || sError || rError) return <ErrorScreen />;

  const lookupData = {
    teams: filters.teams,
    tournaments: filters.tournaments,
    round_stages: rounds,
    game_statuses: statuses,
  };
  
  return (
    <PageAnimWrapper>
      <section className='flex flex-col text-white w-[90%] justify-center items-center lg:w-4/5 2xl:min-h-170 2xl:w-1/2'>
        <div className="w-full py-2 px-4 bg-white/10 text-white/50 rounded-lg rounded-b-none">
          <p>ID: #{game.id}</p>
        </div>

        <div className='w-full rounded bg-black/50 p-3 mb-10'>
          <GameIndexRow game={game} />
        </div>

        <GameForm game={game} lookupData={lookupData} />
      </section>
    </PageAnimWrapper>
  );
}

