import { DefaultButton } from "../../../components/forms/DefaultButton";
import { MutationMessage } from "../../../components/MutationMessage";
import { InputText } from "../../../components/forms/InputText";
import { InputFile } from "../../../components/forms/InputFile";
import { InputNumber } from "../../../components/forms/InputNumber";
import { InputCheckbox } from "../../../components/forms/InputCheckbox";
import { ImageDropdown } from "../../../components/forms/ImageDropdown";
import { DropdownSelect } from "../../../components/forms/DropdownSelect";

import { useState } from "react";
import { useUpdateTournament } from "../hooks/useUpdateTournament";
import { useTournamentNames } from "../hooks/useTournamentNames";
import { useTournamentLogos } from "../hooks/useTournamentLogos";
import { useTournamentStatuses } from "../hooks/useTournamentStatuses";
import { useStoreTournament } from "../hooks/useStoreTournament";
import { useGamesFilters } from "../../games/hooks/useGamesFilters";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function TournamentForm({ tournament }) {
  const { data: tournament_names, isLoading: tournament_names_Loading, error: tournament_names_Error } = useTournamentNames();
  const { data: tournament_logos, isLoading: tournament_logos_Loading, error: tournament_logos_Error } = useTournamentLogos();
  const { data: tournament_statuses, isLoading: tournament_statuses_Loading, error: tournament_statuses_Error } = useTournamentStatuses();
  const { data: filters, isLoading: filters_Loading, error: filters_Error } = useGamesFilters();
  const updateTournamentMutation = useUpdateTournament();
  const storeTournamentMutation = useStoreTournament();
  
  const isEdit = !!tournament;
  const mutation = isEdit ? updateTournamentMutation : storeTournamentMutation; 

  const [formData, setFormData] = useState({
    new_name: "",
    existing_name: tournament?.name || "",
    name: tournament?.name || "",
    edition: tournament?.edition || "",
    tournament_logo_route: tournament?.tournament_logo_route || "",
    tournament_status_id: tournament?.tournament_status.id || 0,
    online_status: tournament?.online_status || 0,
    winner_team_id: tournament?.winner_team?.id || "",
    logo_file: null, 
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let finalValue;

    if (type === "checkbox") 
      finalValue = checked;
    else 
      if (["tournament_status_id", "winner_team_id", "online_status"].includes(name))
        finalValue = value === "" ? null : Number(value);
      else 
        finalValue = value;

    setFormData(prev => {
      let updates = { [name]: finalValue };

      if (name === "existing_name") {
        updates.new_name = "";
        updates.name = finalValue;
      }

      if (name === "new_name") {
        updates.existing_name = "";
        updates.name = finalValue;
      }

      return { 
        ...prev, 
        ...updates 
      };
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo_file: file,
        team_logo_route: URL.createObjectURL(file), 
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nameToSubmit = formData.new_name || tournament_names[formData.existing_name]?.name || tournament?.name;

    const submissionData = {
      ...formData,
      name: nameToSubmit
    };

    if (tournament)
      mutation.mutate({
        id: tournament.id,
        data: submissionData,
      });
    else
      mutation.mutate({
        data: submissionData,
      });
  }

  if (tournament_logos_Loading || tournament_names_Loading || tournament_statuses_Loading || filters_Loading) return <LoadingScreen wide={true} withBG={false} />;
  if (tournament_logos_Error || tournament_names_Error || tournament_statuses_Error || filters_Error) return <p className='text-white'>Error cargando información.</p>;

  const teams = filters.teams;

  return (
    <div className='w-full rounded text-white p-5 2xl:p-8 2xl:min-h-150'>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit} encType="multipart/form-data" >
        <h2>{isEdit ? "Actualizar torneo" : "Registrar nuevo torneo"}</h2>

        <div className="mb-2">
          <h2>Nombre</h2>
          <div className="grid grid-cols-2 items-center gap-3">
            <label htmlFor="existing_name">Existente</label>
            <DropdownSelect options={tournament_names} name="existing_name" value={formData.existing_name || ""} onChange={handleChange} required={false} />

            <label htmlFor="new_name">Nuevo</label>
            <InputText name="new_name" value={formData.new_name} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="minutes_played">Edición</label>
          <InputNumber type="number" name="edition" min="1900" max="2999" placeholder="YYYY" value={formData.edition} onChange={handleChange} />
        </div>

        <div>
          <h2 className="mb-2">Icono</h2>
          <div className="grid grid-cols-2 items-center gap-3">
            <label htmlFor="minutes_played">Existente</label>
            <ImageDropdown options={tournament_logos} name="tournament_logo_route" value={formData.tournament_logo_route} onChange={handleChange} />

            <label htmlFor="nickname">Nuevo</label>
            <InputFile name="logo_file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="tournament_status_id">Estado</label>
          <DropdownSelect options={tournament_statuses} name="tournament_status_id" value={formData.tournament_status_id} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="winner_team_id">Ganador</label>
          <DropdownSelect options={teams} name="winner_team_id" value={formData.winner_team_id} onChange={handleChange} required={false} sideID="id" />
        </div> 

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="online_status">Activo</label>
          <InputCheckbox name="online_status" checked={formData.online_status} onChange={handleChange} />
        </div> 

        <div className="flex flex-col justify-between">
            <DefaultButton type="submit" value="Guardar" />
            {/* -- MESSAGES -- */}
            <MutationMessage mutation={mutation} />
        </div>
      </form>
    </div>
  );
}