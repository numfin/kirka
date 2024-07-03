import test from "ava";
import { Iter } from "../index.js";
import { map } from "./map.js";
import { enumerate } from "./enumerate.js";
import { minBy } from "./min_by.js";
import { NewOption } from "../../option/index.js";

test(`minBy() returns smallest element from iter`, (t) => {
  const id = ({ v }: { v: number }) => v;

  const iter = Iter.from([4, 2, 1, 3, 2]).do(map((v) => ({ v })));
  t.true(iter.do(minBy(id)).eq(NewOption.Some({ v: 1 }), id));
});

test(`minBy() returns first smallest element from iter`, (t) => {
  const iter = Iter.from([2, 1, 4, 1]).do(enumerate());

  t.deepEqual(iter.do(minBy((v) => v.item)).unwrap(), { index: 1, item: 1 });
});

test(`minBy() returns None if iter is empty`, (t) => {
  t.true(
    Iter.from<number>([])
      .do(minBy((v) => v))
      .isNone()
  );
});

test(`minBy() works with 1 element`, (t) => {
  t.true(
    Iter.from([1])
      .do(minBy((v) => v))
      .eq(NewOption.Some(1))
  );
});
