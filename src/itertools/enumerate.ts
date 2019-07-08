type EnumeratedValue<T> = [number, T];

function* enumerateElements<T>(iterator: Iterator<T>): Iterator<EnumeratedValue<T>> {
    let i = 0;
    let result = iterator.next();

    while (!result.done) {
        yield [i++, result.value];
        result = iterator.next();
    }
}

class EnumeratedIterable<T> implements Iterable<EnumeratedValue<T>> {
    constructor(private readonly iterable: Iterable<T>) {}

    public [Symbol.iterator] = () =>
        enumerateElements(this.iterable[Symbol.iterator]())
}

export const enumerate = <T> (iterable: Iterable<T>) =>
    new EnumeratedIterable(iterable);