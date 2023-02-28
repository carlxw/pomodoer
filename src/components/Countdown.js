import { useEffect } from "react";
import { secToString } from "../util/secToString";
import { timerActive } from "../util/TimerControl";
import { studying, studyOff } from "../util/StudyControl";

/**
 * @param input The time in seconds
 * @param func The function to update time
 */
const Countdown = ({ timeObj, studyObj }) => {
    // Decrements timer
    const cd = setTimeout(() => {
        if (timerActive) timeObj.setTime(timeObj.time - 1);
    }, 1000)

    // Stop timer if countdown has been reached
    useEffect(() => {
        if (timeObj.time <= 0) {
            clearTimeout(cd);
            timeObj.setTime(0);

            // Study sesion complete; increment counter
            if (studying) {
                studyOff();
                studyObj.setStudyNo(studyObj.studyNo + 1);
            }
        } 
    }, [timeObj.time]);

    return (
        <div className="countdown">
            <h1>{ secToString(timeObj.time) }</h1>
        </div>
    );
}

export default Countdown;