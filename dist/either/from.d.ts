import { Option } from "../option";
import { Either } from "./interfaces";
export declare namespace EitherFrom {
    function optionLeft<L, R>(option: Option<L>, defaultRight: () => R): Either<L, R>;
    function optionRight<L, R>(option: Option<R>, defaultLeft: () => L): Either<L, R>;
}
//# sourceMappingURL=from.d.ts.map