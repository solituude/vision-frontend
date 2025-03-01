import {DropdownFolder} from "dashboard/shared/folder";
import {FloatingComma} from "dashboard/features/floatingComma";

export const LabelsDonutFolder = () => {
    return(
        <DropdownFolder icon={'text_outline_28'} label={'Подписи'}>
            <FloatingComma/>
        </DropdownFolder>
    )
}