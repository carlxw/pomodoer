export const secToString = (input) => {
    const minVal = Math.floor(input/60);
    const secVal = input - minVal*60;

    let min;
    if (minVal < 10) {
        min = `0${minVal}`;
    } else {
        min = minVal;
    }

    let sec;
    if (secVal < 10) {
        sec = `0${secVal}`
    } else {
        sec = secVal;
    }

    return `${min}:${sec}`;
}