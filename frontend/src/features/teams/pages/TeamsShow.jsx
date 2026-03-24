import { useParams } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTeam } from "../hooks/useTeam";
import { useTeamData } from "../hooks/useTeamData";
import { useLiveSync } from "../../games/hooks/useLiveSync";
import { TeamGames } from "../components/TeamGames";
import { TeamTournaments } from "../components/TeamTournaments";
import { TeamShowDisplay } from "../components/TeamShowDisplay";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { TeamForm } from "../components/TeamForm";

export function TeamsShow() {
  const { id } = useParams();
  const { data: team, isLoading, error } = useTeam(id);
  const { data: team_data, isLoading: team_data_loading, error: team_data_error } = useTeamData(id);
  const [activeTab, setActiveTab] = useState("games");
  const { mergedGames: upcoming_games } = useLiveSync(team_data?.upcoming_games, 'team_data');

  if (isLoading || team_data_loading) return <LoadingScreen wide={true} />;
  if (error || team_data_error) return <p>{error?.message || team_data_error?.message}</p>;
  
  return (
    <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-150'>
      {/* -- LEFT PANEL */}
      <div className='flex flex-col justify-between 2xl:w-1/4'>
        <TeamShowDisplay team={team} setActiveTab={setActiveTab}/>

        <div className="flex justify-between items-center px-7 py-2 gap-10 mt-8">
          <DefaultButton value="Partidos" onClick={() => setActiveTab("games")} active={activeTab === "games"} />
          <DefaultButton value="Campeonatos" onClick={() => setActiveTab("tournaments")} active={activeTab === "tournaments"} />
        </div>
      </div>

      <hr className='my-4 border-white/25 2xl:hidden' />
      <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

      {/* -- RIGHT PANEL */}
      <div className='flex flex-col gap-3 items-baseline 2xl:w-3/4 2xl:flex-col'>
        <AnimatePresence mode="wait">
          {activeTab === "games" && (
            <PageAnimWrapper key="games">
              <TeamGames previous_games={team_data.previous_games} upcoming_games={upcoming_games} />
            </PageAnimWrapper>
          )}
          {activeTab === "tournaments" && (
            <PageAnimWrapper key="tournaments">
              <TeamTournaments tournaments={team_data.won_tournaments} />
            </PageAnimWrapper>
          )}
          {activeTab === "editform" && (
            <PageAnimWrapper key="editform">
              <TeamForm team={team} />
            </PageAnimWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}