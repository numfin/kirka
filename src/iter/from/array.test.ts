import test from "ava";
import { IterFrom } from "./index.js";

test(`IterFrom.array()`, (t) => {
  const source = [1, 2, 3, 4];
  const iter = IterFrom.array(source);
  t.deepEqual(iter.collect(), source);
  t.deepEqual(IterFrom.array([]).collect(), []);
});
