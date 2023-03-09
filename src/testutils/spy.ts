export function useSpy<T extends unknown[], U>(fn: (...args: T) => U) {
  let calledTimes = 0;
  let calledWith: T[] = [];
  return {
    spy: (...args: T) => {
      calledTimes += 1;
      calledWith.push(args);
      return fn(...args);
    },
    calledTimes: () => calledTimes,
    calledWith: (i: number) => calledWith[i],
  };
}
