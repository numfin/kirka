import { Pipe } from "../../../pipe";
import { Err, Ok, Result } from "../../../result";
import {
  RequiredVahter,
  Vahter,
  VahterRule,
  VahterTransformer,
} from "../../interface";
import { CustomVahter } from "../custom";
import { ErrReport } from "../err-report";

export interface NumVahter extends Vahter {
  gt(comparedTo: number, eq?: boolean): NumVahter;
  lt(comparedTo: number, eq?: boolean): NumVahter;
}

export function NumVahter() {
  const rules = Pipe<VahterRule<number>>();
  let vahter = CustomVahter<number>((v) => {
    const isNumber = typeof v === "number" && !isNaN(v) && isFinite(v);
    const checkedNumber: Result<number, ErrReport> = isNumber
      ? Ok(v)
      : ErrReport(v).toErr();
    return rules.call(checkedNumber);
  });

  const api: NumVahter & RequiredVahter<number, NumVahter> = {
    check: vahter.check,
    parse: vahter.parse,
    optional() {
      vahter = vahter.optional();
    },
    gt(comparedTo, eq) {
      rules.chain((v) =>
        v.map((v) => {
          const cond = eq ? v >= comparedTo : v > comparedTo;
          return cond
            ? Ok(v)
            : ErrReport(v).msg(`less than ${comparedTo}`).toErr();
        })
      );
      return api;
    },
    lt(comparedTo, eq) {
      rules.chain((v) =>
        v.map((v) => {
          const cond = eq ? v <= comparedTo : v < comparedTo;
          return cond
            ? Ok(v)
            : ErrReport(v).msg(`less than ${comparedTo}`).toErr();
        })
      );
      return api;
    },
  };

  return api;
}
