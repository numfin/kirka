import { iterFactory } from "../generators/iterFactory";
export function map(source, fn) {
    return iterFactory(source(), fn);
}
