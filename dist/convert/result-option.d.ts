import { ResultNew } from "../index.js";
import { NewOption } from "../option/index.js";
export declare const ResultTo: {
    option<T, E>(): import("../result/middleware/aggregate.js").MiddlewareAggregator<T, E, NewOption<T>>;
};
export declare const ResultFrom: {
    ok<T, E>(ok: NewOption<T>, err: () => E): ResultNew<T, E>;
    err<T, E>(err: NewOption<E>, ok: () => T): ResultNew<E, T>;
};
export declare const OptionTo: {
    ok<T, E>(err: () => E): import("../option/middleware/aggregate.js").MiddlewareAggregator<T, ResultNew<T, E>>;
    err<T, E>(ok: () => T): import("../option/middleware/aggregate.js").MiddlewareAggregator<E, ResultNew<T, E>>;
};
export declare const OptionFrom: {
    result<T, E>(result: ResultNew<T, E>): NewOption<T>;
};
//# sourceMappingURL=result-option.d.ts.map