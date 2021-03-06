import { enumerate, map } from "itertools";
import { DateViewModel } from "viewmodel";
import { useInteractor } from "./DatePickerProvider";

interface CalendarProps {
    dates: Iterable<Iterable<DateViewModel>>;
}

function Calendar({ dates }: CalendarProps): JSX.Element {
    const { select } = useInteractor();

    return <div className="calendar">
        <div className="weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
        </div>

        <div className="dates">{ map(enumerate(dates), ([index, week]) =>
            <div key={index} className="week">{ map(week, ({ date, className }) =>
                <span key={date.getTime()}
                    className={className}
                    onClick={() => select(date)}>
                    {date.getDate()}
                </span>
            )}</div>
        )}</div>
    </div>;
}

export default Calendar;
