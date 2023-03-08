import { Either } from "../either";
import { Option } from "./interfaces";
export declare namespace OptionFrom {
    function bool<T extends boolean>(v: T): Option<T>;
    function nullable<T>(v?: T | null): Option<T>;
    function eitherLeft<L, R>(either: Either<L, R>): Option<L>;
    function eitherRight<L, R>(either: Either<L, R>): Option<R>;
}
//# sourceMappingURL=from.d.ts.map