import { None, Some } from "../../option";
export function err(result) {
    return result.isErr() ? Some(result.unwrapErr()) : None();
}
