import { None } from "../../option";
export function get(source, index) {
    if (index < 0) {
        return None();
    }
    return source.skip(index).first();
}
