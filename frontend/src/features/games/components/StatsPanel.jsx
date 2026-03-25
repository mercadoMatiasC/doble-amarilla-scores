import { DropdownSelect } from "../../../components/forms/DropdownSelect";
import { NumberCounter } from "../../../components/forms/NumberCounter";

export function StatsPanel({ formData, onChange, game_statuses }) {
    return (
        <div id="stats_panel" className="flex rounded bg-black/50 p-5 flex-col space-y-4">
            <h2>Panel de estadísticas</h2>

            <h2 className="mt-5">Marcador</h2>
            <div className="grid grid-cols-2 items-center gap-3">
                <label htmlFor="home_score">Local</label>
                <NumberCounter name="home_score" value={formData.home_score} onChange={onChange} />

                <label htmlFor="away_score">Visitante</label>
                <NumberCounter name="away_score" value={formData.away_score} onChange={onChange} />
            </div>

            <h2 className="mt-5">Tiempo de juego</h2>
            <div className="grid grid-cols-2 items-center gap-3">
                <label htmlFor="minutes_played">Minutos</label>
                <NumberCounter name="minutes_played" value={formData.minutes_played} onChange={onChange} />
            </div>

            <div className="grid grid-cols-2 items-center gap-3">
                <label htmlFor="match_status_id">Estado</label>
                <DropdownSelect options={game_statuses} name="match_status_id" defaultValue={formData.match_status_id} onChange={onChange} />
            </div>
        </div>
    );
}