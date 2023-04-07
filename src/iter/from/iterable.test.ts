import test from "ava";
import { IterFrom } from "./index.js";

test(`IterFrom.iterable()`, (t) => {
  const fromArr = [1, 2, 3, 4];
  t.deepEqual(IterFrom.iterable(fromArr).collect(), fromArr);
  const fromIter = IterFrom.range(1, 4);
  t.deepEqual(IterFrom.iterable(fromIter).collect(), fromIter.collect());
  const fromGenerator = function* () {
    for (const i of [1, 2, 3]) {
      yield i;
    }
  };
  t.deepEqual(IterFrom.iterable(fromGenerator()).collect(), [
    ...fromGenerator(),
  ]);
});
