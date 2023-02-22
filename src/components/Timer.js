import { useEffect, useState } from "react";
import { secToString } from "../modules/Utilities";

const Timer = ({ input }) => {

    let [time, setTime] = useState(input);

    // Decrements timer
    useEffect(() => {
        setTimeout(() => {
            setTime(--time)
        }, 1000)
    }, [time]);

    

    return (
        <div className="countdown">
            <h1>{ secToString(time) }</h1>
        </div>
    );
}

const start = () => {
    console.log("Hello");
}

export default Timer;