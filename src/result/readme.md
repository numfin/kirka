<h1 align="center">Result&lt;T, E&gt;</h1>
<h3 align="center">Handle errors like a god</h3>

`Result<T, E>` is the type used for returning and propagating errors. It is a union with the variants, `Ok(T)`, representing success and containing a value, and `Err(E)`, representing error and containing an error value.

Functions return `Result` whenever errors are expected and recoverable.

A simple function returning `Result` might be defined and used like so:

```ts
import { Ok, Err, tryFn, Result } from "kirka";

enum ParseErrors {
  NotANumber,
  InfiniteNumber,
  Null,
}

function parseNumber(v: unknown): Result<number, ParseErrors> {
  const n = Number(v);
  if (isNaN(n)) {
    return Err(ParseErrors.NotANumber);
  }
  if (!isFinite(n)) {
    return Err(ParseErrors.InfiniteNumber);
  }
  if (n === null) {
    return Err(ParseErrors.Null);
  }
  return n;
}
```

`Result`'s error handling is clear and straightforward. His methods make working with it more succinct.

```ts
function decodeParseError(e: ParseErrors): string {
  /* */
}

const badResult = parseNumber("")
  .map((v) => v * 2)
  .or((err) => decodeParseError(err)); // Result<number, string>
const defaultResult = badResult.unwrapOr(3); // 3

const goodResult = parseNumber(4).map((v) => v * 3); // Result<number, ParseErrors>
```

A common problem with using return values to indicate errors is that it is easy to ignore the return value, thus failing to handle the error.
Unlike Rust there is no eslint rule that requires you to handle errors so don't ignore them! :D

> This hints and a more you can just read from IntelliSense (your editor suggestions)
> or in source code `./interfaces.ts`
