import { Link } from "react-router-dom"
import { STORAGE_URL } from "../../../constants/api"

export function TournamentIndexRow({ tournament }) {
    return (
        <div className='w-full text-white'>
            <Link to={`/torneos/${tournament.id}`} className="w-full block hover:opacity-75 transition-all duration-300">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-3 items-center w-3/4">
                        <img className='w-10 lg:w-12' src={STORAGE_URL + tournament.tournament_logo_route} alt="icon" />
                        <p>{tournament.name}</p> 
                    </div>
                    
                    <p className='text-white/50 italic text-end w-1/4'>
                        {tournament.edition}
                    </p>  
                </div> 
            </Link>
        </div>
    )
}