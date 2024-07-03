import { None, Some } from "../base.js";
import { NewOption } from "../index.js";
export type OptionPipe<In, Out> = (option: NewOption<In>, inner: Some<In> | None) => Out;
//# sourceMappingURL=middleware.d.ts.map