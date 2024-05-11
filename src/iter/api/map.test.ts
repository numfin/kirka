import test from "ava";
import { Iter } from "../index.js";
import { map } from "./map.js";
import { nativeRange } from "../iter-test-tools.js";
import { toArray } from "./to_array.js";

test(`map() should remap iter elements`, (t) => {
  const iter = Iter.fromRange(0, 5);
  // Clone test: initial iter should be untouched
  const iterTwo = iter.do(map((v) => v * 2));
  const iterThree = iter.do(map((v) => v * 3));
  const mappedTwo = nativeRange(0, 5).map((v) => v * 2);
  const mappedThree = nativeRange(0, 5).map((v) => v * 3);

  t.deepEqual(iterTwo.do(toArray()), mappedTwo);
  t.deepEqual(iterThree.do(toArray()), mappedThree);
});
