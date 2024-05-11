import test from "ava";
import { Iter } from "./index.js";

test(`[Symbol.iterator]()`, (t) => {
  const values = [1, 2, 3, 4, 5];
  const iter = Iter.from(values);
  t.deepEqual([...iter], values); // [Symbol.iterator] mutates iter state
  t.true(iter.next().isNone()); // iterator is consumed
});
