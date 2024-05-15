import test from "ava";
import { None, Some } from "../../option/index.js";
import { Iter } from "../index.js";
import { nativeRange } from "../iter-test-tools.js";
import { filterMap } from "./filter_map.js";

test(`.filterMap()`, (t) => {
  const evenValues = nativeRange(0, 10).filter((v) => v % 2 === 0);
  const oddValues = nativeRange(0, 10).filter((v) => v % 2 !== 0);
  const iter = Iter.fromRange(0, 10);
  function even(v: number) {
    return v % 2 === 0 ? Some(v) : None();
  }
  function odd(v: number) {
    return v % 2 !== 0 ? Some(v) : None();
  }
  // Clone test: initial iter should be untouched
  const evenIter = iter.do(filterMap(even));
  const oddIter = iter.do(filterMap(odd));

  t.deepEqual([...evenIter], evenValues);
  t.deepEqual([...oddIter], oddValues);
});
