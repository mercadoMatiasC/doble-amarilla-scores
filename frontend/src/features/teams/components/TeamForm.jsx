import { useEffect, useState } from "react";
import { DropdownSelect } from "../../../components/forms/DropdownSelect";
import { DefaultButton } from "../../../components/forms/DefaultButton";
import { MutationMessage } from "../../../components/MutationMessage";
import { InputText } from "../../../components/forms/InputText";
import { useProvinces } from "../hooks/useProvinces";
import { useTeamLogos } from "../hooks/useTeamLogos";
import { InputFile } from "../../../components/forms/InputFile";
import { ImageDropdown } from "../../../components/forms/ImageDropdown";
import { useUpdateTeam } from "../hooks/useUpdateTeam";
import { useStoreTeam } from "../hooks/useStoreTeam";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorScreen } from "../../../components/ErrorScreen";

export function TeamForm({ team = null }) {
  const { data: provinces, isLoading: provinces_Loading, error: provincesError } = useProvinces();
  const { data: team_logos, isLoading: team_logos_Loading, error: team_logos_Error } = useTeamLogos();
  const updateTeamMutation = useUpdateTeam();
  const storeTeamMutation = useStoreTeam();

  const isEdit = !!team;
  const mutation = isEdit ? updateTeamMutation : storeTeamMutation; 

  const [formData, setFormData] = useState({
    name: team?.name || "",
    nickname: team?.nickname || "",
    province_id: team?.province?.id || 0,
    founded_date: team?.founded_date || "",
    stadium: team?.stadium || "",
    team_logo_route: team?.team_logo_route || "",
    logo_file: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const isNumeric = name === "province_id";

    setFormData(prev => {
      const newState = {
        ...prev,
        [name]: isNumeric ? Number(value) : value,
      };

      if (name == "team_logo_route")
        newState.logo_file = null;

      return newState;
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) 
      setFormData(prev => ({
        ...prev,
        logo_file: file,
        team_logo_route: URL.createObjectURL(file) 
      }));

  }

  function handleSubmit(e) {
    e.preventDefault();

    if (team){
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("nickname", formData.nickname);
      payload.append("province_id", formData.province_id);
      payload.append("founded_date", formData.founded_date);
      payload.append("stadium", formData.stadium);
      payload.append("_method", "PATCH");

      if (formData.logo_file instanceof File) 
        payload.append("logo_file", formData.logo_file);
      else
        payload.append("team_logo_route", formData.team_logo_route);

      mutation.mutate({
        id: team.id,
        data: payload,
      });
    }else
      mutation.mutate({
        data: formData,
      });
  }

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        nickname: team.nickname,
        province_id: team.province.id,
        founded_date: team.founded_date,
        stadium: team.stadium,
        team_logo_route: team.team_logo_route,
        logo_file: null,
      });
    }
  }, [team]);

  if (provinces_Loading || team_logos_Loading) return <LoadingScreen wide={true} withBG={false} />;
  if (provincesError    || team_logos_Error)   return <ErrorScreen wide={true} />;

  return (
    <div className='w-full rounded text-white p-5 2xl:p-8 2xl:min-h-150'>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit} encType="multipart/form-data" >
        <h2>{isEdit ? "Actualizar equipo" : "Registrar nuevo equipo"}</h2>
        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="name">Nombre</label>
          <InputText name="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="nickname">Apodo</label>
          <InputText name="nickname" value={formData.nickname} onChange={handleChange} />
        </div>

        <div>
          <h2 className="mb-2">Escudo</h2>
          <div className="grid grid-cols-2 items-center gap-3">
            <label htmlFor="minutes_played">Existente</label>
            <ImageDropdown options={team_logos} name="team_logo_route" value={formData.team_logo_route} onChange={handleChange} />

            <label htmlFor="logo_file">Nuevo</label>
            <InputFile name="logo_file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="province_id">Provincia</label>
          <DropdownSelect options={provinces} name="province_id" value={formData.province_id} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="founded_date">Fundación</label>
          <input type="date" name="founded_date" value={formData.founded_date} onChange={handleChange} className="bg-white/20 p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <label htmlFor="stadium">Estadio</label>
          <InputText name="stadium" value={formData.stadium} onChange={handleChange} />
        </div>  

        <div className="flex flex-col justify-between">
            <div className="flex items-end justify-end">
              <DefaultButton type="submit" value="Guardar" />
            </div>
            {/* -- MESSAGES -- */}
            <MutationMessage mutation={mutation} />
        </div>
      </form>
    </div>
  );
}