export function TeamIndexRow({ team }) {
    return (
        <>
            <div className='justify-between flex flex-row text-white gap-4 items-center lg:justify-normal'>
                <div className="flex flex-row gap-3 items-center">
                    <img className='w-10' src={team.team_logo_route} alt="team_icon" />
                    <p>
                        { team.name }
                    </p> 
                </div>

                <p className='text-white/50 italic'>
                    "{ team.nickname }" 
                </p>          
            </div>
        </>
    )
}