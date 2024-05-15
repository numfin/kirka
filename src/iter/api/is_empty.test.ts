import test from "ava";
import { Iter } from "../index.js";
import { isEmpty } from "./is_empty.js";
import { cycle } from "./cycle.js";

test(`isEmpty() truthy on empty array`, (t) => {
  t.is(Iter.from([]).do(isEmpty()), true);
});
test(`isEmpty() falsy on non-empty array`, (t) => {
  t.is(Iter.from([1]).do(isEmpty()), false);
});
test(`isEmpty() falsy (and short-circued) on infinite array`, (t) => {
  t.is(Iter.from([2]).do(cycle()).do(isEmpty()), false);
});
