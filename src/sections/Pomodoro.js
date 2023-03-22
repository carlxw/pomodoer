import {  useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import { secToString } from "../util/secToString";
import { timerActive, timerOn, timerOff } from "../util/TimerControl";
import { studyOn } from "../util/StudyControl";
import { Howl } from "howler";
import mp3 from "../alarm.mp3"
import config from "../config.json";

const Pomodoro = () => {
    // Enable or disable fullscreen for focus
    const enableFS = config.enable_fullscreen;

    // The time itself that will decrement with every second, controlled by Timer
    const [time, setTime] = useState(0);

    // Counts the number of study sessions that occured
    const [studyNo, setStudyNo] = useState(1);

    // The start/pause button for the timer
    const [timerText, setTimerText] = useState("Start");
    
    /* ======================================================= */

    // Bug: Spamming start button
    const startTimer = () => {
        // Prevents starting timer on 00:00
        if (time > 0) {
            setTime(time - 1); 
            timerOn();
            if (enableFS) document.body.requestFullscreen();
            setTimerText("Pause");
        } else {
            alert("Select a timer preset.");
        }
    }

    const pauseTimer = () => {
        if (timerActive) {
            timerOff();
            setTimerText("Start");
        } else {
            alert("Timer not active.");
        }
    }

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
            <h2 className="session-counter">{ `Study session no. ${studyNo}` }</h2>
            { timerActive ? <Countdown timeObj={ {time, setTime} } studyObj={ {studyNo, setStudyNo} } /> : <h1 id="timer-countdown">{ secToString(time) }</h1> }

            <div className="timer-btn-presets">
                <div className="btn-grp">
                    <button id="study-timer" onClick={ () => {setTime(config.study_time_s); studyOn()} }>{ secToString(config.study_time_s) }</button>
                    <p id="timer-label" >study session</p>
                </div>

                {/* <div className="btn-grp">
                    <button onClick={ () => {setTime(3); studyOn()} }>TEST</button>
                    <p>test</p>
                </div> */}
                
                <div className="btn-grp">
                    <button id="break-timer-short" onClick={ () => setTime(config.shortbreak_time_s) }>{ secToString(config.shortbreak_time_s) }</button>
                    <p id="timer-label" >short break</p>
                </div>
                
                <div className="btn-grp">
                    <button id="break-timer-long" onClick={ () => setTime(config.longbreak_time_s) }>{ secToString(config.longbreak_time_s) }</button>
                    <p id="timer-label" >long break</p>
                </div>
            </div>

            <div className="timer-ctrl">
                <button onClick={() => {
                    if (timerActive) pauseTimer();
                    else startTimer();
                }}>
                    { timerText }
                </button>
                <button onClick={ () => { setTime(0); pauseTimer(); }}>Clear</button>
            </div>
        </div>
    );
}

export default Pomodoro;