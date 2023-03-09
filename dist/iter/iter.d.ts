import { ClonnableGenerator, Iter } from "./interfaces";
import { Option } from "../option";
export declare function create_iter<T>(source: ClonnableGenerator<T>): Iter<T>;
export declare namespace IterApi {
    function collect<T>(source: ClonnableGenerator<T>): T[];
    function map<T, U>(source: ClonnableGenerator<T>, fn: (item: T) => U): Iter<U>;
    function filter<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function filterMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>): Iter<U>;
    function enumerate<T>(source: ClonnableGenerator<T>): Iter<{
        item: T;
        index: number;
    }>;
    function skipWhile<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function skip<T>(source: Iter<T>, skipAmount: number): Iter<T>;
    function takeWhile<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function take<T>(source: Iter<T>, takeAmount: number): Iter<T>;
    function nth<T>(source: Iter<T>, index: number): Option<T>;
    function all<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): boolean;
    function any<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): boolean;
    function next<T>(generator: Generator<T>): Option<T>;
    function cycle<T>(source: ClonnableGenerator<T>): Iter<T>;
    function eq<T, U>(source: Iter<T>, another: Iterable<T>, by?: (item: T) => U): boolean;
    function find<T>(source: Iter<T>, fn: (item: T) => boolean): Option<T>;
    function findMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>): Option<U>;
    function position<T>(source: Iter<T>, fn: (item: T) => boolean): Option<number>;
    function flatMap<T, U>(source: Iter<T>, fn: (item: T) => Iterable<U>): Iter<U>;
    function flatten<T>(source: Iter<T>): Iter<FlatArray<T, 1>>;
    function toIterable<T>(source: T): Iterable<FlatArray<T, 1>>;
    function fold<T, U>(source: Iter<T>, startFrom: U, fn: (acc: U, item: T) => U): U;
    function stepBy<T>(source: Iter<T>, amount: number): Iter<T>;
    function forEach<T>(source: Iter<T>, fn: (item: T) => void): void;
}
//# sourceMappingURL=iter.d.ts.map