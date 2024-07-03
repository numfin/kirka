import { createRemapper } from "../middleware/remap.js";
export function orElse(fn) {
    return createRemapper((option) => {
        return option.isSome() ? option : fn();
    });
}
