export const arrRemove = (arr, val) => {
    let index = -1;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].taskName === val) {
            index = i;
            break;
        }
    }
    if (index > -1) arr.splice(index, 1);
    return arr;
}