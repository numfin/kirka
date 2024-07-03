import { ResultUnion } from "../base.js";
export declare function debug<T, E>(inner: ResultUnion<T, E>, { ok, err }?: {
    ok?(v: T): string;
    err?(e: E): string;
}): string;
//# sourceMappingURL=debug.d.ts.map