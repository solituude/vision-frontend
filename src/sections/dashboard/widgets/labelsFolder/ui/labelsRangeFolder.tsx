import {SelectColumn} from "dashboard/features/selectColumn";
import {AlignmentControl} from "dashboard/features/alignmentControl";
import {Checkbox} from "common/shared/checkbox";
import {DropdownFolder} from "dashboard/shared/folder";
import {Dropdown} from "common/shared/dropdown";

export const LabelsRangeFolder = () => {
    return(
        <DropdownFolder icon={'text_outline_28'} label={'Подписи'}>
            <SelectColumn titleAbove={'Название строк по столбцу таблицы'}/>
            <AlignmentControl/>
            <Dropdown label={'Не показывать'} titleAbove={'Отображение значений на графике'}
                      showDropdown={false} handleCloseDropdown={() => {}} handleOpenDropdown={() => {}}>

            </Dropdown>
            <Checkbox label={'Отобразить легенду'}/>
        </DropdownFolder>
    )
}