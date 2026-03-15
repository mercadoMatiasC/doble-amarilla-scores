import { Link } from 'react-router-dom'
import '../App.css'

export function Header() {
    return (
        <>
            <header className='flex justify-center mt-4'>
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
                            <svg width="30" height="30" fill="white" viewBox="0 0 100 80">
                                <rect width="100" height="15" rx="8"></rect>
                                <rect y="30" width="100" height="15" rx="8"></rect>
                                <rect y="60" width="100" height="15" rx="8"></rect>
                            </svg>
                        </div>
                    </div>
                </section>
            </header>
        </>
    )
}