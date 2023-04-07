```ts

Vahter.num();
Vahter.str();
Vahter.bool();
Vahter.dict();
Vahter.arr();
Vahter.renum();

interface Vahter<T> {}

const AObjVahter = Vahter.dict({
  a: Vahter.num(),
});

Vahter.dict({
  key1: Vahter.num().positive().optional(),
  key2: Vahter.str()
    .notEmpty()
    .is((v) => true),
  key3: Vahter.arr(
    Vahter.renum()
      .add<number>("variant1")
      .add<string>("variant2")
      .add<Vahter<typeof AObjVahter>>("variant3", AObjVahter.check)
  ),
  key4: Vahter.custom(v => {
    if (v typeof "string" && v === "uuid") {
      return Ok(v)
    } else {
      return Err("Not a uuid!")
    }
  })
});

```
