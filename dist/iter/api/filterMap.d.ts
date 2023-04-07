import { Iter } from "../interfaces.js";
import { Option } from "../../option/index.js";
export declare function filterMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>): Iter<U>;
//# sourceMappingURL=filterMap.d.ts.map