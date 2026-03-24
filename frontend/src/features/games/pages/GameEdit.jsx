import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { GameIndexRow } from "../components/GameIndexRow";
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { useEffect, useState } from "react";
import { StatsPanel } from "../components/StatsPanel";
import { EncounterPanel } from "../components/EncounterPanel";
import { useTeams } from "../../teams/hooks/useTeams";
import { useTournaments } from "../../tournaments/hooks/useTournaments";
import { useGameStatuses } from "../hooks/useGameStatuses";
import { useGameRoundStages } from "../hooks/useGameRoundStages";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { useUpdateGame } from "../hooks/useUpdateGame";
import { MutationMessage } from "../../../components/MutationMessage";

export function GameEdit() {
  const { id } = useParams();
  const { data: game, isLoading, error } = useGame(id);
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useTeams();
  const { data: tournaments, isLoading: tournamentsLoading, error: tournamentsError } = useTournaments();
  const { data: game_statuses, isLoading: game_statuses_Loading, error: game_statuses_Error } = useGameStatuses();
  const { data: game_round_stages, isLoading: game_round_stages_Loading, error: game_round_stages_Error } = useGameRoundStages();
  const updateGameMutation = useUpdateGame();
  const [formData, setFormData] = useState({
    home_score: 0,
    away_score: 0,
    minutes_played: 0,
    match_status_id: 0,
    tournament_id: 0,
    round_id: 0,
    home_team_id: 0,
    away_team_id: 0,
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (game && !initialized) {
      setFormData({
        home_score: game.home_score,
        away_score: game.away_score,
        minutes_played: game.minutes_played,
        match_status_id: game.match_status.id,
        tournament_id: game.tournament.id,
        round_id: game.round.id,
        home_team_id: game.home_team.id,
        away_team_id: game.away_team.id,
        match_day: game.match_day,
        match_time: game.match_time?.slice(0, 5),
      });

      setInitialized(true);
    }
  }, [game, initialized]);

  if (isLoading || teamsLoading || tournamentsLoading || game_statuses_Loading || game_round_stages_Loading) return <LoadingScreen wide={false} />;
  if (error || teamsError || tournamentsError || game_statuses_Error || game_round_stages_Error) return <p>{error?.message}</p>;

  const data = {
    teams: teams,
    tournaments: tournaments,
    round_stages: game_round_stages,
  };

  const previewGame = {
    ...game,
    ...formData,
    home_team: teams?.find(t => t.id === formData.home_team_id) || game?.home_team,
    away_team: teams?.find(t => t.id === formData.away_team_id) || game?.away_team,
    tournament: tournaments?.find(t => t.id === formData.tournament_id) || game?.tournament,
    match_status: game_statuses?.find(t => t.id === formData.match_status_id) || game?.match_status,
    round: game_round_stages?.find(t => t.id === formData.round_id) || game?.round || { name: '...' },
  };

  function handleChange(e) {
    const { name, value } = e.target;

    const numberFields = [
      "home_score",
      "away_score",
      "minutes_played",
      "match_status_id",
      "tournament_id",
      "round_id",
      "home_team_id",
      "away_team_id",
    ];

    setFormData(prev => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formData,
      match_time: formData.match_time + ":00"
    };

    updateGameMutation.mutate({
      id,
      data: payload
    });
  }

  return (
    <PageAnimWrapper>
      <section className='flex flex-col text-white w-[90%] justify-center items-center lg:w-4/5 2xl:min-h-166 2xl:w-1/2'>
        <div className="w-full py-2 px-4 bg-white/10 text-white/50 rounded-lg rounded-b-none">
          <p>ID: #{game.id}</p>
        </div>
        <div className='w-full rounded bg-black/50 p-3 mb-10'>
          <GameIndexRow game={previewGame} />
        </div>

        <form className="w-full space-y-10 sm:w-3/4 lg:w-3/5 2xl:w-4/5" onSubmit={handleSubmit} >
          {/* -- STATS PANEL -- */}
          <StatsPanel formData={formData} onChange={handleChange} game_statuses={game_statuses} />
  
          {/* -- ENCOUNTER PANEL -- */}
          <EncounterPanel formData={formData} data={data} onChange={handleChange} />

          {/* -- MESSAGES -- */}
          <MutationMessage mutation={updateGameMutation} />

          <div className="flex justify-end">
            <DefaultButton type="submit" value="Guardar" />
          </div>
        </form>
      </section>
    </PageAnimWrapper>
  );
}