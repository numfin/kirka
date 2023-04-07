import { None, Some } from "../../option/index.js";
export function err(result) {
    return result.isErr() ? Some(result.unwrapErr()) : None();
}
