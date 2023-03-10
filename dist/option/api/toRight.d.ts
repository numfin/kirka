import { Either } from "../../result";
import { Option } from "../interfaces";
export declare function toRight<L, R>(option: Option<R>, left_default: () => L): Either<L, R>;
//# sourceMappingURL=toRight.d.ts.map