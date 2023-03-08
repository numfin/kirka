<h1 align="center">Option&lt;T&gt;</h1>
<h3 align="center">Forget about null and undefined</h3>

```ts
import { None, Some } from "kirka";
```

Create Option

```ts
const MaybeNumber = Some(3);
MaybeNumber.isSome(); // true
const MaybeNumber = None<number>();
MaybeNumber.isNone(); // false
```

Create value from option or change type

```ts
const MaybeNumber = Some(3); // Some(3)
MaybeNumber.map((v) => v * 4); // Some(12)
MaybeNumber.map((v) => v.toString()); // Some("3")
```

Take value and leave None in its place

```ts
const MaybeNumber = Some(0);
const MaybeString = MaybeNumber.map((v) => "value");
const TakenString = MaybeString.take(); // Some("value")
MaybeString.isNone(); // true
MaybeNumber.isSome(); // true. Because .map() creates clone
```

Get value from Option

```ts
const MaybeNumber = Some(0);
MaybeNumber.unwrap(); // 0
```

Get value with default from Option

```ts
const MaybeNumber = None<number>();
MaybeNumber.orElse(() => 4); // 4
// Same as:
MaybeNumber.unwrapOr(4); // 4
MaybeNumber.or(Some(4)).unwrap(); // 4
```

Use another Option only if Some

```ts
const MaybeString = Some("value"); // Some("value")
MaybeString.and(Some("another")); // Some("another")
MaybeString.and(None()); // None()
const MaybeString = None<string>(); // None()
MaybeString.and(Some("another")); // None()
// Same as:
MaybeString.andThen((value) => None());
MaybeString.andThen((value) => Some("another"));
```

Compare 2 Options

```ts
Some("value") !== Some("value"); // we cannot do this
Some("value").eq(Some("value")); // instead use this method
Some("value").isSomeAnd((v) => v === "value"); // or this
```

> This hints and a more you can just read from IntelliSense (your editor suggestions)
