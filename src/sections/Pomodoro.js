// Probably coded poorly - Look to restructure

import {  useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import { secToString } from "../util/secToString";
import { timerActive, timerOn, timerOff } from "../util/TimerControl";
import { studyOn } from "../util/StudyControl";
import { Howl } from "howler";
import mp3 from "../alarm.mp3"

import "../css/Timer.css";

const Pomodoro = () => {
    const enableFS = false;

    // The time itself that will decrement with every second, controlled by Timer
    const [time, setTime] = useState(0);
    
    // Prevents starting timer on 00:00
    const handleTimerStart = () => {
        if (time > 0) {
            setTime(time - 1); 
            timerOn();
            if (enableFS) document.body.requestFullscreen();
        } else {
            alert("Select a timer preset.");
        }
    }

    // Counts the number of study sessions that occured
    const [studyNo, setStudyNo] = useState(1);

    // Alert the user that the timer is up 
    useEffect(() => {
        if (time <= 0 && timerActive) {
            timerOff();
            if (enableFS) document.exitFullscreen();
            let sound = new Howl({
                src: mp3
            });
            sound.play();
            setTimeout(() => {
                alert("Timer");
            }, 500);
        }
    }, [time, enableFS]);

    return (
        <div className="pomodoro">
            <h2 className="session_counter">{ `Study session no. ${studyNo}` }</h2>
            { timerActive ? <Countdown timeObj={ {time, setTime} } studyObj={ {studyNo, setStudyNo} } /> : <h1 id="timer-countdown">{ secToString(time) }</h1> }

            <div className="timer_btn_presets">
                <div className="btn_grp">
                    <button onClick={ () => {setTime(1500); studyOn()} }>25:00</button>
                    <p>study session</p>
                </div>

                {/* <div className="btn_grp">
                    <button onClick={ () => {setTime(3); studyOn()} }>TEST</button>
                    <p>test</p>
                </div> */}
                
                <div className="btn_grp">
                    <button onClick={ () => setTime(300) }>5:00</button>
                    <p>short break</p>
                </div>
                
                <div className="btn_grp">
                    <button onClick={ () => setTime(900) }>15:00</button>
                    <p>long break</p>
                </div>
            </div>

            <div className="timer_ctrl">
                <button onClick={ handleTimerStart }>Start</button>
                <button onClick={() => {
                    if (timerActive) {
                        timerOff();
                    } else {
                        alert("Timer not active.");
                    }
                }}>Pause</button>
                <button onClick={() => { 
                    if (timerActive) {
                        timerOff(); setTime(0)
                    } else {
                        alert("Timer not active.");
                    }
                }}>Clear</button>
            </div>
        </div>
    );
}

export default Pomodoro;