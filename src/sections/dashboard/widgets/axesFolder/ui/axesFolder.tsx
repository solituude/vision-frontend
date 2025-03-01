import {DropdownFolder} from "dashboard/shared/folder";
import {CustomRange} from "dashboard/features/customRange";
import {Checkbox} from "common/shared/checkbox";

export const AxesFolder = () => {
    return(
        <DropdownFolder icon={'menu_outline_28'} label={'Оси'}>
            <CustomRange/>
            <Checkbox label={'Сетка'}/>
            <Checkbox label={'Линия разделитель'}/>
        </DropdownFolder>
    )
}