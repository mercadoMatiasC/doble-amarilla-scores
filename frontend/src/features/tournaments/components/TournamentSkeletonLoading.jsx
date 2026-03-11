export function TournamentSkeletonLoading() {
    const items = Array.from({ length: 8 }, (_, i) => (
            <div key={i} className='justify-between flex flex-row gap-4 items-center h-12'>
                <div className="flex flex-row gap-3 items-center">
                    <div  className="flex flex-row gap-3 items-center">
                        <div className='bg-white/20 rounded w-12 h-12' ></div> 
                        <div className='bg-white/20 rounded w-31.25 h-5' ></div>
                    </div>
                    <div className='bg-white/20 rounded w-12.5 h-5' ></div> 
                </div>

                <div className='bg-white/20 rounded w-5' ></div>  
                <div className='bg-white/20 rounded w-18.75 h-5' ></div>     
            </div>
        )
    );

    return (
        <>
            <div className='rounded flex flex-col text-white bg-black/50 p-5 lg:justify-between w-[80%] space-y-3 lg:flex-row lg:w-1/2 lg:space-y-0 animate-pulse'>
                <div className='space-y-3 lg:w-2/3'>
                    {items}
                </div>
            </div>
        </>
    )
}