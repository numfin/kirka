import { None, Some } from "../../option/index.js";
export function ok(result) {
    return result.isOk() ? Some(result.inner().value) : None();
}
