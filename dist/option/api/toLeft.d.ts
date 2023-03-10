import { Either } from "../../either";
import { Option } from "../interfaces";
export declare function toLeft<T, R>(option: Option<T>, right_default: () => R): Either<T, R>;
//# sourceMappingURL=toLeft.d.ts.map