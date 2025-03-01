import {SelectFewColumnsFolder} from "dashboard/widgets/columnsFolder";
import {LabelsDonutFolder} from "dashboard/widgets/labelsFolder";
import {SortSelectFolder} from "dashboard/widgets/sortFolder";

export const ElectionDonutConfig = () => {
    return(
        <>
            <SelectFewColumnsFolder/>
            <LabelsDonutFolder/>
            <SortSelectFolder/>
        </>
    )
}