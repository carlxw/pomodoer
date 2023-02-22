import { useState } from "react";
import Timer from "../components/Timer";
import { secToString } from "../modules/Utilities";

const Pomodoro = () => {
    const [timerOn, setTimerOn] = useState(false);
    const time = 1200;

    return (
        <div className="pomodoro">
            <h2 className="session_counter">Study session no. 3</h2>
            { timerOn ? <Timer input={ time }/> : <h1>{ secToString(time) }</h1> }
            
            <div className="timer_buttons">
                <button>25:00</button>
                <p>study session</p>

                <button>5:00</button>
                <p>short break</p>

                <button>15:00</button>
                <p>long break</p>
            </div>
        </div>
    );
}

export default Pomodoro;