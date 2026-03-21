import { DropdownSelect } from "../../../components/forms/DropdownSelect"

export function EncounterPanel({ formData, onChange, data }) { 
    const home_options = data.teams.filter(t => t.id !== formData.away_team_id);
    const away_options = data.teams.filter(t => t.id !== formData.home_team_id);    

    return (
        <div id="match_panel" className="flex rounded bg-black/50 p-5 flex-col space-y-4">
            <h2>Panel del encuentro</h2>

            <h2 className="mt-5">Competición</h2>
            <div className="grid grid-cols-2 items-center gap-3 2xl:grid-cols-4">
                <label htmlFor="tournament_id">Torneo</label>
                <DropdownSelect options={data.tournaments} name="tournament_id" value={formData.tournament_id} onChange={onChange} />                     

                <label htmlFor="round_id">Fase</label>
                <DropdownSelect options={data.round_stages} name="round_id" value={formData.round_id} onChange={onChange} />
            </div>

            <h2 className="mt-5">Equipos</h2>
            <div className="grid grid-cols-2 items-center gap-3 2xl:grid-cols-4">
                <label htmlFor="home_team_id">Local</label>
                <DropdownSelect options={home_options} name="home_team_id" value={formData.home_team_id} onChange={onChange} />

                <label htmlFor="away_team_id">Visitante</label>
                <DropdownSelect options={away_options} name="away_team_id" value={formData.away_team_id} onChange={onChange} />
            </div>

            <h2 className="mt-5">Fecha</h2>
            <div className="grid grid-cols-2 items-center gap-3 2xl:grid-cols-4">
                <label htmlFor="match_day">Día</label>
                <input type="date" name="match_day" value={formData.match_day} onChange={onChange} className="bg-white/20 p-2 rounded" />

                <label htmlFor="match_time">Horario</label>
                <input type="time" name="match_time" value={formData.match_time} onChange={onChange} className="bg-white/20 p-2 rounded" />
            </div>
        </div>
    )
}