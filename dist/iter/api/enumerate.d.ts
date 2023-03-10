import { ClonnableGenerator } from "../interfaces";
export declare function enumerate<T>(source: ClonnableGenerator<T>): Generator<{
    item: T;
    index: number;
}, void, unknown>;
//# sourceMappingURL=enumerate.d.ts.map