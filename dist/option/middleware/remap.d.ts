import { OptionPipe } from "./middleware.js";
import { NewOption } from "../index.js";
import { None, Some } from "../base.js";
export type MiddlewareRemap<In, Out> = (option: NewOption<In>, inner: Some<In> | None) => NewOption<Out>;
export declare function createRemapper<In, Out>(fn: OptionPipe<In, NewOption<Out>>): MiddlewareRemap<In, Out>;
//# sourceMappingURL=remap.d.ts.map