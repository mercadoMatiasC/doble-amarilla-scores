import { useState } from "react";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { MutationMessage } from "../../../components/MutationMessage";
import { useUpdateGame } from "../hooks/useUpdateGame";
import { EncounterPanel } from "./EncounterPanel"
import { StatsPanel } from "./StatsPanel"

export function GameForm({ game, lookupData }) {
    const updateGameMutation = useUpdateGame();
    
    const [formData, setFormData] = useState({
        home_score: game?.home_score ?? 0,
        away_score: game?.away_score ?? 0,
        minutes_played: game?.minutes_played ?? 0,
        match_status_id: game?.match_status?.id ?? "",
        tournament_id: game?.tournament?.id ?? "",
        round_id: game?.round?.id ?? "",
        home_team_id: game?.home_team?.id ?? "",
        away_team_id: game?.away_team?.id ?? "",
        match_day: game?.match_day ?? "",
        match_time: game?.match_time?.slice(0, 5) ?? "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        const numberFields = ["home_score", "away_score", "minutes_played", "match_status_id", "tournament_id", "round_id", "home_team_id", "away_team_id"];

        setFormData(prev => ({
            ...prev,
            [name]: (numberFields.includes(name) && value !== "") ? Number(value) : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const payload = {
            ...formData,
            match_time: `${formData.match_time}:00`
        };

        updateGameMutation.mutate({
            id: game.id,
            data: payload
        });
    }

  return (
    <form className="w-full space-y-10 sm:w-3/4 lg:w-3/5 2xl:w-4/5" onSubmit={handleSubmit}>
        {/* -- STATS PANEL -- */}
        <StatsPanel formData={formData} onChange={handleChange} game_statuses={lookupData.game_statuses} />
        
        {/* -- ENCOUNTER PANEL -- */}
        <EncounterPanel formData={formData} data={lookupData} onChange={handleChange} />

        <div className="flex flex-col space-y-4">
            <DefaultButton type="submit" value="Guardar" />
            {/* -- MESSAGES -- */}
            <MutationMessage mutation={updateGameMutation} />
        </div>
    </form>
  );
}