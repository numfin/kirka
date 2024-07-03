import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { andThen } from "./and_then.js";

export function flatten<T>() {
  return createRemapper<NewOption<T>, T>((option) => {
    return option.do(andThen((v) => v));
  });
}
