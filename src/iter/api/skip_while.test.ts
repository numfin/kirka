import test, { ExecutionContext } from "ava";
import { useSpy } from "../../testutils/spy.js";
import { nativeRange } from "../iter-test-tools.js";
import { Iter } from "../index.js";
import { skipWhile } from "./skip_while.js";
import { toArray } from "./to_array.js";

function testSkipWhile(
  t: ExecutionContext,
  [from, to]: [number, number],
  skipUntil: (item: number) => boolean
) {
  // Repeat range twice to test that we skip until first occurrence and not just filtering values
  const values = [
    ...nativeRange(from, to, true),
    ...nativeRange(from, to, true),
  ];
  // Kirka skip
  const spyFilter = useSpy((item: number) => skipUntil(item));
  const iter = Iter.from(values);
  // initial iter should be untouched
  const skippedIter = iter.do(skipWhile(spyFilter.spy));

  // Native skip
  let found = false;
  const skippedValues = values.filter((item) => {
    if (found) return true;
    return (found = !skipUntil(item));
  });
  const shouldBeCalledAmount = Math.min(
    values.length - skippedValues.length + 1,
    values.length
  );

  t.deepEqual(iter.do(toArray()), values);
  t.deepEqual(skippedIter.do(toArray()), skippedValues);
  t.is(spyFilter.calledTimes(), shouldBeCalledAmount);
}

test(`skipWhile() skips elements until condition falsy`, (t) => {
  testSkipWhile(t, [1, 5], (item) => item < 3);
  testSkipWhile(t, [1, 5], (_) => true); // skip all
  testSkipWhile(t, [1, 5], (_) => false); // skip none
});
