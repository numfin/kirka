import { ResultNew } from "../../index.js";
import { ResultUnion } from "../base.js";
import { ResultPipe } from "./middleware.js";
export type MiddlewareAggregator<T, E, Out> = (option: ResultNew<T, E>, inner: ResultUnion<T, E>) => Out;
export declare function createAggregator<T, E, Out>(fn: ResultPipe<T, E, Out>): MiddlewareAggregator<T, E, Out>;
//# sourceMappingURL=aggregate.d.ts.map