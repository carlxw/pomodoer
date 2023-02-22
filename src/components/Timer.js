import { useEffect } from "react";
import { secToString } from "../util/secToString";
import { timerActive } from "../util/timerActive";

/**
 * @param input The time in seconds
 * @param func The function to update time
 */
const Timer = ({ time, setTime }) => {
    // Decrements timer
    setTimeout(() => {
        if (timerActive) setTime(time - 1)
    }, 1000)

    return (
        <div className="countdown">
            <h1>{ secToString(time) }</h1>
        </div>
    );
}

export default Timer;