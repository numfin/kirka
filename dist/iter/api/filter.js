import { iterFactory } from "../gen";
export function filter(source, fn) {
    return iterFactory(source(), (x) => x, fn);
}
