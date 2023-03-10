export function nth(source, amount) {
    if (amount <= 0) {
        throw new Error(`Cannot iterate ${amount} - 1 times`);
    }
    for (let i = 0; i < amount - 1; i++) {
        source.next();
    }
    return source.next();
}
