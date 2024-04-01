import { Err, Ok } from "../index.js";
import { Result } from "../interfaces.js";

export function fallible<T, E>(fn: () => T): Result<T, E> {
    try {
        const result = fn();
        return Ok(result);

    } catch (err) {
        return Err(err as E)
    }
}
export async function fallibleAsync<T, E>(fn: () => Promise<T>): Promise<Result<T, E>> {
    try {
        const result = await fn();
        return Ok(result);

    } catch (err) {
        return Err(err as E)
    }
}