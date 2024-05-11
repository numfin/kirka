import test from "ava";
import { Iter } from "../index.js";
import { first } from "./first.js";
import { Some } from "../../option/index.js";
import { cycle } from "./cycle.js";

test(`first() should return first element`, (t) => {
  t.true(Iter.from([1, 2, 3]).do(first()).eq(Some(1)));
});

test(`first() should return none on empty iter`, (t) => {
  t.true(Iter.from([]).do(first()).isNone());
});

test(`first() should return first-element on infinite iter`, (t) => {
  t.true(Iter.from([1, 2, 3]).do(cycle()).do(first()).eq(Some(1)));
});
