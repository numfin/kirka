import { OptionFrom } from "../../option";
export function nth(source, index) {
    return OptionFrom.nullable(source.skip(index).take(1).collect()[0]);
}
