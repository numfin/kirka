import { RightUnion } from "./RightUnion";
export function andThenLeft(either, fn) {
    if (either.isLeft()) {
        return fn(either.unwrap()).inner();
    }
    return RightUnion(either.unwrap());
}
