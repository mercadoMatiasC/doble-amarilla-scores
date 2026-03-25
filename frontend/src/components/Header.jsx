import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PageAnimWrapper } from './PageAnimWrapper';
import { HamburgerMenu } from './svgs/HamburgerMenu'
import { AnimatePresence } from 'framer-motion';

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
                            <Link to="/equipos" >Equipos</Link>
                            <Link to="/torneos" >Torneos</Link>
                            <Link to="/partidos">Partidos</Link>
                        </nav>
                        <div>
                            <HamburgerMenu onClick={() => setMenu(!menu)} />
                        </div>
                    </div>
                </section>
                
                    <AnimatePresence mode="wait">
                        {menu && (
                        <PageAnimWrapper key={menu}>
                            <ul className='flex flex-col justify-center items-center w-full gap-4 p-3 mt-4 text-white bg-white/5 2xl:p-0 2xl:mt-0 2xl:flex-row 2xl:h-12.5'>
                                <li><Link to="/equipos/registrar" >Registrar Equipo</Link></li>
                                <div className="hidden w-px mx-5 bg-white/25 h-4 mt-5 self-stretch 2xl:flex"></div>
                                <li><Link to="/torneos/registrar" >Registrar Torneo</Link></li>
                                <div className="hidden w-px mx-5 bg-white/25 h-4 mt-5 self-stretch 2xl:flex"></div>
                                <li><Link to="/partidos/registrar">Registrar Partido</Link></li>
                            </ul>
                        </PageAnimWrapper>
                        )}
                    </AnimatePresence>
                
            </header>
        </>
    )
}