import test from "ava";
import { useSpy } from "../../testutils/spy.js";
import { Iter, WithIndex } from "../index.js";
import { enumerate } from "./enumerate.js";
import { find } from "./find.js";

test("find() should return first element found by condition", (t) => {
  const condition = useSpy((v: WithIndex<number>) => v.item === 2);
  const iter = Iter.from([1, 2, 3, 4, 2]).do(enumerate());

  t.deepEqual(iter.do(find(condition.spy)).unwrap(), { item: 2, index: 1 });
  t.is(condition.calledTimes(), 2);
});

test("find() should return none if element not found", (t) => {
  const iter = Iter.from([1, 2, 3, 4, 2]);

  t.truthy(iter.do(find((v) => v === 7)).isNone());
});

test("find() should return none on empty iter", (t) => {
  const iter = Iter.from([]);

  t.truthy(iter.do(find((_) => true)).isNone());
});
