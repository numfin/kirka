import { None, Some } from "../../option";
export function next(generator) {
    const current = generator.next();
    return current.done ? None() : Some(current.value);
}
