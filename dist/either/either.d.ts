import { Either, EitherUnion } from "./interfaces";
export declare function createEither<L, R>(v: EitherUnion<L, R>): Either<L, R>;
export declare function Left<L, R>(value: L): Either<L, R>;
export declare function Right<L, R>(value: R): Either<L, R>;
//# sourceMappingURL=either.d.ts.map