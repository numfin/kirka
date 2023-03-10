export * from "./interfaces";
export { OptionFrom } from "./from";

import { result } from "./api/toLeft";
import { andThen } from "./api/andThen";
import { and } from "./api/and";
import { orElse } from "./api/orElse";
import { or } from "./api/or";
import { map } from "./api/map";
import { unwrapOr } from "./api/unwrapOr";
import { unwrap } from "./api/unwrap";
import { isSomeAnd } from "./api/isSomeAnd";
import { take } from "./api/take";
import { isSome } from "./api/isSome";
import { isNone } from "./api/isNone";
import { clone } from "./api/clone";
import { eq } from "./api/eq";
import { format } from "./api/format";
import { unionNone } from "./api/unionNone";
import { unionSome } from "./api/unionSome";
import type { Option, Some, OptionUnion, None } from "./interfaces";
import { filter } from "./api/filter";

export function createOption<T>(v: OptionUnion<T>): Option<T> {
  let inner = v;

  const api: Option<T> = {
    inner: () => inner,
    eq: (value, by) => eq(api, value, by),
    format: () => format(inner),
    clone: () => createOption(clone(inner)),
    unwrap: () => unwrap(inner),
    unwrapOr: (default_value) => unwrapOr(inner, default_value),
    isNone: () => isNone(inner),
    isSome: () => isSome(inner),
    take: () => createOption(take(inner)),
    isSomeAnd: (fn) => isSomeAnd(api, fn),
    map: (fn) => createOption(map(inner, fn)),
    or: (new_value) => createOption(or(api, new_value)),
    orElse: (fn) => createOption(orElse(api, fn)),
    and: (new_value) => createOption(and(api, new_value)),
    andThen: (fn) => createOption(andThen(api, fn)),
    result: (fn) => result(api, fn),
    filter: (fn) => filter(api, fn),
  };
  return api;
}

export function Some<T>(v: T) {
  return createOption(unionSome(v));
}
export function None<T>() {
  return createOption(unionNone<T>());
}
