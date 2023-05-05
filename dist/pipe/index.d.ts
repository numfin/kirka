export interface Pipe<In extends unknown[], Out> {
    chain<NewOut>(member: (v: Out) => NewOut): Pipe<In, NewOut>;
    call(...v: In): Out;
    clone(): Pipe<In, Out>;
}
export declare function Pipe<In extends unknown[], Out = In>(identity: (...v: In) => Out, members?: Function[]): Pipe<In, Out>;
//# sourceMappingURL=index.d.ts.map