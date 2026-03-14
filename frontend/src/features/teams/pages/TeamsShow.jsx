import { useParams } from "react-router-dom";
import { useTeam } from "../hooks/useTeam";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { useTeamData } from "../hooks/useTeamData";
import { TeamGames } from "../components/TeamGames";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { TeamTournaments } from "../components/TeamTournaments";
import { useState } from "react";

export function TeamsShow() {
  const { id } = useParams(); //TO ACCESS PASSED PARAMETERS
  const { data: team, isLoading, error } = useTeam(id);
  const { data: team_data, isLoading: team_data_loading, error: team_data_error } = useTeamData(id);
  const [activeTab, setActiveTab] = useState("games");

  //MANAGE STATES
  if (isLoading || team_data_loading) return <LoadingScreen />;
  if (error     || team_data_error)  return <p>{error.message}</p>;

  const [year, month, day] = team.founded_date.split('-');
  const formated_date = new Date(year, month, day);

  function formatLZero(text){
    return ('0' + text).slice(-2)
  }
  
  return (
      <>
        <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-150'>
          <div className='flex flex-col justify-between 2xl:w-1/4'>
            <div className="space-y-7">
              {/* -- METADATA -- */}
              <div className="flex justify-between items-center px-7 py-2">
                <p className="text-white/30 italic py-1 px-3 rounded bg-white/5">ID: #{team.id}</p> 
                <p className="text-white/70">Editar</p> 
              </div>

              {/* -- ICON AND TITLE -- */}
              <div className="flex items-center gap-8 px-7">
                <img className='w-20' src={team.team_logo_route} alt="team_icon" />
                <h2 className="text-xl">{team.name}</h2>
              </div>
              
              {/* -- INFORMATION -- */}
              <div className="flex flex-col space-y-5 text-[17px] px-7 mb-5">
                <div className="flex items-center gap-3">
                  <p>Apodo:</p> 
                  <p className="text-white/40 italic">"{team.nickname}"</p> 
                </div>
                <p>Provincia: {team.province.name}</p> 
                <p>Fundado el { formatLZero(formated_date.getDate())+'/'+formatLZero(formated_date.getMonth())+'/'+formated_date.getFullYear()}</p> 
                <p>Estadio: {team.stadium}</p>
              </div>
            </div>

            {/* -- TABS -- */}
            <div className="flex justify-between items-center px-7 py-2 gap-10 mt-8">
              <DefaultButton value="Partidos"    onClick={() => setActiveTab("games")}       active={activeTab === "games"} />
              <DefaultButton value="Campeonatos" onClick={() => setActiveTab("tournaments")} active={activeTab === "tournaments"} />
            </div>
          </div>

          {/* -- DIVIDERS -- */}
          <hr className='my-4 border-white/25 2xl:hidden' />
          <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

          {/* -- RIGHT PANEL */}
          <div className='flex flex-col gap-3 items-baseline 2xl:w-3/4 2xl:flex-col'>
            {activeTab === "games"
              ? <TeamGames team_data={team_data} />
              : <TeamTournaments tournaments={team_data.won_tournaments} />
            }
          </div>
        </div>
      </>
    );
}