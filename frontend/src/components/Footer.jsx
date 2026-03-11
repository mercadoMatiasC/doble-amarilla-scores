import '../App.css'

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className='flex flex-col bg-black text-white p-5 justify-center items-center'>
                <section className='w-2/3'>
                    <div className='flex flex-col justify-between items-center p-4 sm:flex-row'>
                        <img className='w-2/5 sm:w-[20%] lg:w-[15%] xl:w-[10%] mb-5 md:mb-0' src="/brand/logo_text.png" alt="doble_amarilla_logo" />
                        <div className='flex flex-row gap-3 text-sm md:text-base'>
                            <div className='flex flex-col'>
                                <a href="#">Sobre nosotros</a>
                                <a href="#">Contacto</a>
                                <a href="#">Soporte</a>
                            </div>
                            <div className='flex flex-col'>
                                <a href="#">Facebook</a>
                                <a href="#">Instagram</a>
                                <a href="#">X (Twitter)</a>
                            </div>
                        </div>
                    </div>

                    <hr className='my-4 border-white' />

                    <p className='flex justify-center items-center text-xs'>
                        Copyright ©{year} dobleamarillascores.com | All rights reserved
                    </p>
                    </section>
            </footer>
        </>
    )
}