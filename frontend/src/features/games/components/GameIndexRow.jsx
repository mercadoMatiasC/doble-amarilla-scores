import { Link } from "react-router-dom"
import { ScoreDisplay } from "./ScoreDisplay";
import { STORAGE_URL } from "../../../constants/api";

export function GameIndexRow({ game }) {
    const home_team_name = game.home_team.name;
    const away_team_name = game.away_team.name;
    const tournament = game.tournament;
    const limit = 10;
    const isLive = [1, 2, 6].includes(game.match_status.id);
    const grid_classes = "px-2 rounded-xl grid justify-between gap-4 items-center grid-cols-[20%_10%_50%] sm:grid-cols-[30%_25%_40%] md:grid-cols-[22%_18%_1px_45%] lg:grid-cols-[16%_13%_1px_60%] xl:grid-cols-[16%_15%_1%_50%] 2xl:grid-cols-[18%_15%_1px_60%]";

    //DATE FORMATTING
    const [year, month, day] = game.match_day.split('-');
    const [hours, minutes] = game.match_time.split(':');
    const dateObj = new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0);

    function formatLZero(text){
        return ('0' + text).slice(-2)
    }

    return (
        <>
            <div className={`${grid_classes} ${isLive ? 'bg-red-500/10' : ''}`}>               
                {/* -- MATCH DATE -- */}
                <Link to={`/partidos/${game.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
                    <div className="flex justify-between items-center xl:grid xl:grid-cols-2">
                        <p>{formatLZero(dateObj.getDate())}/{formatLZero(dateObj.getMonth() + 1)}/{dateObj.getFullYear()}</p>
                        <p className="hidden sm:flex justify-end">{formatLZero(dateObj.getHours())}:{formatLZero(dateObj.getMinutes())}</p>
                    </div>
                </Link>

                {/* -- MATCH TOURNAMENT -- */}
                <Link to={`/torneos/${tournament.id}`} className="flex flex-row items-center gap-3 hover:opacity-75 transition-all transition-duration-3s" id="match_tournament_display">
                    <div className="flex flex-row items-center gap-3" id="match_tournament_display">
                        <img className='w-8 xl:w-10' src={STORAGE_URL+tournament.tournament_logo_route} alt="tournament_icon" />
                        <p className="hidden sm:block">{ game.round.name }</p>
                    </div>
                </Link>

                <div className="hidden w-px bg-white/25 h-10 self-stretch md:block"></div>

                {/* -- ACTUAL MATCH -- */}
                <div className="flex justify-between items-center gap-3 lg:grid lg:grid-cols-[30%_12%_30%_100px] xl:grid-cols-[30%_5%_30%_20%] 2xl:grid-cols-[30%_10%_30%_20%]" id="match_teams_display" >
                    {/* -- HOME TEAM -- */}
                    <div className="flex gap-2 justify-between items-center" id="home_team" >
                        <Link to={`/equipos/${game.home_team.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
                            <img className='w-10 xl:w-12' src={STORAGE_URL+game.home_team.team_logo_route} alt="home_team_icon" />
                        </Link>
                        <p className="hidden lg:block">{ (home_team_name.length > limit) ? `${home_team_name.slice(0, limit)}.` : home_team_name}</p> 
                    </div>

                    {/* -- SCORE -- */}
                    <div className="flex gap-3 text-xl items-center justify-center">
                        <>
                            <ScoreDisplay score={game.display_score ? (game.home_score):'\u00a0'} isLive={isLive} />  
                                <span>-</span>
                            <ScoreDisplay score={game.display_score ? (game.away_score):'\u00a0'} isLive={isLive} />
                        </>
                    </div>

                    {/* -- AWAY TEAM -- */}
                    <div className="flex gap-3 justify-between items-center" id="away_team" >
                        <p className="hidden lg:block">{ (away_team_name.length > limit) ? `${away_team_name.slice(0, limit)}.` : away_team_name}</p> 
                        <Link to={`/equipos/${game.away_team.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
                            <img className='w-10 xl:w-12' src={STORAGE_URL+game.away_team.team_logo_route} alt="home_team_icon" />
                        </Link>
                    </div>

                    {/* -- MATCH STATUS -- */}
                    <div className="hidden justify-end lg:flex items-center gap-2">
                        { (game.match_status.id == 1) ? ( //LIVE  
                            <>
                                <p className="px-1 rounded bg-red-600">{game.match_status.name}</p>
                                <p className="animate-pulse">{game.minutes_played}'</p>
                            </>
                        ):(
                            <p>{game.match_status.name}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}