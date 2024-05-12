export function useSpy<T extends unknown[], U>(fn: (...args: T) => U) {
  let calledTimes = 0;
  const calledWith: T[] = [];
  return {
    spy: (...args: T) => {
      calledTimes += 1;
      calledWith.push(args);
      return fn(...args);
    },
    calledTimes: () => calledTimes,
    calledWith: (callNth: number) => calledWith[callNth],
  };
}
