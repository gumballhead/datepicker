import { startOfDay } from "./lib";

function* DateIterator(start: Date, end?: Date): Iterator<Date> {
    const date = startOfDay(start);

    while (end === undefined || date < end) {
        yield new Date(date);
        date.setDate(date.getDate() + 1);
    }
}

export class DateRange implements Iterable<Date> {
    public constructor(
        private readonly start: Date,
        private readonly end: Date) {}

    public [Symbol.iterator] = () => DateIterator(this.start, this.end);
}

export class DateSequence implements Iterable<Date> {
    public constructor(private readonly start: Date) {}

    public [Symbol.iterator] = () => DateIterator(this.start);

    public slice(from: number): DateSequence
    public slice(from: number, to: number): DateRange;
    public slice(from: number, to?: number): Iterable<Date> {
        const { start } = this;
        start.setDate(start.getDate() + from);

        if (to === undefined) return new DateSequence(start);

        const end = new Date(start);
        end.setDate(end.getDate() + to - from);
        return new DateRange(start, end);
    }

    public take = (count: number): DateRange => this.slice(0, count);
    public drop = (count: number): DateSequence => this.slice(count);
    public takeUntil = (end: Date): DateRange => new DateRange(this.start, end);
    public dropUntil = (end: Date): DateSequence => new DateSequence(end);
}
