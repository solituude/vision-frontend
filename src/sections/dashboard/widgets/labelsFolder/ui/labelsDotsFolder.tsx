import {Checkbox} from "common/shared/checkbox";
import {DropdownFolder} from "dashboard/shared/folder";
import {SelectColumn} from "dashboard/features/selectColumn";
import {AlignmentControl} from "dashboard/features/alignmentControl";

export const LabelsDotsFolder = () => {
    return(
        <DropdownFolder icon={'text_outline_28'} label={'Подписи'}>
            <SelectColumn titleAbove={'Название строк по столбцу таблицы'}/>
            <AlignmentControl/>
            <Checkbox label={'Отобразить легенду'}/>
        </DropdownFolder>
    )
}