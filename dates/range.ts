import { startOfDay } from "./lib";

function* dates(start: Date, end: Date): Iterator<Date> {
    const date = startOfDay(start);
    const endTime = end.getTime();

    while (date.getTime() < endTime) {
        yield new Date(date);
        date.setDate(date.getDate() + 1);
    }
}

export class DateRange implements Iterable<Date> {
    public constructor(
        private readonly start: Date,
        private readonly end: Date) {}

    public [Symbol.iterator] = (): Iterator<Date> =>
        dates(this.start, this.end);
}
