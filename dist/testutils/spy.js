export function useSpy(fn) {
    let calledTimes = 0;
    const calledWith = [];
    return {
        spy: (...args) => {
            calledTimes += 1;
            calledWith.push(args);
            return fn(...args);
        },
        calledTimes: () => calledTimes,
        calledWith: (callNth) => calledWith[callNth],
    };
}
