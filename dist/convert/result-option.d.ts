import { ResultNew } from "../index.js";
import { NewOption } from "../option/index.js";
export declare const ResultTo: {
    option<T, E>(): import("../result/middleware/aggregate.js").MiddlewareAggregator<T, E, NewOption<T>>;
};
export declare const ResultFrom: {
    ok<T, E>(ok: NewOption<T>, err: () => E): ResultNew<T, E>;
    err<T_1, E_1>(err: NewOption<E_1>, ok: () => T_1): ResultNew<E_1, T_1>;
};
export declare const OptionTo: {
    ok<T, E>(err: () => E): import("../option/middleware/aggregate.js").MiddlewareAggregator<T, ResultNew<T, E>>;
    err<T_1, E_1>(ok: () => T_1): import("../option/middleware/aggregate.js").MiddlewareAggregator<E_1, ResultNew<T_1, E_1>>;
};
export declare const OptionFrom: {
    result<T, E>(result: ResultNew<T, E>): NewOption<T>;
};
//# sourceMappingURL=result-option.d.ts.map