import { Iter } from "./interfaces";
import { ClonnableGenerator } from "./gen";
export declare namespace IterFrom {
    function array<T>(source: T[]): Iter<T>;
    function range(from: number, to: number, inclusive?: boolean): Iter<number>;
}
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
//# sourceMappingURL=index.d.ts.map