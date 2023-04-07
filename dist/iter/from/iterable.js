import { createIter } from "../index.js";
import { iterFactory } from "../generators/iterFactory.js";
export function iterable(source) {
    return createIter(() => iterFactory(source));
}
