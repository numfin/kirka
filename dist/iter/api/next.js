import { NewOption } from "../../option/index.js";
export function next(source) {
    const nextValue = source.next();
    if (nextValue.done) {
        return NewOption.None();
    }
    else {
        return NewOption.Some(nextValue.value);
    }
}
