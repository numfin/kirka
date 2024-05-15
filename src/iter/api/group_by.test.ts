import test from "ava";
import { Iter } from "../index.js";
import { groupBy } from "./group_by.js";

test(`groupBy() collects equal elements by key`, (t) => {
  const values = [1, 2, 3, 4, 5];
  t.deepEqual(
    Iter.from(values).do(groupBy((v) => v % 2)),
    new Map([
      [1, [1, 3, 5]],
      [0, [2, 4]],
    ])
  );
});
