import { format } from "./format";
export function unwrap(option) {
    if (option.type === "None") {
        throw new Error(`unwrap called on ${format(option)}`);
    }
    return option.value;
}
