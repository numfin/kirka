import test from "ava";
import { Iter } from "../index.js";
import { next } from "./next.js";
import { Some } from "../../option/index.js";

test(`next() should give next generator element until the end`, (t) => {
  const iter = Iter.from([1, 2, 3, 4]).source();
  t.true(next(iter).eq(Some(1)));
  t.true(next(iter).eq(Some(2)));
  t.true(next(iter).eq(Some(3)));
  t.true(next(iter).eq(Some(4)));
  t.true(next(iter).isNone());
});
