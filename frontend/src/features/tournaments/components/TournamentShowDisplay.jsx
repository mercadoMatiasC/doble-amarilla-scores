import { Link } from "react-router-dom";
import { STORAGE_URL } from "../../../constants/api";

export function TournamentShowDisplay({ tournament, setActiveTab }) {
    const winner = tournament.winner_team;

    return (
        <div className="space-y-7">
            {/* -- METADATA -- */}
            <div className="flex justify-between items-center px-7 py-2">
                <p className="text-white/30 italic py-1 px-3 rounded bg-white/5">ID: #{tournament.id}</p> 
                <p className="text-white/70 hover:cursor-pointer hover:underline" onClick={() => setActiveTab("editform")} >Editar</p> 
            </div>

            {/* -- ICON AND TITLE -- */}
            <div className="flex items-center gap-8 px-4">
                <img className='w-20' src={STORAGE_URL+tournament.tournament_logo_route} alt="tournament_icon" />
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
                            <img className='w-10' src={STORAGE_URL+winner.team_logo_route} alt="team_icon" />
                        </div>
                    </Link>
                </div>)
                :''
                }
            </div>
        </div>
    );
}