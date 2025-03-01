import {FC} from "react";
import Calendar from "react-calendar";
import './customReactCalendar.scss';
import {Value} from "../index";

type TProps = {
    setDate: (date: Value) => void;
    date: Value;
    minDate?: Value,
    maxDate?: Value
}

const formatShortWeekday: (locale: string | undefined, date: Date) => string = (_, date) => {
    if (!date) {
        return '';
    }
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return weekdays[date.getDay()];
};

export const CustomCalendar: FC<TProps> = (props) => {
    return(
        <div className="custom_calendar__container">
            <Calendar onChange={props.setDate}
                      value={props.date}
                      minDate={props.minDate instanceof Date ? props.minDate : undefined}
                      maxDate={props.maxDate instanceof Date ? props.maxDate : undefined}
                      formatShortWeekday={formatShortWeekday} />
        </div>

    )
}
