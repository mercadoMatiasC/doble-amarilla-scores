import { PageAnimWrapper } from "../../../components/PageAnimWrapper";

export function GameSkeletonLoading() {
    const items = Array.from({ length: 8 }, (_, i) => (
            <div key={i} className='grid justify-between gap-4 h-13 items-center grid-cols-[20%_10%_60%] sm:grid-cols-[20%_20%_50%] md:grid-cols-[20%_20%_1px_50%] lg:grid-cols-[11%_13%_1px_68%] xl:grid-cols-[15%_15%_5%_60%] 2xl:grid-cols-[13%_13%_1px_65%]'>
                <div className="flex justify-between items-center xl:grid xl:grid-cols-2 animate-pulse">
                    <div className='bg-white/20 rounded w-10 h-5' ></div>
                    <div className='bg-white/20 rounded w-10 h-5 hidden sm:flex' ></div>
                </div>

                <div className="flex flex-row items-center gap-3 animate-pulse" id="match_tournament_display">
                    <div className='bg-white/20 rounded w-12 h-12' ></div> 
                    <div className='bg-white/20 rounded w-18.75 h-5 hidden sm:block' ></div>
                </div>

                <div className="hidden w-px bg-white/25 h-10 self-stretch md:block"></div>

                <div className="flex justify-between items-center gap-3 lg:grid lg:grid-cols-[160px_80px_160px_100px] animate-pulse" id="match_teams_display" >
                    <div className="flex gap-2 justify-between items-center" id="home_team" >
                        <div className='bg-white/20 rounded w-12 h-12' ></div> 
                        <div className='bg-white/20 rounded w-18.75 h-5 hidden lg:block' ></div>
                    </div>

                    <div className="flex gap-3 text-xl items-center justify-center">
                        -
                    </div>

                    <div className="flex gap-3 justify-between items-center" id="away_team" >
                        <div className='bg-white/20 rounded w-18.75 h-5 hidden lg:block' ></div>
                        <div className='bg-white/20 rounded w-12 h-12' ></div> 
                    </div>

                    <div className='bg-white/20 rounded w-18.75 h-5 hidden lg:block' ></div>
                </div>
            </div>
        )
    );

    return (
        <>
            <PageAnimWrapper>
                <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-165'>
                    <div className='space-y-3 2xl:w-3/4'>
                        <div className='grid justify-between gap-4 items-center grid-cols-[20%_10%_60%] sm:grid-cols-[20%_20%_50%] md:grid-cols-[20%_20%_50%] lg:grid-cols-[11%_14%_70%] xl:grid-cols-[15%_15%_60%] 2xl:grid-cols-[13%_13%_65%]'>
                            <p>Fecha</p>
                            <p>Torneo</p>
                            <p className='hidden lg:flex lg:justify-end'>Estado</p>
                        </div>
                        {items}
                    </div>
                </div>
            </PageAnimWrapper>
        </>
    )
}