<h1 align="center">Kirka</h1>
<h3 align="center">Algebraic data types Rust-style for Typescript</h3>

> If you want to ask something - Go to Discussions
>
> If you found a bug - Go to Issues

<h2> :book: Big inspiration from <a href="https://github.com/gcanti/fp-ts">fp-ts</a>, <a href="https://github.com/JSMonk/sweet-monads">@sweet-monads</a></h2>

# 👇👇👇 Modules

### - [Option&lt;T&gt;](/src/option/) - Forget about nulls and undefined

### - [Result&lt;T, E&gt;](/src/result/) - Handle errors like a god

### - [Iter&lt;T&gt;](/src/iter/) - Lazy iterables with superpowers

### - [Schema](/src/schema/) - Pseudo pattern-matching for js

# 👆👆👆 Everything is described within modules

# Installation

```bash
npm i kirka
# or
npm i github:numfin/kirka
# or fork it and instal from your own repo
```

Usage described in modules readme. All documentation inside `JSDoc` (autocomplete)

# Why not [fp-ts](https://github.com/gcanti/fp-ts)?

1. I tried fp-ts
2. I realised they have terrible documentation.
3. Using things required reading ton of types and remembering everything.
4. My friend suggested trying `sweet-monads`.

# Why not [sweet-monads](https://github.com/JSMonk/sweet-monads)

- No documentation
- Not a lot of functionality (e.g. conversions between types)
- Typing looks weak (tons of overloads without reason)
- Lack of esm support
- Class context complexity
