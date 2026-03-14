import { PageAnimWrapper } from '../../../components/PageAnimWrapper'
import { TournamentIndexRow } from '../../tournaments/components/TournamentIndexRow'

export function TeamTournaments({ tournaments }) {
    return (
        <>
            <PageAnimWrapper>
                <div className='w-full rounded flex flex-col text-white p-5 space-y-20 2xl:p-8 2xl:min-h-150'>
                    <div className='space-y-3 h-1/2'>
                        <h2>Torneos ganados</h2>
                        {tournaments.length > 0 ? (                        
                            tournaments.map(tournament => (
                                <TournamentIndexRow key={tournament.id} tournament={tournament} />
                            ))
                        ):(
                            <p>Este equipo no tiene victorias registradas en torneos.</p>
                        )}
                    </div>
                </div>
            </PageAnimWrapper>
        </>
    )
}