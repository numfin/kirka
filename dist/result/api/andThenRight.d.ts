import { Either } from "../interfaces";
export declare function andThenRight<L, R, U>(either: Either<L, R>, fn: (value: R) => Either<L, U>): import("../interfaces").EitherUnion<L, U>;
//# sourceMappingURL=andThenRight.d.ts.map