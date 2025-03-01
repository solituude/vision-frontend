import {FC} from "react";

import {DropdownFolder} from "dashboard/shared/folder";
import {SelectColumn} from "dashboard/features/selectColumn";
import {SortTab} from "dashboard/features/sortTab";

import s from './sortFolder.module.scss';

type PropsType = {
    columnSelection?: boolean
}

export const SortTabFolder: FC<PropsType> = ({columnSelection}) => {

    return(
        <DropdownFolder icon={'sort_outline_28'} label={'Сортировка'}>
            <div className={s.folder__container}>
                <SortTab/>
                {columnSelection && <SelectColumn titleAbove={'Сортировка по столбцу таблицы'}/>}
            </div>
        </DropdownFolder>
    )
}