export function match(source, onOk, onErr) {
    if (source.type === "Ok") {
        return onOk(source.value);
    }
    else {
        return onErr(source.value);
    }
}
