import test from "ava";
import { Iter } from "../index.js";
import { nativeRange } from "../iter-test-tools.js";
import { take } from "./take.js";

test(`take(n) should return only n elements`, (t) => {
  const values = nativeRange(3, 10);
  const iter = Iter.fromRange(3, 10);

  // Clone test: initial iter should be untouched
  const takenValues = values.slice(0, 3);
  const takenIter = iter.do(take(3));

  t.deepEqual([...iter], values);
  t.deepEqual([...takenIter], takenValues);
});
