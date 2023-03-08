import { Either } from "../either";
import { Option, OptionUnion } from "./interfaces";
export declare function create_option<T>(v: OptionUnion<T>): Option<T>;
export declare function Some<T>(value: T): Option<T>;
export declare function None<T>(): Option<T>;
export declare namespace OptionApi {
    function format<T>(option: OptionUnion<T>): string;
    function eq<T>(option: Option<T>, value: Option<T>): boolean;
    function clone<T>(option: OptionUnion<T>): Option<T>;
    function isNone<T>(option: OptionUnion<T>): boolean;
    function isSome<T>(option: OptionUnion<T>): boolean;
    function take<T>(option: OptionUnion<T>): Option<T>;
    function isSomeAnd<T>(option: Option<T>, fn: (value: T) => boolean): boolean;
    function unwrap<T>(option: OptionUnion<T>): T;
    function unwrapOr<T>(option: OptionUnion<T>, default_value: T): T;
    function map<T, U>(option: OptionUnion<T>, fn: (value: T) => U): Option<U>;
    function or<T>(current_value: Option<T>, new_value: Option<T>): Option<T>;
    function orElse<T>(option: Option<T>, fn: () => Option<T>): Option<T>;
    function and<T, U>(current_value: Option<T>, new_value: Option<U>): Option<U>;
    function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U>;
    function toLeft<T, R>(option: Option<T>, right_default: () => R): Either<T, R>;
    function toRight<L, R>(option: Option<R>, left_default: () => L): Either<L, R>;
}
//# sourceMappingURL=option.d.ts.map