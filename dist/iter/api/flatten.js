import { flatMap } from "./flat_map.js";
export function flatten() {
    return flatMap((v) => v);
}
