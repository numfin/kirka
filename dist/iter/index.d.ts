import { Iter } from "./interfaces";
type Gen<T> = Generator<T>;
export declare namespace IterApi {
    function fromArr<T>(source: T[]): Iter<T>;
    function map<T, U>(source: Gen<T>, fn: (item: T) => U): Iter<U>;
    function filter<T>(source: Gen<T>, fn: (item: T) => boolean): Iter<T>;
    function collect<T>(source: Gen<T>): T[];
}
export {};
//# sourceMappingURL=index.d.ts.map