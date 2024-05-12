import { IterPipe } from "./middleware.js";
import { Iter } from "../index.js";
import { ClonnableGenerator } from "../interfaces.js";
export type MiddlewareRemap<In, Out> = (iter: Iter<In>, source: ClonnableGenerator<In>, inner: Generator<In, unknown, unknown>) => Iter<Out>;
export declare function createRemapper<T, U>(fn: IterPipe<T, Generator<U, unknown, unknown>>): MiddlewareRemap<T, U>;
//# sourceMappingURL=remap.d.ts.map