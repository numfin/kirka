export interface Pipe<In, Out> {
  chain<NewOut>(member: (v: Out) => NewOut): Pipe<In, NewOut>;
  call(v: In): Out;
}

export function Pipe<In, Out = In>(identity?: (v: In) => Out) {
  const members: Function[] = [];
  const pipe: Pipe<In, Out> = {
    call(v) {
      return members.reduce(
        (lastV, member) => member(lastV),
        (identity?.(v) ?? v) as Out
      );
    },
    chain<NewOut>(member: (v: Out) => NewOut) {
      members.push(member);
      return pipe as unknown as Pipe<In, NewOut>;
    },
  };
  return pipe as Pipe<In, Out>;
}
