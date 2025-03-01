import {LabelsDotsFolder} from "dashboard/widgets/labelsFolder";
import {SortSelectFolder} from "dashboard/widgets/sortFolder";
import {SingleAxisFolder} from "dashboard/widgets/axesFolder";
import {Axis} from "dashboard/entities/charts";

export const DotPlotConfig = () => {
    return(
        <>
            <LabelsDotsFolder/>
            <SortSelectFolder columnSelection/>
            <SingleAxisFolder axisType={Axis.Horizontal}/>
        </>
    )
}