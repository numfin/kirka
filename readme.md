<h1 align="center">Kurtka</h1>
<h3 align="center">Monoids Rust-style for Typescript</h3>

> If you want to ask something - Go to Discussions
>
> If you found a bug - Go to Issues

<h2> :book: Big inspiration from fp-ts, sweet-monads</h2>

<details open="open">
  <summary>Modules</summary>
  <ul>
    <li><a href="/src/option">Option&lt;T&gt;</a></li>
    <li><a href="/src/either">Either&lt;L, R&gt;</a></li>
    <li><a href="/src/iter">Iter&lt;T&gt;</a></li>
  </ul>
</details>

# Installation

```
npm i github.com/numfin/kurtka
```

Usage described in `example.ts` files. All documentation inside `JSDoc` (autocomplete)

# Why not fp-ts?

1. I tried fp-ts
2. I realised they have terrible documentation.
3. Using things required reading ton of types and remembering everything.
4. My friend suggested trying `sweet-monads`.

# Why not sweet-monads

- No documentation
- Not a lot of functionality (e.x. conversions between types)
- Typing looks weak (tons of overloads without reason)
- Lack of esm support
- Class context complexity
