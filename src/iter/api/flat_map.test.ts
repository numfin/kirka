import test from "ava";
import { Iter } from "../index.js";
import { flatMap } from "./flat_map.js";
import { toArray } from "./to_array.js";

test(`flatMap() flattens inner iterable by 1 level`, (t) => {
  const iter = Iter.from([1, 2, [3]]);
  t.deepEqual(iter.do(flatMap((v) => [v])).do(toArray()), [1, 2, [3]]);
});

test(`flatMap() flattens inner Iter`, (t) => {
  const iter = Iter.from([[1], [2], [3]]);
  t.deepEqual(iter.do(flatMap(Iter.from)).do(toArray()), [1, 2, 3]);
});
