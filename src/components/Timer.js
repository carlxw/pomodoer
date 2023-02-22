import { useEffect } from "react";
import { secToString } from "../modules/Utilities";

/**
 * @param input The time in seconds
 * @param func The function to update time
 */
const Timer = ({ time, setTime }) => {
    // Decrements timer
    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1)
        }, 1000)
    }, [time]);

    return (
        <div className="countdown">
            <h1>{ secToString(time) }</h1>
        </div>
    );
}

export default Timer;