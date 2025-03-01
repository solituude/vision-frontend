import {FC, useEffect, useState} from "react";

import {ClickAwayListener} from "@mui/material";

import {Dropdown} from "common/shared/dropdown";
import {CustomCalendar as Calendar, Value} from "common/shared/calendar";
import {DateSelectEnum} from "common/shared/lib/types";
import {Icon} from "common/shared/lib/icons/Icon";

import s from './dateChangingSelect.module.scss';
import 'common/shared/styles/overrideBootstrap.css'
import 'react-calendar/dist/Calendar.css';

const THIS_YEAR = new Date().getFullYear();

type PropsType = {
    setDateProps: (type: string) => void;
}

// TODO: чекнуть календарь
export const DateChangingSelect: FC<PropsType> = ({setDateProps}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isCustom, setIsCustom] = useState(false);
    const [dateFrom, setDateFrom] = useState<Value>(null);
    const [dateTo, setDateTo] = useState<Value>(null);
    const [showCalendarFrom, setShowCalendarFrom] = useState(false);
    const [showCalendarTo, setShowCalendarTo] = useState(false);
    const [minDate, setMinDate] = useState<Value>(null);
    const [maxDate, setMaxDate] = useState<Value>(null);
    const handleOpenDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    const handleCloseDropdown = () => {
        setShowDropdown(false);
    }

    useEffect(() => {
        setDateProps(`${DateSelectEnum.CUSTOM} ${dateFrom?.toString()} ${dateTo?.toString()}`);
    }, [dateFrom, dateTo])


    return (
        <div className={s.dropdown__button}>
            <Dropdown key={`dropdown-datasets-date-changing-select`}
                      label={"Дата изменения"}
                      showDropdown={showDropdown}
                      handleOpenDropdown={handleOpenDropdown}
                      handleCloseDropdown={handleCloseDropdown}>
                <div className={s.dropdown__container}>
                    <div className={s.dropdown__list}>
                        <button onClick={() => setDateProps(DateSelectEnum.TODAY)}
                                className={s.dropdown__item}>Сегодня
                        </button>

                        <button onClick={() => setDateProps(DateSelectEnum.LAST_7_DAYS)}
                                className={s.dropdown__item}>За последние 7 дней
                        </button>

                        <button onClick={() => setDateProps(DateSelectEnum.LAST_30_DAYS)}
                                className={s.dropdown__item}>За последние 30 дней
                        </button>

                        <button onClick={() => setDateProps(DateSelectEnum.THIS_YEAR)}
                                className={s.dropdown__item}>За этот год ({THIS_YEAR})
                        </button>
                        <button onClick={() => setDateProps(DateSelectEnum.LAST_YEAR)}
                                className={s.dropdown__item}>За прошлый год ({THIS_YEAR - 1})
                        </button>

                        <button className={s.dropdown__item} onClick={() => setIsCustom(!isCustom)}>
                                        <span className={s.dropdown__text}>
                                            Собственный диапазон дат
                                        </span>
                            <Icon name={"chevron_compact_right_24"} color={"--icon-tertiary"} height={24}
                                  width={16}/>
                        </button>
                    </div>
                    {
                        isCustom && <>
                            <div className={s.separator}/>
                            <div className={s.select__container}>
                                <ClickAwayListener onClickAway={() => setShowCalendarFrom(false)}>
                                    <div className={s.calendar__container}>
                                        <button onClick={() => setShowCalendarFrom(true)}
                                                className={s.calendar__item}>
                                            <span>От {dateFrom instanceof Date && dateFrom.toLocaleDateString("ru")} </span>
                                            <Icon name={"calendar_outline_24"} color={"--icon-accent"} width={24}
                                                  height={24}/>
                                        </button>

                                        {showCalendarFrom && <Calendar setDate={(data: Value) => {
                                            setMinDate(data);
                                            setDateFrom(data)
                                        }} maxDate={maxDate} date={dateFrom}/>}
                                    </div>
                                </ClickAwayListener>


                                <ClickAwayListener onClickAway={() => setShowCalendarTo(false)}>
                                    <div className={s.calendar__container}>
                                        <button onClick={() => setShowCalendarTo(true)}
                                                className={s.calendar__item}>
                                            <span>До {dateTo instanceof Date && dateTo.toLocaleDateString("ru")} </span>
                                            <Icon name={"calendar_outline_24"} color={"--icon-accent"} width={24}
                                                  height={24}/>
                                        </button>

                                        {showCalendarTo && <Calendar setDate={(date: Value) => {
                                            setMaxDate(date);
                                            setDateTo(date);
                                        }} minDate={minDate} date={dateTo}/>}
                                    </div>
                                </ClickAwayListener>
                            </div>

                        </>
                    }
                </div>
            </Dropdown>
        </div>

    )
}