import { None as NewNone, OptionUnion } from "./base.js";
import { OptionPipe } from "./middleware/middleware.js";
import { isSome } from "./api/is_some.js";
import { isNone } from "./api/is_none.js";
import { unwrap } from "./api/unwrap.js";
import { match } from "./api/match.js";
import { eq } from "./api/eq.js";

export class NewOption<T> {
  *[Symbol.iterator]() {
    if (isSome(this.inner)) {
      yield this.inner.value;
    }
  }

  constructor(public inner: OptionUnion<T>) {}

  static None = <T>() => new NewOption<T>(NewNone as OptionUnion<T>);
  static Some<T>(value: T) {
    return new NewOption({ type: "Some", value });
  }
  static fromBool(predicate: boolean) {
    return predicate ? NewOption.Some(predicate) : NewOption.None();
  }
  static fromNullable<T>(v?: T | null) {
    if (v !== undefined && v !== null) {
      return NewOption.Some(v);
    }
    return NewOption.None();
  }

  isSome() {
    return isSome(this.inner);
  }
  isNone() {
    return isNone(this.inner);
  }
  unwrap() {
    return unwrap(this.inner);
  }
  clone() {
    return isSome(this.inner)
      ? NewOption.Some(this.inner.value)
      : NewOption.None();
  }

  do<Out>(fn: OptionPipe<T, Out>) {
    return fn(this, this.inner);
  }
  pipe<Args extends unknown[], Out>(fn: (...args: Args) => OptionPipe<T, Out>) {
    return (...args: Args) => fn(...args)(this, this.inner);
  }

  eq<U>(other: NewOption<T>, by = (x: T) => x as unknown as U) {
    return this.do(eq(other, by));
  }
  match<U>(onSome: (v: T) => U, onNone: () => U) {
    return this.do(match(onSome, onNone));
  }
}

export const Some = NewOption.Some;
export const None = NewOption.None;
