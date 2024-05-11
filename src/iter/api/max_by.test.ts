import test from "ava";
import { Iter } from "../index.js";
import { map } from "./map.js";
import { maxBy } from "./max_by.js";
import { Some } from "../../option/index.js";
import { enumerate } from "./enumerate.js";

test(`maxBy() returns biggest element from iter`, (t) => {
  const id = ({ v }: { v: number }) => v;

  const iter = Iter.from([1, 2, 3, 2, 1]).do(map((v) => ({ v })));
  t.true(iter.do(maxBy(id)).eq(Some({ v: 3 }), id));
});

test(`maxBy() returns first biggest element from iter`, (t) => {
  const iter = Iter.from([2, 3, 1, 3]).do(enumerate());

  t.deepEqual(iter.do(maxBy((v) => v.item)).unwrap(), { index: 1, item: 3 });
});

test(`maxBy() returns None if iter is empty`, (t) => {
  t.true(
    Iter.from<number>([])
      .do(maxBy((v) => v))
      .isNone()
  );
});

test(`maxBy() works with 1 element`, (t) => {
  t.true(
    Iter.from([1])
      .do(maxBy((v) => v))
      .eq(Some(1))
  );
});
