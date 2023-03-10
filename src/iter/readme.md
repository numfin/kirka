<h1 align="center">Iter&lt;T&gt;</h1>
<h3 align="center">More efficient way to work with arrays</h3>

```ts
import { IterFrom } from "kirka";
```

Create `Iter`

```ts
const numIter = IterFrom.array([1, 2, 3, 4]);
const numIter = IterFrom.range(1, 4, true);
const numIter = IterFrom.iterable(numIter); // can be Generator<T> or anything that implements Iterable<T>
```

Map over elements

```ts
const iter = IterFrom.range(1, 5).map((v) => v * 2);
```

Convert to array

```ts
IterFrom.range(1, 5).collect();
```

`Iter` implements `Iterable<T>`, so you can use it as normal iterable

```ts
const values = [3, 10];
for (const item of IterFrom.array(values)) {
  // item
}
// Get item by index
item.get(2).eq(Some(values[2])); // Some(5)
```

Inherit from other iterators

```ts
const iter = IterFrom.array(1, 2, 3, 4);
const iterByTwo = iter.map((v) => v * 2); // [2,4,6,8]
const iterByThree = iter.map((v) => v * 3); // [3,6,9,12]
```

> This hints and a more you can just read from IntelliSense (your editor suggestions)
> or in source code `./interfaces.ts`
