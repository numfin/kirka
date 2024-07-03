import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isSomeAnd } from "./is_some_and.js";

export function filter<T>(fn: (item: T) => boolean) {
  return createRemapper<T, T>((option) => {
    if (option.do(isSomeAnd(fn))) {
      return option;
    }
    return NewOption.None<T>();
  });
}
