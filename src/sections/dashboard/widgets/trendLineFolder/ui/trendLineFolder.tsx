import {ToggleFolder} from "dashboard/shared/folder";

export const TrendLineFolder = () => {
    return(
        <ToggleFolder icon={'statistics_outline_24'}
                      label={'Отобразить трендовую линию'} isChecked={false} onChange={() => {}}/>
    )
}