import { ClonnableGenerator, Iter } from "./interfaces";
export declare function create_iter<T>(source: ClonnableGenerator<T>): Iter<T>;
export declare namespace IterApi {
    function collect<T>(source: ClonnableGenerator<T>): T[];
    function map<T, U>(source: ClonnableGenerator<T>, fn: (item: T) => U): Iter<U>;
    function filter<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function enumerate<T>(source: ClonnableGenerator<T>): Iter<{
        item: T;
        index: number;
    }>;
    function skipWhile<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function skip<T>(source: Iter<T>, skipAmount: number): Iter<T>;
    function takeWhile<T>(source: ClonnableGenerator<T>, fn: (item: T) => boolean): Iter<T>;
    function take<T>(source: Iter<T>, takeAmount: number): Iter<T>;
}
//# sourceMappingURL=iter.d.ts.map