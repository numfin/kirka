import { createIter } from "..";
import { iterFactory } from "../generators/iterFactory";
export function iterable(source) {
    return createIter(() => iterFactory(source));
}
