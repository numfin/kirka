import { None, Some } from "../../option";
export function ok(result) {
    return result.isOk() ? Some(result.inner().value) : None();
}
