import type { AsyncMonad, Alternative, Container } from "../interfaces";
export declare namespace M {
    const enum MaybeState {
        Just = "Just",
        None = "None"
    }
    export class MaybeConstructor<T, S extends MaybeState = MaybeState> implements AsyncMonad<T>, Alternative<T>, Container<T> {
        private readonly type;
        readonly value: S extends MaybeState.Just ? T : undefined;
        static chain<A, B>(f: (v: A) => Promise<Maybe<B>>): (m: Maybe<A>) => Promise<Maybe<B>>;
        static merge<V1>(values: [Maybe<V1>]): Maybe<[V1]>;
        static merge<V1, V2>(values: [Maybe<V1>, Maybe<V2>]): Maybe<[V1, V2]>;
        static merge<V1, V2, V3>(values: [Maybe<V1>, Maybe<V2>, Maybe<V3>]): Maybe<[V1, V2, V3]>;
        static merge<V1, V2, V3, V4>(values: [Maybe<V1>, Maybe<V2>, Maybe<V3>, Maybe<V4>]): Maybe<[V1, V2, V3, V4]>;
        static merge<V1, V2, V3, V4, V5>(values: [Maybe<V1>, Maybe<V2>, Maybe<V3>, Maybe<V4>, Maybe<V5>]): Maybe<[V1, V2, V3, V4, V5]>;
        static merge<V1, V2, V3, V4, V5, V6>(values: [Maybe<V1>, Maybe<V2>, Maybe<V3>, Maybe<V4>, Maybe<V5>, Maybe<V6>]): Maybe<[V1, V2, V3, V4, V5, V6]>;
        static merge<V1, V2, V3, V4, V5, V6, V7>(values: [
            Maybe<V1>,
            Maybe<V2>,
            Maybe<V3>,
            Maybe<V4>,
            Maybe<V5>,
            Maybe<V6>,
            Maybe<V7>
        ]): Maybe<[V1, V2, V3, V4, V5, V6, V7]>;
        static merge<V1, V2, V3, V4, V5, V6, V7, V8>(values: [
            Maybe<V1>,
            Maybe<V2>,
            Maybe<V3>,
            Maybe<V4>,
            Maybe<V5>,
            Maybe<V6>,
            Maybe<V7>,
            Maybe<V8>
        ]): Maybe<[V1, V2, V3, V4, V5, V6, V7, V8]>;
        static merge<V1, V2, V3, V4, V5, V6, V7, V8, V9>(values: [
            Maybe<V1>,
            Maybe<V2>,
            Maybe<V3>,
            Maybe<V4>,
            Maybe<V5>,
            Maybe<V6>,
            Maybe<V7>,
            Maybe<V8>,
            Maybe<V9>
        ]): Maybe<[V1, V2, V3, V4, V5, V6, V7, V8, V9]>;
        static merge<V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(values: [
            Maybe<V1>,
            Maybe<V2>,
            Maybe<V3>,
            Maybe<V4>,
            Maybe<V5>,
            Maybe<V6>,
            Maybe<V7>,
            Maybe<V8>,
            Maybe<V9>,
            Maybe<V10>
        ]): Maybe<[V1, V2, V3, V4, V5, V6, V7, V8, V9, V10]>;
        static merge<T>(maybies: Array<Maybe<T>>): Maybe<T[]>;
        static from<T>(v: T): Maybe<T>;
        static fromNullable<T>(v: T): Maybe<Exclude<T, null | undefined>>;
        static none<T = never>(): Maybe<T>;
        static just<T>(v: T): Maybe<T>;
        private constructor();
        isNone(): this is MaybeConstructor<T, MaybeState.None>;
        isJust(): this is MaybeConstructor<T, MaybeState.Just>;
        join<V>(this: Maybe<Maybe<V>>): Maybe<V>;
        map<V>(f: (r: T) => V): Maybe<V>;
        asyncMap<V>(f: (r: T) => Promise<V>): Promise<Maybe<V>>;
        apply<A, B>(this: Maybe<(a: A) => B>, arg: Maybe<A>): Maybe<B>;
        apply<A, B>(this: Maybe<A>, fn: Maybe<(a: A) => B>): Maybe<B>;
        asyncApply<A, B>(this: Maybe<(a: A) => Promise<B>>, arg: Maybe<Promise<A> | A>): Promise<Maybe<B>>;
        asyncApply<A, B>(this: Maybe<Promise<A> | A>, fn: Maybe<(a: A) => Promise<B>>): Promise<Maybe<B>>;
        chain<V>(f: (r: T) => Maybe<V>): Maybe<V>;
        asyncChain<V>(f: (r: T) => Promise<Maybe<V>>): Promise<Maybe<V>>;
        or(x: Maybe<T>): Maybe<T>;
        unwrap(): T;
    }
    export type Maybe<T> = MaybeConstructor<T, MaybeState.Just> | MaybeConstructor<T, MaybeState.None>;
    export const merge: typeof MaybeConstructor.merge, just: typeof MaybeConstructor.just, none: typeof MaybeConstructor.none, from: typeof MaybeConstructor.from, fromNullable: typeof MaybeConstructor.fromNullable, chain: typeof MaybeConstructor.chain;
    export const isMaybe: <T>(value: unknown) => value is Maybe<T>;
    export {};
}
//# sourceMappingURL=index.d.ts.map