import { Iter } from "../interfaces.js";
export declare function flatten<T>(source: Iter<T>): Iter<T extends readonly (infer InnerArr)[] ? InnerArr extends readonly (infer InnerArr)[] ? InnerArr : InnerArr : T>;
//# sourceMappingURL=flatten.d.ts.map