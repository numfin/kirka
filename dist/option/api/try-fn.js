import { ResultNew } from "../../index.js";
export function tryFn(fn) {
    try {
        return ResultNew.Ok(fn());
    }
    catch (err) {
        return ResultNew.Err(err);
    }
}
