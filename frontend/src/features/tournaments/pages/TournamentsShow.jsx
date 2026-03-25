import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useTournament } from "../hooks/useTournament";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { AnimatePresence } from "framer-motion";
import { useTournamentGames } from "../hooks/useTournamentGames";
import { TournamentGames } from "../components/TournamentGames";
import { useState } from "react";
import { TournamentShowDisplay } from "../components/TournamentShowDisplay";
import { TournamentForm } from "../components/TournamentForm";
import { useLiveSync } from "../../games/hooks/useLiveSync";

export function TournamentsShow() {
  const { id } = useParams(); //TO ACCESS PASSED PARAMETERS
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("games");

  const { data: tournament, isLoading, error } = useTournament(id);
  const { data: games_data, isLoading: gamesLoading, error: gamesError } = useTournamentGames(id);

  const raw_games = games_data?.data ?? [];
  const meta = games_data?.meta;
  const { mergedGames: live_games } = useLiveSync(raw_games, 'games_data');

  //PAGINATION HANDLER
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    navigate(`/torneos/${id}/?${params}`);
  };
  
  //MANAGE STATES
  if (isLoading || gamesLoading) return <LoadingScreen wide={true} />;
  if (error     || gamesError)   return <p>{error.message}</p>;

  return (
      <>
        <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-170'>
          <div className='flex flex-col justify-between 2xl:w-1/4'>
            <TournamentShowDisplay tournament={tournament} setActiveTab={setActiveTab} />

            {/* -- TABS -- */}
            <div className='flex flex-row w-full justify-between mt-5 gap-10'>
            {activeTab === "games" && (
              <>
                <DefaultButton disabled={meta.current_page === 1}              onClick={() => changePage(meta.current_page - 1)} type="submit" name="filter_button" value="Anterior"/>
                <DefaultButton disabled={meta.current_page === meta.last_page} onClick={() => changePage(meta.current_page + 1)} type="submit" name="filter_button" value="Siguiente"/>
              </>
            )}
            {activeTab === "editform" && (
              <DefaultButton value="Partidos" onClick={() => setActiveTab("games")} active={activeTab === "games"} />
            )}
            </div>
          </div>

          {/* -- DIVIDERS -- */}
          <hr className='my-4 border-white/25 2xl:hidden' />
          <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

          {/* -- RIGHT PANEL */}
          <div className='flex flex-col gap-3 items-baseline 2xl:w-3/4 2xl:flex-col'>
            <AnimatePresence mode="wait">
              {activeTab === "games" && (
                <PageAnimWrapper key={meta.current_page}>
                  <TournamentGames tournament_games={live_games} />
                </PageAnimWrapper>
              )}
              
              {activeTab === "editform" && (
                <PageAnimWrapper key="editform">
                  <TournamentForm tournament={tournament} />
                </PageAnimWrapper>
              )}
            </AnimatePresence>
          </div>
        </div>
      </>
    );
}