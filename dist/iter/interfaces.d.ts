import { Option } from "../option/index.js";
export type WithIndex<T> = {
    item: T;
    index: number;
};
export declare enum Order {
    Greater = 1,
    Equal = 0,
    Less = -1
}
export interface IntoIter<T> extends Iterable<T> {
    /**
     * Creates an iterator from a value
     */
    intoIter(): Iter<T>;
}
export interface Iter<T> extends IntoIter<T> {
    /**
     * Transforms iterator into array
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3]
     * const items = IterFrom.array(values);
     * assert(items.collect(), values)
     * ```
     */
    collect(): T[];
    /**
     * Takes a closure and creates an iterator which calls that closure on each element.
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3]
     * const items = IterFrom.array(values).map((v) => v * 2);
     * assert(items.collect(), [0, 2, 4, 6])
     * ```
     */
    map<U>(fn: (item: T) => U): Iter<U>;
    /**
     * Creates an iterator which uses a closure to determine if an element should be yielded.
     *
     * Given an element the closure must return true or false. The returned iterator will yield only the elements for which the closure returns true.
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3]
     * const items = IterFrom.array(values).filter((v) => v % 2 === 0);
     * assert(items.collect(), [0, 2])
     * ```
     */
    filter(fn: (item: T) => boolean): Iter<T>;
    /**
     * Creates an iterator that both filters and maps.
     *
     * The returned iterator yields only the values for which the supplied closure returns `Some(value)`.
     *
     * `filterMap()` can be used to make chains of `filter` and `map` more concise. The example below shows how a `map().filter().map()` can be shortened to a single call to `filterMap`.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     *
     * function parseEven(v: number): Result<number, Err> {}
     * const iter = IterFrom.array(values).filterMap((v) => parseEven(v).ok());
     *
     * assert(iter.collect(), [2, 4])
     * ```
     */
    filterMap<U>(fn: (item: T) => Option<U>): Iter<U>;
    /**
     * Creates an iterator which gives the current iteration count as well as the value.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const items = IterFrom.array(values).enumerate();
     * assert(items.collect(), [
     *   { index: 0, item: 2 },
     *   { index: 1, item: 3 },
     *   { index: 2, item: 4 },
     *   { index: 3, item: 5 },
     * ])
     * ```
     */
    enumerate(): Iter<WithIndex<T>>;
    /**
     * Creates an iterator that skips elements based on a predicate.
     *
     * `skipWhile()` takes a closure as an argument. It will call this closure on each element of the iterator, and ignore elements until it returns `false`.
     *
     * After `false` is returned, `skipWhile()`'s job is over, and the rest of the elements are yielded.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const items = IterFrom.array(values).skipWhile((v) => v < 4);
     * assert(items.collect(), [4, 5])
     * ```
     */
    skipWhile(fn: (item: T) => boolean): Iter<T>;
    /**
     * Creates an iterator that skips the first n elements.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom.array(values);
     * assert(iter.skip(10).collect(), [])
     * assert(iter.skip(2).collect(), [4, 5])
     * assert(iter.skip(0).collect(), [2, 3, 4, 5])
     * ```
     */
    skip(i: number): Iter<T>;
    /**
     * Creates an iterator that yields elements based on a predicate.
     *
     * `takeWhile()` takes a closure as an argument. It will call this closure on each element of the iterator, and yield elements while it returns `true`.
     *
     * After `false` is returned, `takeWhile()`'s job is over, and the rest of the elements are ignored.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const items = IterFrom.array(values).takeWhile((v) => v < 4);
     * assert(items.collect(), [2, 3])
     * ```
     */
    takeWhile(fn: (item: T) => boolean): Iter<T>;
    /**
     * Creates an iterator that yields the first n elements, or fewer if the underlying iterator ends sooner.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom.array(values);
     * assert(iter.take(0).collect(), [])
     * assert(iter.take(2).collect(), [2, 3])
     * assert(iter.take(10).collect(), [2, 3, 4, 5])
     * ```
     */
    take(i: number): Iter<T>;
    /**
     * Returns the element from iterator on `position` or `None`
     * # Example
     * ```ts
     * const values = [1,2,3,4,5]
     * const iter = IterFrom.array(values)
     * assert(iter.get(0), Some(1))
     * assert(iter.get(1), Some(2))
     * assert(iter.get(2), Some(3))
     * assert(iter.get(3), Some(4))
     * assert(iter.get(4), Some(5))
     * assert(iter.get(5), None())
     * assert(iter.get(-1), None())
     * ```
     */
    get(position: number): Option<T>;
    /**
     * Advances iterator to the `amount` elements and returns the element
     *
     * Mutates inner state like `next()` so calling `nth()` twice will give different results
     * # Throws
     * When `amount < 1`
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom.array(values);
     * assert(iter.nth(1), Some(2))
     * assert(iter.nth(2), Some(4))
     * assert(iter.nth(1), Some(5))
     * assert(iter.nth(10), None())
     * ```
     */
    nth(amount: number): Option<T>;
    /**
     * Tests if every element of the iterator matches a predicate.
     *
     * `all()` takes a closure that returns `true` or `false`. It applies this closure to each element of the iterator, and if they all return `true`, then so does `all()`. If any of them return `false`, it returns `false`.
     *
     * `all()` is short-circuiting; in other words, it will stop processing as soon as it finds a `false`, given that no matter what else happens, the result will also be `false`.
     *
     * An empty iterator returns `true`.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom.array(values);
     * assert(iter.all((v) => typeof v === 'number'), true)
     * assert(iter.all((v) => v === 2), false)
     *
     * const emptyIter = IterFrom.array([]);
     * assert(emptyIter.all((v) => false), true)
     * ```
     */
    all(fn: (item: T) => boolean): boolean;
    /**
     * Tests if any element of the iterator matches a predicate.
     *
     * `any()` takes a closure that returns `true` or `false`. It applies this closure to each element of the iterator, and if any of them return `true`, then so does `any()`. If they all return `false`, it returns `false`.
     *
     * `any()` is short-circuiting; in other words, it will stop processing as soon as it finds a `true`, given that no matter what else happens, the result will also be `true`.
     *
     * An empty iterator returns `false`.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom.array(values);
     * assert(iter.any((v) => typeof v === 'number'), true)
     * assert(iter.any((v) => v === 2), true)
     *
     * const emptyIter = IterFrom.array([]);
     * assert(emptyIter.any((v) => true), false)
     * ```
     */
    any(fn: (item: T) => boolean): boolean;
    /**
     * Advances the iterator and returns the next value.
     *
     * Calling `next()` twice will give two different values.
     *
     * However it is not modifying original iter, since all iter methods use `ClonnedGenerator<T>` and `next()` uses its own inner state.
     *
     * Returns `None()` when iteration is finished.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1, 2, 3])
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), Some(3))
     * assert(iter.next(), None())
     * ```
     */
    next(): Option<T>;
    /**
     * Creates new iter with reset inner state
     * # Example
     * ```ts
     * const iter = IterFrom.array([1, 2]);
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), None())
     *
     * const iter2 = iter.recreate();
     * assert(iter2.next(), Some(1))
     * assert(iter2.next(), Some(2))
     * assert(iter2.next(), None())
     * ```
     */
    recreate(): Iter<T>;
    /**
     * Repeats an iterator endlessly.
     *
     * Instead of stopping at `None()`, the iterator will instead start again, from the beginning. After iterating again, it will start at the beginning again. And again. And again. Forever.
     *
     * Note that in case the original iterator is empty, the resulting iterator will also be empty.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2]);
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), Some(1))
     *
     * const iter = IterFrom.array([]);
     * assert(iter.next(), None())
     * ```
     */
    cycle(): Iter<T>;
    /**
     * Determines if the elements of this iter are equal to those of another
     * # Example
     * ```ts
     * const iter1 = IterFrom.array([1, 2]);
     * const iter2 = IterFrom.array([1, 2]);
     * const iter3 = IterFrom.array([1, 2, 3]);
     *
     * assert(iter1.eq(iter2), true)
     * assert(iter2.eq(iter3), false)
     * assert(iter3.eq(iter1), false)
     *
     * ```
     */
    eq<U>(anotherIter: Iterable<T>, by?: (item: T) => U): boolean;
    /**
     * Searches for an element of an iterator that satisfies a predicate.
     *
     * `find()` takes a closure that returns `true` or `false`. It applies this closure to each element of the iterator, and if any of them return `true`, then `find()` returns `Some(element)`. If they all return `false`, it returns `None()`.
     *
     * `find()` is short-circuiting; in other words, it will stop processing as soon as the closure returns `true`.
     * # Example
     * ```ts
     * const values = [1, 2, 3, 4];
     * const iter = IterFrom.array(values);
     * assert(iter.find((v) => v === 3), Some(3))
     * assert(iter.find((v) => v === 5), None())
     * ```
     */
    find(fn: (item: T) => boolean): Option<T>;
    /**
     * Applies function to the elements of iterator and returns the first non-none result.
     *
     * `.findMap(f)` is equivalent to `.filterMap(f).next()`.
     * # Example
     * ```ts
     * const values = [1, 2, 3, 4];
     * const iter = IterFrom.array(values);
     * function asEven(v: number): Option<T> {}
     * assert(iter.findMap(asEven), Some(2))
     * ```
     */
    findMap<U>(fn: (item: T) => Option<U>): Option<U>;
    /**
     * Searches for an element in an iterator, returning its index.
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3];
     * const iter = IterFrom.array(values);
     * assert(iter.position((v) => v === 2), Some(2));
     * ```
     */
    position(fn: (item: T) => boolean): Option<number>;
    /**
     * Creates an iterator that works like `map()`, but flattens nested structure.
     *
     * The map adapter is very useful, but only when the closure argument produces values. If it produces an iterator instead, there's an extra layer of indirection. `flatMap()` will remove this extra layer on its own.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2,[3]]);
     * assert(iter.flatMap(v => [v]).collect(), [1,2,[3]])
     *
     * const iter = IterFrom.array([[1],[2],[3]]);
     * assert(iter.flatMap(IterFrom.array).collect(), [1,2,3])
     * ```
     */
    flatMap<U>(fn: (item: T) => Iterable<U>): Iter<U>;
    /**
     * Creates an iterator that flattens nested structure.
     *
     * This is useful when you have an iterator of iterators and you want to remove one level of indirection.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2,[3]]);
     * assert(iter.flatten().collect(), [1,2,3])
     *
     * const iter = IterFrom.array([IterFrom.array([1]),[2],[3]]);
     * assert(iter.flatten().collect(), [1,2,3])
     * ```
     */
    flatten(): Iter<FlatArray<T, 1>>;
    /**
     * Same as `[].reduce()` folds every element into an accumulator by applying an operation, returning the final result.
     *
     * `fold()` takes two arguments: an initial value, and a closure with two arguments: an 'accumulator', and an element. The closure returns the value that the accumulator should have for the next iteration.
     *
     * The `startFrom` value is the value the accumulator will have on the first call.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2,3])
     * const sum = iter.fold(0, (acc, item) => acc + item);
     * assert(sum, 1 + 2 + 3)
     * ```
     */
    fold<U>(startFrom: U, fn: (acc: U, item: T) => U): U;
    /**
     * Creates an iterator starting at the same point, but stepping by the given amount at each iteration.
     *
     * The first element of the iterator will always be returned, regardless of the step given.
     *
     * # Throws
     * When `amount = 0`
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2,3,4]);
     * assert(iter.stepBy(1).collect(), [1,2,3,4])
     * assert(iter.stepBy(2).collect(), [1,3])
     * assert(iter.stepBy(3).collect(), [1,4])
     * assert(iter.stepBy(4).collect(), [1])
     * ```
     */
    stepBy(amount: number): Iter<T>;
    /**
     * Calls a closure on each element of an iterator.
     *
     * This is equivalent to using a `for` loop on the iterator, although `break` and `continue` are not possible from a closure. It's generally more idiomatic to use a `for` loop, but `forEach` may be more legible when processing items at the end of longer iterator chains.
     * # Warning
     * Consumes an iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * IterFrom.array([1,2,3]).forEach((v) => {
     *    // do smth with v
     * })
     * ```
     */
    forEach(fn: (item: T) => void): void;
    /**
     * Creates a new iterator which places a separator between items of the original iterator.
     * # Example
     * ```ts
     * const iter = IterFrom.array([1,2,3]).intersperse(10);
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(10))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), Some(10))
     * assert(iter.next(), Some(3))
     * assert(iter.next(), None())
     * ```
     */
    intersperse(item: T): Iter<T>;
    /**
     * Returns true if the iterator is empty.
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).isEmpty(), false)
     * assert(IterFrom.array([]).isEmpty(), true)
     * ```
     */
    isEmpty(): boolean;
    /**
     * Returns size of the iterator.
     *
     * # Warning
     * `.len()` consumes entire array so it will freeze on infinite iterators.
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).isEmpty(), false)
     * assert(IterFrom.array([]).isEmpty(), true)
     * ```
     */
    len(): number;
    /**
     * Returns first element of the iterator or `None()` if its empty
     *
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).first(), Some(1))
     * assert(IterFrom.array([]).first(), None())
     * ```
     */
    first(): Option<T>;
    /**
     * Returns last element of the iterator or `None()` if its empty
     *
     * # Warning
     * Consumes entire iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).last(), Some(3))
     * assert(IterFrom.array([]).first(), None())
     * ```
     */
    last(): Option<T>;
    /**
     * Returns min element of the iterator or `None()` if its empty.
     *
     * `fn()` should return a value that must be used for comparison
     *
     * # Warning
     * Consumes entire iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).minBy(x => x), Some(1))
     * assert(IterFrom.array([]).minBy(x => x), None())
     * ```
     */
    minBy(fn: (item: T) => number): Option<T>;
    /**
     * Returns max element of the iterator or `None()` if its empty.
     *
     * `fn()` should return a value that must be used for comparison
     *
     * If items are equal - last item is used
     *
     * # Warning
     * Consumes entire iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * assert(IterFrom.array([1,2,3]).maxBy(x => x), Some(3))
     * assert(IterFrom.array([]).maxBy(x => x), None())
     * ```
     */
    maxBy(fn: (item: T) => number): Option<T>;
    /**
     * Split iterator in 2 by `fn()` filter.
     *
     * # Warning
     * Consumes entire iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * const iter = IterFrom.array([1, 2, 3, 4, 5, 6, 7])
     * const [even, odd] = iter.partition((v) => v % 2 === 0)
     * assert(even.collect(), [2, 4, 6])
     * assert(odd.collect(), [1, 3, 5, 7])
     * ```
     */
    partition(fn: (item: T) => boolean): [Iter<T>, Iter<T>];
    /**
     * Reverses direction of iterator
     *
     * # Warning
     * Consumes entire iterator, so be carefull on infinite iterators
     * # Example
     * ```ts
     * const iter = IterFrom.array([1, 2, 3, 4])
     * assert(iter.reverse().collect(), [4, 3, 2, 1])
     * ```
     */
    reverse(): Iter<T>;
}
export type ClonnableGenerator<T> = () => Generator<T>;
//# sourceMappingURL=interfaces.d.ts.map