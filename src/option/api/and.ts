import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";

export function and<T, U>(new_option: NewOption<U>) {
  return createRemapper<T, U>((option) => {
    return option.isSome() ? new_option : NewOption.None<U>();
  });
}
