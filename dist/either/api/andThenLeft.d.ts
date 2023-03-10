import { Either } from "../interfaces";
export declare function andThenLeft<L, R, U>(either: Either<L, R>, fn: (value: L) => Either<U, R>): import("../interfaces").EitherUnion<U, R>;
//# sourceMappingURL=andThenLeft.d.ts.map