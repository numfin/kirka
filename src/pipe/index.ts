export interface Pipe<In, Out> {
  chain<NewOut>(member: (v: Out) => NewOut): Pipe<In, NewOut>;
  call(v: In): Out;
  clone(): Pipe<In, Out>;
}

export function Pipe<In, Out = In>(
  identity = (v: In) => v as unknown as Out,
  members = [] as Function[]
) {
  const pipe: Pipe<In, Out> = {
    call(v) {
      return members.reduce((lastV, member) => member(lastV), identity(v));
    },
    chain<NewOut>(member: (v: Out) => NewOut) {
      members.push(member);
      return pipe as unknown as Pipe<In, NewOut>;
    },
    clone() {
      return Pipe(identity, Array.from(members));
    },
  };
  return pipe as Pipe<In, Out>;
}
