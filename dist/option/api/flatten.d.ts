import { Option } from "../index.js";
export type FlattenedOption<T> = T extends Option<unknown> ? T : Option<T>;
export declare function flatten<T>(source: Option<T>): FlattenedOption<T>;
//# sourceMappingURL=flatten.d.ts.map