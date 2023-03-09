<h1 align="center">Iter&lt;T&gt;</h1>
<h3 align="center">More efficient way to work with arrays</h3>

```ts
import { IterFrom } from "kirka";
```

Create Iter

```ts
const numIter = IterFrom.array([1, 2, 3, 4]);
const numIter = IterFrom.range(1, 4, true);
```

Map over elements

```ts
const iter = IterFrom.range(1, 5).map((v) => v * 2);
```

Convert to array

```ts
IterFrom.range(1, 5).collect();
```

> This hints and a more you can just read from IntelliSense (your editor suggestions)
