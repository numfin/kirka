import { Option } from "../../option/index.js";
import { createRemapper } from "../middleware/remap.js";

export function filterMap<T, U>(fn: (item: T) => Option<U>) {
  return createRemapper<T, U>(function* (_, source) {
    for (const item of source()) {
      const data = fn(item).inner();
      if (data.type === "Some") {
        yield data.value;
      }
    }
  });
}
