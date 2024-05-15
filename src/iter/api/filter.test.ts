import test from "ava";
import { Iter } from "../index.js";
import { nativeRange } from "../iter-test-tools.js";
import { filter } from "./filter.js";

test(`filter() should return only elements that satisfy the condition`, (t) => {
  const evenValues = nativeRange(0, 10).filter((v) => v % 2 === 0);
  const oddValues = nativeRange(0, 10).filter((v) => v % 2 !== 0);

  const iter = Iter.fromRange(0, 10);
  // Clone test: initial iter should be untouched
  const evenIter = iter.do(filter((v) => v % 2 === 0));
  const oddIter = iter.do(filter((v) => v % 2 !== 0));
  t.deepEqual([...evenIter], evenValues);
  t.deepEqual([...oddIter], oddValues);
});
