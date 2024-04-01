import { Err, Ok } from "../index.js";
export function fallible(fn) {
    try {
        const result = fn();
        return Ok(result);
    }
    catch (err) {
        return Err(err);
    }
}
export async function fallibleAsync(fn) {
    try {
        const result = await fn();
        return Ok(result);
    }
    catch (err) {
        return Err(err);
    }
}
