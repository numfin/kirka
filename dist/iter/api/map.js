import { iterFactory } from "../gen";
export function map(source, fn) {
    return iterFactory(source(), fn);
}
