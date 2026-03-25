import { DropdownSelect } from '../../../components/forms/DropdownSelect';
import { DefaultButton } from '../../../components/forms/DefaultButton';
import { useState, useEffect } from "react";

export function GamesFilterSidebar({ filters, meta, onSubmit, onChangePage, selectedTeam, selectedTournament }) {
  const [team, setTeam] = useState(selectedTeam);
  const [tournament, setTournament] = useState(selectedTournament);

  useEffect(() => {
    setTeam(selectedTeam);
    setTournament(selectedTournament);
  }, [selectedTeam, selectedTournament]);

  return (
    <div className='flex flex-col gap-3 items-baseline 2xl:w-1/5 2xl:flex-col'>
      <h2>Filtros</h2>
      
      <form className='flex flex-col w-full space-y-5' onSubmit={onSubmit}>
        <label htmlFor="team_id">Por equipo:</label>
        <DropdownSelect options={filters.teams} name="team_id" value={team} required={false} sideID='id' onChange={(e) => setTeam(e.target.value)} />

        <label htmlFor="tournament_id">Por Torneo:</label>
        <DropdownSelect options={filters.tournaments} name="tournament_id" value={tournament} required={false} sideID='edition' onChange={(e) => setTournament(e.target.value)} />

        <div className='flex justify-end mt-3'>
          <DefaultButton type="submit" name="filter_button" value="Filtrar"/>
        </div>
      </form>

      {/* -- PAGINATION -- */}
      <div className='flex flex-row w-full justify-between mt-5 gap-10'>
        <DefaultButton disabled={meta.current_page === 1} onClick={() => onChangePage(meta.current_page - 1)} type="button" value="Anterior" />
        <DefaultButton disabled={meta.current_page === meta.last_page} onClick={() => onChangePage(meta.current_page + 1)} type="button" value="Siguiente" />
      </div>
    </div>
  );
}