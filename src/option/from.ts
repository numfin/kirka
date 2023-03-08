import { Either } from "../either";
import { Option } from "./interfaces";
import { None, Some } from "./option";

export namespace OptionFrom {
  export function bool<T extends boolean>(v: T): Option<T> {
    return v ? Some(v) : None();
  }
  export function nullable<T>(v?: T | null): Option<T> {
    if (v !== undefined && v !== null) {
      return Some(v);
    }
    return None();
  }
  export function eitherLeft<L, R>(either: Either<L, R>): Option<L> {
    return either.toLeftOption();
  }
  export function eitherRight<L, R>(either: Either<L, R>) {
    return either.toRightOption();
  }
}
