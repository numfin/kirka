import { Iter } from "./interfaces";
export declare namespace IterFrom {
    function iterable<T>(source: Iterable<T>): Iter<T>;
    function array<T>(source: T[]): Iter<T>;
    function range(from: number, to: number, inclusive?: boolean): Iter<number>;
}
//# sourceMappingURL=from.d.ts.map