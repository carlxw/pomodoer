const Timer = () => {
    return (
        <div className="timer">
            <h2 className="session_counter">Study session no. 3</h2>
            <h1 className="countdown">25:00</h1>

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

export default Timer;