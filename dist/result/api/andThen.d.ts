import { ResultNew } from "../../index.js";
export declare function andThen<T, E, T2>(otherResult: (value: T) => ResultNew<T2, E>): import("../middleware/remap.js").MiddlewareRemap<T, E, T2, E>;
//# sourceMappingURL=andThen.d.ts.map