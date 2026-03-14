import { SoccerBall } from "./svgs/SoccerBall";

export function LoadingScreen() {
    return (
        <div className="flex justify-center items-center animate-bounce 2xl:min-h-166">
            <div className="animate-spin">
                <SoccerBall width="50px" />
            </div>
        </div>
    )   
}
