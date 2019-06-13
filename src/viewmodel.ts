import { getISOWeek } from 'date-fns';
import { Month, UTCDate } from './daterange';
import { map, partition } from './itertools';

interface DateViewModel {
    readonly date: number;
    readonly isSelected: boolean;
    readonly isToday: boolean;
}

export class DatePickerViewModel {
    private readonly month: number;
    private readonly year: number;
    readonly selected?: Date;

    constructor(month: number, year: number, selected?: Date) {
        this.month = month;
        this.year = year;
        this.selected = selected;
    }

    get dates(): Iterable<DateViewModel[]> {
        const today = new Date().getDate();
        const weeks = partition(new Month(this.month, this.year), getISOWeek);

        return map(weeks, week => week.map(day => {
            const date = day.getDate();
            const isSelected = this.selected != null && this.selected.getDate() === date;
            const isToday = date === today;
            return { date, isSelected, isToday };
        }));
    }

    select = (date: Date) => new DatePickerViewModel(this.month, this.year, UTCDate(date));

    previous = () => this.month === 1
        ? new DatePickerViewModel(12, this.year - 1, this.selected)
        : new DatePickerViewModel(this.month - 1, this.year, this.selected);

    next = () => this.month === 12
        ? new DatePickerViewModel(1, this.year + 1, this.selected)
        : new DatePickerViewModel(this.month + 1, this.year, this.selected);
}
