import { None, Some } from "..";
export function bool(v) {
    return v ? Some(v) : None();
}
