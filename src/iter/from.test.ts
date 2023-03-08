import test from "ava";
import { IterFrom } from "./from";

test(`IterFrom.array()`, (t) => {
  const source = [1, 2, 3, 4];
  const iter = IterFrom.array(source);
  t.deepEqual(iter.collect(), source);
  t.deepEqual(IterFrom.array([]).collect(), []);
});

test(`IterFrom.range()`, (t) => {
  t.throws(() => IterFrom.range(2, 1));
  t.deepEqual(IterFrom.range(1, 4).collect(), [1, 2, 3]);
  t.deepEqual(IterFrom.range(1, 1).collect(), []);
});
test(`IterFrom.range(inclusive)`, (t) => {
  t.deepEqual(IterFrom.range(1, 4, true).collect(), [1, 2, 3, 4]);
  t.deepEqual(IterFrom.range(1, 1, true).collect(), [1]);
});