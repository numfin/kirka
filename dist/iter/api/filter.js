import { iterFactory } from "../generators/iterFactory";
export function filter(source, fn) {
    return iterFactory(source, (x) => x, fn);
}
