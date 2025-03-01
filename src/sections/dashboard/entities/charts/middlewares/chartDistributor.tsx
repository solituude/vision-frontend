import {useStore}       from "common/shared/tools/incrumStore/store";
import {ChartType,
    visualizationStore} from "../model/visualizationStore";
import {BarChart}       from "../ui/barChart";
import {StackedBars}    from "../ui/stackedBars";
import {ScatterPlot}    from "../ui/scatterPlot";
import {SplitBars}      from "../ui/splitBars";
import {BulletBars}     from "../ui/bulletBars";
import {ArrowPlot}      from "../ui/arrowPlot";
import {DotPlot}        from "../ui/dotPlot";
import {RangePlot}      from "../ui/rangePlot";
import {ElectionDonut}  from "../ui/electionDonut";


export const ChartDistributor = () => {
    const [store] = useStore(visualizationStore);

    switch (store.type) {
        case ChartType.BarChart:      return <BarChart/>;
        case ChartType.StackedBars:   return <StackedBars/>;
        case ChartType.ScatterPlot:   return <ScatterPlot/>;
        case ChartType.SplitBars:     return <SplitBars/>;
        case ChartType.BulletBars:    return <BulletBars/>;
        case ChartType.ArrowPlot:     return <ArrowPlot/>;
        case ChartType.DotPlot:       return <DotPlot/>;
        case ChartType.RangePlot:     return <RangePlot/>;
        case ChartType.ElectionDonut: return <ElectionDonut/>;
        default: return <BarChart/>;
    }
}