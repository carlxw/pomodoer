import { useState } from "react";
import Timer from "../components/Timer";
import { secToString } from "../util/secToString";
import { timerActive, timerOn, timerOff } from "../util/timerActive";

const Pomodoro = () => {
    // The time itself that will decrement with every second, controlled by Timer
    const [time, setTime] = useState(0);
    
    const handleTimerStart = () => {
        if (time > 0) {
            setTime(time - 1); 
            timerOn();
        } else {
            alert("Select a timer preset.");
        }
    }
    return (
        <div className="pomodoro">
            <h2 className="session_counter">Study session no. 3</h2>
            { timerActive ? <Timer time={ time } setTime={ setTime } /> : <h1>{ secToString(time) }</h1> }
            
            <div className="timer_buttons_presets">
                <button onClick={ () => setTime(1500) }>25:00</button>
                <p>study session</p>

                <button onClick={ () => setTime(300) }>5:00</button>
                <p>short break</p>

                <button onClick={ () => setTime(900) }>15:00</button>
                <p>long break</p>
            </div>

            <div>
                <button onClick={ handleTimerStart }>Start</button>
                <button onClick={ timerOff }>Pause</button>
                <button onClick={() => { timerOff(); setTime(0) } }>Clear</button>
            </div>
        </div>
    );
}

export default Pomodoro;