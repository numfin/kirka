import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isSome } from "./is_some.js";

export function andThen<T, U>(fn: (value: T) => NewOption<U>) {
  return createRemapper<T, U>((_, inner) => {
    return isSome(inner) ? fn(inner.value) : NewOption.None<U>();
  });
}
