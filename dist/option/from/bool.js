import { None, Some } from "../index.js";
export function bool(v) {
    return v ? Some(v) : None();
}
