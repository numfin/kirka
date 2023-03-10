import { Iter } from "../interfaces";
import { Option } from "../../option";
export declare function filterMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>): Iter<U>;
//# sourceMappingURL=filterMap.d.ts.map