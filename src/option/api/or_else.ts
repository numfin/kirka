import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";

export function orElse<T>(fn: () => NewOption<T>) {
  return createRemapper<T, T>((option) => {
    return option.isSome() ? option : fn();
  });
}
