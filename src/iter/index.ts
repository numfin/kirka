import { None, Option, Some } from "../option";
import { Iter } from "./interfaces";
import { defaultFilter, iterFactory } from "./gen";

type Gen<T> = Generator<T>;
function create_iter<T>(source: Gen<T>) {
  let inner = source;
  const api: Iter<T> = {
    map: (fn) => IterApi.map(inner, fn),
    filter: (fn) => IterApi.filter(inner, fn),
  };
  return api;
}

export function fromArr<T>(source: T[]) {
  return create_iter(iterFactory(source));
}

export namespace IterApi {
  export function map<T>(source: Gen<T>) {
    return create_iter(iterFactory(source));
  }
  export function filter<T>() {}
}
