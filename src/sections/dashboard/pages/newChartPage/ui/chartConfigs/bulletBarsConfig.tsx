import {GroupByColumnFolder} from "dashboard/widgets/groupByColumnFolder";
import {SelectStartEndColumnsFolder} from "dashboard/widgets/columnsFolder";
import {LabelsBarsFolder} from "dashboard/widgets/labelsFolder";
import {AxesFolder} from "dashboard/widgets/axesFolder";
import {SortTabFolder} from "dashboard/widgets/sortFolder";

export const BulletBarsConfig = () => {
    return(
        <>
            <SelectStartEndColumnsFolder/>
            <GroupByColumnFolder/>
            <LabelsBarsFolder/>
            <SortTabFolder columnSelection/>
            <AxesFolder/>
        </>
    )
}