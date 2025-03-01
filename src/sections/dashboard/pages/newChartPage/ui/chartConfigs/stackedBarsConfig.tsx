import {GroupByColumnFolder} from "dashboard/widgets/groupByColumnFolder";
import {SelectFewColumnsFolder} from "dashboard/widgets/columnsFolder";
import {LabelsBarsFolder} from "dashboard/widgets/labelsFolder";
import {AxesFolder} from "dashboard/widgets/axesFolder";
import {SortTabFolder} from "dashboard/widgets/sortFolder";

export const StackedBarsConfig = () => {
    return(
        <>
            <SelectFewColumnsFolder/>
            <GroupByColumnFolder/>
            <LabelsBarsFolder/>
            <SortTabFolder columnSelection/>
            <AxesFolder/>
        </>
    )
}