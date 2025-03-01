import {Checkbox} from "common/shared/checkbox";
import {SelectColumn} from "dashboard/features/selectColumn";
import {DropdownFolder} from "dashboard/shared/folder";
import {AlignmentControl} from "dashboard/features/alignmentControl";
import {FloatingComma} from "dashboard/features/floatingComma";

export const LabelsBarsFolder = () => {
    return(
        <DropdownFolder icon={'text_outline_28'} label={'Подписи'}>
            <SelectColumn titleAbove={'Название колонок по столбцу таблицы'}/>
            <Checkbox label={'Подписи колонок на отдельной строке'}/>
            <Checkbox label={'Показывать значения внутри колонок'}/>
            <AlignmentControl/>
            <FloatingComma/>
            <Checkbox label={'Поменять значения с подписями'}/>
            <Checkbox label={'Отображать подписи групп'}/>
        </DropdownFolder>
    )
}