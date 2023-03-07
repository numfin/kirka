import test from "ava";
import { IterApi } from "./index";

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
}
function rangeIter(from: number, to: number) {
  return IterApi.fromArr(range(from, to));
}

test("fromArr() and collect()", (t) => {
  const iter = IterApi.fromArr(range(1, 3));
  t.deepEqual(iter.collect(), range(1, 3));

  const emptyIter = IterApi.fromArr([]);
  t.deepEqual(emptyIter.collect(), []);
});

test(".filter()", (t) => {
  const iter = rangeIter(0, 10);
  const iterFiltered = iter.filter((v) => v % 2 === 0);
  const evenValues = range(0, 10).filter((v) => v % 2 === 0);

  t.deepEqual(iterFiltered.collect(), evenValues);
});
test(".map()", (t) => {
  const iter = rangeIter(0, 5);
  const iterMapped = iter.map((v) => v * 2);
  const mappedValues = range(0, 5).map((v) => v * 2);

  t.deepEqual(iterMapped.collect(), mappedValues);
});
