import { useState } from "react";
import Timer from "../components/Timer";
import { secToString } from "../modules/Utilities";

const Pomodoro = () => {
    // While true, the timer will continue to countdown
    const [timerOn, setTimerOn] = useState(false);

    // The time itself that will decrement with every second, controlled by Timer
    const [time, setTime] = useState(0);
    
    return (
        <div className="pomodoro">
            <h2 className="session_counter">Study session no. 3</h2>
            { timerOn ? <Timer time={ time } setTime={ setTime } /> : <h1>{ secToString(time) }</h1> }
            
            <div className="timer_buttons_presets">
                <button onClick={ () => setTime(1500) }>25:00</button>
                <p>study session</p>

                <button onClick={ () => setTime(300) }>5:00</button>
                <p>short break</p>

                <button onClick={ () => setTime(900) }>15:00</button>
                <p>long break</p>
            </div>

            <div>
                <button onClick={ () => {setTime(time - 1); setTimerOn(true);}}>Start</button>
                <button onClick={ () => {setTimerOn(false);} }>Pause</button>
                <button>clear</button>
            </div>
        </div>
    );
}

export default Pomodoro;