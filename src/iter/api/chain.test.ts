import test from "ava";
import { Iter } from "../index.js";
import { chain } from "./chain.js";
import { toArray } from "./to_array.js";

test(`chain() concats two iterables`, (t) => {
  const values = Iter.from([1, 2, 3]);
  const extraValues = [4, 5, 6];
  t.deepEqual(values.do(chain(extraValues)).do(toArray()), [1, 2, 3, 4, 5, 6]);
});

test(`chain() works with empty iterables`, (t) => {
  t.deepEqual(
    Iter.from([1, 2, 3]).do(chain<number>([])).do(toArray()),
    [1, 2, 3]
  );
  t.deepEqual(
    Iter.from([])
      .do(chain<number>([1, 2, 3]))
      .do(toArray()),
    [1, 2, 3]
  );
});
