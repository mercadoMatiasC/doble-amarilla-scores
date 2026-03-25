import { Link } from "react-router-dom"
import { STORAGE_URL } from "../../../constants/api"

export function TeamIndexRow({ team }) {
    return (
        <Link to={`/equipos/${team.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
            <div className='flex flex-row justify-between text-white gap-4 items-center'>
                <div className="flex flex-row gap-3 items-center">
                    <img className='w-10' src={STORAGE_URL+team.team_logo_route} alt="team_icon" />
                    <p>
                        { team.name }
                    </p> 
                </div>

                <p className='text-white/50 italic hidden 2xl:flex'>
                    "{ team.nickname }" 
                </p>          
            </div>
        </Link>
    )
}