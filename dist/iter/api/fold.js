export function fold(source, startFrom, fn) {
    let lastAcc = startFrom;
    for (const item of source) {
        lastAcc = fn(lastAcc, item);
    }
    return lastAcc;
}
