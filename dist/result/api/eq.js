export function eq(self, other) {
    const a = self.inner();
    const b = other.inner();
    return a.type === b.type && a.value === b.value;
}
