import test from "ava";
import { Some } from "../../option/index.js";
import { Iter } from "../index.js";
import { last } from "./last.js";

test(`last() should return last element`, (t) => {
  t.true(Iter.from([1, 2, 3]).do(last()).eq(Some(3)));
});

test(`last() should return none on empty iter`, (t) => {
  t.true(Iter.from([]).do(last()).isNone());
});
