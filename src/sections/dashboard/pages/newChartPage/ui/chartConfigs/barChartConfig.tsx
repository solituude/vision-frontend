import {GroupByColumnFolder} from "dashboard/widgets/groupByColumnFolder";
import {SelectFewColumnsFolder} from "dashboard/widgets/columnsFolder";
import {useConfig} from "dashboard/entities/charts";
import {LabelsBarsFolder} from "dashboard/widgets/labelsFolder";
import {AxesFolder} from "dashboard/widgets/axesFolder";
import {SortTabFolder} from "dashboard/widgets/sortFolder";

export const BarChartConfig = () => {
    useConfig();
    return(
        <>
            <SelectFewColumnsFolder/>
            <GroupByColumnFolder/>
            <LabelsBarsFolder/>
            <AxesFolder/>
            <SortTabFolder />
        </>
    )
}