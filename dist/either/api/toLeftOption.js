import { None, Some } from "../../option";
export function toLeftOption(either) {
    return either.isLeft() ? Some(either.unwrap()) : None();
}
