import {FC, Fragment} from "react";

import {Dropdown} from "common/shared/dropdown";
import {useDropdown} from "common/shared/lib/hooks";
import {SortType} from "common/entities/connections/model";

import 'app/app.scss';
import s from './sortSelect.module.scss';

type SortSelectPropsType = {
    sortedBy: SortType,
    setSortedBy: (type: SortType) => void
}

const sortedByObj: { [key: string]: string } = {
    "new-first": "Сначала новые",
    "old-first": "Сначала старые",
    "alphabetically": "Алфавиту A → Я",
    "non-alphabetically": "Алфавиту Я → А"
}

const sortedArr: SortType[] = ["new-first", "old-first", "alphabetically", "non-alphabetically"];

// TODO: добавить стиль на focus::active

export const SortSelect: FC<SortSelectPropsType> = ({sortedBy, setSortedBy}) => {
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();
    return (
        <div className={s.select__button}>
            <Dropdown label={sortedByObj[sortedBy]}
                      img={"sort_outline_20"}
                      showDropdown={showDropdown}
                      handleCloseDropdown={handleCloseDropdown}
                      handleOpenDropdown={handleOpenDropdown}>
                <div className={s.dropdown__container}>
                    {
                        sortedArr.map((item, index) => (
                            <Fragment key={`sort-select-dropdown-${item}`}>
                                <div id={`sort-select-dropdown-${item}`}
                                     onClick={() => setSortedBy(item)}
                                     className={s.dropdown__item}>
                                    <input type="radio"
                                           id={item}
                                           value={item}
                                           checked={item === sortedBy}
                                           onChange={() => setSortedBy(item)}
                                           className={"custom__radio"}
                                    />
                                    <label className={s.dropdown__label}>{sortedByObj[item]}</label>
                                </div>
                                {index === 1 && <hr/>}
                            </Fragment>
                        ))
                    }
                </div>
            </Dropdown>
        </div>
    )
}