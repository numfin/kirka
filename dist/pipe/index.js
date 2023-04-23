export function Pipe(identity = (v) => v, members = []) {
    const pipe = {
        call(v) {
            return members.reduce((lastV, member) => member(lastV), identity(v));
        },
        chain(member) {
            members.push(member);
            return pipe;
        },
        clone() {
            return Pipe(identity, Array.from(members));
        },
    };
    return pipe;
}
