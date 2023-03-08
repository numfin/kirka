import test from "ava";
import { useSpy } from "../testutils/spy";
import { IterFrom } from "./index";
function nativeRange(from, to, inclusive = false) {
    if (from > to) {
        throw new Error(`Invalid Range: From(${from}) > To(${to})`);
    }
    return Array.from({ length: inclusive ? to - from + 1 : to - from }, (_, i) => i + from);
}
test(`IterFrom.range()`, (t) => {
    const iter = IterFrom.range(1, 3).collect();
    t.deepEqual(iter, [1, 2]);
    const emptyIter = IterFrom.range(1, 1).collect();
    t.deepEqual(emptyIter, []);
    const inclusiveIter = IterFrom.range(1, 1, true).collect();
    t.deepEqual(inclusiveIter, [1]);
    // Throws on negative range
    t.throws(() => IterFrom.range(2, 1));
});
test(`IterFrom.array()`, (t) => {
    const numbers = nativeRange(1, 3, true);
    const numbersCopy = nativeRange(1, 3, true);
    const iter = IterFrom.array(numbers);
    t.deepEqual(iter.collect(), numbersCopy);
    const emptyIter = IterFrom.array([]);
    t.deepEqual(emptyIter.collect(), []);
});
test(`.filter()`, (t) => {
    const iter = IterFrom.range(0, 10);
    // Clone test: initial iter should be untouched
    const evenIter = iter.filter((v) => v % 2 === 0);
    const oddIter = iter.filter((v) => v % 2 !== 0);
    const evenValues = nativeRange(0, 10).filter((v) => v % 2 === 0);
    const oddValues = nativeRange(0, 10).filter((v) => v % 2 !== 0);
    t.deepEqual(evenIter.collect(), evenValues);
    t.deepEqual(oddIter.collect(), oddValues);
});
test(`.map()`, (t) => {
    const iter = IterFrom.range(0, 5);
    // Clone test: initial iter should be untouched
    const iterTwo = iter.map((v) => v * 2);
    const iterThree = iter.map((v) => v * 3);
    const mappedTwo = nativeRange(0, 5).map((v) => v * 2);
    const mappedThree = nativeRange(0, 5).map((v) => v * 3);
    t.deepEqual(iterTwo.collect(), mappedTwo);
    t.deepEqual(iterThree.collect(), mappedThree);
});
test(`.enumerate()`, (t) => {
    const iter = IterFrom.range(3, 7);
    // Clone test: initial iter should be untouched
    const enumeratedIter = iter.enumerate();
    const enumerate = (item, index) => ({ item, index });
    const enumeratedValues = nativeRange(3, 7).map(enumerate);
    t.deepEqual(iter.collect(), nativeRange(3, 7));
    t.deepEqual(enumeratedIter.collect(), enumeratedValues);
});
function testSkipWhile(t, [from, to], until) {
    // Repeat range twice to test that we not skipping values
    const values = [
        ...nativeRange(from, to, true),
        ...nativeRange(from, to, true),
    ];
    // Our way
    const spyFilter = useSpy((item) => item < until);
    const iter = IterFrom.array(values);
    // Clone test: initial iter should be untouched
    const skippedIter = iter.skipWhile(spyFilter.spy);
    // Normal way
    const startFrom = values.findIndex((item) => item === until);
    const skippedValues = values.slice(Math.max(0, startFrom));
    t.deepEqual(iter.collect(), values);
    t.deepEqual(skippedIter.collect(), skippedValues);
    // Filter should be called startFrom + 1 times
    t.is(spyFilter.calledTimes(), startFrom + 1);
}
test(`.skipWhile()`, (t) => {
    testSkipWhile(t, [1, 5], 3);
    testSkipWhile(t, [1, 5], 5); // skip all
    testSkipWhile(t, [1, 5], 1); // skip none
});
test(`.skip()`, (t) => {
    const iter = IterFrom.range(3, 10);
    const values = nativeRange(3, 10);
    // Clone test: initial iter should be untouched
    const skippedIter = iter.skip(3);
    const skippedValues = values.slice(3);
    t.deepEqual(iter.collect(), values);
    t.deepEqual(skippedIter.collect(), skippedValues);
});
function testTakeWhile(t, [from, to], condition) {
    // Repeat range twice to test that we not taking values twice
    const values = [
        ...nativeRange(from, to, true),
        ...nativeRange(from, to, true),
    ];
    // Our way
    const spyFilter = useSpy(condition);
    const iter = IterFrom.array(values);
    // Clone test: initial iter should be untouched
    const skippedIter = iter.takeWhile(spyFilter.spy);
    // Normal way
    const endAt = values.findIndex((item) => !condition(item));
    const endAtWrapped = endAt < 0 ? values.length : endAt;
    const takenValues = values.slice(0, endAtWrapped);
    t.deepEqual(iter.collect(), values);
    t.deepEqual(skippedIter.collect(), takenValues);
    // Filter should be called min(takenValues.length + 1, values.length) times
    t.is(spyFilter.calledTimes(), Math.min(takenValues.length + 1, values.length));
}
test(`.takeWhile()`, (t) => {
    testTakeWhile(t, [1, 5], (item) => item !== 3);
    testTakeWhile(t, [1, 5], () => true); // take all
    testTakeWhile(t, [1, 5], () => false); // take none
});
test(`.take()`, (t) => {
    const iter = IterFrom.range(3, 10);
    const values = nativeRange(3, 10);
    // Clone test: initial iter should be untouched
    const takenIter = iter.take(3);
    const takenValues = values.slice(0, 3);
    t.deepEqual(iter.collect(), values);
    t.deepEqual(takenIter.collect(), takenValues);
});
