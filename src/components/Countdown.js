import { useEffect } from "react";
import { secToString } from "../util/secToString";
import { timerActive, timerOff } from "../util/TimerControl";

/**
 * @param input The time in seconds
 * @param func The function to update time
 */
const Countdown = ({ time, setTime }) => {
    // Decrements timer
    const cd = setTimeout(() => {
        if (timerActive) setTime(time - 1);
        
    }, 1000)

    // Stop timer if countdown has been reached
    useEffect(() => {
        if (time < 0) {
            clearTimeout(cd);
        } 
    }, [time]);

    return (
        <div className="countdown">
            <h1>{ secToString(time) }</h1>
        </div>
    );
}

export default Countdown;