import {SingleAxisFolder} from "dashboard/widgets/axesFolder";
import {Axis} from "dashboard/entities/charts";
import {TrendLineFolder} from "dashboard/widgets/trendLineFolder";

export const ScatterPlotConfig = () => {
    return(
        <>
            <SingleAxisFolder axisType={Axis.Horizontal}/>
            <SingleAxisFolder axisType={Axis.Vertical}/>
            <TrendLineFolder/>
        </>
    )
}