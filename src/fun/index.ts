interface FlowApi<Args extends unknown[], Output> {
  map<NewOutput>(mapper: (a: Output) => NewOutput): FlowApi<Args, NewOutput>;
  chain<NewOutput>(
    mapper: (a: Output) => NewOutput
  ): FlowApi<Args, [Output, NewOutput]>;
  build(): (...args: Args) => Output;
}

export function flow<Args extends unknown[], Out>(map: (...args: Args) => Out) {
  const queue: Function[] = [];
  const api = {
    map(mapper) {
      queue.push(mapper);
      return api;
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
  } as FlowApi<Args, Out>;

  return api;
}
export function pipe<Args extends unknown[], Out>(value: Out) {
  const queue: Function[] = [];
  const api = {
    map(mapper) {
      queue.push(mapper);
      return api;
    },
    chain(mapper) {
      queue.push((prev: Out) => [prev, mapper(prev)]);
      return api;
    },
    build() {
      return (...args: Args) =>
        queue.reduce((prevResult, currentFn) => currentFn(prevResult), value);
    },
  } as FlowApi<Args, Out>;

  return api;
}
