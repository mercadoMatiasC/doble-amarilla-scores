import { useState } from "react";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { MutationMessage } from "../../../components/MutationMessage";
import { useUpdateGame } from "../hooks/useUpdateGame";
import { useStoreGame } from "../hooks/useStoreGame";
import { EncounterPanel } from "./EncounterPanel"
import { StatsPanel } from "./StatsPanel"

export function GameForm({ game, lookupData }) {
    const isEdit = !!game;
    const updateGameMutation = useUpdateGame();
    const storeGameMutation = useStoreGame();
    const mutation = (isEdit) ? updateGameMutation : storeGameMutation;
    
    const [formData, setFormData] = useState({
        home_score: game?.home_score ?? 0,
        away_score: game?.away_score ?? 0,
        minutes_played: game?.minutes_played ?? 0,
        match_status_id: game?.match_status?.id ?? 0,
        tournament_id: game?.tournament?.id ?? 1,
        round_id: game?.round?.id ?? 0,
        home_team_id: game?.home_team?.id ?? 1,
        away_team_id: game?.away_team?.id ?? 2,
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

        if (game)
            mutation.mutate({
                id: game.id,
                data: payload,
            });
        else
            mutation.mutate({
                data: payload,
            });
    }

  return (
    <form className="w-full space-y-10 sm:w-3/4 lg:w-3/5 2xl:w-4/5" onSubmit={handleSubmit}>
        {isEdit ? (
            <>
                <StatsPanel formData={formData} onChange={handleChange} game_statuses={lookupData.game_statuses} />
                <EncounterPanel formData={formData} data={lookupData} onChange={handleChange} />
            </>
        ) : (
            <>
                <EncounterPanel formData={formData} data={lookupData} onChange={handleChange} />
                <StatsPanel formData={formData} onChange={handleChange} game_statuses={lookupData.game_statuses} />
            </>
        )}

        <div className="flex flex-col space-y-4">
            <DefaultButton type="submit" value="Guardar" />
            {/* -- MESSAGES -- */}
            <MutationMessage mutation={mutation} />
        </div>
    </form>
  );
}