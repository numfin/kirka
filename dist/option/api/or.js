import { createRemapper } from "../middleware/remap.js";
export function or(new_value) {
    return createRemapper((opt) => {
        return opt.isSome() ? opt : new_value;
    });
}
