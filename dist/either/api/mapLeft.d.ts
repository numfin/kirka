import { Either } from "../interfaces";
export declare function mapLeft<L, R, U>(either: Either<L, R>, fn: (value: L) => U): import("../interfaces").Left<U> | import("../interfaces").Right<R>;
//# sourceMappingURL=mapLeft.d.ts.map