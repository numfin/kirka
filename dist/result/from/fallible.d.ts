import { Result } from "../interfaces.js";
export declare function fallible<T, E>(fn: () => T): Result<T, E>;
export declare function fallibleAsync<T, E>(fn: () => Promise<T>): Promise<Result<T, E>>;
//# sourceMappingURL=fallible.d.ts.map