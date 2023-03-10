import { Option } from "../interfaces";
export declare function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>): import("../interfaces").OptionUnion<U>;
//# sourceMappingURL=andThen.d.ts.map