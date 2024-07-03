import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";

export function or<T>(new_value: NewOption<T>) {
  return createRemapper<T, T>((opt) => {
    return opt.isSome() ? opt : new_value;
  });
}
