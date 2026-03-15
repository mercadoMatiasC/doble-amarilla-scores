import { Link } from "react-router-dom"

export function TournamentIndexRow({ tournament }) {
    return (
        <>
            <div className='flex flex-row justify-between text-white gap-4 items-center'>
                <Link to={`/torneos/${tournament.id}`} className="hover:opacity-75 transition-all transition-duration-3s">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <div  className="flex flex-row gap-3 items-center">
                            <img className='w-10 lg:w-12' src={tournament.tournament_logo_route} alt="tournament_icon" />
                            <p className="overflow-hidden">
                                { tournament.name }
                            </p> 
                        </div>

                        <p className='text-white/50 italic'>
                            { tournament.edition }
                        </p>   
                    </div> 
                </Link>
            </div>
            
        </>
    )
}