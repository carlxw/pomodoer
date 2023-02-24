export const arrRemove = (arr, val) => {
    let index = arr.indexOf(val);
    if (index > -1) arr.splice(index, 1);
    return arr;
}