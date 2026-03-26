export function ErrorScreen({ wide, withBG = true, error = "Hubo un error cargando la información." }) {
    const base_class = `flex flex-col min-h-100 rounded text-white space-y-3 ${withBG ? '2xl:min-h-170 bg-black/50':'' } `;

    return (
        <div className={`${base_class} ${wide 
                ? "w-[90%] justify-center sm:w-[80%] 2xl:p-8 2xl:flex-row 2xl:space-y-0" 
                : "w-[80%] p-5 lg:justify-between lg:flex-row lg:w-1/2 lg:space-y-0"
            }`}>
            <div className="flex flex-col text-center justify-center items-center w-full h-full gap-3 bg-white/5">
                <img className='w-25' src="/brand/errorball.png" alt="errorball" />
                <p className="text-red-500 italic text-lg">{error}</p>
            </div>
        </div>
    );
}