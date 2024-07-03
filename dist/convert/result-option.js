import { ResultNew } from "../index.js";
import { isNone } from "../option/api/is_none.js";
import { isSome } from "../option/api/is_some.js";
import { NewOption } from "../option/index.js";
import { createAggregator as OAggr } from "../option/middleware/aggregate.js";
import { isOk } from "../result/api/isOk.js";
import { createAggregator as RAggr } from "../result/middleware/aggregate.js";
export const ResultTo = {
    option() {
        return RAggr((_, inner) => {
            return isOk(inner) ? NewOption.Some(inner.value) : NewOption.None();
        });
    },
};
export const ResultFrom = {
    ok(ok, err) {
        return ok.do(OptionTo.ok(err));
    },
    err(err, ok) {
        return err.do(OptionTo.ok(ok));
    },
};
export const OptionTo = {
    ok(err) {
        return OAggr((_, inner) => {
            return isSome(inner) ? ResultNew.Ok(inner.value) : ResultNew.Err(err());
        });
    },
    err(ok) {
        return OAggr((_, inner) => {
            return isNone(inner) ? ResultNew.Ok(ok()) : ResultNew.Err(inner.value);
        });
    },
};
export const OptionFrom = {
    result(result) {
        return result.do(ResultTo.option());
    },
};
