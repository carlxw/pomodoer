import {  useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import { secToString } from "../util/secToString";
import { timerActive, timerOn, timerOff } from "../util/TimerControl";
import { studyOn } from "../util/StudyControl";
import { Howl } from "howler";
import mp3 from "../resources/alarm.mp3"
import config from "../config.json";

const Pomodoro = () => {
    // Check if there is previous data
    const prev_session = JSON.parse(sessionStorage.getItem("Timer"));

    /* ======================================================= */

    // Enable or disable fullscreen for focus
    const enableFS = config.enable_fullscreen;

    // The time itself that will decrement with every second, controlled by Timer
    const [time, setTime] = useState(prev_session ? prev_session.current_time : 0);

    // Counts the number of study sessions that occured
    const [studyNo, setStudyNo] = useState(prev_session ? prev_session.study_session : 1);

    // The start/pause button for the timer
    const [timerText, setTimerText] = useState("Start");
    
    /* ======================================================= */

    // For refresh:
    onbeforeunload = () => {
        sessionStorage.setItem("Timer", JSON.stringify({
            "study_session": studyNo,
            "current_time": time
        }));
    };

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
        timerOff();
        setTimerText("Start");
    }

    // Alert the user that the timer is up 
    useEffect(() => {
        if (time <= 0 && timerActive) {
            if (enableFS) document.exitFullscreen();

            timerOff();
            let sound = new Howl({
                src: mp3
            });
            sound.play();

            setTimerText("Start");

            setTimeout(() => {
                alert("Timer");
            }, 500);
        }
    }, [time, enableFS]);

    return (
        <div className="pomodoro">
            <h1 id="session-counter">{ `Study session no. ${studyNo}` }</h1>
            { timerActive ? <Countdown timeObj={ {time, setTime} } studyObj={ {studyNo, setStudyNo} } /> : <h1 id="timer-countdown">{ secToString(time) }</h1> }

            <div className="timer-btn-presets">
                <div className="btn-grp">
                    <button id="study-timer" onClick={ () => {setTime(config.study_time_s); studyOn()} }>{ secToString(config.study_time_s) }</button>
                    <label id="timer-label" >study</label>
                </div>

                {/* <div className="btn-grp">
                    <button onClick={ () => {setTime(3); studyOn()} }>TEST</button>
                    <label>test</label>
                </div> */}
                
                <div className="btn-grp">
                    <button id="break-timer-short" onClick={ () => setTime(config.shortbreak_time_s) }>{ secToString(config.shortbreak_time_s) }</button>
                    <label id="timer-label" >break</label>
                </div>
                
                <div className="btn-grp">
                    <button id="break-timer-long" onClick={ () => setTime(config.longbreak_time_s) }>{ secToString(config.longbreak_time_s) }</button>
                    <label id="timer-label" >long break</label>
                </div>
            </div>

            <div className="timer-ctrl">
                <button id="timer-start-pause" onClick={() => {
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