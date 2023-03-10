export * from "./interfaces";
export { OptionFrom } from "./from";
import type { Option, OptionUnion } from "./interfaces";
export declare function createOption<T>(v: OptionUnion<T>): Option<T>;
export declare function Some<T>(v: T): Option<T>;
export declare function None<T>(): Option<T>;
//# sourceMappingURL=index.d.ts.map