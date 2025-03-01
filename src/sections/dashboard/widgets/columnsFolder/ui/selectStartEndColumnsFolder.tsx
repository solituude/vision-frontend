import {SelectColumn} from "dashboard/features/selectColumn";
import {DropdownFolder} from "dashboard/shared/folder";

import s from './columnsFolder.module.scss';

export const SelectStartEndColumnsFolder = () => {
    return (
            <DropdownFolder icon={'rectangles_2_outline_24'} label={'Колонки'}>
                <div className={s.folder__container} >
                    <SelectColumn titleAbove={'Старт'}/>
                    <SelectColumn titleAbove={'Конец'}/>
                </div>
            </DropdownFolder>
    )
}