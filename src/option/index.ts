import { None, Option, Some, OptionUnion } from "./interfaces";
export type { Option } from "./interfaces";

function create_option<T>(v: OptionUnion<T>): Option<T> {
  let inner = v;

  const api: Option<T> = {
    inner: () => inner,
    eq: (value) => OptionApi.eq(api, value),
    format: () => OptionApi.format(inner),
    clone: () => OptionApi.clone(inner),
    unwrap: () => OptionApi.unwrap(inner),
    unwrapOr: (default_value) => OptionApi.unwrapOr(inner, default_value),
    isNone: () => OptionApi.isNone(inner),
    isSome: () => OptionApi.isSome(inner),
    take: () => OptionApi.take(inner),
    isSomeAnd: (fn) => OptionApi.isSomeAnd(api, fn),
    map: (fn) => OptionApi.map(inner, fn),
    or: (new_value) => OptionApi.or(api, new_value),
    orElse: (fn) => OptionApi.orElse(api, fn),
    and: (new_value) => OptionApi.and(api, new_value),
    andThen: (fn) => OptionApi.andThen(api, fn),
  };
  return api;
}

export function Some<T>(value: T) {
  return create_option({ type: "Some", value });
}
export function None<T>() {
  return create_option<T>({ type: "None" });
}
export namespace OptionApi {
  export function format<T>(option: OptionUnion<T>) {
    return option.type === "Some" ? `Some(${option.value})` : `None`;
  }
  export function eq<T>(option: Option<T>, value: Option<T>) {
    if (value.isNone() || option.isNone()) {
      return value.isNone() && option.isNone();
    }
    return value.unwrap() === option.unwrap();
  }
  export function clone<T>(option: OptionUnion<T>): Option<T> {
    return option.type === "Some" ? Some(option.value) : None();
  }
  export function isNone<T>(option: OptionUnion<T>) {
    return option.type === "None";
  }
  export function isSome<T>(option: OptionUnion<T>) {
    return option.type === "Some";
  }
  export function take<T>(option: OptionUnion<T>) {
    if (option.type === "Some") {
      (option.type as "None") = "None";
      const value = option.value;
      (option.value as undefined) = undefined;
      return Some(value);
    }
    return None<T>();
  }
  export function isSomeAnd<T>(
    option: Option<T>,
    fn: (value: T) => boolean
  ): boolean {
    return option.isSome() && fn(option.unwrap());
  }
  export function unwrap<T>(option: OptionUnion<T>) {
    if (option.type === "None") {
      throw new Error(`unwrap called on ${format(option)}`);
    }
    return option.value;
  }
  export function unwrapOr<T>(option: OptionUnion<T>, default_value: T) {
    return option.type === "None" ? default_value : option.value;
  }
  export function map<T, U>(option: OptionUnion<T>, fn: (value: T) => U) {
    if (option.type === "Some") {
      return Some(fn(unwrap(option)));
    }
    return None<U>();
  }
  export function or<T>(
    current_value: Option<T>,
    new_value: Option<T>
  ): Option<T> {
    return current_value.isSome() ? current_value.clone() : new_value;
  }
  export function orElse<T>(
    current_value: Option<T>,
    fn: () => Option<T>
  ): Option<T> {
    return current_value.isSome() ? current_value.clone() : fn();
  }
  export function and<T, U>(
    current_value: Option<T>,
    new_value: Option<U>
  ): Option<U> {
    return current_value.isSome() ? new_value : None();
  }
  export function andThen<T, U>(
    current_value: Option<T>,
    fn: (value: T) => Option<U>
  ): Option<U> {
    return current_value.isSome() ? fn(current_value.unwrap()) : None();
  }
}
