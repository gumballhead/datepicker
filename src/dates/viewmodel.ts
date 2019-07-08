import { DateSequence, isSameDate, startOfDay, startOfWeek } from "./index";
import { chunk, map } from "itertools";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function calendar(month: number, year: number): Iterable<Date> {
    const start = startOfWeek(new Date(year, month - 1, 1));
    return new DateSequence(start).take(42);
}

function calendarMonth(month: number, year: number): Iterable<Date> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    return new DateSequence(start).takeUntil(end);
}

export interface DateViewModel {
    readonly date: Date;
    readonly isSelected: boolean;
    readonly isToday: boolean;
    readonly isActiveMonth: boolean;
}

export class DatePickerViewModel {
    public readonly selected?: Date;
    private readonly month: number;
    private readonly year: number;

    constructor()
    constructor(month: number, year: number, selected?: Date)
    constructor(month?: number, year?: number, selected?: Date) {
        const today = new Date();
        this.month = month === undefined ? today.getMonth() + 1 : month;
        this.year = year === undefined ? today.getFullYear() : year;
        if (selected !== undefined) { this.selected = startOfDay(selected); }
    }

    get title(): string {
        return `${months[this.month - 1]} ${this.year}`;
    }

    get dates(): Iterable<Iterable<DateViewModel>> {
        const today = startOfDay(new Date());
        const month = this.month - 1;
        const selected = this.selected;

        const dates = map(calendar(this.month, this.year), (date) => {
            const isSelected = !!selected && isSameDate(date, selected);
            const isToday = isSameDate(date, today);
            const isActiveMonth = date.getMonth() === month;
            return { date, isSelected, isToday, isActiveMonth };
        });

        return chunk(dates, 7);
    }

    public select = (date: Date) =>
        new DatePickerViewModel(this.month, this.year, date);

    public previous = () => this.month === 1
        ? new DatePickerViewModel(12, this.year - 1, this.selected)
        : new DatePickerViewModel(this.month - 1, this.year, this.selected);

    public next = () => this.month === 12
        ? new DatePickerViewModel(1, this.year + 1, this.selected)
        : new DatePickerViewModel(this.month + 1, this.year, this.selected);
}