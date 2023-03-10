import { Err, Ok } from "../../result";
export function result(option, noneErr) {
    return option.isSome() ? Ok(option.unwrap()) : Err(noneErr());
}
