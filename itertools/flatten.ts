function* flattenElements<T>(iterator: Iterator<Iterable<T>>): Iterator<T> {
    let result = iterator.next();

    while (!result.done) {
        yield * result.value;
        result = iterator.next();
    }
}

class FlattenedIterable<T> implements Iterable<T> {
    public constructor(private readonly iterable: Iterable<Iterable<T>>) {}

    public [Symbol.iterator] = (): Iterator<T> =>
        flattenElements(this.iterable[Symbol.iterator]())
}

export const flatten = <T>(iterable: Iterable<Iterable<T>>): Iterable<T> =>
    new FlattenedIterable(iterable);
