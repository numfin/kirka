import test from "ava";
import { Iter } from "../index.js";
import { reverse } from "./reverse.js";
import { toArray } from "./to_array.js";

test(`reverse() should reverse elements direction`, (t) => {
  const values = [1, 2, 3, 4, 5];
  const valuesCopy = [...values];
  const iter = Iter.from(values).do(reverse());
  t.deepEqual(iter.do(toArray()), valuesCopy.reverse());
});
test(`reverse() works on empty iter`, (t) => {
  t.deepEqual(Iter.from([]).do(reverse()).do(toArray()), [].reverse());
});
