import { PageAnimWrapper } from "./PageAnimWrapper";
import { SoccerBall } from "./svgs/SoccerBall";


export function LoadingScreen({ wide }) {
    const base_class = "flex flex-col min-h-100 rounded text-white bg-black/50 space-y-3 2xl:min-h-166";

    return (
        <div className={`${base_class} ${wide 
                ? "w-[90%] justify-center sm:w-[80%] 2xl:p-8 2xl:flex-row 2xl:space-y-0" 
                : "w-[80%] p-5 lg:justify-between lg:flex-row lg:w-1/2 lg:space-y-0"
            }`}>
                <div className="flex justify-center items-center animate-bounce w-full h-full">
                    <div className="animate-spin">
                        <SoccerBall width="50px" />
                    </div>
                </div>
        </div>
    );
}