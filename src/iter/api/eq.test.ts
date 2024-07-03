import test from "ava";
import { Iter } from "../index.js";
import { eq } from "./eq.js";

test(`eq() truthy on equal iterators`, (t) => {
  t.true(Iter.from([1, 2]).do(eq(Iter.from([1, 2]))));
  t.false(Iter.from([1, 2]).do(eq(Iter.from([1, 2, 3]))));
  t.false(Iter.from([1, 2, 3]).do(eq(Iter.from([1, 2]))));
  t.false(Iter.from([1]).do(eq(Iter.from([2]))));
  t.true(Iter.from([]).do(eq(Iter.from([]))));
});

test(`eq(by) remaps values if "by" provided`, (t) => {
  const iterOne = Iter.from([{ a: 1 }, { a: 2 }]);
  const iterTwo = Iter.from([{ a: 1 }, { a: 2 }]);
  const iterThree = Iter.from([{ a: 1 }, { a: 2 }, { a: 3 }]);

  t.true(iterOne.do(eq(iterTwo, (v) => v.a)));
  t.false(iterOne.do(eq(iterThree, (v) => v.a)));
});
