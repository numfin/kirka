import { ResultNew } from "../index.js";
import { isNone } from "../option/api/is_none.js";
import { isSome } from "../option/api/is_some.js";
import { NewOption } from "../option/index.js";
import { createAggregator as OAggr } from "../option/middleware/aggregate.js";
import { isOk } from "../result/api/isOk.js";
import { createAggregator as RAggr } from "../result/middleware/aggregate.js";

export const ResultTo = {
  option<T, E>() {
    return RAggr<T, E, NewOption<T>>((_, inner) => {
      return isOk(inner) ? NewOption.Some(inner.value) : NewOption.None();
    });
  },
};
export const ResultFrom = {
  ok<T, E>(ok: NewOption<T>, err: () => E) {
    return ok.do(OptionTo.ok(err));
  },
  err<T, E>(err: NewOption<E>, ok: () => T) {
    return err.do(OptionTo.ok(ok));
  },
};

export const OptionTo = {
  ok<T, E>(err: () => E) {
    return OAggr<T, ResultNew<T, E>>((_, inner) => {
      return isSome(inner) ? ResultNew.Ok(inner.value) : ResultNew.Err(err());
    });
  },
  err<T, E>(ok: () => T) {
    return OAggr<E, ResultNew<T, E>>((_, inner) => {
      return isNone(inner) ? ResultNew.Ok(ok()) : ResultNew.Err(inner.value);
    });
  },
};
export const OptionFrom = {
  result<T, E>(result: ResultNew<T, E>) {
    return result.do(ResultTo.option());
  },
};
