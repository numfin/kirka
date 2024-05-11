import { Option } from "../../option/interfaces.js";
import { createAggregator } from "../middleware/aggregate.js";

export function nthMut<T>(amount: number) {
  if (amount < 0) {
    throw new Error(`Cannot iterate ${amount} times`);
  }
  return createAggregator<T, Option<T>>((iter) => {
    for (let i = 0; i < amount; i++) {
      iter.next();
    }
    return iter.next();
  });
}
