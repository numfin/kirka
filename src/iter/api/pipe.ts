export interface Flow<Args extends unknown[], Output> {
  /** add mapper to flow */
  map<NewOutput>(mapper: (a: Output) => NewOutput): Flow<Args, NewOutput>;
  /** clone flow and add mapper to flow */
  mapClone<NewOutput>(mapper: (a: Output) => NewOutput): Flow<Args, NewOutput>;
  chain<NewOutput>(
    mapper: (a: Output) => NewOutput
  ): Flow<Args, [Output, NewOutput]>;
  build(): (...args: Args) => Output;
  clone(): Flow<Args, Output>;
}

export function flow<Args extends unknown[], Out>(map: (...args: Args) => Out) {
  const queue: Function[] = [];
  const api = {
    clone() {
      return queue.reduce((acc, fn) => acc.map(fn as any), flow(map));
    },
    map(mapper) {
      queue.push(mapper);
      return api;
    },
    mapClone(mapper) {
      return api.clone().map(mapper);
    },
    chain(mapper) {
      queue.push((prev: Out) => [prev, mapper(prev)]);
      return api;
    },
    build() {
      return (...args: Args) =>
        queue.reduce(
          (prevResult, currentFn) => currentFn(prevResult),
          map(...args)
        );
    },
  } as Flow<Args, Out>;

  return api;
}
