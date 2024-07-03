import { isSome } from "../../option/api/is_some.js";
import { NewOption } from "../../option/index.js";
import { createRemapper } from "../middleware/remap.js";

export function filterMap<T, U>(fn: (item: T) => NewOption<U>) {
  return createRemapper<T, U>(function* (_, source) {
    for (const item of source()) {
      const data = fn(item).inner;
      if (isSome(data)) {
        yield data.value;
      }
    }
  });
}
