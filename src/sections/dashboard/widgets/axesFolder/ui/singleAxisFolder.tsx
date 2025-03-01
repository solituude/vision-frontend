import {FC} from "react";

import {DropdownFolder} from "dashboard/shared/folder";
import {CustomRange} from "dashboard/features/customRange";
import {FloatingComma} from "dashboard/features/floatingComma";
import {Axis} from "dashboard/entities/charts";
import {CustomAxisValues} from "dashboard/features/customAxisValues";
import {PositionSelect} from "dashboard/features/positionSelect";


type SingleAxisFolderType = {
    axisType: Axis;
}

export const SingleAxisFolder: FC<SingleAxisFolderType> = ({axisType}) => {
    const icon = axisType === Axis.Horizontal ? 'arrow_right_outline_24' : 'arrow_up_outline_24';
    const label = axisType === Axis.Horizontal ? 'Горизонтальная ось' : "Вертикальная ось";
    return (
        <DropdownFolder icon={icon} label={label}>

            {/*<SelectColumn titleAbove={'Столбец таблицы'}/>*/}
            <CustomRange/>
            <FloatingComma/>
            <CustomAxisValues/>
            <PositionSelect/>
            {/*<SortTab titleAbove={'Сортировка'}/>*/}
            {/*<Checkbox key={'single-axis-folder-grid-checkbox'} label={'Сетка'}/>*/}
            {/*<Checkbox key={'single-axis-folder-values-on-axis-checkbox'} label={'Подписывать значения на оси'}/>*/}
        </DropdownFolder>
    )
}