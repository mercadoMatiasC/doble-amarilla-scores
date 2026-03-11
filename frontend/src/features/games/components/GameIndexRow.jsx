export function GameIndexRow({ game }) {
    //STRING TRIMMING
    const home_team_name = game.home_team.name;
    const away_team_name = game.away_team.name;
    const limit = 13;

    //DATE FORMATTING
    //const currentYear = new Date().getFullYear(); 

    const [year, month, day] = game.match_day.split('-');
    const [hours, minutes, seconds] = game.match_time.split(':');
    const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);

    function formatLZero(text){
        return ('0' + text).slice(-2)
    }

    return (
        <>
            <div className='grid justify-between gap-4 items-center grid-cols-[20%_10%_60%] sm:grid-cols-[20%_20%_50%] md:grid-cols-[20%_20%_1px_50%] lg:grid-cols-[11%_13%_1px_68%] xl:grid-cols-[15%_15%_5%_60%] 2xl:grid-cols-[13%_13%_1px_65%]'>
                {/* -- MATCH DATE -- */}
                <div className="flex justify-between items-center xl:grid xl:grid-cols-2">
                    <p>{ formatLZero(dateObj.getDay())+'/'+formatLZero(dateObj.getMonth() + 1)}</p>
                    <p className="hidden sm:flex">{ formatLZero(dateObj.getHours())+':'+formatLZero(dateObj.getMinutes())}</p>
                </div>

                {/* -- MATCH TOURNAMENT -- */}
                <div className="flex flex-row items-center gap-3" id="match_tournament_display">
                    <img className='w-8 xl:w-10' src={game.tournament.tournament_logo_route} alt="tournament_icon" />
                    <p className="hidden sm:block">{ game.round.name }</p>
                </div>

                <div className="hidden w-px bg-white/25 h-10 self-stretch md:block"></div>

                {/* -- ACTUAL MATCH -- */}
                <div className="flex justify-between items-center gap-3 lg:grid lg:grid-cols-[160px_80px_160px_100px]" id="match_teams_display" >
                    {/* -- HOME TEAM -- */}
                    <div className="flex gap-2 justify-between items-center" id="home_team" >
                        <img className='w-10 xl:w-12' src={game.home_team.team_logo_route} alt="home_team_icon" />
                        <p className="hidden lg:block">{ (home_team_name.length > limit) ? `${home_team_name.slice(0, limit)}.` : home_team_name}</p> 
                    </div>

                    {/* -- SCORE -- */}
                    <div className="flex gap-3 text-xl items-center justify-center">
                        {game.display_score ? (
                            <>
                                <p id="home_score">{game.home_score}</p>
                                -
                                <p id="away_score">{game.away_score}</p>
                            </>
                        ):'-'
                        } 
                    </div>

                    {/* -- AWAY TEAM -- */}
                    <div className="flex gap-3 justify-between items-center" id="away_team" >
                        <p className="hidden lg:block">{ (away_team_name.length > limit) ? `${away_team_name.slice(0, limit)}.` : away_team_name}</p> 
                        <img className='w-10 xl:w-12' src={game.away_team.team_logo_route} alt="away_team_icon" />
                    </div>

                    {/* -- MATCH STATUS -- */}
                    <p className="hidden justify-end lg:flex">{ game.match_status.name }</p>
                </div>
            </div>
        </>
    )
}