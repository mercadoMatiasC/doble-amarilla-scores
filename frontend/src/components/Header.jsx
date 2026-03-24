import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PageAnimWrapper } from './PageAnimWrapper';

export function Header() {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className='flex flex-col justify-center mt-4 items-center'>
                <section className='w-2/3 flex flex-col text-white sm:flex-row sm:justify-between'>
                    <Link to="/partidos" className='flex w-full h-full justify-center sm:justify-start'>
                        <img className='p-3 w-45' src="/brand/logo_wtext.png" alt="doble_amarilla_logo" />
                    </Link>

                    <div className='flex flex-row justify-between gap-6 items-center'>
                        <nav className='flex gap-5'>
                            <Link to="/equipos">Equipos</Link>
                            <Link to="/torneos">Torneos</Link>
                            <Link to="/partidos">Partidos</Link>
                        </nav>
                        <div>
                            <svg width="30" height="30" fill="white" viewBox="0 0 100 80" onClick={() => setMenu(!menu)}>
                                <rect width="100" height="15" rx="8"></rect>
                                <rect y="30" width="100" height="15" rx="8"></rect>
                                <rect y="60" width="100" height="15" rx="8"></rect>
                            </svg>
                        </div>
                    </div>
                </section>
                {menu && (
                    <PageAnimWrapper>
                        <ul className='flex flex-col justify-center items-center w-full text-white bg-white/5 p-3 gap-4 2xl:flex-row'>
                            <li><Link to="/equipos/registrar" >Registrar Equipo</Link></li>
                            <div className="hidden w-px mx-5 bg-white/25 h-10 mt-5 self-stretch 2xl:block"></div>
                            <li><Link to="/torneos/registrar" >Registrar Torneo</Link></li>
                            <div className="hidden w-px mx-5 bg-white/25 h-10 mt-5 self-stretch 2xl:block"></div>
                            <li><Link to="/partidos/registrar">Registrar Partido</Link></li>
                        </ul>
                    </PageAnimWrapper>
                )}
            </header>
        </>
    )
}