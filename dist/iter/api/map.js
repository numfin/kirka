import { iterFactory } from "../generators/iterFactory.js";
export function map(source, fn) {
    return iterFactory(source, fn);
}
