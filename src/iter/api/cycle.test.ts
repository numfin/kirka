import test from "ava";
import { Iter } from "../index.js";
import { cycle } from "./cycle.js";
import { None, Some } from "../../option/index.js";

test(`cycle() creates repeated iterator from non-empty iterators`, (t) => {
  const iter = Iter.from([1, 2]).do(cycle());
  for (const _ of [1, 2, 3, 4, 5]) {
    t.true(Some(1).eq(iter.next()));
    t.true(Some(2).eq(iter.next()));
  }
});

test(`cycle() creates empty iterator from empty iterator`, (t) => {
  const emptyIter = Iter.from([]).do(cycle());
  for (const _ of [1, 2, 3, 4, 5]) {
    t.true(None().eq(emptyIter.next()));
  }
});
