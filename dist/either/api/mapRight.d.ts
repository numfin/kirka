import { Either } from "../interfaces";
export declare function mapRight<L, R, U>(either: Either<L, R>, fn: (value: R) => U): import("../interfaces").Right<U> | import("../interfaces").Left<L>;
//# sourceMappingURL=mapRight.d.ts.map