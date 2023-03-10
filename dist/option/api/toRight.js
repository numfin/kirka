import { Left, Right } from "../../either";
export function toRight(option, left_default) {
    return option.isSome() ? Right(option.unwrap()) : Left(left_default());
}
