import test from "ava";
import { Iter } from "../index.js";
import { len } from "./len.js";

test(`len() should count all elements`, (t) => {
  t.is(Iter.from([]).do(len()), 0);
  t.is(Iter.from([1, 2, 3]).do(len()), 3);
});
