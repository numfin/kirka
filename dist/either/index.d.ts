import { Option } from "../option/interfaces";
import { Either, EitherUnion } from "./interfaces";
export declare function Left<L, R>(value: L): Either<L, R>;
export declare function Right<L, R>(value: R): Either<L, R>;
export declare namespace EitherApi {
    function format<L, R>(either: EitherUnion<L, R>): string;
    function unwrap<L, R>(either: EitherUnion<L, R>): L | R;
    function isLeft<L, R>(either: EitherUnion<L, R>): boolean;
    function isRight<L, R>(either: EitherUnion<L, R>): boolean;
    function unwrapLeft<L, R>(either: Either<L, R>): L;
    function unwrapRight<L, R>(either: Either<L, R>): R;
    function unwrapLeftOr<L, R>(either: Either<L, R>, default_value: L): L;
    function unwrapRightOr<L, R>(either: Either<L, R>, default_value: R): R;
    function isLeftAnd<L, R>(either: Either<L, R>, fn: (v: L) => boolean): boolean;
    function isRightAnd<L, R>(either: Either<L, R>, fn: (v: R) => boolean): boolean;
    function optionLeft<L, R>(either: Either<L, R>): Option<L>;
    function optionRight<L, R>(either: Either<L, R>): Option<R>;
    function mapLeft<L, R, U>(either: Either<L, R>, fn: (value: L) => U): Either<U, R>;
    function mapRight<L, R, U>(either: Either<L, R>, fn: (value: R) => U): Either<L, U>;
    function inspectLeft<L, R>(either: Either<L, R>, fn: (value: L) => void): Either<L, R>;
    function inspectRight<L, R>(either: Either<L, R>, fn: (value: R) => void): Either<L, R>;
    function andThenLeft<L, R, U>(either: Either<L, R>, fn: (value: L) => Either<U, R>): Either<U, R>;
    function andThenRight<L, R, U>(either: Either<L, R>, fn: (value: R) => Either<L, U>): Either<L, U>;
    function andLeft<L, R, U>(either: Either<L, R>, other_either: Either<U, R>): Either<U, R>;
    function andRight<L, R, U>(either: Either<L, R>, other_either: Either<L, U>): Either<L, U>;
}
//# sourceMappingURL=index.d.ts.map