import test from "ava";
import { nativeRange } from "../iter-test-tools.js";
import { Iter } from "../index.js";
import { partitionBy } from "./partition_by.js";

test(`partitionBy() should split array by condition`, (t) => {
  const values = nativeRange(0, 11, true);
  const iter = Iter.from(values);
  const even = (v: number) => v % 2 === 0;
  const odd = (v: number) => !even(v);
  const [evenIter, oddIter] = iter.do(partitionBy(even));

  t.deepEqual(evenIter, values.filter(even));
  t.deepEqual(oddIter, values.filter(odd));
});
