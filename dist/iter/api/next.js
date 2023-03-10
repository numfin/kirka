import { None, Some } from "../../option";
export function next(source) {
    const nextValue = source.next();
    if (nextValue.done) {
        return None();
    }
    else {
        return Some(nextValue.value);
    }
}
