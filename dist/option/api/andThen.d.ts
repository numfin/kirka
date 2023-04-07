import { Option } from "../interfaces.js";
export declare function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>): import("../interfaces.js").OptionUnion<U>;
//# sourceMappingURL=andThen.d.ts.map