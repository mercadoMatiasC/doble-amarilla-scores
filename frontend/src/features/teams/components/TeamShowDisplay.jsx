function formatLZero(text){
    return ('0' + text).slice(-2)
}

export function TeamShowDisplay({ team }) {
    const [year, month, day] = team.founded_date.split('-');
    const formated_date = new Date(year, month, day);

    return (
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
    );
}