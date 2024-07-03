import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
export function and(new_option) {
    return createRemapper((option) => {
        return option.isSome() ? new_option : NewOption.None();
    });
}
