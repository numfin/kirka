import test from "ava";
import { Iter } from "../index.js";
import { enumerate } from "./enumerate.js";

test(`enumerate() does not mutate original iter`, (t) => {
  const numbers = [3, 4, 5, 6];
  const iter = Iter.from(numbers);
  // Clone test: initial iter should be untouched
  const enumeratedIter = iter.do(enumerate());
  const enumeratedValues = numbers.map((item, index) => ({ item, index }));

  t.deepEqual(Array.from(iter), [3, 4, 5, 6]);
  t.deepEqual(Array.from(enumeratedIter), enumeratedValues);
});
