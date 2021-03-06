function* chunkElements<T>(iterator: Iterator<T>, size: number): Iterator<T[]> {
    const group = new Array(size);
    let result = iterator.next();

    while (!result.done) {
        let i = 0;

        while (!result.done && i < size) {
            group[i++] = result.value;
            result = iterator.next();
        }

        yield group.slice(0, i);
    }
}

class ChunkedIterable<T> implements Iterable<T[]> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly size: number) {}

    public [Symbol.iterator] = (): Iterator<T[]> =>
        chunkElements(this.iterable[Symbol.iterator](), this.size)
}

export const chunk = <T>(iterable: Iterable<T>, size: number): Iterable<T[]> =>
    new ChunkedIterable(iterable, size);
