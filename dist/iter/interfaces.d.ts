import { Option } from "../option";
export type WithIndex<T> = {
    item: T;
    index: number;
};
export declare enum Order {
    Greater = 1,
    Equal = 0,
    Less = -1
}
export interface Iter<T> {
    /**
     * Transforms iterator into array
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3]
     * const items = IterFrom::array(values);
     * assert(items.collect(), values)
     * ```
     */
    collect(): T[];
    /**
     * Takes a closure and creates an iterator which calls that closure on each element.
     * # Example
     * ```ts
     * const values = [0, 1, 2, 3]
     * const items = IterFrom::array(values).map((v) => v * 2);
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
     * const items = IterFrom::array(values).filter((v) => v % 2 === 0);
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
     * const iter = IterFrom::array(values).filterMap((v) => parseEven(v).ok());
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
     * const items = IterFrom::array(values).enumerate();
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
     * const items = IterFrom::array(values).skipWhile((v) => v < 4);
     * assert(items.collect(), [4, 5])
     * ```
     */
    skipWhile(fn: (item: T) => boolean): Iter<T>;
    /**
     * Creates an iterator that skips the first n elements.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom::array(values);
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
     * const items = IterFrom::array(values).takeWhile((v) => v < 4);
     * assert(items.collect(), [2, 3])
     * ```
     */
    takeWhile(fn: (item: T) => boolean): Iter<T>;
    /**
     * Creates an iterator that yields the first n elements, or fewer if the underlying iterator ends sooner.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom::array(values);
     * assert(iter.take(0).collect(), [])
     * assert(iter.take(2).collect(), [2, 3])
     * assert(iter.take(10).collect(), [2, 3, 4, 5])
     * ```
     */
    take(i: number): Iter<T>;
    /**
     * Returns the nth element of the iterator.
     * # Example
     * ```ts
     * const values = [2, 3, 4, 5]
     * const iter = IterFrom::array(values);
     * assert(iter.nth(0), Some(2))
     * assert(iter.nth(2), Some(4))
     * assert(iter.nth(10), None())
     * ```
     */
    nth(i: number): Option<T>;
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
     * const iter = IterFrom::array(values);
     * assert(iter.all((v) => typeof v === 'number'), true)
     * assert(iter.all((v) => v === 2), false)
     *
     * const emptyIter = IterFrom::array([]);
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
     * const iter = IterFrom::array(values);
     * assert(iter.any((v) => typeof v === 'number'), true)
     * assert(iter.any((v) => v === 2), true)
     *
     * const emptyIter = IterFrom::array([]);
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
     * const iter = IterFrom::array([1, 2, 3])
     * assert(iter.next(), Some(1))
     * assert(iter.next(), Some(2))
     * assert(iter.next(), Some(3))
     * assert(iter.next(), None())
     * ```
     */
    next(): Option<T>;
}
export type ClonnableGenerator<T> = () => Generator<T>;
//# sourceMappingURL=interfaces.d.ts.map