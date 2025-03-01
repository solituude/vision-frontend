import {GroupByColumnFolder} from "dashboard/widgets/groupByColumnFolder";
import {SelectStartEndColumnsFolder} from "dashboard/widgets/columnsFolder";
import {LabelsRangeFolder} from "dashboard/widgets/labelsFolder";
import {SortSelectFolder} from "dashboard/widgets/sortFolder";
import {SingleAxisFolder} from "dashboard/widgets/axesFolder";
import {Axis} from "dashboard/entities/charts";

export const RangePlotConfig = () => {
    return(
        <>
            <SelectStartEndColumnsFolder/>
            <LabelsRangeFolder/>
            <SortSelectFolder columnSelection/>
            <GroupByColumnFolder/>
            <SingleAxisFolder axisType={Axis.Horizontal}/>
        </>
    )
}
