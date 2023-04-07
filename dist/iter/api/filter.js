import { iterFactory } from "../generators/iterFactory.js";
export function filter(source, fn) {
    return iterFactory(source, (x) => x, fn);
}
