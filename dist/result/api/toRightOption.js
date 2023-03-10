import { None, Some } from "../../option";
export function toRightOption(either) {
    return either.isRight() ? Some(either.unwrap()) : None();
}
