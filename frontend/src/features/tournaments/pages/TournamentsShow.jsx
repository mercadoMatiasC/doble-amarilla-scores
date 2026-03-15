import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useTournament } from "../hooks/useTournament";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Link } from "react-router-dom"
import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { AnimatePresence } from "framer-motion";
import { useTournamentGames } from "../hooks/useTournamentGames";
import { TournamentGames } from "../components/TournamentGames";

export function TournamentsShow() {
  const { id } = useParams(); //TO ACCESS PASSED PARAMETERS
  const { data: tournament, isLoading, error } = useTournament(id);
  const { data: games_data, isLoading: gamesLoading, error: gamesError } = useTournamentGames(id);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const games = games_data?.data ?? [];
  const meta = games_data?.meta;

  //PAGINATION HANDLER
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    navigate(`/torneos/${id}/?${params}`);
  };
  
  //MANAGE STATES
  if (isLoading || gamesLoading) return <LoadingScreen wide={true} />;
  if (error     || gamesError)   return <p>{error.message}</p>;

  const winner = tournament.winner_team;

  return (
      <>
        <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-165'>
          <div className='flex flex-col justify-between 2xl:w-1/4'>
            <div className="space-y-7">
              {/* -- METADATA -- */}
              <div className="flex justify-between items-center px-7 py-2">
                <p className="text-white/30 italic py-1 px-3 rounded bg-white/5">ID: #{tournament.id}</p> 
                <p className="text-white/70">Editar</p> 
              </div>

              {/* -- ICON AND TITLE -- */}
              <div className="flex items-center gap-8 px-4">
                <img className='w-20' src={tournament.tournament_logo_route} alt="tournament_icon" />
                <h2 className="text-xl">{tournament.name}</h2>
              </div>
              
              {/* -- INFORMATION -- */}
              <div className="flex flex-col space-y-5 text-[17px] px-7 mb-5">
                <p>Edición: {tournament.edition} </p>
                <p>Estado: {tournament.tournament_status.name}</p>
                {winner ? 
                  (<div className="flex justify-between items-center">
                    <p>Ganador: </p>
                    <Link to={`/equipos/${winner.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
                      <div className="flex items-center gap-5">
                        <h2 className="text-xl">{winner.name}</h2>
                        <img className='w-10' src={winner.team_logo_route} alt="team_icon" />
                      </div>
                    </Link>
                  </div>)
                  :''
                }
              </div>
            </div>

            {/* -- TABS -- */}
            <div className='flex flex-row w-full justify-between mt-5 gap-10'>
              <DefaultButton disabled={meta.current_page === 1}              onClick={() => changePage(meta.current_page - 1)} type="submit" name="filter_button" value="Anterior"/>
              <DefaultButton disabled={meta.current_page === meta.last_page} onClick={() => changePage(meta.current_page + 1)} type="submit" name="filter_button" value="Siguiente"/>
            </div>
          </div>

          {/* -- DIVIDERS -- */}
          <hr className='my-4 border-white/25 2xl:hidden' />
          <div className="hidden w-px mx-5 bg-white/25 h-65 mt-5 self-stretch 2xl:block"></div>

          {/* -- RIGHT PANEL */}
          <div className='flex flex-col gap-3 items-baseline 2xl:w-3/4 2xl:flex-col'>
            <AnimatePresence mode="wait">
              <PageAnimWrapper key={meta.current_page}>
                <TournamentGames tournament_games={games} />
              </PageAnimWrapper>
            </AnimatePresence>
          </div>
        </div>
      </>
    );
}