import test from "ava";
import { Iter } from "../index.js";
import { fold } from "./fold.js";
import { useSpy } from "../../testutils/spy.js";

test(`fold() should return last result`, (t) => {
  const sumAll = fold(0, (acc, item: number) => acc + item);

  t.is(Iter.from([1, 2, 3]).do(sumAll), 6);
  t.is(Iter.from([]).do(sumAll), 0);
});

test(`fold() should go through all elements`, (t) => {
  const summator = useSpy((acc: number, item: number) => acc + item);
  const sumAll = fold(0, summator.spy);

  const source = [1, 2, 3];
  Iter.from(source).do(sumAll);

  t.is(summator.calledTimes(), source.length);
});
