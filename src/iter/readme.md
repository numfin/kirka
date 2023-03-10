<h1 align="center">Iter&lt;T&gt;</h1>
<h3 align="center">More efficient way to work with arrays</h3>

If you’ve found yourself with a collection of some kind, and needed to perform an operation on the elements of said collection, you’ll quickly run into ‘iterators’. Iterators are heavily used in idiomatic Rust code, but it's very rare to find iterators (generators) in someone else's code.

Let's change that!

Create `Iter`

```ts
import { IterFrom } from "kirka";

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

Insert items between elements

```ts
const iter = IterFrom.array(1, 2, 3, 4);
iter.intersperse(10); // [1,10,2,10,3,10,4]
```

> This hints and a more you can just read from IntelliSense (your editor suggestions)
> or in source code `./interfaces.ts`
