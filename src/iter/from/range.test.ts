import test from "ava";
import { IterFrom } from ".";

test(`IterFrom.range()`, (t) => {
  t.throws(() => IterFrom.range(2, 1));
  t.deepEqual(IterFrom.range(1, 4).collect(), [1, 2, 3]);
  t.deepEqual(IterFrom.range(1, 1).collect(), []);
});
test(`IterFrom.range(inclusive)`, (t) => {
  t.deepEqual(IterFrom.range(1, 4, true).collect(), [1, 2, 3, 4]);
  t.deepEqual(IterFrom.range(1, 1, true).collect(), [1]);
});
