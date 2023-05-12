<h1 align="center">Schema</h1>
<h3 align="center">Extensible, typed data parsing and tagged unions for js</h3>

Original idea was to create Rust-`enum` alternative for javascript. But I realized that js type-system is too weak and to create complete algebraic types I need to implement entire compiler (typescript alternative) lol.

So instead i decided to create [Zod-alternative](https://zod.dev/) but with `Kirka` in mind.

As a result `Kirka` can now use enums with values (tagged unions).

# Basics

```ts
import { Schema, FromSchema } from 'kirka'

const NumSchema = Schema.num() // number
  .is((v) => v > 10); // validate number
  .is((v) => v < 100); // chain validations
  .transform((v) => Ok(v * 2)) // transform number. In this case *2
type NumType = FromSchema<typeof NumSchema>; // number

NumSchema.parse(...); // Result<number>
const isNumber = NumSchema.check(...); // boolean

// We can make schema optional if we want to accept null's and undefined
NumSchema.optional().parse(null); // Result<Option<number>>

const StrSchema = Schema.str() // string
const BoolSchema = Schema.bool() // boolean

const ObjSchema = Schema.dict({
  field1: Schema.str(),
  field2: Schema.num()
}) // { field1: string, field2: number }
const ArrSchema = Schema.arr(Schema.str()) // string[]
```

# Custom type

```ts
import { AnyHow } from "kirka";

const MySchema = Schema.custom<DateFns>((v: unknown) => {
  if (condition) {
    return Ok(x as DateFns);
  } else {
    // Helper function to say what we expected and what we got
    return AnyHow.expect("ValidDate", v).toErr();
  }
})
  .optional()
  .is((v: T) => true)
  .transform((v: T) => Ok(v)); // Option<DateFns>
```

# And finally... Unions!

```ts
const MyUnion = Schema.union({
  v1: Schema.str(),
  v2: Schema.num(),
  v3: Schema.union({
    v3v1: Schema.arr(Schema.str()),
    v3v2: Schema.num(),
  }),
}); // This represents 3 vairants of either: v1, v2 or v3. v3 contains union too: v3v1 or v3v2
type MyUnion = FromSchema<typeof MyUnion>; // UnionInstance<{ v1: string, v2: number, v3: ... }>

const v2 = MyUnion.v2(20); // create "enum value" which has type MyUnion
const v2 = MyUnion.parse(20).unwrap(); // parse any value into MyUnion
const isV2 = v2.is("v2"); // true

// Match your unions
const v: string = v2.match({
  v1: (v) => "v1", // v: string
  v2: (v) => "v2", // v: number
  v3: (v) => "v3", // v: UnionInstance<{ v3v1: string[], v3v2: number }>
});
// Match some of your unions
const v: Option<string> = v2.match({
  v1: (v) => "v1", // v: string
});
```
