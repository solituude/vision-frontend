import {FC, useState} from "react";

import {Select} from "common/features/select";
import {DropdownFolder} from "dashboard/shared/folder";
import {SelectColumn} from "dashboard/features/selectColumn";

export enum SortType {
    asc = 'По возрастанию',
    desc = 'По убыванию',
    alpha = 'По подписи: А → Я',
    nonAlpha = 'По подписи: Я → А'
}

type SortSelectFolderPropsType = {
    columnSelection?: boolean
}

export const SortSelectFolder: FC<SortSelectFolderPropsType> = ({columnSelection}) => {
    const [selectSort, setSelectSort] = useState();

    return(
        <DropdownFolder icon={'sort_outline_28'} label={'Сортировка'}>
            <Select name={'sort-select-folder'} type={'radio'} placeholder={'Выберите тип сортировки'}
                    items={[SortType.asc, SortType.desc, SortType.alpha, SortType.nonAlpha]}
                    onChange={(newSelectSort) => {setSelectSort(newSelectSort)}} value={selectSort}/>
            {columnSelection && selectSort && <SelectColumn titleAbove="Столбец таблицы"/>}
        </DropdownFolder>
    )
}