let timerActive = false;

const timerOn = () => {
    timerActive = true;
}

const timerOff = () => {
    timerActive = false;
}

export { timerActive, timerOn, timerOff };