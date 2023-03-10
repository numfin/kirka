import { LeftUnion } from "./LeftUnion";
import { RightUnion } from "./RightUnion";
export function mapLeft(either, fn) {
    if (either.isLeft()) {
        return LeftUnion(fn(either.unwrap()));
    }
    return RightUnion(either.unwrap());
}
