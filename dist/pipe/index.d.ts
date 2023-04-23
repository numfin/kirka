export interface Pipe<In, Out> {
    chain<NewOut>(member: (v: Out) => NewOut): Pipe<In, NewOut>;
    call(v: In): Out;
    clone(): Pipe<In, Out>;
}
export declare function Pipe<In, Out = In>(identity?: (v: In) => Out, members?: Function[]): Pipe<In, Out>;
//# sourceMappingURL=index.d.ts.map