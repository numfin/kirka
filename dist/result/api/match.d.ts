import { ResultUnion } from "../interfaces.js";
export declare function match<T, E, U>(source: ResultUnion<T, E>, onOk: (v: T) => U, onErr: (e: E) => U): U;
//# sourceMappingURL=match.d.ts.map